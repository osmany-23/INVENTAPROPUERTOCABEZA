<?php

namespace App\Services;

use App\Models\Credit;
use App\Models\CreditItem;
use App\Models\CreditItemReturn;
use App\Models\ManageStock;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class CreditInventoryService
{
    public const ITEM_SOURCE_MANUAL = 'manual';
    public const ITEM_SOURCE_SALE = 'sale';
    public const MOVEMENT_TYPE_CREDIT = 'credito';
    public const MOVEMENT_TYPE_CREDIT_RETURN = 'devolucion_credito';

    public function itemTableExists(): bool
    {
        return Schema::hasTable('credit_items');
    }

    public function returnTableExists(): bool
    {
        return Schema::hasTable('credit_item_returns');
    }

    public function ensureSaleCreditItemsBackfilled(?int $creditId = null): void
    {
        if (! $this->itemTableExists()) {
            return;
        }

        Credit::query()
            ->whereNotNull('sale_id')
            ->whereHas('sale')
            ->whereDoesntHave('items')
            ->when($creditId, function ($query) use ($creditId) {
                $query->whereKey($creditId);
            })
            ->with(['sale.saleItems'])
            ->chunkById(50, function ($credits) {
                foreach ($credits as $credit) {
                    $this->attachSaleItems($credit, $credit->sale);
                }
            });
    }

    public function prepareManualItems(array $items, int $warehouseId): array
    {
        if (! $this->itemTableExists()) {
            throw new UnprocessableEntityHttpException('La integracion de inventario para creditos requiere ejecutar sus migraciones.');
        }

        if ($warehouseId <= 0) {
            throw new UnprocessableEntityHttpException('Debe seleccionar una bodega para el credito manual.');
        }

        $preparedItems = [];
        $processedProducts = [];

        foreach ($items as $item) {
            $productId = (int) ($item['product_id'] ?? 0);
            $quantity = round((float) ($item['quantity'] ?? 0), 2);

            if ($productId <= 0 || $quantity <= 0) {
                continue;
            }

            if (isset($processedProducts[$productId])) {
                throw new UnprocessableEntityHttpException('No puede repetir el mismo producto dentro del credito manual.');
            }

            $product = Product::query()->find($productId);
            if (! $product) {
                throw new UnprocessableEntityHttpException('Uno de los productos seleccionados no existe.');
            }

            $stock = ManageStock::query()
                ->where('warehouse_id', $warehouseId)
                ->where('product_id', $productId)
                ->lockForUpdate()
                ->first();

            if (! $stock || round((float) $stock->quantity, 2) < $quantity) {
                throw new UnprocessableEntityHttpException(sprintf('Stock insuficiente para el producto %s.', $product->name));
            }

            $productPrice = round((float) $product->product_price, 2);
            $preparedItems[] = [
                'product_id' => $productId,
                'warehouse_id' => $warehouseId,
                'quantity' => $quantity,
                'product_price' => $productPrice,
                'sub_total' => round($productPrice * $quantity, 2),
                'source' => self::ITEM_SOURCE_MANUAL,
                'stock' => $stock,
            ];

            $processedProducts[$productId] = true;
        }

        if (empty($preparedItems)) {
            throw new UnprocessableEntityHttpException('Debe agregar al menos un producto valido al credito manual.');
        }

        return $preparedItems;
    }

    public function calculatePreparedItemsTotal(array $preparedItems): float
    {
        return round((float) collect($preparedItems)->sum('sub_total'), 2);
    }

    public function persistManualItems(Credit $credit, array $preparedItems): void
    {
        foreach ($preparedItems as $item) {
            CreditItem::create([
                'credit_id' => $credit->id,
                'sale_item_id' => null,
                'product_id' => $item['product_id'],
                'warehouse_id' => $item['warehouse_id'],
                'quantity' => $item['quantity'],
                'product_price' => $item['product_price'],
                'sub_total' => $item['sub_total'],
                'source' => $item['source'],
            ]);

            /** @var ManageStock $stock */
            $stock = $item['stock'];
            $stock->update([
                'quantity' => round((float) $stock->quantity - (float) $item['quantity'], 2),
            ]);
        }
    }

    public function attachSaleItems(Credit $credit, ?Sale $sale = null): void
    {
        if (! $this->itemTableExists() || $credit->items()->exists()) {
            return;
        }

        $sale = $sale ?: $credit->sale()->with('saleItems')->first();
        if (! $sale) {
            return;
        }

        $sale->loadMissing('saleItems');

        foreach ($sale->saleItems as $saleItem) {
            CreditItem::create([
                'credit_id' => $credit->id,
                'sale_item_id' => $saleItem->id,
                'product_id' => $saleItem->product_id,
                'warehouse_id' => (int) $sale->warehouse_id,
                'quantity' => round((float) $saleItem->quantity, 2),
                'product_price' => round((float) $saleItem->product_price, 2),
                'sub_total' => round((float) $saleItem->sub_total, 2),
                'source' => self::ITEM_SOURCE_SALE,
            ]);
        }
    }

    public function getDetailItems(Credit $credit): array
    {
        if (! $this->itemTableExists()) {
            return $this->fallbackSaleItems($credit);
        }

        $this->ensureSaleCreditItemsBackfilled($credit->id);
        $credit = $credit->fresh(['items.product', 'items.warehouse']);

        if (! $credit || $credit->items->isEmpty()) {
            return [];
        }

        $returnedQtyByItem = $this->returnTableExists()
            ? CreditItemReturn::query()
                ->where('credit_id', $credit->id)
                ->selectRaw('credit_item_id, COALESCE(SUM(quantity), 0) as returned_quantity')
                ->groupBy('credit_item_id')
                ->pluck('returned_quantity', 'credit_item_id')
            : collect();

        return $credit->items->map(function (CreditItem $item) use ($returnedQtyByItem) {
            $returnedQuantity = round((float) ($returnedQtyByItem[$item->id] ?? 0), 2);
            $availableReturnQuantity = round(max((float) $item->quantity - $returnedQuantity, 0), 2);

            return [
                'id' => $item->id,
                'credit_item_id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => optional($item->product)->name,
                'warehouse_id' => $item->warehouse_id,
                'warehouse_name' => optional($item->warehouse)->name,
                'quantity' => (float) $item->quantity,
                'product_price' => (float) $item->product_price,
                'sub_total' => (float) $item->sub_total,
                'returned_quantity' => $returnedQuantity,
                'available_return_quantity' => $availableReturnQuantity,
                'source' => $item->source,
                'source_label' => $item->source === self::ITEM_SOURCE_SALE ? 'Venta a credito' : 'Credito manual',
                'created_at' => optional($item->created_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();
    }

    public function getDetailReturns(Credit $credit): array
    {
        if (! $this->returnTableExists()) {
            return [];
        }

        return CreditItemReturn::query()
            ->with(['product', 'warehouse'])
            ->where('credit_id', $credit->id)
            ->latest('id')
            ->get()
            ->map(function (CreditItemReturn $returnItem) {
                return [
                    'id' => $returnItem->id,
                    'credit_item_id' => $returnItem->credit_item_id,
                    'product_id' => $returnItem->product_id,
                    'product_name' => optional($returnItem->product)->name,
                    'warehouse_id' => $returnItem->warehouse_id,
                    'warehouse_name' => optional($returnItem->warehouse)->name,
                    'quantity' => (float) $returnItem->quantity,
                    'product_price' => (float) $returnItem->product_price,
                    'sub_total' => (float) $returnItem->sub_total,
                    'note' => $returnItem->note,
                    'created_at' => optional($returnItem->created_at)->format('Y-m-d H:i:s'),
                ];
            })
            ->values()
            ->all();
    }

    public function recordReturn(Credit $credit, array $items, ?string $note = null): void
    {
        if (! $this->itemTableExists() || ! $this->returnTableExists()) {
            throw new UnprocessableEntityHttpException('La integracion de devoluciones de creditos requiere ejecutar sus migraciones.');
        }

        $this->ensureSaleCreditItemsBackfilled($credit->id);
        $credit = $credit->fresh(['items']);

        if (! $credit || $credit->items->isEmpty()) {
            throw new UnprocessableEntityHttpException('Este credito no tiene productos registrados para devolucion.');
        }

        $requestedItems = collect($items)->reduce(function (array $carry, array $item) {
            $creditItemId = (int) ($item['credit_item_id'] ?? 0);
            $quantity = round((float) ($item['quantity'] ?? 0), 2);

            if ($creditItemId <= 0 || $quantity <= 0) {
                return $carry;
            }

            $carry[$creditItemId] = round(($carry[$creditItemId] ?? 0) + $quantity, 2);

            return $carry;
        }, []);

        if (empty($requestedItems)) {
            throw new UnprocessableEntityHttpException('Debe indicar al menos una cantidad valida para devolver.');
        }

        $detailItems = collect($this->getDetailItems($credit))->keyBy('credit_item_id');

        foreach ($requestedItems as $creditItemId => $quantity) {
            /** @var CreditItem|null $creditItem */
            $creditItem = $credit->items->firstWhere('id', (int) $creditItemId);
            if (! $creditItem) {
                throw new UnprocessableEntityHttpException('Uno de los productos seleccionados no pertenece a este credito.');
            }

            $availableQuantity = round((float) ($detailItems[$creditItemId]['available_return_quantity'] ?? 0), 2);
            if ($quantity > $availableQuantity) {
                throw new UnprocessableEntityHttpException('La cantidad a devolver no puede ser mayor que la disponible.');
            }

            $stock = ManageStock::query()
                ->where('warehouse_id', $creditItem->warehouse_id)
                ->where('product_id', $creditItem->product_id)
                ->lockForUpdate()
                ->first();

            if ($stock) {
                $stock->update([
                    'quantity' => round((float) $stock->quantity + $quantity, 2),
                ]);
            } else {
                ManageStock::create([
                    'warehouse_id' => $creditItem->warehouse_id,
                    'product_id' => $creditItem->product_id,
                    'quantity' => $quantity,
                ]);
            }

            CreditItemReturn::create([
                'credit_id' => $credit->id,
                'credit_item_id' => $creditItem->id,
                'product_id' => $creditItem->product_id,
                'warehouse_id' => $creditItem->warehouse_id,
                'quantity' => $quantity,
                'product_price' => $creditItem->product_price,
                'sub_total' => round((float) $creditItem->product_price * $quantity, 2),
                'note' => $note,
            ]);
        }
    }

    public function paginateProductMovements(int $productId, array $filters = []): LengthAwarePaginator
    {
        if (! $this->itemTableExists()) {
            return new Paginator([], 0, max((int) ($filters['page_size'] ?? 10), 1), max((int) ($filters['page_number'] ?? 1), 1), [
                'path' => request()->url(),
                'pageName' => 'page[number]',
            ]);
        }

        $this->ensureSaleCreditItemsBackfilled();

        $issuesQuery = DB::table('credit_items')
            ->join('credits', 'credits.id', '=', 'credit_items.credit_id')
            ->join('customers', 'customers.id', '=', 'credits.customer_id')
            ->join('products', 'products.id', '=', 'credit_items.product_id')
            ->leftJoin('warehouses', 'warehouses.id', '=', 'credit_items.warehouse_id')
            ->where('credit_items.product_id', $productId)
            ->selectRaw("CONCAT('credit-', credit_items.id) as row_id")
            ->selectRaw("'".self::MOVEMENT_TYPE_CREDIT."' as movement_type")
            ->selectRaw('credit_items.created_at as movement_at')
            ->selectRaw('DATE(credit_items.created_at) as movement_date')
            ->selectRaw("CONCAT('CRD_', LPAD(credits.id, 4, '0')) as reference_code")
            ->selectRaw('products.name as product_name')
            ->selectRaw('customers.name as customer_name')
            ->selectRaw("COALESCE(warehouses.name, '') as warehouse_name")
            ->selectRaw('credit_items.quantity as quantity')
            ->selectRaw('credit_items.product_price as product_price')
            ->selectRaw('credit_items.sub_total as sub_total');

        $movementQuery = $issuesQuery;

        if ($this->returnTableExists()) {
            $returnsQuery = DB::table('credit_item_returns')
                ->join('credits', 'credits.id', '=', 'credit_item_returns.credit_id')
                ->join('customers', 'customers.id', '=', 'credits.customer_id')
                ->join('products', 'products.id', '=', 'credit_item_returns.product_id')
                ->leftJoin('warehouses', 'warehouses.id', '=', 'credit_item_returns.warehouse_id')
                ->where('credit_item_returns.product_id', $productId)
                ->selectRaw("CONCAT('credit-return-', credit_item_returns.id) as row_id")
                ->selectRaw("'".self::MOVEMENT_TYPE_CREDIT_RETURN."' as movement_type")
                ->selectRaw('credit_item_returns.created_at as movement_at')
                ->selectRaw('DATE(credit_item_returns.created_at) as movement_date')
                ->selectRaw("CONCAT('CRD_', LPAD(credits.id, 4, '0')) as reference_code")
                ->selectRaw('products.name as product_name')
                ->selectRaw('customers.name as customer_name')
                ->selectRaw("COALESCE(warehouses.name, '') as warehouse_name")
                ->selectRaw('credit_item_returns.quantity as quantity')
                ->selectRaw('credit_item_returns.product_price as product_price')
                ->selectRaw('credit_item_returns.sub_total as sub_total');

            $movementQuery = $issuesQuery->unionAll($returnsQuery);
        }

        $query = DB::query()->fromSub($movementQuery, 'credit_inventory_movements');
        $search = trim((string) ($filters['search'] ?? ''));

        if ($search !== '') {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('reference_code', 'like', '%'.$search.'%')
                    ->orWhere('product_name', 'like', '%'.$search.'%')
                    ->orWhere('customer_name', 'like', '%'.$search.'%')
                    ->orWhere('movement_type', 'like', '%'.$search.'%');
            });
        }

        if (! empty($filters['start_date']) && ! empty($filters['end_date'])) {
            $query->whereBetween('movement_date', [$filters['start_date'], $filters['end_date']]);
        }

        $sort = (string) ($filters['sort'] ?? '-movement_at');
        $direction = str_starts_with($sort, '-') ? 'desc' : 'asc';
        $sortField = ltrim($sort, '-');
        $allowedSorts = [
            'movement_at',
            'movement_date',
            'reference_code',
            'product_name',
            'customer_name',
            'warehouse_name',
            'quantity',
            'sub_total',
            'movement_type',
        ];

        if (! in_array($sortField, $allowedSorts, true)) {
            $sortField = 'movement_at';
            $direction = 'desc';
        }

        $pageSize = max((int) ($filters['page_size'] ?? 10), 1);
        $pageNumber = max((int) ($filters['page_number'] ?? 1), 1);

        return $query
            ->orderBy($sortField, $direction)
            ->paginate($pageSize, ['*'], 'page[number]', $pageNumber);
    }

    private function fallbackSaleItems(Credit $credit): array
    {
        $sale = $credit->sale()->with('saleItems.product', 'warehouse')->first();
        if (! $sale) {
            return [];
        }

        return $sale->saleItems->map(function (SaleItem $saleItem) use ($sale) {
            return [
                'id' => $saleItem->id,
                'credit_item_id' => null,
                'product_id' => $saleItem->product_id,
                'product_name' => optional($saleItem->product)->name,
                'warehouse_id' => $sale->warehouse_id,
                'warehouse_name' => optional($sale->warehouse)->name,
                'quantity' => (float) $saleItem->quantity,
                'product_price' => (float) $saleItem->product_price,
                'sub_total' => (float) $saleItem->sub_total,
                'returned_quantity' => 0,
                'available_return_quantity' => 0,
                'source' => self::ITEM_SOURCE_SALE,
                'source_label' => 'Venta a credito',
                'created_at' => optional($saleItem->created_at)->format('Y-m-d H:i:s'),
            ];
        })->values()->all();
    }
}
