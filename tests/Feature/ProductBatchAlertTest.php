<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\BaseUnit;
use App\Models\ManageStock;
use App\Models\MainProduct;
use App\Models\Product;
use App\Models\ProductBatch;
use App\Models\ProductBatchSetting;
use App\Models\ProductCategory;
use App\Models\Purchase;
use App\Models\PurchaseItem;
use App\Models\PurchaseLot;
use App\Models\PurchaseReturn;
use App\Models\PurchaseReturnItem;
use App\Models\Supplier;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class ProductBatchAlertTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredSchemaExists()) {
            $this->markTestSkipped('Las tablas necesarias para lotes no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('products.create', 'web');
        Permission::findOrCreate('products.view', 'web');
        Permission::findOrCreate('products.update', 'web');
        Permission::findOrCreate('purchase.create', 'web');
        Permission::findOrCreate('purchase.view', 'web');
        Permission::findOrCreate('pos.view', 'web');

        $suffix = $this->uniqueSuffix();
        $role = Role::create([
            'name' => 'product_batch_alert_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $role->syncPermissions([
            'products.create',
            'products.view',
            'products.update',
            'purchase.create',
            'purchase.view',
            'pos.view',
        ]);

        $this->user = User::create([
            'first_name' => 'Batch',
            'last_name' => 'Tester',
            'email' => 'product_batch_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($role);
    }

    public function test_scan_endpoint_resolves_batch_barcode_before_generic_product_code(): void
    {
        [$warehouse, $product] = $this->createBatchFixture([
            'lot_code' => 'LOT-SCAN-'.$this->uniqueSuffix(),
            'lot_barcode' => 'LBC-'.$this->uniqueSuffix(),
            'alert_days' => 10,
            'expires_at' => now()->addDays(15)->format('Y-m-d'),
        ]);

        $batch = ProductBatch::query()->where('product_id', $product->id)->firstOrFail();

        Sanctum::actingAs($this->user);

        $response = $this->getJson(
            '/api/product-batches/scan?warehouse_id='.$warehouse->id.'&code='.$batch->lot_barcode
        );

        $response->assertOk();
        $response->assertJsonPath('data.matched', 'batch');
        $response->assertJsonPath('data.product.id', $product->id);
        $response->assertJsonPath('data.batch.id', $batch->id);
        $response->assertJsonPath('data.batch.lot_code', $batch->lot_code);
        $response->assertJsonPath('data.product.attributes.batch_context.id', $batch->id);
    }

    public function test_alert_summary_and_feed_respect_each_product_alert_window(): void
    {
        [$warehouseA] = $this->createBatchFixture([
            'lot_code' => 'LOT-ALERT-IN-'.$this->uniqueSuffix(),
            'alert_days' => 5,
            'expires_at' => now()->addDays(4)->format('Y-m-d'),
        ]);

        $includedBatch = ProductBatch::query()
            ->where('warehouse_id', $warehouseA->id)
            ->latest('id')
            ->firstOrFail();

        $this->createBatchFixture([
            'lot_code' => 'LOT-ALERT-OUT-'.$this->uniqueSuffix(),
            'alert_days' => 2,
            'expires_at' => now()->addDays(4)->format('Y-m-d'),
        ]);

        Sanctum::actingAs($this->user);

        $summaryResponse = $this->getJson('/api/product-batches/alerts/summary');
        $summaryResponse->assertOk();
        $summaryResponse->assertJsonPath('data.overdue_count', 0);
        $summaryResponse->assertJsonPath('data.upcoming_count', 1);
        $summaryResponse->assertJsonPath('data.total_alerts', 1);

        $feedResponse = $this->getJson('/api/product-batches/alerts');
        $feedResponse->assertOk();
        $feedResponse->assertJsonCount(1, 'data');
        $feedResponse->assertJsonPath('data.0.id', $includedBatch->id);
        $feedResponse->assertJsonPath('data.0.status', ProductBatch::STATUS_EXPIRING);
    }

    public function test_scan_endpoint_uses_next_sellable_fifo_batch_for_generic_product_code(): void
    {
        [$warehouse, $product] = $this->createBatchFixture([
            'lot_code' => 'LOT-OLD-'.$this->uniqueSuffix(),
            'lot_barcode' => 'OLD-'.$this->uniqueSuffix(),
            'expires_at' => now()->subDay()->format('Y-m-d'),
        ]);

        $nextBatch = ProductBatch::create([
            'product_id' => $product->id,
            'warehouse_id' => $warehouse->id,
            'lot_code' => 'LOT-NEXT-'.$this->uniqueSuffix(),
            'lot_barcode' => 'NEXT-'.$this->uniqueSuffix(),
            'received_quantity' => 6,
            'available_quantity' => 6,
            'expires_at' => now()->addDays(20)->format('Y-m-d'),
            'received_at' => now()->format('Y-m-d'),
            'status' => ProductBatch::STATUS_AVAILABLE,
            'note' => 'Lote FIFO vigente',
        ]);

        ManageStock::query()
            ->where('warehouse_id', $warehouse->id)
            ->where('product_id', $product->id)
            ->update(['quantity' => 18]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson(
            '/api/product-batches/scan?warehouse_id='.$warehouse->id.'&code='.$product->code
        );

        $response->assertOk();
        $response->assertJsonPath('data.matched', 'product');
        $response->assertJsonPath('data.batch.id', $nextBatch->id);
        $response->assertJsonPath('data.batch.lot_code', $nextBatch->lot_code);
        $response->assertJsonPath('data.product.attributes.batch_context.id', $nextBatch->id);
    }

    public function test_scan_endpoint_blocks_expired_batch_barcode_even_if_legacy_flag_is_disabled(): void
    {
        [$warehouse, $product] = $this->createBatchFixture([
            'lot_code' => 'LOT-EXPIRED-'.$this->uniqueSuffix(),
            'lot_barcode' => 'EXP-'.$this->uniqueSuffix(),
            'expires_at' => now()->subDay()->format('Y-m-d'),
        ]);

        ProductBatchSetting::query()
            ->where('product_id', $product->id)
            ->update(['deny_expired_sale' => false]);

        $expiredBatch = ProductBatch::query()
            ->where('product_id', $product->id)
            ->firstOrFail();

        Sanctum::actingAs($this->user);

        $response = $this->getJson(
            '/api/product-batches/scan?warehouse_id='.$warehouse->id.'&code='.$expiredBatch->lot_barcode
        );

        $response->assertStatus(422);
        $response->assertJsonPath(
            'message',
            'El lote escaneado esta vencido y no puede venderse.'
        );
    }

    public function test_main_product_creation_supports_initial_batch_payload(): void
    {
        $suffix = $this->uniqueSuffix();
        $warehouse = Warehouse::create([
            'name' => 'Bodega Alta '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_create_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);
        $category = ProductCategory::create([
            'name' => 'Categoria Alta '.$suffix,
        ]);
        $brand = Brand::create([
            'name' => 'Marca Alta '.$suffix,
        ]);
        $supplier = Supplier::create([
            'name' => 'Proveedor '.$suffix,
            'email' => 'supplier_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Zona central',
        ]);
        $baseUnit = BaseUnit::create([
            'name' => 'Unidad '.$suffix,
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/main-products', [
            'name' => 'Producto Farmacia '.$suffix,
            'product_code' => 'PBM-'.$suffix,
            'code' => 'PBM-'.$suffix,
            'product_type' => MainProduct::BATCH_PRODUCT,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'barcode_symbol' => Product::CODE128,
            'product_unit' => (string) $baseUnit->id,
            'sale_unit' => (string) $baseUnit->id,
            'purchase_unit' => (string) $baseUnit->id,
            'purchase_supplier_id' => $supplier->id,
            'purchase_warehouse_id' => $warehouse->id,
            'purchase_status' => 1,
            'batch_data' => [
                [
                    'lote_fabricante' => 'FAB-LOTE-001',
                    'lot_barcode' => 'BATCH-'.$suffix.'-1',
                    'ubicacion' => 'Pasillo A',
                    'descripcion' => 'Lote inicial controlado',
                    'quantity' => 8,
                    'product_cost' => 12.5,
                    'product_price' => 18.75,
                    'fecha_fabricacion' => now()->subDays(10)->format('Y-m-d'),
                    'fecha_vencimiento' => now()->addDays(120)->format('Y-m-d'),
                    'impuesto_tipo' => 'EXCLUSIVO',
                    'impuesto_valor' => 15,
                ],
                [
                    'lote_fabricante' => 'FAB-LOTE-002',
                    'lot_barcode' => 'BATCH-'.$suffix.'-2',
                    'ubicacion' => 'Pasillo B',
                    'descripcion' => 'Lote secundario controlado',
                    'quantity' => 5,
                    'product_cost' => 13.1,
                    'product_price' => 19.2,
                    'fecha_fabricacion' => now()->subDays(5)->format('Y-m-d'),
                    'fecha_vencimiento' => now()->addDays(180)->format('Y-m-d'),
                    'impuesto_tipo' => 'INCLUSIVO',
                    'impuesto_valor' => 18,
                ],
            ],
        ]);

        $response->assertOk();

        $mainProduct = MainProduct::query()
            ->where('code', 'PBM-'.$suffix)
            ->firstOrFail();
        $product = Product::query()
            ->where('main_product_id', $mainProduct->id)
            ->firstOrFail();

        $this->assertSame(MainProduct::BATCH_PRODUCT, (int) $mainProduct->product_type);
        $this->assertTrue(
            ProductBatchSetting::query()
                ->where('product_id', $product->id)
                ->value('track_batches')
        );
        $this->assertSame(
            2,
            ProductBatch::query()->where('product_id', $product->id)->count()
        );
        $this->assertSame(
            13.0,
            (float) ManageStock::query()
                ->where('warehouse_id', $warehouse->id)
                ->where('product_id', $product->id)
                ->value('quantity')
        );
        $purchaseIds = Purchase::query()
            ->where('supplier_id', $supplier->id)
            ->pluck('id')
            ->all();
        $this->assertCount(2, $purchaseIds);
        $this->assertSame(2, PurchaseItem::query()->whereIn('purchase_id', $purchaseIds)->count());
        $this->assertSame(2, PurchaseLot::query()->whereIn('lote_id', ProductBatch::query()->where('product_id', $product->id)->pluck('id'))->count());
        $firstMovement = ProductBatch::query()
            ->where('product_id', $product->id)
            ->where('lote_fabricante', 'FAB-LOTE-001')
            ->firstOrFail()
            ->movements()
            ->where('movement_type', 'receive')
            ->latest('id')
            ->firstOrFail();
        $firstBatch = ProductBatch::query()
            ->where('product_id', $product->id)
            ->where('lote_fabricante', 'FAB-LOTE-001')
            ->firstOrFail();

        $this->assertSame(12.5, (float) ($firstMovement->meta['product_cost'] ?? 0));
        $this->assertSame(18.75, (float) ($firstMovement->meta['product_price'] ?? 0));
        $this->assertMatchesRegularExpression('/^LOTE-\d{3,}$/', (string) $firstBatch->codigo_lote_sistema);
        $this->assertSame('FAB-LOTE-001', $firstBatch->lote_fabricante);
        $this->assertSame('Pasillo A', $firstBatch->ubicacion);
        $this->assertSame('EXCLUSIVO', $firstBatch->impuesto_tipo);
        $this->assertSame(15.0, (float) $firstBatch->impuesto_valor);
        $this->assertNotNull($firstBatch->purchase_id);
        $this->assertSame('LOTE', Purchase::query()->findOrFail($firstBatch->purchase_id)->tipo_origen);
        $this->assertSame('LOTE', $firstMovement->meta['origin_type'] ?? null);
        $this->assertNotNull($firstMovement->reference_id);
        $this->assertSame(Purchase::class, $firstMovement->reference_type);
        $this->assertStringContainsString(
            '[LOTE] Compra automatica generada al registrar inventario por lote.',
            (string) Purchase::query()->findOrFail($firstMovement->reference_id)->notes
        );
    }

    public function test_batch_creation_endpoint_generates_purchase_and_links_it_to_the_batch_movement(): void
    {
        $suffix = $this->uniqueSuffix();

        $warehouse = Warehouse::create([
            'name' => 'Bodega Compra '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_purchase_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Compra '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Compra '.$suffix,
        ]);

        $supplier = Supplier::create([
            'name' => 'Proveedor Compra '.$suffix,
            'email' => 'supplier_purchase_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Zona compra',
        ]);

        $product = Product::create([
            'name' => 'Producto Compra '.$suffix,
            'code' => 'PC-'.$suffix,
            'product_code' => 'PCB-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 8,
            'product_price' => 12,
            'product_unit' => '1',
            'sale_unit' => null,
            'purchase_unit' => '1',
            'stock_alert' => '0',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        ProductBatchSetting::create([
            'product_id' => $product->id,
            'track_batches' => true,
            'alert_days' => 5,
            'deny_expired_sale' => true,
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/products/'.$product->id.'/batches', [
            'warehouse_id' => $warehouse->id,
            'purchase_supplier_id' => $supplier->id,
            'lote_fabricante' => 'LOT-COMPRA-'.$suffix,
            'lot_barcode' => 'LOTBAR-'.$suffix,
            'ubicacion' => 'Zona fria',
            'quantity' => 10,
            'product_cost' => 12.5,
            'fecha_fabricacion' => now()->subDays(7)->format('Y-m-d'),
            'received_at' => now()->format('Y-m-d'),
            'fecha_vencimiento' => now()->addDays(90)->format('Y-m-d'),
            'descripcion' => 'Ingreso automatico por lote',
            'impuesto_tipo' => 'INCLUSIVO',
            'impuesto_valor' => 18,
        ]);

        $response->assertOk();

        $purchase = Purchase::query()
            ->where('supplier_id', $supplier->id)
            ->latest('id')
            ->firstOrFail();
        $purchaseItem = PurchaseItem::query()
            ->where('product_id', $product->id)
            ->latest('id')
            ->firstOrFail();
        $batch = ProductBatch::query()->where('product_id', $product->id)->firstOrFail();
        $purchaseLot = PurchaseLot::query()
            ->where('lote_id', $batch->id)
            ->latest('id')
            ->first();
        $movement = $batch->movements()->where('movement_type', 'receive')->latest('id')->firstOrFail();

        $this->assertSame($supplier->id, (int) $purchase->supplier_id);
        $this->assertSame($warehouse->id, (int) $purchase->warehouse_id);
        $this->assertMatchesRegularExpression('/^LOTE-\d{3,}$/', (string) $batch->codigo_lote_sistema);
        $this->assertSame('LOT-COMPRA-'.$suffix, $batch->lote_fabricante);
        $this->assertSame('Zona fria', $batch->ubicacion);
        $this->assertSame('INCLUSIVO', $batch->impuesto_tipo);
        $this->assertSame(18.0, (float) $batch->impuesto_valor);
        $this->assertSame($purchase->id, (int) $batch->purchase_id);
        $this->assertSame('LOTE', $purchase->tipo_origen);
        $this->assertSame(10.0, (float) $purchaseItem->quantity);
        $this->assertSame(12.5, (float) $purchaseItem->product_cost);
        $this->assertNotNull($purchaseLot);
        $this->assertSame((int) $purchaseItem->id, (int) $purchaseLot->purchase_detail_id);
        $this->assertSame((int) $batch->id, (int) $purchaseLot->lote_id);
        $this->assertSame(10.0, (float) $purchaseLot->cantidad);
        $this->assertSame(12.5, (float) $purchaseLot->costo_unitario);
        $this->assertSame(125.0, (float) $purchase->grand_total);
        $this->assertSame(
            10.0,
            (float) ManageStock::query()
                ->where('warehouse_id', $warehouse->id)
                ->where('product_id', $product->id)
                ->value('quantity')
        );
        $this->assertSame(Purchase::class, $movement->reference_type);
        $this->assertSame($purchase->id, (int) $movement->reference_id);
        $this->assertSame($purchase->id, (int) ($movement->meta['purchase_id'] ?? 0));
        $this->assertSame($purchaseItem->id, (int) ($movement->meta['purchase_item_id'] ?? 0));
        $this->assertSame('LOTE', $movement->meta['origin_type'] ?? null);
        $this->assertSame('COMPRA', $movement->meta['kardex_type'] ?? null);
        $this->assertStringContainsString('[LOTE]', (string) $purchase->notes);
    }

    public function test_purchase_creation_supports_normal_and_batch_products_in_the_same_purchase(): void
    {
        $suffix = $this->uniqueSuffix();

        $warehouse = Warehouse::create([
            'name' => 'Bodega Mixta '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_mixed_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Mixta '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Mixta '.$suffix,
        ]);

        $supplier = Supplier::create([
            'name' => 'Proveedor Mixto '.$suffix,
            'email' => 'supplier_mixed_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Centro',
        ]);

        $normalProduct = Product::create([
            'name' => 'Producto Normal '.$suffix,
            'code' => 'PN-'.$suffix,
            'product_code' => 'PNC-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 5,
            'product_price' => 8,
            'product_unit' => '1',
            'sale_unit' => null,
            'purchase_unit' => '1',
            'stock_alert' => '0',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        $batchProduct = Product::create([
            'name' => 'Producto Lote Compra '.$suffix,
            'code' => 'PL-'.$suffix,
            'product_code' => 'PLC-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 10,
            'product_price' => 15,
            'product_unit' => '1',
            'sale_unit' => null,
            'purchase_unit' => '1',
            'stock_alert' => '0',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        ProductBatchSetting::create([
            'product_id' => $batchProduct->id,
            'track_batches' => true,
            'alert_days' => 10,
            'deny_expired_sale' => true,
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/purchases', [
            'supplier_id' => $supplier->id,
            'warehouse_id' => $warehouse->id,
            'date' => now()->format('Y-m-d'),
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 0,
            'received_amount' => 0,
            'paid_amount' => 0,
            'payment_type' => 0,
            'notes' => 'Compra mixta',
            'status' => 1,
            'purchase_items' => [
                [
                    'product_id' => $normalProduct->id,
                    'product_cost' => 5,
                    'product_price' => 8,
                    'tax_type' => 1,
                    'tax_value' => 0,
                    'discount_type' => 2,
                    'discount_value' => 0,
                    'purchase_unit' => 1,
                    'quantity' => 4,
                ],
                [
                    'product_id' => $batchProduct->id,
                    'product_cost' => 10,
                    'product_price' => 15,
                    'tax_type' => 1,
                    'tax_value' => 0,
                    'discount_type' => 2,
                    'discount_value' => 0,
                    'purchase_unit' => 1,
                    'quantity' => 6,
                    'line_type' => 'batch',
                    'batch_payload' => [
                        'lote_fabricante' => 'COMPRA-MIXTA-'.$suffix,
                        'codigo_barra_lote' => 'MIXBAR-'.$suffix,
                        'lot_barcode' => 'MIXBAR-'.$suffix,
                        'quantity' => 6,
                        'product_cost' => 10,
                        'product_price' => 15,
                        'fecha_fabricacion' => now()->subDays(5)->format('Y-m-d'),
                        'fecha_vencimiento' => now()->addDays(120)->format('Y-m-d'),
                        'ubicacion' => 'Pasillo Mixto',
                        'descripcion' => 'Lote creado desde compra',
                        'impuesto_tipo' => 'EXCLUSIVO',
                        'impuesto_valor' => 0,
                    ],
                ],
            ],
        ]);

        $response->assertCreated();

        $purchase = Purchase::query()->latest('id')->firstOrFail();
        $batch = ProductBatch::query()->where('product_id', $batchProduct->id)->firstOrFail();
        $batchPurchaseItem = PurchaseItem::query()
            ->where('purchase_id', $purchase->id)
            ->where('product_id', $batchProduct->id)
            ->firstOrFail();
        $normalPurchaseItem = PurchaseItem::query()
            ->where('purchase_id', $purchase->id)
            ->where('product_id', $normalProduct->id)
            ->firstOrFail();
        $purchaseLot = PurchaseLot::query()->where('lote_id', $batch->id)->firstOrFail();
        $movement = $batch->movements()->where('movement_type', 'receive')->latest('id')->firstOrFail();

        $this->assertSame($supplier->id, (int) $purchase->supplier_id);
        $this->assertSame(2, $purchase->purchaseItems()->count());
        $this->assertSame(4.0, (float) $normalPurchaseItem->quantity);
        $this->assertSame(6.0, (float) $batchPurchaseItem->quantity);
        $this->assertSame($purchase->id, (int) $batch->purchase_id);
        $this->assertSame('COMPRA-MIXTA-'.$suffix, $batch->lote_fabricante);
        $this->assertSame('Pasillo Mixto', $batch->ubicacion);
        $this->assertSame((int) $batchPurchaseItem->id, (int) $purchaseLot->purchase_detail_id);
        $this->assertSame(6.0, (float) $purchaseLot->cantidad);
        $this->assertSame(10.0, (float) $purchaseLot->costo_unitario);
        $this->assertSame(15.0, (float) $purchaseLot->precio_venta);
        $this->assertSame(
            4.0,
            (float) ManageStock::query()
                ->where('warehouse_id', $warehouse->id)
                ->where('product_id', $normalProduct->id)
                ->value('quantity')
        );
        $this->assertSame(
            6.0,
            (float) ManageStock::query()
                ->where('warehouse_id', $warehouse->id)
                ->where('product_id', $batchProduct->id)
                ->value('quantity')
        );
        $this->assertSame('PURCHASE', $movement->meta['origin_type'] ?? null);
        $this->assertSame('COMPRA', $movement->meta['kardex_type'] ?? null);
        $this->assertSame($purchase->id, (int) ($movement->meta['purchase_id'] ?? 0));
        $this->assertSame($batchPurchaseItem->id, (int) ($movement->meta['purchase_item_id'] ?? 0));
        $this->assertSame($purchaseLot->id, (int) ($movement->meta['purchase_lot_id'] ?? 0));
        $this->assertNull($purchase->tipo_origen);
        $this->assertSame(80.0, (float) $purchase->grand_total);
    }

    public function test_purchase_return_can_be_registered_against_a_specific_purchase_lot(): void
    {
        $suffix = $this->uniqueSuffix();

        $warehouse = Warehouse::create([
            'name' => 'Bodega Return '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_return_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Return '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Return '.$suffix,
        ]);

        $supplier = Supplier::create([
            'name' => 'Proveedor Return '.$suffix,
            'email' => 'supplier_return_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Zona return',
        ]);

        $product = Product::create([
            'name' => 'Producto Return '.$suffix,
            'code' => 'PR-'.$suffix,
            'product_code' => 'PRB-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 10,
            'product_price' => 16,
            'product_unit' => '1',
            'sale_unit' => null,
            'purchase_unit' => '1',
            'stock_alert' => '0',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        ProductBatchSetting::create([
            'product_id' => $product->id,
            'track_batches' => true,
            'alert_days' => 5,
            'deny_expired_sale' => true,
        ]);

        Sanctum::actingAs($this->user);

        $createBatchResponse = $this->postJson('/api/products/'.$product->id.'/batches', [
            'warehouse_id' => $warehouse->id,
            'purchase_supplier_id' => $supplier->id,
            'lote_fabricante' => 'LOT-RETURN-'.$suffix,
            'lot_barcode' => 'LOTRET-'.$suffix,
            'ubicacion' => 'Estante R1',
            'quantity' => 10,
            'product_cost' => 11.25,
            'product_price' => 16.9,
            'fecha_fabricacion' => now()->subDays(7)->format('Y-m-d'),
            'received_at' => now()->format('Y-m-d'),
            'fecha_vencimiento' => now()->addDays(90)->format('Y-m-d'),
            'descripcion' => 'Lote para probar devoluciones',
            'impuesto_tipo' => 'EXCLUSIVO',
            'impuesto_valor' => 15,
        ]);
        $createBatchResponse->assertOk();

        $batch = ProductBatch::query()->where('product_id', $product->id)->firstOrFail();
        $purchase = Purchase::query()->where('supplier_id', $supplier->id)->latest('id')->firstOrFail();
        $purchaseItem = PurchaseItem::query()->where('purchase_id', $purchase->id)->firstOrFail();
        $purchaseLot = PurchaseLot::query()->where('lote_id', $batch->id)->firstOrFail();

        $response = $this->postJson('/api/purchases-return', [
            'supplier_id' => $supplier->id,
            'warehouse_id' => $warehouse->id,
            'purchase_id' => $purchase->id,
            'date' => now()->format('Y-m-d'),
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 0,
            'received_amount' => 0,
            'paid_amount' => 0,
            'payment_type' => 0,
            'notes' => 'Devolucion parcial por lote',
            'status' => 1,
            'payment_status' => 2,
            'purchase_return_items' => [[
                'product_id' => $product->id,
                'purchase_lot_id' => $purchaseLot->id,
                'product_batch_id' => $batch->id,
                'product_cost' => $purchaseLot->costo_unitario,
                'tax_type' => 1,
                'tax_value' => 0,
                'discount_type' => 2,
                'discount_value' => 0,
                'purchase_unit' => (int) $purchaseItem->getRawOriginal('purchase_unit'),
                'quantity' => 4,
            ]],
        ]);

        $response->assertCreated();

        $purchaseReturnItem = PurchaseReturnItem::query()
            ->where('purchase_lot_id', $purchaseLot->id)
            ->latest('id')
            ->firstOrFail();

        $batch = $batch->fresh();
        $movement = $batch->movements()->where('movement_type', 'purchase_return')->latest('id')->firstOrFail();

        $this->assertSame((int) $batch->id, (int) $purchaseReturnItem->product_batch_id);
        $this->assertSame((int) $purchaseLot->id, (int) $purchaseReturnItem->purchase_lot_id);
        $this->assertSame(6.0, (float) $batch->available_quantity);
        $this->assertSame(
            6.0,
            (float) ManageStock::query()
                ->where('warehouse_id', $warehouse->id)
                ->where('product_id', $product->id)
                ->value('quantity')
        );
        $this->assertSame(PurchaseReturn::class, $movement->reference_type);
        $this->assertNotNull($movement->reference_id);
        $this->assertSame('DEVOLUCION_COMPRA', $movement->meta['kardex_type'] ?? null);
        $this->assertSame((int) $purchaseLot->id, (int) ($movement->meta['purchase_lot_id'] ?? 0));
    }

    private function createBatchFixture(array $overrides = []): array
    {
        $suffix = $this->uniqueSuffix();

        $warehouse = Warehouse::create([
            'name' => 'Bodega Lote '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_batch_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Lote '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Lote '.$suffix,
        ]);

        $product = Product::create([
            'name' => 'Producto Lote '.$suffix,
            'code' => 'PL-'.$suffix,
            'product_code' => 'PBL-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 10,
            'product_price' => 15,
            'product_unit' => '1',
            'sale_unit' => null,
            'purchase_unit' => null,
            'stock_alert' => '0',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        ManageStock::create([
            'warehouse_id' => $warehouse->id,
            'product_id' => $product->id,
            'quantity' => 12,
        ]);

        ProductBatchSetting::create([
            'product_id' => $product->id,
            'track_batches' => true,
            'alert_days' => (int) ($overrides['alert_days'] ?? 3),
            'deny_expired_sale' => true,
        ]);

        ProductBatch::create([
            'product_id' => $product->id,
            'warehouse_id' => $warehouse->id,
            'lot_code' => $overrides['lot_code'] ?? 'LOT-'.$suffix,
            'lot_barcode' => $overrides['lot_barcode'] ?? 'BAR-'.$suffix,
            'received_quantity' => 12,
            'available_quantity' => 12,
            'expires_at' => $overrides['expires_at'] ?? now()->addDays(2)->format('Y-m-d'),
            'received_at' => now()->format('Y-m-d'),
            'status' => ProductBatch::STATUS_AVAILABLE,
            'note' => 'Lote de prueba',
        ]);

        return [$warehouse, $product];
    }

    private function requiredSchemaExists(): bool
    {
        foreach ([
            'users',
            'roles',
            'permissions',
            'model_has_roles',
            'role_has_permissions',
            'main_products',
            'warehouses',
            'product_categories',
            'brands',
            'suppliers',
            'base_units',
            'products',
            'manage_stocks',
            'purchases',
            'purchase_items',
            'purchase_lots',
            'purchases_return',
            'purchases_return_items',
            'product_batch_settings',
            'product_batches',
            'product_batch_movements',
        ] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }

    private function uniqueSuffix(): string
    {
        return (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
    }
}
