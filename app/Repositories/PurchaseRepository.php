<?php

namespace App\Repositories;

use App\Models\ManageStock;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\PurchaseLot;
use App\Services\ProductBatchService;
use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

/**
 * Class PurchaseRepository
 */
class PurchaseRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'date',
        'reference_code',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'paid_amount',
        'payment_type',
        'notes',
        'created_at',
    ];

    /**
     * @var string[]
     */
    protected $allowedFields = [
        'date',
        'tax_rate',
        'tax_amount',
        'discount',
        'shipping',
        'grand_total',
        'received_amount',
        'notes',
    ];

    /**
     * Return searchable fields
     */
    public function getFieldsSearchable(): array
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model(): string
    {
        return Purchase::class;
    }

    public function storePurchase($input)
    {
        try {
            DB::beginTransaction();
            foreach ($input['purchase_items'] as $purchase_items) {
                if ($purchase_items['quantity'] == 0) {
                    throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
                }
            }
            $trackedBatchProductIds = $this->trackedBatchProductIds(
                collect($input['purchase_items'] ?? [])->pluck('product_id')->filter()->all()
            );
            $this->validateTrackedBatchPurchaseItems($input, $trackedBatchProductIds);

            $purchaseInputArray = Arr::only($input, [
                'supplier_id', 'warehouse_id', 'date', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
                'received_amount', 'paid_amount', 'payment_type', 'notes', 'status',
            ]);
            if (Schema::hasColumn('purchases', 'tipo_origen') && array_key_exists('tipo_origen', $input)) {
                $purchaseInputArray['tipo_origen'] = $input['tipo_origen'];
            }

            /** @var Purchase $purchase */
            $purchase = Purchase::create($purchaseInputArray);

            $purchase = $this->storePurchaseItems($purchase, $input, $trackedBatchProductIds);

            // manage stock
            foreach ($input['purchase_items'] as $purchaseItem) {
                if ($this->shouldCreateTrackedBatchPurchaseItem($purchaseItem, $trackedBatchProductIds)) {
                    continue;
                }

                manageStock($input['warehouse_id'], $purchaseItem['product_id'], $purchaseItem['quantity']);
            }

            DB::commit();

            return $purchase;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function calculationPurchaseItems($purchaseItem)
    {
        $validator = Validator::make($purchaseItem, PurchaseItem::$rules);
        if ($validator->fails()) {
            throw new UnprocessableEntityHttpException($validator->errors()->first());
        }

        //discount calculation
        $perItemDiscountAmount = 0;
        $purchaseItem['net_unit_cost'] = $purchaseItem['product_cost'];
        if ($purchaseItem['discount_type'] == Purchase::PERCENTAGE) {
            if ($purchaseItem['discount_value'] <= 100 && $purchaseItem['discount_value'] >= 0) {
                $purchaseItem['discount_amount'] = ($purchaseItem['discount_value'] * $purchaseItem['product_cost'] / 100) * $purchaseItem['quantity'];
                $perItemDiscountAmount = $purchaseItem['discount_amount'] / $purchaseItem['quantity'];
                $purchaseItem['net_unit_cost'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException('Please enter discount value between 0 to 100.');
            }
        } elseif ($purchaseItem['discount_type'] == Purchase::FIXED) {
            if ($purchaseItem['discount_value'] <= $purchaseItem['product_cost'] && $purchaseItem['discount_value'] >= 0) {
                $purchaseItem['discount_amount'] = $purchaseItem['discount_value'] * $purchaseItem['quantity'];
                $perItemDiscountAmount = $purchaseItem['discount_amount'] / $purchaseItem['quantity'];
                $purchaseItem['net_unit_cost'] -= $perItemDiscountAmount;
            } else {
                throw new UnprocessableEntityHttpException("Please enter  discount's value between product's price.");
            }
        }
        //tax calculation
        $perItemTaxAmount = 0;
        if ($purchaseItem['tax_value'] <= 100 && $purchaseItem['tax_value'] >= 0) {
            if ($purchaseItem['tax_type'] == Purchase::EXCLUSIVE) {
                $purchaseItem['tax_amount'] = (($purchaseItem['net_unit_cost'] * $purchaseItem['tax_value']) / 100) * $purchaseItem['quantity'];
                $perItemTaxAmount = $purchaseItem['tax_amount'] / $purchaseItem['quantity'];
            } elseif ($purchaseItem['tax_type'] == Purchase::INCLUSIVE) {
                $purchaseItem['tax_amount'] = ($purchaseItem['net_unit_cost'] * $purchaseItem['tax_value']) / (100 + $purchaseItem['tax_value']) * $purchaseItem['quantity'];
                $perItemTaxAmount = $purchaseItem['tax_amount'] / $purchaseItem['quantity'];
                $purchaseItem['net_unit_cost'] -= $perItemTaxAmount;
            }
        } else {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100 ');
        }
        $purchaseItem['sub_total'] = ($purchaseItem['net_unit_cost'] + $perItemTaxAmount) * $purchaseItem['quantity'];

        return $purchaseItem;
    }

    /**
     * @return mixed
     */
    public function storePurchaseItems($purchase, $input, array $trackedBatchProductIds = [])
    {
        foreach ($input['purchase_items'] as $purchaseItem) {
            $items = $this->calculationPurchaseItems($purchaseItem);
            $purchaseItemModel = new PurchaseItem($items);
            $purchase->purchaseItems()->save($purchaseItemModel);

            if ($this->shouldCreateTrackedBatchPurchaseItem($items, $trackedBatchProductIds)) {
                $this->createTrackedBatchForPurchaseItem($purchase, $purchaseItemModel, $items);
            } else {
                $this->syncPurchaseLotsFromPayload($purchaseItemModel, $items);
            }

            $this->syncProductPricing($items);
        }

        $subTotalAmount = $purchase->purchaseItems()->sum('sub_total');
        if ($input['discount'] <= $subTotalAmount) {
            $input['grand_total'] = $subTotalAmount - $input['discount'];
        } else {
            throw new UnprocessableEntityHttpException('Discount amount should not be greater than total.');
        }
        if ($input['tax_rate'] <= 100 && $input['tax_rate'] >= 0) {
            $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;
        } else {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100.');
        }
        $input['grand_total'] = $input['grand_total'] + $input['tax_amount'];
        if ($input['shipping'] <= $input['grand_total'] && $input['shipping'] >= 0) {
            $input['grand_total'] += $input['shipping'];
        } else {
            throw new UnprocessableEntityHttpException(__('messages.error.shipping_amount_not_be_greater'));
        }

        $input['reference_code'] = getSettingValue('purchase_code').'_111'.$purchase->id;
        $purchase->update($input);

        return $purchase;
    }

    /**
     * @return mixed
     */
    public function updatePurchase($input, $id)
    {
        try {
            DB::beginTransaction();
            foreach ($input['purchase_items'] as $purchase_items) {
                if ($purchase_items['quantity'] == 0) {
                    throw new UnprocessableEntityHttpException('Please Enter Attlist One Quantity.');
                }
            }
            $purchase = Purchase::findOrFail($id);
            $this->guardBatchPurchaseItemsOnUpdate($purchase, $input);
            $purchaseItemIds = PurchaseItem::wherePurchaseId($id)->pluck('id')->toArray();
            $purchaseItmOldIds = [];
            foreach ($input['purchase_items'] as $purchaseItem) {
                $purchaseItemId = $purchaseItem['purchase_item_id'] ?? null;
                //create new product items
                if (empty($purchaseItemId)) {
                    $purchaseItem = $this->calculationPurchaseItems($purchaseItem);
                    $purchaseItemArr = Arr::only($purchaseItem, [
                        'purchase_item_id', 'product_id', 'product_cost', 'net_unit_cost', 'tax_type', 'tax_value',
                        'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'purchase_unit', 'quantity',
                        'sub_total',
                    ]);
                    $purchase->purchaseItems()->create($purchaseItemArr);
                    // manage new product
                    manageStock($input['warehouse_id'], $purchaseItem['product_id'], $purchaseItem['quantity']);
                    $this->syncProductPricing($purchaseItem);
                    continue;
                }

                //get different ids & update
                $purchaseItmOldIds[] = $purchaseItemId;
                $purchaseItemArr = Arr::only($purchaseItem, [
                    'purchase_item_id', 'product_id', 'product_cost', 'net_unit_cost', 'tax_type', 'tax_value',
                    'tax_amount', 'discount_type', 'discount_value', 'discount_amount', 'purchase_unit', 'quantity',
                    'sub_total', 'product_price',
                ]);
                $this->updateItem($purchaseItemArr, $input['warehouse_id']);
            }
            $removeItemIds = array_diff($purchaseItemIds, $purchaseItmOldIds);
            //delete remove product
            if (! empty(array_values($removeItemIds))) {
                foreach ($removeItemIds as $removeItemId) {
                    // remove quantity manage storage
                    $oldProduct = PurchaseItem::whereId($removeItemId)->first();
                    $productQuantity = ManageStock::whereWarehouseId($input['warehouse_id'])->whereProductId($oldProduct->product_id)->first();
                    if ($productQuantity && $oldProduct) {
                        if ($oldProduct->quantity <= $productQuantity->quantity) {
                            $productQuantity->update([
                                'quantity' => $productQuantity->quantity - $oldProduct->quantity,
                            ]);
                        }
                    } else {
                        throw new UnprocessableEntityHttpException('Quantity must be less than Available quantity.');
                    }
                }
                PurchaseItem::whereIn('id', array_values($removeItemIds))->delete();
            }
            $purchase = $this->updatePurchaseCalculation($input, $id);
            DB::commit();

            return $purchase;
        } catch (Exception $e) {
            DB::rollBack();
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    /**
     * @return mixed
     */
    public function updatePurchaseCalculation($input, $id)
    {
        $purchase = Purchase::findOrFail($id);
        $subTotalAmount = $purchase->purchaseItems()->sum('sub_total');

        if ($input['discount'] > $subTotalAmount || $input['discount'] < 0) {
            throw new UnprocessableEntityHttpException('Discount amount should not be greater than total.');
        }
        $input['grand_total'] = $subTotalAmount - $input['discount'];
        if ($input['tax_rate'] > 100 || $input['tax_rate'] < 0) {
            throw new UnprocessableEntityHttpException('Please enter tax value between 0 to 100.');
        }
        $input['tax_amount'] = $input['grand_total'] * $input['tax_rate'] / 100;

        $input['grand_total'] += $input['tax_amount'];

        if ($input['shipping'] > $input['grand_total'] || $input['shipping'] < 0) {
            throw new UnprocessableEntityHttpException(__('messages.error.shipping_amount_not_be_greater'));
        }

        $input['grand_total'] += $input['shipping'];

        $purchaseInputArray = Arr::only($input, [
            'supplier_id', 'warehouse_id', 'date', 'tax_rate', 'tax_amount', 'discount', 'shipping', 'grand_total',
            'received_amount', 'paid_amount', 'payment_type', 'notes', 'status',
        ]);
        if (Schema::hasColumn('purchases', 'tipo_origen') && array_key_exists('tipo_origen', $input)) {
            $purchaseInputArray['tipo_origen'] = $input['tipo_origen'];
        }
        $purchase->update($purchaseInputArray);

        return $purchase;
    }

    public function updateItem($purchaseItem, $warehouseId): bool
    {
        try {
            $purchaseItem = $this->calculationPurchaseItems($purchaseItem);
            $item = PurchaseItem::whereId($purchaseItem['purchase_item_id']);
            // update stock manage
            $product = ManageStock::whereWarehouseId($warehouseId)->whereProductId($purchaseItem['product_id'])->first();
            $oldItem = PurchaseItem::whereId($purchaseItem['purchase_item_id'])->first();
            $totalQuantity = 0;
            if ($product && $oldItem && $oldItem->quantity != $purchaseItem['quantity']) {
                if ($oldItem->quantity > $purchaseItem['quantity']) {
                    $totalQuantity = $product->quantity - ($oldItem->quantity - $purchaseItem['quantity']);
                } elseif ($oldItem->quantity < $purchaseItem['quantity']) {
                    $totalQuantity = $product->quantity + ($purchaseItem['quantity'] - $oldItem->quantity);
                }
                $product->update([
                    'quantity' => $totalQuantity,
                ]);
            }

            $this->syncProductPricing($purchaseItem);
            unset($purchaseItem['purchase_item_id']);
            unset($purchaseItem['product_price']);
            $item->update($purchaseItem);

            return true;
        } catch (Exception $e) {
            throw new UnprocessableEntityHttpException($e->getMessage());
        }
    }

    private function trackedBatchProductIds(array $productIds): array
    {
        if (
            empty($productIds) ||
            ! Schema::hasTable('product_batch_settings') ||
            ! Schema::hasTable('product_batches')
        ) {
            return [];
        }

        return Product::query()
            ->whereIn('id', $productIds)
            ->whereHas('batchSetting', function ($query) {
                $query->where('track_batches', true);
            })
            ->pluck('id')
            ->map(fn ($id) => (int) $id)
            ->all();
    }

    private function extractBatchPayload(array $purchaseItem): ?array
    {
        $batchPayload = $purchaseItem['batch_payload'] ?? null;
        if (is_array($batchPayload)) {
            return array_merge($purchaseItem, $batchPayload);
        }

        if (
            ($purchaseItem['line_type'] ?? null) === 'batch' ||
            ! empty($purchaseItem['is_batch_purchase_line']) ||
            ! empty($purchaseItem['lote_fabricante']) ||
            ! empty($purchaseItem['codigo_barra_lote']) ||
            ! empty($purchaseItem['lot_barcode'])
        ) {
            return $purchaseItem;
        }

        return null;
    }

    private function shouldCreateTrackedBatchPurchaseItem(array $purchaseItem, array $trackedBatchProductIds = []): bool
    {
        $productId = (int) ($purchaseItem['product_id'] ?? 0);
        if ($productId <= 0) {
            return false;
        }

        $trackedIds = ! empty($trackedBatchProductIds)
            ? $trackedBatchProductIds
            : $this->trackedBatchProductIds([$productId]);

        return in_array($productId, $trackedIds, true) && $this->extractBatchPayload($purchaseItem) !== null;
    }

    private function validateTrackedBatchPurchaseItems(array $input, array $trackedBatchProductIds): void
    {
        if (empty($trackedBatchProductIds)) {
            return;
        }

        foreach ($input['purchase_items'] ?? [] as $purchaseItem) {
            $productId = (int) ($purchaseItem['product_id'] ?? 0);
            $batchPayload = $this->extractBatchPayload($purchaseItem);

            if (! in_array($productId, $trackedBatchProductIds, true)) {
                if ($batchPayload !== null) {
                    throw new UnprocessableEntityHttpException(
                        'Solo los productos con control por lote pueden registrar lotes desde compras.'
                    );
                }
                continue;
            }

            if ($batchPayload === null) {
                throw new UnprocessableEntityHttpException(
                    'Complete los datos del lote para los productos con control por lote antes de guardar la compra.'
                );
            }

            $manufacturerLot = trim((string) ($batchPayload['lote_fabricante'] ?? ''));
            if ($manufacturerLot === '') {
                throw new UnprocessableEntityHttpException('Ingrese el lote del fabricante.');
            }

            $quantity = round((float) ($batchPayload['quantity'] ?? $purchaseItem['quantity'] ?? 0), 2);
            if ($quantity <= 0) {
                throw new UnprocessableEntityHttpException('La cantidad del lote debe ser mayor a cero.');
            }

            $productCost = round((float) ($batchPayload['product_cost'] ?? $purchaseItem['product_cost'] ?? 0), 2);
            if ($productCost <= 0) {
                throw new UnprocessableEntityHttpException('El costo del lote debe ser mayor a cero.');
            }
        }
    }

    private function createTrackedBatchForPurchaseItem(Purchase $purchase, PurchaseItem $purchaseItem, array $purchaseItemPayload): void
    {
        $product = Product::query()->find((int) $purchaseItem->product_id);
        if (! $product) {
            throw new UnprocessableEntityHttpException('El producto del lote ya no existe.');
        }

        $batchPayload = $this->extractBatchPayload($purchaseItemPayload);
        if ($batchPayload === null) {
            return;
        }

        app(ProductBatchService::class)->createBatchForPurchaseItem(
            $product,
            $purchase,
            $purchaseItem,
            $batchPayload
        );
    }

    private function guardBatchPurchaseItemsOnUpdate(Purchase $purchase, array $input): void
    {
        $trackedBatchProductIds = $this->trackedBatchProductIds(
            collect($input['purchase_items'] ?? [])->pluck('product_id')->filter()->all()
        );

        foreach ($input['purchase_items'] ?? [] as $purchaseItem) {
            $purchaseItemId = (int) ($purchaseItem['purchase_item_id'] ?? 0);
            $productId = (int) ($purchaseItem['product_id'] ?? 0);
            $batchPayload = $this->extractBatchPayload($purchaseItem);

            if ($purchaseItemId <= 0 && ($batchPayload !== null || in_array($productId, $trackedBatchProductIds, true))) {
                throw new UnprocessableEntityHttpException(
                    'No se pueden agregar nuevos lotes desde la edicion de una compra existente.'
                );
            }
        }

        if (! Schema::hasTable('purchase_lots')) {
            return;
        }

        $existingBatchItems = PurchaseItem::query()
            ->with(['purchaseLots.batch'])
            ->wherePurchaseId($purchase->id)
            ->get()
            ->filter(fn (PurchaseItem $item) => $item->purchaseLots->isNotEmpty())
            ->keyBy('id');

        if ($existingBatchItems->isEmpty()) {
            return;
        }

        $incomingItemIds = [];
        foreach ($input['purchase_items'] ?? [] as $purchaseItem) {
            $purchaseItemId = (int) ($purchaseItem['purchase_item_id'] ?? 0);
            if ($purchaseItemId <= 0) {
                continue;
            }

            $incomingItemIds[] = $purchaseItemId;
            /** @var PurchaseItem|null $existingBatchItem */
            $existingBatchItem = $existingBatchItems->get($purchaseItemId);
            if (! $existingBatchItem) {
                continue;
            }

            $purchaseLot = $existingBatchItem->purchaseLots->sortByDesc('id')->first();
            $storedQuantity = round((float) ($purchaseLot?->cantidad ?? $existingBatchItem->quantity), 2);
            $storedCost = round((float) ($purchaseLot?->costo_unitario ?? $existingBatchItem->product_cost), 2);
            $storedSalePrice = $purchaseLot?->precio_venta !== null
                ? round((float) $purchaseLot->precio_venta, 2)
                : null;

            if (
                (int) ($purchaseItem['product_id'] ?? 0) !== (int) $existingBatchItem->product_id ||
                ! $this->valuesAreEquivalent($purchaseItem['quantity'] ?? 0, $storedQuantity) ||
                ! $this->valuesAreEquivalent($purchaseItem['product_cost'] ?? 0, $storedCost) ||
                ! $this->valuesAreEquivalent($purchaseItem['product_price'] ?? null, $storedSalePrice)
            ) {
                throw new UnprocessableEntityHttpException(
                    'Las lineas por lote ya registradas no pueden editarse desde la compra.'
                );
            }
        }

        $missingBatchItemIds = $existingBatchItems->keys()->diff($incomingItemIds);
        if ($missingBatchItemIds->isNotEmpty()) {
            throw new UnprocessableEntityHttpException(
                'No se pueden eliminar lineas por lote desde la edicion de una compra existente.'
            );
        }
    }

    private function valuesAreEquivalent(mixed $left, mixed $right): bool
    {
        if (($left === null || $left === '') && ($right === null || $right === '')) {
            return true;
        }

        return round((float) $left, 2) === round((float) $right, 2);
    }

    public function storeBatchPurchase(Product $product, array $payload): array
    {
        $supplierId = (int) ($payload['supplier_id'] ?? 0);
        $warehouseId = (int) ($payload['warehouse_id'] ?? 0);
        $quantity = round((float) ($payload['quantity'] ?? 0), 2);
        $productCost = round((float) ($payload['product_cost'] ?? 0), 2);
        $productPrice = array_key_exists('product_price', $payload)
            && $payload['product_price'] !== null
            && $payload['product_price'] !== ''
            ? round((float) $payload['product_price'], 2)
            : null;
        $status = (int) ($payload['status'] ?? Purchase::RECEIVED);
        $taxType = $this->resolveBatchPurchaseTaxType(
            $payload['impuesto_tipo'] ?? $payload['tax_type'] ?? $product->tax_type ?? Purchase::EXCLUSIVE
        );
        $taxValue = round(
            (float) ($payload['impuesto_valor'] ?? $payload['tax_value'] ?? $product->order_tax ?? 0),
            2
        );

        if (! in_array($taxType, [Purchase::EXCLUSIVE, Purchase::INCLUSIVE], true)) {
            $taxType = Purchase::EXCLUSIVE;
        }

        if ($taxValue < 0 || $taxValue > 100) {
            $taxValue = 0;
        }

        $purchasePayload = [
            'supplier_id' => $supplierId,
            'warehouse_id' => $warehouseId,
            'date' => $payload['date'] ?? now()->format('Y-m-d'),
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 0,
            'received_amount' => 0,
            'paid_amount' => 0,
            'payment_type' => 0,
            'notes' => $payload['notes'] ?? null,
            'status' => $status > 0 ? $status : Purchase::RECEIVED,
        ];
        if (Schema::hasColumn('purchases', 'tipo_origen')) {
            $purchasePayload['tipo_origen'] = 'LOTE';
        }

        $purchase = Purchase::create($purchasePayload);

        $purchase = $this->storePurchaseItems($purchase, [
            'purchase_items' => [[
                'product_id' => $product->id,
                'product_cost' => $productCost,
                'product_price' => $productPrice,
                'tax_type' => $taxType,
                'tax_value' => $taxValue,
                'discount_type' => Purchase::FIXED,
                'discount_value' => 0,
                'purchase_unit' => $product->purchase_unit ?: $product->product_unit,
                'quantity' => $quantity,
                'purchase_lots' => (int) ($payload['batch_id'] ?? 0) > 0 ? [[
                    'lote_id' => (int) $payload['batch_id'],
                    'cantidad' => $quantity,
                    'costo_unitario' => $productCost,
                    'precio_venta' => $productPrice,
                ]] : [],
            ]],
            'discount' => 0,
            'tax_rate' => 0,
            'shipping' => 0,
        ]);

        $purchaseItem = $purchase->purchaseItems()->latest('id')->first();
        if (! $purchaseItem) {
            throw new UnprocessableEntityHttpException('No se pudo generar el detalle de compra del lote.');
        }

        $purchaseLot = $purchaseItem->purchaseLots()->latest('id')->first();

        return [
            'purchase' => $purchase->fresh(['purchaseItems', 'supplier', 'warehouse']),
            'purchase_item' => $purchaseItem->fresh(),
            'purchase_lot' => $purchaseLot?->fresh(['batch']),
        ];
    }

    private function resolveBatchPurchaseTaxType(mixed $value): int
    {
        if (in_array((string) $value, [(string) Purchase::EXCLUSIVE, (string) Purchase::INCLUSIVE], true)) {
            return (int) $value;
        }

        $normalized = strtoupper(trim((string) $value));

        return $normalized === 'INCLUSIVO'
            ? Purchase::INCLUSIVE
            : Purchase::EXCLUSIVE;
    }

    private function syncProductPricing(array $purchaseItem): void
    {
        $productId = $purchaseItem['product_id'] ?? null;
        if (empty($productId)) {
            return;
        }

        $product = Product::find($productId);
        if (! $product) {
            return;
        }

        $payload = [];
        $productCost = $purchaseItem['product_cost'] ?? null;
        if (is_numeric($productCost) && $productCost >= 0) {
            $payload['product_cost'] = (float) $productCost;
        }

        $productPrice = $purchaseItem['product_price'] ?? null;
        if (is_numeric($productPrice) && isset($payload['product_cost']) && (float) $productPrice > (float) $payload['product_cost']) {
            $payload['product_price'] = (float) $productPrice;
        }

        $taxType = $purchaseItem['tax_type'] ?? null;
        if ($taxType !== null && in_array((string) $taxType, [(string) Purchase::EXCLUSIVE, (string) Purchase::INCLUSIVE], true)) {
            $payload['tax_type'] = (string) $taxType;
        }

        $taxValue = $purchaseItem['tax_value'] ?? null;
        if (is_numeric($taxValue) && $taxValue >= 0 && $taxValue <= 100) {
            $payload['order_tax'] = (float) $taxValue;
        }

        if (! empty($payload)) {
            $product->update($payload);
        }
    }

    private function syncPurchaseLotsFromPayload(PurchaseItem $purchaseItem, array $purchaseItemPayload): void
    {
        if (! Schema::hasTable('purchase_lots')) {
            return;
        }

        $purchaseLots = $purchaseItemPayload['purchase_lots'] ?? null;
        if (! is_array($purchaseLots) || empty($purchaseLots)) {
            return;
        }

        foreach ($purchaseLots as $lotPayload) {
            $batchId = (int) ($lotPayload['lote_id'] ?? 0);
            $quantity = round((float) ($lotPayload['cantidad'] ?? 0), 2);
            if ($batchId <= 0 || $quantity <= 0) {
                continue;
            }

            PurchaseLot::updateOrCreate(
                ['lote_id' => $batchId],
                [
                    'purchase_detail_id' => (int) $purchaseItem->id,
                    'cantidad' => $quantity,
                    'costo_unitario' => round(
                        (float) ($lotPayload['costo_unitario'] ?? $purchaseItemPayload['product_cost'] ?? 0),
                        2
                    ),
                    'precio_venta' => isset($lotPayload['precio_venta']) && $lotPayload['precio_venta'] !== ''
                        ? round((float) $lotPayload['precio_venta'], 2)
                        : null,
                ]
            );
        }
    }

    private function assertNoTrackedBatchProducts(array $productIds, string $message): void
    {
        if (! app(ProductBatchService::class)->batchTablesExist()) {
            return;
        }

        app(ProductBatchService::class)->assertTrackedProductsNotPresent($productIds, $message);
    }
}
