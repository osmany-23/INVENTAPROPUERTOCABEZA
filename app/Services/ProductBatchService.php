<?php

namespace App\Services;

use App\Models\ManageStock;
use App\Models\Product;
use App\Models\ProductBatch;
use App\Models\ProductBatchMovement;
use App\Models\ProductBatchSetting;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\PurchaseLot;
use App\Models\Sale;
use App\Models\SaleItemBatch;
use App\Repositories\PurchaseRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class ProductBatchService
{
    private const DEFAULT_ALERT_DAYS = 30;

    public function __construct(private readonly PurchaseRepository $purchaseRepository)
    {
    }

    public function batchTablesExist(): bool
    {
        return Schema::hasTable('product_batch_settings')
            && Schema::hasTable('product_batches')
            && Schema::hasTable('product_batch_movements')
            && Schema::hasTable('sale_item_batches');
    }

    public function purchaseLotTableExists(): bool
    {
        return Schema::hasTable('purchase_lots');
    }

    public function ensureBatchTablesExist(): void
    {
        if (! $this->batchTablesExist()) {
            throw new UnprocessableEntityHttpException(
                'El control por lotes aun no esta disponible. Ejecute las migraciones pendientes.'
            );
        }
    }

    public function getProductBatchDashboard(Product $product): array
    {
        $this->ensureBatchTablesExist();

        $settings = $this->getOrMakeSettings($product);
        $alertDays = $this->resolveAlertDays($settings);
        $totalStock = $this->currentTotalStock((int) $product->id);
        $batchStock = $this->currentTotalBatchStock((int) $product->id);
        $batchRelations = ['warehouse', 'purchase'];
        if ($this->purchaseLotTableExists()) {
            $batchRelations[] = 'purchaseLots';
        }

        $batches = ProductBatch::query()
            ->with($batchRelations)
            ->where('product_id', $product->id)
            ->orderByRaw('CASE WHEN expires_at IS NULL THEN 1 ELSE 0 END')
            ->orderBy('expires_at')
            ->orderBy('received_at')
            ->orderBy('id')
            ->get();

        $transformedBatches = $batches->map(function (ProductBatch $batch) use ($alertDays) {
            return $this->transformBatch($batch, $alertDays);
        })->values()->all();

        $summary = [
            'total_stock' => round($totalStock, 2),
            'batch_stock' => round($batchStock, 2),
            'stock_difference' => round($totalStock - $batchStock, 2),
            'active_batches' => count(array_filter($transformedBatches, function (array $batch) {
                return (float) $batch['available_quantity'] > 0;
            })),
            'expired_batches' => count(array_filter($transformedBatches, function (array $batch) {
                return $batch['status'] === ProductBatch::STATUS_EXPIRED;
            })),
            'expiring_batches' => count(array_filter($transformedBatches, function (array $batch) {
                return $batch['status'] === ProductBatch::STATUS_EXPIRING;
            })),
        ];

        return [
            'product' => $this->transformProduct($product, $summary),
            'settings' => [
                'track_batches' => (bool) $settings->track_batches,
                'alert_days' => $alertDays,
                'deny_expired_sale' => true,
            ],
            'draft' => [
                'next_codigo_lote_sistema' => $this->previewNextSystemLotCode(),
            ],
            'summary' => $summary,
            'batches' => $transformedBatches,
        ];
    }

    public function updateSettings(Product $product, array $data): array
    {
        $this->ensureBatchTablesExist();

        return DB::transaction(function () use ($product, $data) {
            $settings = ProductBatchSetting::query()
                ->lockForUpdate()
                ->firstOrNew(['product_id' => $product->id]);

            $trackBatches = array_key_exists('track_batches', $data)
                ? filter_var($data['track_batches'], FILTER_VALIDATE_BOOLEAN)
                : (bool) $settings->track_batches;
            $alertDays = max((int) ($data['alert_days'] ?? $settings->alert_days ?? self::DEFAULT_ALERT_DAYS), 1);
            $denyExpiredSale = true;

            $totalStock = $this->currentTotalStock((int) $product->id, true);
            $batchStock = $this->currentTotalBatchStock((int) $product->id, true);

            if ($trackBatches && $totalStock > 0 && $batchStock <= 0) {
                throw new UnprocessableEntityHttpException(
                    'No puede activar lotes con stock previo sin migrar. Regularice el inventario y vuelva a intentarlo.'
                );
            }

            if (! $trackBatches && $batchStock > 0) {
                throw new UnprocessableEntityHttpException(
                    'No puede desactivar lotes mientras existan lotes con stock disponible.'
                );
            }

            $settings->fill([
                'track_batches' => $trackBatches,
                'alert_days' => $alertDays,
                'deny_expired_sale' => $denyExpiredSale,
            ]);
            $settings->save();

            return $this->getProductBatchDashboard($product->fresh());
        });
    }

    public function createBatch(Product $product, array $data): array
    {
        $this->ensureBatchTablesExist();

        $warehouseId = (int) ($data['warehouse_id'] ?? 0);
        $supplierId = (int) ($data['purchase_supplier_id'] ?? $data['supplier_id'] ?? 0);
        $quantity = round((float) ($data['quantity'] ?? 0), 2);
        $manufacturerLot = trim((string) ($data['lote_fabricante'] ?? $data['lot_code'] ?? ''));
        $lotBarcode = trim((string) ($data['lot_barcode'] ?? '')) ?: null;
        $receivedAt = ! empty($data['received_at'])
            ? Carbon::parse($data['received_at'])->startOfDay()
            : Carbon::today();
        $manufacturedAt = ! empty($data['fecha_fabricacion'] ?? $data['manufactured_at'] ?? null)
            ? Carbon::parse($data['fecha_fabricacion'] ?? $data['manufactured_at'])->startOfDay()
            : null;
        $expiresAt = ! empty($data['expires_at'])
            ? Carbon::parse($data['expires_at'])->startOfDay()
            : (! empty($data['fecha_vencimiento'])
                ? Carbon::parse($data['fecha_vencimiento'])->startOfDay()
                : null);
        $purchasePrice = array_key_exists('product_cost', $data) && $data['product_cost'] !== null && $data['product_cost'] !== ''
            ? round((float) $data['product_cost'], 2)
            : null;
        $salePrice = array_key_exists('product_price', $data) && $data['product_price'] !== null && $data['product_price'] !== ''
            ? round((float) $data['product_price'], 2)
            : null;
        $batchLocation = isset($data['ubicacion']) ? trim((string) $data['ubicacion']) ?: null : null;
        $batchDescription = isset($data['descripcion'])
            ? trim((string) $data['descripcion']) ?: null
            : (isset($data['note']) ? trim((string) $data['note']) ?: null : null);
        $taxType = $this->normalizeBatchTaxType(
            $data['impuesto_tipo'] ?? $data['tax_type'] ?? $product->tax_type ?? ProductBatch::TAX_TYPE_EXCLUSIVE
        );
        $taxValue = array_key_exists('impuesto_valor', $data) && $data['impuesto_valor'] !== null && $data['impuesto_valor'] !== ''
            ? round((float) $data['impuesto_valor'], 2)
            : (array_key_exists('tax_value', $data) && $data['tax_value'] !== null && $data['tax_value'] !== ''
                ? round((float) $data['tax_value'], 2)
                : round((float) ($product->order_tax ?? 0), 2));
        $purchaseStatus = (int) ($data['purchase_status'] ?? Purchase::RECEIVED);

        if ($warehouseId <= 0) {
            throw new UnprocessableEntityHttpException('Seleccione la bodega para el lote.');
        }

        if ($supplierId <= 0) {
            throw new UnprocessableEntityHttpException('Seleccione el proveedor del lote.');
        }

        if ($manufacturerLot === '') {
            throw new UnprocessableEntityHttpException('Ingrese el lote del fabricante.');
        }

        if ($quantity <= 0) {
            throw new UnprocessableEntityHttpException('La cantidad del lote debe ser mayor a cero.');
        }

        if ($manufacturedAt && $expiresAt && $expiresAt->lt($manufacturedAt)) {
            throw new UnprocessableEntityHttpException(
                'La fecha de vencimiento debe ser igual o posterior a la fecha de fabricacion.'
            );
        }

        if ($expiresAt && $expiresAt->lt($receivedAt)) {
            throw new UnprocessableEntityHttpException(
                'La fecha de vencimiento debe ser igual o posterior a la fecha de compra.'
            );
        }

        if ($batchDescription && mb_strlen($batchDescription) > 1000) {
            throw new UnprocessableEntityHttpException('La descripcion del lote no puede superar los 1000 caracteres.');
        }

        if ($purchasePrice === null) {
            throw new UnprocessableEntityHttpException('Ingrese el precio de compra del lote.');
        }

        if ($purchasePrice <= 0) {
            throw new UnprocessableEntityHttpException('El precio de compra del lote debe ser mayor a cero.');
        }

        if ($salePrice !== null && $salePrice <= 0) {
            throw new UnprocessableEntityHttpException('El precio de venta del lote debe ser mayor a cero.');
        }

        if ($taxValue < 0 || $taxValue > 100) {
            throw new UnprocessableEntityHttpException('El impuesto del lote debe estar entre 0 y 100.');
        }

        return DB::transaction(function () use (
            $product,
            $warehouseId,
            $supplierId,
            $quantity,
            $manufacturerLot,
            $lotBarcode,
            $receivedAt,
            $manufacturedAt,
            $expiresAt,
            $data,
            $purchasePrice,
            $salePrice,
            $batchLocation,
            $batchDescription,
            $taxType,
            $taxValue,
            $purchaseStatus
        ) {
            $settings = ProductBatchSetting::query()
                ->lockForUpdate()
                ->firstOrNew(['product_id' => $product->id]);

            if (! $settings->exists || ! $settings->track_batches) {
                throw new UnprocessableEntityHttpException(
                    'Active el control por lotes antes de registrar existencias por lote.'
                );
            }

            $existingBatch = ProductBatch::query()
                ->where('product_id', $product->id)
                ->where('warehouse_id', $warehouseId)
                ->where(function ($query) use ($manufacturerLot) {
                    $query->where('lote_fabricante', $manufacturerLot)
                        ->orWhere('lot_code', $manufacturerLot);
                })
                ->lockForUpdate()
                ->first();

            if ($existingBatch) {
                throw new UnprocessableEntityHttpException(
                    'Ya existe un lote con ese lote de fabricante para este producto en la bodega seleccionada.'
                );
            }

            if ($lotBarcode) {
                $existingBarcode = ProductBatch::query()
                    ->where('lot_barcode', $lotBarcode)
                    ->lockForUpdate()
                    ->first();

                if ($existingBarcode) {
                    throw new UnprocessableEntityHttpException(
                        'El codigo de barras del lote ya esta en uso.'
                    );
                }
            }

            $batch = ProductBatch::create([
                'product_id' => $product->id,
                'warehouse_id' => $warehouseId,
                'lote_fabricante' => $manufacturerLot,
                'lot_code' => $manufacturerLot,
                'lot_barcode' => $lotBarcode,
                'ubicacion' => $batchLocation,
                'descripcion' => $batchDescription,
                'fecha_fabricacion' => $manufacturedAt?->format('Y-m-d'),
                'fecha_vencimiento' => $expiresAt?->format('Y-m-d'),
                'impuesto_tipo' => $taxType,
                'impuesto_valor' => $taxValue,
                'received_quantity' => $quantity,
                'available_quantity' => $quantity,
                'expires_at' => $expiresAt?->format('Y-m-d'),
                'received_at' => $receivedAt->format('Y-m-d'),
                'status' => $this->determineBatchStatus(
                    $quantity,
                    $expiresAt,
                    $this->resolveAlertDays($settings)
                ),
                'note' => $batchDescription,
                'created_by' => Auth::id(),
                'updated_by' => Auth::id(),
            ]);
            $batch = $batch->fresh();

            $resolvedSalePrice = $salePrice;
            if ($resolvedSalePrice === null && (float) $product->product_price > 0) {
                $resolvedSalePrice = round((float) $product->product_price, 2);
            }

            $purchaseResult = $this->purchaseRepository->storeBatchPurchase($product, [
                'batch_id' => (int) $batch->id,
                'supplier_id' => $supplierId,
                'warehouse_id' => $warehouseId,
                'quantity' => $quantity,
                'product_cost' => $purchasePrice,
                'product_price' => $resolvedSalePrice,
                'impuesto_tipo' => $taxType,
                'impuesto_valor' => $taxValue,
                'date' => $receivedAt->format('Y-m-d'),
                'status' => $purchaseStatus > 0 ? $purchaseStatus : Purchase::RECEIVED,
                'notes' => $this->buildBatchPurchaseNote($product, $batch),
            ]);

            /** @var Purchase $purchase */
            $purchase = $purchaseResult['purchase'];
            $purchaseItem = $purchaseResult['purchase_item'];
            $purchaseLot = $purchaseResult['purchase_lot'] ?? null;

            $batch->update([
                'purchase_id' => (int) $purchase->id,
                'updated_by' => Auth::id(),
            ]);
            $batchRelations = ['warehouse', 'purchase'];
            if ($this->purchaseLotTableExists()) {
                $batchRelations[] = 'purchaseLots';
            }
            $batch = $batch->fresh($batchRelations);

            $this->syncWarehouseStock($warehouseId, (int) $product->id, $quantity);
            $this->recordMovement($batch, 'receive', $quantity, 0, $quantity, $batch->descripcion, array_filter([
                'product_cost' => $purchasePrice,
                'product_price' => $resolvedSalePrice,
                'purchase_supplier_id' => $supplierId,
                'purchase_status' => $purchaseStatus > 0 ? $purchaseStatus : Purchase::RECEIVED,
                'purchase_id' => (int) $purchase->id,
                'purchase_item_id' => (int) $purchaseItem->id,
                'purchase_lot_id' => $purchaseLot?->id ? (int) $purchaseLot->id : null,
                'purchase_reference_code' => $purchase->reference_code,
                'impuesto_tipo' => $taxType,
                'impuesto_valor' => $taxValue,
                'origin_type' => 'LOTE',
                'kardex_type' => 'COMPRA',
                'source' => isset($data['source']) ? (string) $data['source'] : null,
            ], static fn ($value) => $value !== null && $value !== ''), Purchase::class, (int) $purchase->id);

            return $this->getProductBatchDashboard($product->fresh());
        });
    }

    public function createBatchForPurchaseItem(
        Product $product,
        Purchase $purchase,
        PurchaseItem $purchaseItem,
        array $data
    ): ProductBatch {
        $this->ensureBatchTablesExist();

        $warehouseId = (int) ($purchase->warehouse_id ?? 0);
        $supplierId = (int) ($purchase->supplier_id ?? 0);
        $quantity = round((float) ($data['quantity'] ?? $purchaseItem->quantity ?? 0), 2);
        $manufacturerLot = trim((string) ($data['lote_fabricante'] ?? $data['lot_code'] ?? ''));
        $lotBarcode = trim((string) ($data['lot_barcode'] ?? $data['codigo_barra_lote'] ?? '')) ?: null;
        $receivedAt = ! empty($data['received_at'])
            ? Carbon::parse($data['received_at'])->startOfDay()
            : Carbon::parse($purchase->date ?? now())->startOfDay();
        $manufacturedAt = ! empty($data['fecha_fabricacion'] ?? null)
            ? Carbon::parse($data['fecha_fabricacion'])->startOfDay()
            : null;
        $expiresAt = ! empty($data['fecha_vencimiento'] ?? null)
            ? Carbon::parse($data['fecha_vencimiento'])->startOfDay()
            : null;
        $purchasePrice = array_key_exists('product_cost', $data) && $data['product_cost'] !== null && $data['product_cost'] !== ''
            ? round((float) $data['product_cost'], 2)
            : round((float) ($purchaseItem->product_cost ?? 0), 2);
        $salePrice = array_key_exists('product_price', $data) && $data['product_price'] !== null && $data['product_price'] !== ''
            ? round((float) $data['product_price'], 2)
            : null;
        $batchLocation = isset($data['ubicacion']) ? trim((string) $data['ubicacion']) ?: null : null;
        $batchDescription = isset($data['descripcion']) ? trim((string) $data['descripcion']) ?: null : null;
        $taxType = $this->normalizeBatchTaxType(
            $data['impuesto_tipo'] ?? $data['tax_type'] ?? $purchaseItem->tax_type ?? $product->tax_type
        );
        $taxValue = array_key_exists('impuesto_valor', $data) && $data['impuesto_valor'] !== null && $data['impuesto_valor'] !== ''
            ? round((float) $data['impuesto_valor'], 2)
            : round((float) ($purchaseItem->tax_value ?? $product->order_tax ?? 0), 2);

        if ($warehouseId <= 0) {
            throw new UnprocessableEntityHttpException('Seleccione la bodega de la compra para registrar el lote.');
        }

        if ($supplierId <= 0) {
            throw new UnprocessableEntityHttpException('Seleccione el proveedor de la compra para registrar el lote.');
        }

        if ($manufacturerLot === '') {
            throw new UnprocessableEntityHttpException('Ingrese el lote del fabricante.');
        }

        if ($quantity <= 0) {
            throw new UnprocessableEntityHttpException('La cantidad del lote debe ser mayor a cero.');
        }

        if ($purchasePrice <= 0) {
            throw new UnprocessableEntityHttpException('El costo del lote debe ser mayor a cero.');
        }

        if ($salePrice !== null && $salePrice > 0 && $salePrice <= $purchasePrice) {
            throw new UnprocessableEntityHttpException('El precio de venta del lote debe ser mayor al costo.');
        }

        if ($batchDescription && mb_strlen($batchDescription) > 1000) {
            throw new UnprocessableEntityHttpException('La descripcion del lote no puede superar los 1000 caracteres.');
        }

        if ($manufacturedAt && $expiresAt && $expiresAt->lt($manufacturedAt)) {
            throw new UnprocessableEntityHttpException(
                'La fecha de vencimiento debe ser igual o posterior a la fecha de fabricacion.'
            );
        }

        if ($expiresAt && $expiresAt->lt($receivedAt)) {
            throw new UnprocessableEntityHttpException(
                'La fecha de vencimiento debe ser igual o posterior a la fecha de compra.'
            );
        }

        if ($taxValue < 0 || $taxValue > 100) {
            throw new UnprocessableEntityHttpException('El impuesto del lote debe estar entre 0 y 100.');
        }

        $settings = ProductBatchSetting::query()
            ->lockForUpdate()
            ->firstOrNew(['product_id' => $product->id]);

        if (! $settings->exists || ! $settings->track_batches) {
            throw new UnprocessableEntityHttpException(
                'El producto seleccionado no tiene control por lote activo.'
            );
        }

        $existingBatch = ProductBatch::query()
            ->where('product_id', $product->id)
            ->where('warehouse_id', $warehouseId)
            ->where(function ($query) use ($manufacturerLot) {
                $query->where('lote_fabricante', $manufacturerLot)
                    ->orWhere('lot_code', $manufacturerLot);
            })
            ->lockForUpdate()
            ->first();

        if ($existingBatch) {
            throw new UnprocessableEntityHttpException(
                'Ya existe un lote con ese lote de fabricante para este producto en la bodega seleccionada.'
            );
        }

        if ($lotBarcode) {
            $existingBarcode = ProductBatch::query()
                ->where('lot_barcode', $lotBarcode)
                ->lockForUpdate()
                ->first();

            if ($existingBarcode) {
                throw new UnprocessableEntityHttpException('El codigo de barras del lote ya esta en uso.');
            }
        }

        $resolvedSalePrice = $salePrice;
        if ($resolvedSalePrice === null && (float) $product->product_price > 0) {
            $resolvedSalePrice = round((float) $product->product_price, 2);
        }

        $batch = ProductBatch::create([
            'product_id' => $product->id,
            'warehouse_id' => $warehouseId,
            'purchase_id' => (int) $purchase->id,
            'lote_fabricante' => $manufacturerLot,
            'lot_code' => $manufacturerLot,
            'lot_barcode' => $lotBarcode,
            'ubicacion' => $batchLocation,
            'descripcion' => $batchDescription,
            'fecha_fabricacion' => $manufacturedAt?->format('Y-m-d'),
            'fecha_vencimiento' => $expiresAt?->format('Y-m-d'),
            'impuesto_tipo' => $taxType,
            'impuesto_valor' => $taxValue,
            'received_quantity' => $quantity,
            'available_quantity' => $quantity,
            'expires_at' => $expiresAt?->format('Y-m-d'),
            'received_at' => $receivedAt->format('Y-m-d'),
            'status' => $this->determineBatchStatus(
                $quantity,
                $expiresAt,
                $this->resolveAlertDays($settings)
            ),
            'note' => $batchDescription,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $purchaseLot = null;
        if ($this->purchaseLotTableExists()) {
            $purchaseLot = PurchaseLot::query()->updateOrCreate(
                ['lote_id' => (int) $batch->id],
                [
                    'purchase_detail_id' => (int) $purchaseItem->id,
                    'cantidad' => $quantity,
                    'costo_unitario' => $purchasePrice,
                    'precio_venta' => $resolvedSalePrice,
                ]
            );
        }

        $this->syncWarehouseStock($warehouseId, (int) $product->id, $quantity);
        $this->recordMovement(
            $batch,
            'receive',
            $quantity,
            0,
            $quantity,
            $batchDescription ?: 'Ingreso por compra con lote.',
            array_filter([
                'product_cost' => $purchasePrice,
                'product_price' => $resolvedSalePrice,
                'purchase_supplier_id' => $supplierId,
                'purchase_id' => (int) $purchase->id,
                'purchase_item_id' => (int) $purchaseItem->id,
                'purchase_lot_id' => $purchaseLot?->id ? (int) $purchaseLot->id : null,
                'purchase_reference_code' => $purchase->reference_code,
                'impuesto_tipo' => $taxType,
                'impuesto_valor' => $taxValue,
                'origin_type' => 'PURCHASE',
                'kardex_type' => 'COMPRA',
            ], static fn ($value) => $value !== null && $value !== ''),
            Purchase::class,
            (int) $purchase->id
        );

        $batchRelations = ['setting', 'purchase'];
        if ($this->purchaseLotTableExists()) {
            $batchRelations[] = 'purchaseLots';
        }

        return $batch->fresh($batchRelations);
    }

    public function updateBatch(Product $product, ProductBatch $batch, array $data): array
    {
        $this->ensureBatchTablesExist();

        if ((int) $batch->product_id !== (int) $product->id) {
            throw new UnprocessableEntityHttpException('El lote seleccionado no pertenece a este producto.');
        }

        $manufacturerLot = array_key_exists('lote_fabricante', $data)
            ? trim((string) $data['lote_fabricante'])
            : trim((string) ($batch->lote_fabricante ?? $batch->lot_code ?? ''));
        $batchLocation = array_key_exists('ubicacion', $data)
            ? (trim((string) $data['ubicacion']) ?: null)
            : $batch->ubicacion;
        $batchDescription = array_key_exists('descripcion', $data)
            ? (trim((string) $data['descripcion']) ?: null)
            : $batch->descripcion;
        $manufacturedAt = array_key_exists('fecha_fabricacion', $data)
            ? (! empty($data['fecha_fabricacion']) ? Carbon::parse($data['fecha_fabricacion'])->startOfDay() : null)
            : $batch->fecha_fabricacion;
        $expiresAt = array_key_exists('fecha_vencimiento', $data)
            ? (! empty($data['fecha_vencimiento']) ? Carbon::parse($data['fecha_vencimiento'])->startOfDay() : null)
            : $batch->fecha_vencimiento;
        $taxType = array_key_exists('impuesto_tipo', $data)
            ? $this->normalizeBatchTaxType($data['impuesto_tipo'])
            : $this->normalizeBatchTaxType($batch->impuesto_tipo);
        $taxValue = array_key_exists('impuesto_valor', $data) && $data['impuesto_valor'] !== null && $data['impuesto_valor'] !== ''
            ? round((float) $data['impuesto_valor'], 2)
            : round((float) ($batch->impuesto_valor ?? 0), 2);
        $salePrice = array_key_exists('product_price', $data) && $data['product_price'] !== null && $data['product_price'] !== ''
            ? round((float) $data['product_price'], 2)
            : $this->resolveBatchPricing($batch)['product_price'];

        if ($manufacturerLot === '') {
            throw new UnprocessableEntityHttpException('Ingrese el lote del fabricante.');
        }

        if ($batchDescription && mb_strlen($batchDescription) > 1000) {
            throw new UnprocessableEntityHttpException('La descripcion del lote no puede superar los 1000 caracteres.');
        }

        if ($manufacturedAt && $expiresAt && $expiresAt->lt($manufacturedAt)) {
            throw new UnprocessableEntityHttpException(
                'La fecha de vencimiento debe ser igual o posterior a la fecha de fabricacion.'
            );
        }

        if ($salePrice !== null && $salePrice <= 0) {
            throw new UnprocessableEntityHttpException('El precio de venta del lote debe ser mayor a cero.');
        }

        if ($taxValue < 0 || $taxValue > 100) {
            throw new UnprocessableEntityHttpException('El impuesto del lote debe estar entre 0 y 100.');
        }

        return DB::transaction(function () use (
            $product,
            $batch,
            $manufacturerLot,
            $batchLocation,
            $batchDescription,
            $manufacturedAt,
            $expiresAt,
            $taxType,
            $taxValue,
            $salePrice
        ) {
            $batchRelations = ['purchase', 'setting'];
            if ($this->purchaseLotTableExists()) {
                $batchRelations[] = 'purchaseLots';
            }

            $lockedBatch = ProductBatch::query()
                ->with($batchRelations)
                ->lockForUpdate()
                ->findOrFail($batch->id);

            $duplicateBatch = ProductBatch::query()
                ->where('product_id', $product->id)
                ->where('warehouse_id', $lockedBatch->warehouse_id)
                ->where('id', '!=', $lockedBatch->id)
                ->where(function ($query) use ($manufacturerLot) {
                    $query->where('lote_fabricante', $manufacturerLot)
                        ->orWhere('lot_code', $manufacturerLot);
                })
                ->lockForUpdate()
                ->first();

            if ($duplicateBatch) {
                throw new UnprocessableEntityHttpException(
                    'Ya existe un lote con ese lote de fabricante para este producto en la bodega seleccionada.'
                );
            }

            $previousSnapshot = $this->buildBatchMovementSnapshot($lockedBatch);
            $currentQuantity = round((float) $lockedBatch->available_quantity, 2);

            $lockedBatch->update([
                'lote_fabricante' => $manufacturerLot,
                'lot_code' => $manufacturerLot,
                'ubicacion' => $batchLocation,
                'descripcion' => $batchDescription,
                'fecha_fabricacion' => $manufacturedAt?->format('Y-m-d'),
                'fecha_vencimiento' => $expiresAt?->format('Y-m-d'),
                'expires_at' => $expiresAt?->format('Y-m-d'),
                'impuesto_tipo' => $taxType,
                'impuesto_valor' => $taxValue,
                'note' => $batchDescription,
                'status' => $this->determineBatchStatus(
                    $currentQuantity,
                    $expiresAt,
                    $this->resolveAlertDays($lockedBatch->setting)
                ),
                'updated_by' => Auth::id(),
            ]);

            if ($salePrice !== null && $this->purchaseLotTableExists()) {
                $purchaseLot = $lockedBatch->purchaseLots()->lockForUpdate()->latest('id')->first();
                if ($purchaseLot) {
                    $purchaseLot->update([
                        'precio_venta' => $salePrice,
                    ]);
                }
            }

            $lockedBatchRelations = ['purchase', 'warehouse', 'setting'];
            if ($this->purchaseLotTableExists()) {
                $lockedBatchRelations[] = 'purchaseLots';
            }
            $lockedBatch = $lockedBatch->fresh($lockedBatchRelations);

            if ($lockedBatch->purchase) {
                $purchaseNote = $this->buildBatchPurchaseNote($product, $lockedBatch);
                $purchaseUpdatePayload = ['notes' => $purchaseNote];
                if (Schema::hasColumn('purchases', 'tipo_origen') && empty($lockedBatch->purchase->tipo_origen)) {
                    $purchaseUpdatePayload['tipo_origen'] = 'LOTE';
                }
                $lockedBatch->purchase->update($purchaseUpdatePayload);
            }

            $this->recordMovement(
                $lockedBatch,
                'update',
                0,
                $currentQuantity,
                $currentQuantity,
                'Actualizacion de metadatos del lote.',
                [
                    'product_price' => $salePrice,
                    'previous_snapshot' => $previousSnapshot,
                    'updated_fields' => [
                        'lote_fabricante' => $manufacturerLot,
                        'ubicacion' => $batchLocation,
                        'descripcion' => $batchDescription,
                        'fecha_fabricacion' => $manufacturedAt?->format('Y-m-d'),
                        'fecha_vencimiento' => $expiresAt?->format('Y-m-d'),
                        'impuesto_tipo' => $taxType,
                        'impuesto_valor' => $taxValue,
                    ],
                ],
                ProductBatch::class,
                (int) $lockedBatch->id
            );

            return $this->getProductBatchDashboard($product->fresh());
        });
    }

    public function applyBatchStockDelta(
        int $batchId,
        float $delta,
        string $movementType,
        ?string $note = null,
        array $meta = [],
        ?string $referenceType = null,
        ?int $referenceId = null
    ): ProductBatch {
        $this->ensureBatchTablesExist();

        $batch = ProductBatch::query()
            ->with('setting')
            ->lockForUpdate()
            ->find($batchId);

        if (! $batch) {
            throw new UnprocessableEntityHttpException('El lote seleccionado ya no existe.');
        }

        $beforeQuantity = round((float) $batch->available_quantity, 2);
        $afterQuantity = round($beforeQuantity + $delta, 2);

        if ($afterQuantity < 0) {
            throw new UnprocessableEntityHttpException('La operacion provocaria stock negativo por lote.');
        }

        $batch->update([
            'available_quantity' => $afterQuantity,
            'status' => $this->determineBatchStatus(
                $afterQuantity,
                $batch->expires_at,
                $this->resolveAlertDays($batch->setting)
            ),
            'updated_by' => Auth::id(),
        ]);

        $this->recordMovement(
            $batch,
            $movementType,
            abs($delta),
            $beforeQuantity,
            $afterQuantity,
            $note,
            $meta,
            $referenceType,
            $referenceId
        );

        $batchRelations = ['setting', 'purchase'];
        if ($this->purchaseLotTableExists()) {
            $batchRelations[] = 'purchaseLots';
        }

        return $batch->fresh($batchRelations);
    }

    public function consumeSaleItems(Sale $sale, array $saleItems, int $warehouseId): void
    {
        $this->ensureBatchTablesExist();

        $settingsByProduct = ProductBatchSetting::query()
            ->whereIn('product_id', collect($saleItems)->pluck('product_id')->filter()->all())
            ->where('track_batches', true)
            ->get()
            ->keyBy('product_id');

        if ($settingsByProduct->isEmpty()) {
            return;
        }

        foreach ($saleItems as $saleItem) {
            $productId = (int) ($saleItem['product_id'] ?? 0);
            $resolvedWarehouseId = (int) ($saleItem['warehouse_id'] ?? $warehouseId);
            $quantity = round((float) ($saleItem['quantity'] ?? 0), 2);
            $saleItemId = (int) ($saleItem['sale_item_id'] ?? 0);
            $settings = $settingsByProduct->get($productId);

            if (! $settings || $quantity <= 0 || $saleItemId <= 0) {
                continue;
            }

            $specificBatchId = (int) ($saleItem['batch_id'] ?? 0);
            $allocations = $specificBatchId > 0
                ? $this->consumeSpecificBatch(
                    $specificBatchId,
                    $productId,
                    $resolvedWarehouseId,
                    $quantity,
                    $this->resolveAlertDays($settings),
                    true
                )
                : $this->consumeFifoBatches(
                    $productId,
                    $resolvedWarehouseId,
                    $quantity,
                    $this->resolveAlertDays($settings),
                    true
                );

            foreach ($allocations as $allocation) {
                SaleItemBatch::create([
                    'sale_id' => $sale->id,
                    'sale_item_id' => $saleItemId,
                    'product_id' => $productId,
                    'warehouse_id' => $resolvedWarehouseId,
                    'product_batch_id' => $allocation['batch']->id,
                    'codigo_lote_sistema' => $allocation['batch']->codigo_lote_sistema,
                    'lote_fabricante' => $allocation['batch']->lote_fabricante,
                    'lot_code' => $allocation['batch']->lot_code,
                    'lot_barcode' => $allocation['batch']->lot_barcode,
                    'ubicacion' => $allocation['batch']->ubicacion,
                    'quantity' => $allocation['quantity'],
                    'fecha_fabricacion' => optional($allocation['batch']->fecha_fabricacion)->format('Y-m-d'),
                    'fecha_vencimiento' => optional($allocation['batch']->fecha_vencimiento)->format('Y-m-d'),
                    'expires_at' => optional($allocation['batch']->expires_at)->format('Y-m-d'),
                    'impuesto_tipo' => $allocation['batch']->impuesto_tipo,
                    'impuesto_valor' => $allocation['batch']->impuesto_valor,
                ]);
            }
        }
    }

    public function releaseSaleAllocations(Sale $sale): void
    {
        $this->ensureBatchTablesExist();

        $allocations = SaleItemBatch::query()
            ->where('sale_id', $sale->id)
            ->orderBy('id')
            ->get();

        foreach ($allocations as $allocation) {
            $batch = ProductBatch::query()
                ->lockForUpdate()
                ->find($allocation->product_batch_id);

            if (! $batch) {
                continue;
            }

            $beforeQuantity = round((float) $batch->available_quantity, 2);
            $afterQuantity = round($beforeQuantity + (float) $allocation->quantity, 2);

            $batch->update([
                'available_quantity' => $afterQuantity,
                'status' => $this->determineBatchStatus(
                    $afterQuantity,
                    $batch->expires_at,
                    $this->resolveAlertDays($batch->setting)
                ),
                'updated_by' => Auth::id(),
            ]);

            $this->recordMovement(
                $batch,
                'sale_release',
                (float) $allocation->quantity,
                $beforeQuantity,
                $afterQuantity,
                'Liberacion de lote por anulacion o edicion de venta.'
            );
        }

        SaleItemBatch::query()->where('sale_id', $sale->id)->delete();
    }

    public function resolvePosScan(int $warehouseId, string $code): array
    {
        $this->ensureBatchTablesExist();

        $code = trim($code);
        if ($warehouseId <= 0 || $code === '') {
            return ['matched' => 'none'];
        }

        $batch = ProductBatch::query()
            ->with(['product.mainProduct', 'setting'])
            ->where('warehouse_id', $warehouseId)
            ->where('available_quantity', '>', 0)
            ->where(function ($query) use ($code) {
                $query->where('lot_barcode', $code)
                    ->orWhere('lot_code', $code)
                    ->orWhere('lote_fabricante', $code)
                    ->orWhere('codigo_lote_sistema', $code);
            })
            ->orderBy('expires_at')
            ->first();

        if ($batch) {
            $settings = $batch->setting ?: $this->getOrMakeSettings($batch->product);
            $status = $this->determineBatchStatus(
                (float) $batch->available_quantity,
                $batch->expires_at,
                $this->resolveAlertDays($settings)
            );

            if ($status === ProductBatch::STATUS_EXPIRED) {
                throw new UnprocessableEntityHttpException(
                    'El lote escaneado esta vencido y no puede venderse.'
                );
            }

            return [
                'matched' => 'batch',
                'product' => $this->transformPosProduct($batch->product, $warehouseId, $batch),
                'batch' => $this->transformBatch($batch, $this->resolveAlertDays($settings)),
                'warning' => $status === ProductBatch::STATUS_EXPIRING
                    ? 'Lote proximo a vencer. Verifique antes de continuar.'
                    : null,
            ];
        }

        $product = Product::query()
            ->with('mainProduct')
            ->where(function ($query) use ($code) {
                $query->where('code', $code)
                    ->orWhere('product_code', $code);
            })
            ->first();

        if (! $product) {
            return ['matched' => 'none'];
        }

        $stock = ManageStock::query()
            ->where('warehouse_id', $warehouseId)
            ->where('product_id', $product->id)
            ->first();

        if (! $stock || (float) $stock->quantity <= 0) {
            throw new UnprocessableEntityHttpException('Este producto no tiene stock disponible en la bodega seleccionada.');
        }

        $settings = ProductBatchSetting::query()
            ->where('product_id', $product->id)
            ->where('track_batches', true)
            ->first();

        if (! $settings) {
            return [
                'matched' => 'product',
                'product' => $this->transformPosProduct($product, $warehouseId),
                'batch' => null,
                'warning' => null,
            ];
        }

        $fifoBatch = $this->findFirstSellableBatch(
            (int) $product->id,
            $warehouseId,
            $this->resolveAlertDays($settings),
            true
        );

        if (! $fifoBatch) {
            throw new UnprocessableEntityHttpException(
                'Este producto maneja lotes, pero no tiene lotes vendibles disponibles en la bodega seleccionada.'
            );
        }

        $status = $this->determineBatchStatus(
            (float) $fifoBatch->available_quantity,
            $fifoBatch->expires_at,
            $this->resolveAlertDays($settings)
        );

        return [
            'matched' => 'product',
            'product' => $this->transformPosProduct($product, $warehouseId, $fifoBatch),
            'batch' => $this->transformBatch($fifoBatch, $this->resolveAlertDays($settings)),
            'warning' => $status === ProductBatch::STATUS_EXPIRING
                ? 'Se aplico el lote FIFO mas proximo a vencer.'
                : null,
        ];
    }

    public function getAlertSummary(?int $warehouseId = null): array
    {
        $this->ensureBatchTablesExist();

        $today = Carbon::today()->format('Y-m-d');

        $baseQuery = $this->alertBaseQuery($warehouseId);
        $overdueCount = (clone $baseQuery)
            ->whereDate('product_batches.expires_at', '<', $today)
            ->count();
        $upcomingCount = (clone $baseQuery)
            ->whereDate('product_batches.expires_at', '>=', $today)
            ->whereRaw(
                'product_batches.expires_at <= DATE_ADD(?, INTERVAL product_batch_settings.alert_days DAY)',
                [$today]
            )
            ->count();

        return [
            'alert_days' => $this->defaultAlertDays(),
            'overdue_count' => $overdueCount,
            'upcoming_count' => $upcomingCount,
            'total_alerts' => $overdueCount + $upcomingCount,
        ];
    }

    public function getAlertFeed(?int $warehouseId = null, ?int $days = null): array
    {
        return $this->getExpiryReport([
            'warehouse_id' => $warehouseId,
            'status' => 'alerts',
            'limit' => 100,
            ...($days !== null ? ['days' => $days] : []),
        ]);
    }

    public function getExpiryReport(array $filters = []): array
    {
        $this->ensureBatchTablesExist();

        $status = (string) ($filters['status'] ?? 'all');
        $warehouseId = (int) ($filters['warehouse_id'] ?? 0);
        $days = array_key_exists('days', $filters)
            ? max((int) $filters['days'], 1)
            : null;
        $limit = max(min((int) ($filters['limit'] ?? 250), 500), 1);
        $today = Carbon::today();
        $limitDate = $days !== null ? Carbon::today()->addDays($days) : null;

        $query = $this->alertBaseQuery($warehouseId)
            ->select([
                'product_batches.id',
                'product_batches.product_id',
                'product_batches.warehouse_id',
                'product_batches.codigo_lote_sistema',
                'product_batches.lote_fabricante',
                'product_batches.lot_code',
                'product_batches.lot_barcode',
                'product_batches.ubicacion',
                'product_batches.descripcion',
                'product_batches.fecha_fabricacion',
                'product_batches.fecha_vencimiento',
                'product_batches.impuesto_tipo',
                'product_batches.impuesto_valor',
                'product_batches.purchase_id',
                'product_batches.available_quantity',
                'product_batches.expires_at',
                'products.name as product_name',
                'products.code as product_code',
                'warehouses.name as warehouse_name',
                'product_batch_settings.alert_days',
            ]);

        if ($status === 'expired') {
            $query->whereDate('product_batches.expires_at', '<', $today->format('Y-m-d'));
        } elseif ($status === 'today') {
            $query->whereDate('product_batches.expires_at', '=', $today->format('Y-m-d'));
        } elseif ($status === 'upcoming') {
            $effectiveLimitDate = $limitDate ?: Carbon::today()->addDays($this->defaultAlertDays());
            $query->whereDate('product_batches.expires_at', '>=', $today->format('Y-m-d'))
                ->whereDate('product_batches.expires_at', '<=', $effectiveLimitDate->format('Y-m-d'));
        } elseif ($status === 'alerts') {
            $query->where(function ($builder) use ($today, $limitDate) {
                $builder->whereDate('product_batches.expires_at', '<', $today->format('Y-m-d'))
                    ->orWhere(function ($nestedQuery) use ($today, $limitDate) {
                        $nestedQuery
                            ->whereDate('product_batches.expires_at', '>=', $today->format('Y-m-d'));

                        if ($limitDate) {
                            $nestedQuery->whereDate(
                                'product_batches.expires_at',
                                '<=',
                                $limitDate->format('Y-m-d')
                            );
                            return;
                        }

                        $nestedQuery->whereRaw(
                            'product_batches.expires_at <= DATE_ADD(?, INTERVAL product_batch_settings.alert_days DAY)',
                            [$today->format('Y-m-d')]
                        );
                    });
            });
        }

        return $query
            ->orderBy('product_batches.expires_at')
            ->orderBy('products.name')
            ->limit($limit)
            ->get()
            ->map(function ($row) {
                $expiresAt = $row->expires_at ? Carbon::parse($row->expires_at)->startOfDay() : null;
                $rowAlertDays = max((int) ($row->alert_days ?? $this->defaultAlertDays()), 1);
                $computedStatus = $this->determineBatchStatus(
                    (float) $row->available_quantity,
                    $expiresAt,
                    $rowAlertDays
                );

                return [
                    'id' => (int) $row->id,
                    'product_id' => (int) $row->product_id,
                    'warehouse_id' => (int) $row->warehouse_id,
                    'product_name' => $row->product_name,
                    'product_code' => $row->product_code,
                    'warehouse_name' => $row->warehouse_name,
                    'codigo_lote_sistema' => $row->codigo_lote_sistema,
                    'lote_fabricante' => $row->lote_fabricante,
                    'lot_code' => $row->lot_code,
                    'lot_barcode' => $row->lot_barcode,
                    'ubicacion' => $row->ubicacion,
                    'descripcion' => $row->descripcion,
                    'fecha_fabricacion' => $row->fecha_fabricacion,
                    'fecha_vencimiento' => $row->fecha_vencimiento ?: $expiresAt?->format('Y-m-d'),
                    'impuesto_tipo' => $row->impuesto_tipo,
                    'impuesto_valor' => round((float) ($row->impuesto_valor ?? 0), 2),
                    'purchase_id' => $row->purchase_id ? (int) $row->purchase_id : null,
                    'available_quantity' => round((float) $row->available_quantity, 2),
                    'expires_at' => $expiresAt?->format('Y-m-d'),
                    'days_remaining' => $expiresAt ? Carbon::today()->diffInDays($expiresAt, false) : null,
                    'status' => $computedStatus,
                    'status_label' => $this->statusLabel($computedStatus),
                ];
            })
            ->values()
            ->all();
    }

    public function getPosBatchOverviews(array $productIds, ?int $warehouseId = null): array
    {
        $this->ensureBatchTablesExist();

        $normalizedProductIds = array_values(array_unique(array_filter(array_map('intval', $productIds))));
        if (empty($normalizedProductIds)) {
            return [];
        }

        $settingsByProduct = ProductBatchSetting::query()
            ->whereIn('product_id', $normalizedProductIds)
            ->where('track_batches', true)
            ->get()
            ->keyBy('product_id');

        if ($settingsByProduct->isEmpty()) {
            return [];
        }

        $today = Carbon::today();
        $batchesByProduct = ProductBatch::query()
            ->whereIn('product_id', $settingsByProduct->keys()->all())
            ->where('available_quantity', '>', 0)
            ->when($warehouseId, function ($query) use ($warehouseId) {
                $query->where('warehouse_id', $warehouseId);
            })
            ->orderBy('product_id')
            ->orderByRaw('CASE WHEN expires_at IS NULL THEN 1 ELSE 0 END')
            ->orderBy('expires_at')
            ->orderBy('received_at')
            ->orderBy('id')
            ->get()
            ->groupBy('product_id');

        $overviews = [];

        foreach ($settingsByProduct as $productId => $settings) {
            $productBatches = $batchesByProduct->get($productId, collect());
            if ($productBatches->isEmpty()) {
                continue;
            }

            $alertDays = $this->resolveAlertDays($settings);
            $summary = [
                'expired_batches' => 0,
                'expiring_batches' => 0,
                'available_batches' => 0,
                'total_batches' => 0,
            ];
            $nextSellableBatch = null;

            foreach ($productBatches as $batch) {
                $status = $this->determineBatchStatus(
                    round((float) $batch->available_quantity, 2),
                    $batch->expires_at,
                    $alertDays
                );

                $summary['total_batches']++;

                if ($status === ProductBatch::STATUS_EXPIRED) {
                    $summary['expired_batches']++;
                    continue;
                }

                if ($status === ProductBatch::STATUS_EXPIRING) {
                    $summary['expiring_batches']++;
                } else {
                    $summary['available_batches']++;
                }

                if (! $nextSellableBatch) {
                    $nextSellableBatch = $batch;
                }
            }

            $referenceBatch = $nextSellableBatch ?: $productBatches->first();
            if (! $referenceBatch) {
                continue;
            }

            $referenceStatus = $nextSellableBatch
                ? $this->determineBatchStatus(
                    round((float) $nextSellableBatch->available_quantity, 2),
                    $nextSellableBatch->expires_at,
                    $alertDays
                )
                : ProductBatch::STATUS_EXPIRED;

            $overviews[(int) $productId] = [
                'batch_id' => $nextSellableBatch ? (int) $nextSellableBatch->id : null,
                'status' => $referenceStatus,
                'status_label' => $this->statusLabel($referenceStatus),
                'next_codigo_lote_sistema' => $referenceBatch->codigo_lote_sistema,
                'next_lote_fabricante' => $referenceBatch->lote_fabricante,
                'next_lot_code' => $referenceBatch->lot_code,
                'next_lot_barcode' => $referenceBatch->lot_barcode,
                'next_expires_at' => optional($referenceBatch->expires_at)->format('Y-m-d'),
                'next_available_quantity' => round((float) $referenceBatch->available_quantity, 2),
                'days_remaining' => $referenceBatch->expires_at
                    ? $today->diffInDays($referenceBatch->expires_at, false)
                    : null,
                'summary' => $summary,
            ];
        }

        return $overviews;
    }

    public function containsTrackedProducts(array $productIds): bool
    {
        $this->ensureBatchTablesExist();

        $normalizedProductIds = array_values(array_unique(array_map('intval', $productIds)));
        if (empty($normalizedProductIds)) {
            return false;
        }

        return ProductBatchSetting::query()
            ->whereIn('product_id', $normalizedProductIds)
            ->where('track_batches', true)
            ->exists();
    }

    public function assertTrackedProductsNotPresent(array $productIds, string $message): void
    {
        if ($this->containsTrackedProducts($productIds)) {
            throw new UnprocessableEntityHttpException($message);
        }
    }

    public function validateQuotationBatchSelection(
        int $productId,
        int $warehouseId,
        ?int $batchId,
        float $quantity
    ): ?array {
        if (! $this->batchTablesExist()) {
            return null;
        }

        $product = Product::query()->with('batchSetting')->find($productId);
        if (! $product) {
            throw new UnprocessableEntityHttpException('El producto seleccionado no existe.');
        }

        $settings = $this->getOrMakeSettings($product);
        if (! $settings->track_batches) {
            if ($batchId) {
                throw new UnprocessableEntityHttpException(
                    'El producto seleccionado no maneja lotes.'
                );
            }

            return null;
        }

        if ($warehouseId <= 0) {
            throw new UnprocessableEntityHttpException('Seleccione la bodega de la cotizacion.');
        }

        if ($quantity <= 0) {
            throw new UnprocessableEntityHttpException('La cantidad debe ser mayor a cero.');
        }

        if ((int) $batchId <= 0) {
            throw new UnprocessableEntityHttpException('Debe seleccionar un lote.');
        }

        $batchRelations = ['setting', 'purchase'];
        if ($this->purchaseLotTableExists()) {
            $batchRelations[] = 'purchaseLots';
        }

        $batch = ProductBatch::query()
            ->with($batchRelations)
            ->where('id', $batchId)
            ->where('product_id', $productId)
            ->where('warehouse_id', $warehouseId)
            ->lockForUpdate()
            ->first();

        if (! $batch) {
            throw new UnprocessableEntityHttpException(
                'El lote seleccionado no pertenece al producto o bodega seleccionada.'
            );
        }

        $status = $this->determineBatchStatus(
            round((float) $batch->available_quantity, 2),
            $batch->expires_at,
            $this->resolveAlertDays($batch->setting ?: $settings)
        );

        if ($status === ProductBatch::STATUS_EXPIRED) {
            throw new UnprocessableEntityHttpException('Este lote esta vencido.');
        }

        if ((float) $batch->available_quantity < $quantity) {
            throw new UnprocessableEntityHttpException('Stock insuficiente en este lote.');
        }

        return $this->transformBatch(
            $batch,
            $this->resolveAlertDays($batch->setting ?: $settings)
        );
    }

    private function consumeSpecificBatch(
        int $batchId,
        int $productId,
        int $warehouseId,
        float $quantity,
        int $alertDays,
        bool $denyExpiredSale
    ): array {
        $batch = ProductBatch::query()
            ->where('id', $batchId)
            ->where('product_id', $productId)
            ->where('warehouse_id', $warehouseId)
            ->lockForUpdate()
            ->first();

        if (! $batch) {
            throw new UnprocessableEntityHttpException('El lote seleccionado ya no esta disponible para este producto.');
        }

        $status = $this->determineBatchStatus(
            (float) $batch->available_quantity,
            $batch->expires_at,
            $alertDays
        );

        if ($denyExpiredSale && $status === ProductBatch::STATUS_EXPIRED) {
            throw new UnprocessableEntityHttpException('No se puede vender un lote vencido.');
        }

        if ((float) $batch->available_quantity < $quantity) {
            throw new UnprocessableEntityHttpException('La cantidad solicitada excede la disponibilidad del lote escaneado.');
        }

        $beforeQuantity = round((float) $batch->available_quantity, 2);
        $afterQuantity = round($beforeQuantity - $quantity, 2);

        $batch->update([
            'available_quantity' => $afterQuantity,
            'status' => $this->determineBatchStatus($afterQuantity, $batch->expires_at, $alertDays),
            'updated_by' => Auth::id(),
        ]);

        $this->recordMovement($batch, 'sale', $quantity, $beforeQuantity, $afterQuantity, 'Salida por venta POS.');

        return [[
            'batch' => $batch->fresh('setting'),
            'quantity' => $quantity,
        ]];
    }

    private function consumeFifoBatches(
        int $productId,
        int $warehouseId,
        float $quantity,
        int $alertDays,
        bool $denyExpiredSale
    ): array {
        $allocations = [];
        $remainingQuantity = round($quantity, 2);
        $batches = $this->sellableBatchesQuery($productId, $warehouseId, $denyExpiredSale)
            ->lockForUpdate()
            ->get();

        foreach ($batches as $batch) {
            if ($remainingQuantity <= 0) {
                break;
            }

            $beforeQuantity = round((float) $batch->available_quantity, 2);
            if ($beforeQuantity <= 0) {
                continue;
            }

            $consumeQuantity = min($remainingQuantity, $beforeQuantity);
            $afterQuantity = round($beforeQuantity - $consumeQuantity, 2);

            $batch->update([
                'available_quantity' => $afterQuantity,
                'status' => $this->determineBatchStatus($afterQuantity, $batch->expires_at, $alertDays),
                'updated_by' => Auth::id(),
            ]);

            $this->recordMovement($batch, 'sale', $consumeQuantity, $beforeQuantity, $afterQuantity, 'Salida por venta POS.');

            $allocations[] = [
                'batch' => $batch->fresh('setting'),
                'quantity' => $consumeQuantity,
            ];
            $remainingQuantity = round($remainingQuantity - $consumeQuantity, 2);
        }

        if ($remainingQuantity > 0) {
            throw new UnprocessableEntityHttpException(
                'No hay suficiente stock por lote para completar la venta.'
            );
        }

        return $allocations;
    }

    private function sellableBatchesQuery(int $productId, int $warehouseId, bool $denyExpiredSale)
    {
        return ProductBatch::query()
            ->where('product_id', $productId)
            ->where('warehouse_id', $warehouseId)
            ->where('available_quantity', '>', 0)
            ->when($denyExpiredSale, function ($query) {
                $query->where(function ($builder) {
                    $builder->whereNull('expires_at')
                        ->orWhereDate('expires_at', '>=', Carbon::today()->format('Y-m-d'));
                });
            })
            ->orderByRaw('CASE WHEN expires_at IS NULL THEN 1 ELSE 0 END')
            ->orderBy('expires_at')
            ->orderBy('received_at')
            ->orderBy('id');
    }

    private function findFirstSellableBatch(
        int $productId,
        int $warehouseId,
        int $alertDays,
        bool $denyExpiredSale
    ): ?ProductBatch {
        $batch = $this->sellableBatchesQuery($productId, $warehouseId, $denyExpiredSale)->first();
        if (! $batch) {
            return null;
        }

        $computedStatus = $this->determineBatchStatus(
            (float) $batch->available_quantity,
            $batch->expires_at,
            $alertDays
        );

        if ($computedStatus !== $batch->status) {
            $batch->update([
                'status' => $computedStatus,
                'updated_by' => Auth::id(),
            ]);
        }

        return $batch->fresh('setting');
    }

    private function currentTotalStock(int $productId, bool $lockRows = false): float
    {
        $query = ManageStock::query()->where('product_id', $productId);
        if ($lockRows) {
            $query->lockForUpdate();
        }

        return round((float) $query->sum('quantity'), 2);
    }

    private function currentTotalBatchStock(int $productId, bool $lockRows = false): float
    {
        $query = ProductBatch::query()->where('product_id', $productId);
        if ($lockRows) {
            $query->lockForUpdate();
        }

        return round((float) $query->sum('available_quantity'), 2);
    }

    private function syncWarehouseStock(int $warehouseId, int $productId, float $delta): void
    {
        $stock = ManageStock::query()
            ->where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
            ->lockForUpdate()
            ->first();

        if (! $stock) {
            if ($delta < 0) {
                throw new UnprocessableEntityHttpException('No existe stock agregado suficiente para la operacion solicitada.');
            }

            ManageStock::create([
                'warehouse_id' => $warehouseId,
                'product_id' => $productId,
                'quantity' => round($delta, 2),
            ]);

            return;
        }

        $nextQuantity = round((float) $stock->quantity + $delta, 2);
        if ($nextQuantity < 0) {
            throw new UnprocessableEntityHttpException('La operacion provocaria stock negativo.');
        }

        $stock->update(['quantity' => $nextQuantity]);
    }

    private function recordMovement(
        ProductBatch $batch,
        string $movementType,
        float $quantity,
        float $quantityBefore,
        float $quantityAfter,
        ?string $note = null,
        array $meta = [],
        ?string $referenceType = null,
        ?int $referenceId = null
    ): void {
        ProductBatchMovement::create([
            'product_batch_id' => $batch->id,
            'product_id' => $batch->product_id,
            'warehouse_id' => $batch->warehouse_id,
            'movement_type' => $movementType,
            'reference_type' => $referenceType,
            'reference_id' => $referenceId,
            'quantity' => round($quantity, 2),
            'quantity_before' => round($quantityBefore, 2),
            'quantity_after' => round($quantityAfter, 2),
            'note' => $note,
            'meta' => array_filter(
                array_merge($this->buildBatchMovementSnapshot($batch), $meta),
                static fn ($value) => $value !== null && $value !== ''
            ),
            'user_id' => Auth::id(),
        ]);
    }

    private function buildBatchPurchaseNote(Product $product, ProductBatch $batch): string
    {
        $pricing = $this->resolveBatchPricing($batch);
        $lines = [
            '[LOTE] Compra automatica generada al registrar inventario por lote.',
            'Producto: '.$product->name,
            'Lote sistema: '.($batch->codigo_lote_sistema ?: ProductBatch::formatSystemLotCode((int) $batch->id)),
            'Lote fabricante: '.($batch->lote_fabricante ?: $batch->lot_code),
        ];

        if ($batch->lot_barcode) {
            $lines[] = 'Codigo de barras del lote: '.$batch->lot_barcode;
        }

        if ($batch->ubicacion) {
            $lines[] = 'Ubicacion: '.$batch->ubicacion;
        }

        if ($batch->fecha_fabricacion) {
            $lines[] = 'Fecha fabricacion: '.optional($batch->fecha_fabricacion)->format('Y-m-d');
        }

        if ($batch->fecha_vencimiento) {
            $lines[] = 'Fecha vencimiento: '.optional($batch->fecha_vencimiento)->format('Y-m-d');
        }

        $lines[] = 'Impuesto: '.$batch->impuesto_tipo.' '.number_format((float) $batch->impuesto_valor, 2);

        if ($pricing['product_cost'] !== null) {
            $lines[] = 'Costo unitario: '.number_format((float) $pricing['product_cost'], 2);
        }

        if ($pricing['product_price'] !== null) {
            $lines[] = 'Precio venta: '.number_format((float) $pricing['product_price'], 2);
        }

        if ($batch->descripcion) {
            $lines[] = 'Descripcion del lote: '.$batch->descripcion;
        }

        return implode(PHP_EOL, $lines);
    }

    private function determineBatchStatus(float $availableQuantity, ?Carbon $expiresAt, int $alertDays): string
    {
        if ($availableQuantity <= 0) {
            return ProductBatch::STATUS_DEPLETED;
        }

        if (! $expiresAt) {
            return ProductBatch::STATUS_AVAILABLE;
        }

        $today = Carbon::today();
        if ($expiresAt->lt($today)) {
            return ProductBatch::STATUS_EXPIRED;
        }

        if ($expiresAt->lte((clone $today)->addDays($alertDays))) {
            return ProductBatch::STATUS_EXPIRING;
        }

        return ProductBatch::STATUS_AVAILABLE;
    }

    private function transformBatch(ProductBatch $batch, int $alertDays): array
    {
        $batch->loadMissing('warehouse', 'purchase');
        if ($this->purchaseLotTableExists()) {
            $batch->loadMissing('purchaseLots');
        }
        $status = $this->determineBatchStatus(
            round((float) $batch->available_quantity, 2),
            $batch->expires_at,
            $alertDays
        );
        $pricing = $this->resolveBatchPricing($batch);

        if ($batch->status !== $status) {
            $batch->updateQuietly(['status' => $status]);
        }

        return [
            'id' => (int) $batch->id,
            'product_id' => (int) $batch->product_id,
            'warehouse_id' => (int) $batch->warehouse_id,
            'warehouse_name' => optional($batch->warehouse)->name,
            'codigo_lote_sistema' => $batch->codigo_lote_sistema,
            'lote_fabricante' => $batch->lote_fabricante,
            'lot_code' => $batch->lot_code,
            'lot_barcode' => $batch->lot_barcode,
            'ubicacion' => $batch->ubicacion,
            'descripcion' => $batch->descripcion,
            'received_quantity' => round((float) $batch->received_quantity, 2),
            'available_quantity' => round((float) $batch->available_quantity, 2),
            'fecha_fabricacion' => optional($batch->fecha_fabricacion)->format('Y-m-d'),
            'fecha_vencimiento' => optional($batch->fecha_vencimiento)->format('Y-m-d'),
            'expires_at' => optional($batch->expires_at)->format('Y-m-d'),
            'received_at' => optional($batch->received_at)->format('Y-m-d'),
            'status' => $status,
            'status_label' => $this->statusLabel($status),
            'days_remaining' => $batch->expires_at ? Carbon::today()->diffInDays($batch->expires_at, false) : null,
            'note' => $batch->note,
            'impuesto_tipo' => $batch->impuesto_tipo,
            'impuesto_valor' => round((float) ($batch->impuesto_valor ?? 0), 2),
            'purchase_id' => $batch->purchase_id ? (int) $batch->purchase_id : null,
            'purchase_reference_code' => optional($batch->purchase)->reference_code,
            'purchase_lot_id' => $pricing['purchase_lot_id'],
            'product_cost' => $pricing['product_cost'],
            'product_price' => $pricing['product_price'],
        ];
    }

    private function resolveBatchPricing(ProductBatch $batch): array
    {
        if ($this->purchaseLotTableExists()) {
            $purchaseLot = $batch->relationLoaded('purchaseLots')
                ? $batch->purchaseLots->sortByDesc('id')->first()
                : $batch->purchaseLots()->latest('id')->first();

            if ($purchaseLot) {
                return [
                    'purchase_lot_id' => (int) $purchaseLot->id,
                    'product_cost' => round((float) $purchaseLot->costo_unitario, 2),
                    'product_price' => $purchaseLot->precio_venta !== null
                        ? round((float) $purchaseLot->precio_venta, 2)
                        : null,
                ];
            }
        }

        $movements = ProductBatchMovement::query()
            ->where('product_batch_id', $batch->id)
            ->whereIn('movement_type', ['update', 'receive'])
            ->latest('id')
            ->get();

        $productCost = null;
        $productPrice = null;
        foreach ($movements as $movement) {
            $meta = is_array($movement->meta) ? $movement->meta : [];
            if ($productPrice === null && isset($meta['product_price']) && is_numeric($meta['product_price'])) {
                $productPrice = round((float) $meta['product_price'], 2);
            }
            if ($productCost === null && isset($meta['product_cost']) && is_numeric($meta['product_cost'])) {
                $productCost = round((float) $meta['product_cost'], 2);
            }
            if ($productCost !== null && $productPrice !== null) {
                break;
            }
        }

        return [
            'purchase_lot_id' => null,
            'product_cost' => $productCost,
            'product_price' => $productPrice,
        ];
    }

    private function transformProduct(Product $product, array $summary): array
    {
        $product->loadMissing('mainProduct');
        $imageUrls = optional($product->mainProduct)->image_url['imageUrls'] ?? [];
        $unitName = $product->getProductUnitName();
        $normalizedUnitName = is_array($unitName)
            ? ($unitName['name'] ?? reset($unitName) ?? '')
            : (string) $unitName;

        return [
            'id' => (int) $product->id,
            'main_product_id' => (int) $product->main_product_id,
            'name' => $product->name,
            'code' => $product->code,
            'product_code' => $product->product_code,
            'product_price' => (float) $product->product_price,
            'product_cost' => (float) $product->product_cost,
            'stock_alert' => $product->stock_alert,
            'product_unit_name' => $normalizedUnitName,
            'image_url' => $imageUrls[0] ?? null,
            'summary' => $summary,
        ];
    }

    private function transformPosProduct(Product $product, int $warehouseId, ?ProductBatch $batch = null): array
    {
        $product->loadMissing('mainProduct');
        $mainProductImages = optional($product->mainProduct)->image_url['imageUrls'] ?? [];
        $pricing = $batch ? $this->resolveBatchPricing($batch) : [
            'purchase_lot_id' => null,
            'product_cost' => null,
            'product_price' => null,
        ];
        $stockQuantity = $batch
            ? round((float) $batch->available_quantity, 2)
            : round((float) ManageStock::query()
                ->where('warehouse_id', $warehouseId)
                ->where('product_id', $product->id)
                ->value('quantity'), 2);

        $unitName = $product->getProductUnitName();
        $normalizedUnitName = is_array($unitName)
            ? ($unitName['name'] ?? reset($unitName) ?? '')
            : (string) $unitName;

        return [
            'id' => (int) $product->id,
            'attributes' => [
                'name' => $product->name,
                'code' => $product->code,
                'product_code' => $product->product_code,
                'main_product_id' => (int) $product->main_product_id,
                'barcode_url' => Storage::url('product_barcode/barcode-PR_'.$product->id.'.png'),
                'product_cost' => $pricing['product_cost'] !== null ? (float) $pricing['product_cost'] : (float) $product->product_cost,
                'product_price' => $pricing['product_price'] !== null ? (float) $pricing['product_price'] : (float) $product->product_price,
                'product_unit' => $product->product_unit,
                'sale_unit' => $product->sale_unit,
                'stock_alert' => $product->stock_alert,
                'order_tax' => is_null($product->order_tax) ? 0 : (float) $product->order_tax,
                'tax_type' => is_null($product->tax_type) ? 1 : (int) $product->tax_type,
                'product_unit_name' => [
                    'name' => $normalizedUnitName,
                    'short_name' => $normalizedUnitName,
                ],
                'stock' => [
                    'quantity' => $stockQuantity,
                    'warehouse_id' => $warehouseId,
                ],
                'images' => [
                    'imageUrls' => $mainProductImages ? [$mainProductImages[0]] : [],
                ],
                'batch_enabled' => $batch ? true : ProductBatchSetting::query()
                    ->where('product_id', $product->id)
                    ->where('track_batches', true)
                    ->exists(),
                'batch_status' => $batch
                    ? $this->determineBatchStatus(
                        (float) $batch->available_quantity,
                        $batch->expires_at,
                        $this->resolveAlertDays($batch->setting ?: null)
                    )
                    : null,
                'batch_context' => $batch ? [
                    'id' => (int) $batch->id,
                    'codigo_lote_sistema' => $batch->codigo_lote_sistema,
                    'lote_fabricante' => $batch->lote_fabricante,
                    'lot_code' => $batch->lot_code,
                    'lot_barcode' => $batch->lot_barcode,
                    'ubicacion' => $batch->ubicacion,
                    'fecha_fabricacion' => optional($batch->fecha_fabricacion)->format('Y-m-d'),
                    'fecha_vencimiento' => optional($batch->fecha_vencimiento)->format('Y-m-d'),
                    'impuesto_tipo' => $batch->impuesto_tipo,
                    'impuesto_valor' => round((float) ($batch->impuesto_valor ?? 0), 2),
                    'expires_at' => optional($batch->expires_at)->format('Y-m-d'),
                    'available_quantity' => round((float) $batch->available_quantity, 2),
                    'purchase_lot_id' => $pricing['purchase_lot_id'],
                    'product_cost' => $pricing['product_cost'],
                    'product_price' => $pricing['product_price'],
                ] : null,
            ],
        ];
    }

    private function getOrMakeSettings(Product $product): ProductBatchSetting
    {
        return ProductBatchSetting::query()->where('product_id', $product->id)->first()
            ?: new ProductBatchSetting([
                'product_id' => $product->id,
                'track_batches' => false,
                'alert_days' => self::DEFAULT_ALERT_DAYS,
                'deny_expired_sale' => true,
            ]);
    }

    private function resolveAlertDays(?ProductBatchSetting $settings): int
    {
        return max((int) ($settings?->alert_days ?? self::DEFAULT_ALERT_DAYS), 1);
    }

    private function defaultAlertDays(): int
    {
        return self::DEFAULT_ALERT_DAYS;
    }

    private function previewNextSystemLotCode(): string
    {
        $nextId = ((int) ProductBatch::query()->max('id')) + 1;

        return ProductBatch::formatSystemLotCode(max($nextId, 1));
    }

    private function alertBaseQuery(?int $warehouseId = null)
    {
        return DB::table('product_batches')
            ->join('product_batch_settings', 'product_batch_settings.product_id', '=', 'product_batches.product_id')
            ->join('products', 'products.id', '=', 'product_batches.product_id')
            ->join('warehouses', 'warehouses.id', '=', 'product_batches.warehouse_id')
            ->where('product_batch_settings.track_batches', true)
            ->where('product_batches.available_quantity', '>', 0)
            ->where(function ($query) {
                $query->whereNotNull('product_batches.fecha_vencimiento')
                    ->orWhereNotNull('product_batches.expires_at');
            })
            ->when($warehouseId, function ($query) use ($warehouseId) {
                $query->where('product_batches.warehouse_id', $warehouseId);
            });
    }

    private function buildBatchMovementSnapshot(ProductBatch $batch): array
    {
        return [
            'codigo_lote_sistema' => $batch->codigo_lote_sistema,
            'lote_fabricante' => $batch->lote_fabricante ?: $batch->lot_code,
            'lot_code' => $batch->lot_code,
            'lot_barcode' => $batch->lot_barcode,
            'ubicacion' => $batch->ubicacion,
            'descripcion' => $batch->descripcion,
            'fecha_fabricacion' => optional($batch->fecha_fabricacion)->format('Y-m-d'),
            'fecha_vencimiento' => optional($batch->fecha_vencimiento)->format('Y-m-d'),
            'impuesto_tipo' => $batch->impuesto_tipo,
            'impuesto_valor' => round((float) ($batch->impuesto_valor ?? 0), 2),
            'purchase_id' => $batch->purchase_id,
        ];
    }

    private function normalizeBatchTaxType(mixed $value): string
    {
        if ((string) $value === (string) Purchase::INCLUSIVE) {
            return ProductBatch::TAX_TYPE_INCLUSIVE;
        }

        if ((string) $value === (string) Purchase::EXCLUSIVE) {
            return ProductBatch::TAX_TYPE_EXCLUSIVE;
        }

        $normalized = strtoupper(trim((string) $value));

        return $normalized === ProductBatch::TAX_TYPE_INCLUSIVE
            ? ProductBatch::TAX_TYPE_INCLUSIVE
            : ProductBatch::TAX_TYPE_EXCLUSIVE;
    }

    private function statusLabel(string $status): string
    {
        return match ($status) {
            ProductBatch::STATUS_EXPIRED => 'Vencido',
            ProductBatch::STATUS_EXPIRING => 'Por vencer',
            ProductBatch::STATUS_DEPLETED => 'Agotado',
            default => 'Disponible',
        };
    }
}
