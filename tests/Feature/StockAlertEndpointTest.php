<?php

namespace Tests\Feature;

use App\Models\BaseUnit;
use App\Models\Brand;
use App\Models\ManageStock;
use App\Models\Product;
use App\Models\ProductCategory;
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

class StockAlertEndpointTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;
    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para stock alerts no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
        Permission::findOrCreate('view_stock_alerts', 'web');

        $suffix = $this->uniqueSuffix();

        $this->role = Role::create([
            'name' => 'stock_alert_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $this->role->syncPermissions(['view_stock_alerts']);

        $this->user = User::create([
            'first_name' => 'Stock',
            'last_name' => 'Tester',
            'email' => 'stock_alert_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'sp',
        ]);
        $this->user->assignRole($this->role);
    }

    public function test_stock_alert_endpoint_returns_serializable_flat_payload(): void
    {
        [$warehouse, $product] = $this->createStockAlertFixture();

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/stock-alerts');

        $response->assertOk();
        $response->assertJsonStructure([
            'success',
            'message',
            'data' => [
                [
                    'id',
                    'code',
                    'name',
                    'stock_alert',
                    'product' => ['stock_alert'],
                    'stock' => [
                        'id',
                        'warehouse_id',
                        'quantity',
                        'product_unit_name',
                        'warehouse' => ['id', 'name'],
                    ],
                ],
            ],
        ]);

        $firstRow = collect($response->json('data'))
            ->firstWhere('id', $product->id);

        $this->assertNotNull($firstRow);
        $this->assertSame($product->code, data_get($firstRow, 'code'));
        $this->assertSame($product->name, data_get($firstRow, 'name'));
        $this->assertSame(5.0, (float) data_get($firstRow, 'stock_alert'));
        $this->assertSame(3.0, (float) data_get($firstRow, 'stock.quantity'));
        $this->assertSame($warehouse->name, data_get($firstRow, 'stock.warehouse.name'));
        $this->assertSame('Unidad Stock', data_get($firstRow, 'stock.product_unit_name'));
    }

    private function createStockAlertFixture(): array
    {
        $suffix = $this->uniqueSuffix();

        $warehouse = Warehouse::create([
            'name' => 'Bodega Stock '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_stock_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $category = ProductCategory::create([
            'name' => 'Categoria Stock '.$suffix,
        ]);

        $brand = Brand::create([
            'name' => 'Marca Stock '.$suffix,
        ]);

        $baseUnit = BaseUnit::create([
            'name' => 'Unidad Stock',
        ]);

        $product = Product::create([
            'name' => 'Producto Stock '.$suffix,
            'code' => 'PS-'.$suffix,
            'product_code' => 'PST-'.$suffix,
            'product_category_id' => $category->id,
            'brand_id' => $brand->id,
            'main_product_id' => null,
            'product_cost' => 10,
            'product_price' => 15,
            'product_unit' => (string) $baseUnit->id,
            'sale_unit' => null,
            'purchase_unit' => null,
            'stock_alert' => '5',
            'quantity_limit' => null,
            'order_tax' => 0,
            'tax_type' => 1,
            'notes' => null,
            'barcode_symbol' => 1,
        ]);

        ManageStock::create([
            'warehouse_id' => $warehouse->id,
            'product_id' => $product->id,
            'quantity' => 3,
        ]);

        return [$warehouse, $product];
    }

    private function requiredTablesExist(): bool
    {
        foreach ([
            'users',
            'roles',
            'permissions',
            'model_has_roles',
            'role_has_permissions',
            'warehouses',
            'product_categories',
            'brands',
            'base_units',
            'products',
            'manage_stocks',
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
