<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\Customer;
use App\Models\CustomerCreditConfig;
use App\Models\ManageStock;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\User;
use App\Models\Warehouse;
use App\Services\CreditService;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class CreditInventoryIntegrationTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;
    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para la integracion de creditos e inventario no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('pos.view', 'web');
        Permission::findOrCreate('pos.create_sale', 'web');

        $suffix = $this->uniqueSuffix();

        $this->role = Role::create([
            'name' => 'credit_inventory_test_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $this->role->syncPermissions(['pos.view', 'pos.create_sale']);

        $this->user = User::create([
            'first_name' => 'Inventory',
            'last_name' => 'Tester',
            'email' => 'credit_inventory_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($this->role);
    }

    public function test_manual_credit_with_items_creates_credit_items_and_reduces_stock(): void
    {
        [$customer, $warehouse, $product] = $this->createCreditInventoryFixture();

        $credit = app(CreditService::class)->createManualCredit([
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'interest_rate' => 0,
            'installments' => 1,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito manual con inventario',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                ],
            ],
        ]);

        $this->assertDatabaseHas('credit_items', [
            'credit_id' => $credit->id,
            'product_id' => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity' => 2,
            'product_price' => 15,
            'sub_total' => 30,
            'source' => 'manual',
        ]);

        $stock = ManageStock::query()
            ->where('warehouse_id', $warehouse->id)
            ->where('product_id', $product->id)
            ->firstOrFail();

        $this->assertSame(8.0, (float) $stock->quantity);
        $this->assertSame(30.0, (float) $credit->fresh()->total_amount);
    }

    public function test_credit_return_restores_inventory_and_registers_return_row(): void
    {
        [$customer, $warehouse, $product] = $this->createCreditInventoryFixture();

        $credit = app(CreditService::class)->createManualCredit([
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'interest_rate' => 0,
            'installments' => 1,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito para devolucion',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 3,
                ],
            ],
        ]);

        $creditItemId = (int) $credit->items()->value('id');

        app(CreditService::class)->recordReturn($credit, [
            'items' => [
                [
                    'credit_item_id' => $creditItemId,
                    'quantity' => 1.5,
                ],
            ],
            'note' => 'Devolucion parcial',
        ]);

        $this->assertDatabaseHas('credit_item_returns', [
            'credit_id' => $credit->id,
            'credit_item_id' => $creditItemId,
            'product_id' => $product->id,
            'warehouse_id' => $warehouse->id,
            'quantity' => 1.5,
            'product_price' => 15,
            'sub_total' => 22.5,
            'note' => 'Devolucion parcial',
        ]);

        $stock = ManageStock::query()
            ->where('warehouse_id', $warehouse->id)
            ->where('product_id', $product->id)
            ->firstOrFail();

        $this->assertSame(8.5, (float) $stock->quantity);
    }

    public function test_credit_product_report_separates_credit_and_credit_return_movements(): void
    {
        [$customer, $warehouse, $product] = $this->createCreditInventoryFixture();

        $credit = app(CreditService::class)->createManualCredit([
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'interest_rate' => 0,
            'installments' => 1,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito reportable',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                ],
            ],
        ]);

        $creditItemId = (int) $credit->items()->value('id');

        app(CreditService::class)->recordReturn($credit, [
            'items' => [
                [
                    'credit_item_id' => $creditItemId,
                    'quantity' => 1,
                ],
            ],
            'note' => 'Devolucion reportable',
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/get-credit-product-report?product_id='.$product->id);

        $response->assertOk();

        $movementTypes = collect($response->json('data'))
            ->pluck('attributes.movement_type')
            ->all();

        $this->assertContains('credito', $movementTypes);
        $this->assertContains('devolucion_credito', $movementTypes);
    }

    private function createCreditInventoryFixture(): array
    {
        $suffix = $this->uniqueSuffix();

        $customer = Customer::create([
            'name' => 'Cliente Inventario '.$suffix,
            'email' => 'cliente_inventario_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);

        CustomerCreditConfig::create([
            'customer_id' => $customer->id,
            'credit_limit' => 1000,
            'current_balance' => 0,
            'allow_exceed' => false,
            'interest_rate' => 0,
            'max_installments' => 6,
            'status' => CustomerCreditConfig::STATUS_ACTIVE,
        ]);

        $warehouse = Warehouse::create([
            'name' => 'Bodega Credito '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_credit_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Credito '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Credito '.$suffix,
        ]);

        $product = Product::create([
            'name' => 'Producto Credito '.$suffix,
            'code' => 'PC-'.$suffix,
            'product_code' => 'PR-'.$suffix,
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
            'quantity' => 10,
        ]);

        return [$customer, $warehouse, $product];
    }

    private function requiredTablesExist(): bool
    {
        foreach ([
            'users',
            'customers',
            'customer_credit_configs',
            'credits',
            'credit_installments',
            'credit_logs',
            'credit_items',
            'credit_item_returns',
            'manage_stocks',
            'products',
            'warehouses',
            'product_categories',
            'brands',
            'roles',
            'permissions',
            'model_has_roles',
            'role_has_permissions',
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
