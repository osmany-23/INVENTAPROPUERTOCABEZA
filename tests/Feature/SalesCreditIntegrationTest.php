<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\Customer;
use App\Models\Sale;
use App\Models\SalesPayment;
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

class SalesCreditIntegrationTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;
    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredTablesExist()) {
            $this->markTestSkipped('Las tablas necesarias para ventas y creditos no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('manage_sale', 'web');
        Permission::findOrCreate('pos.view', 'web');

        $suffix = $this->uniqueSuffix();

        $this->role = Role::create([
            'name' => 'sales_credit_integration_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $this->role->syncPermissions(['manage_sale', 'pos.view']);

        $this->user = User::create([
            'first_name' => 'Sales',
            'last_name' => 'Credit',
            'email' => 'sales_credit_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($this->role);
    }

    public function test_sales_index_exposes_credit_status_for_credit_sales(): void
    {
        [$sale, , $customer] = $this->createCreditSaleFixture([
            'balance' => 60,
            'total_with_interest' => 110,
            'status' => Credit::STATUS_PARTIAL,
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/sales?filter[search]='.urlencode($customer->name));

        $response->assertOk();

        $payload = collect($response->json('data'))
            ->firstWhere('id', (string) $sale->id);

        $this->assertNotNull($payload);
        $this->assertTrue((bool) data_get($payload, 'attributes.is_credit_sale'));
        $this->assertSame(
            (int) $sale->credit->id,
            (int) data_get($payload, 'attributes.credit_id')
        );
        $this->assertSame('parcial', data_get($payload, 'attributes.credit_payment_status_key'));
        $this->assertSame('Parcial', data_get($payload, 'attributes.credit_payment_status_label'));
    }

    public function test_sales_payment_capture_rejects_credit_sales(): void
    {
        [$sale] = $this->createCreditSaleFixture();

        Sanctum::actingAs($this->user);

        $response = $this->postJson('/api/sales/'.$sale->id.'/capture-payment', [
            'payment_date' => now()->format('Y-m-d'),
            'payment_type' => SalesPayment::CASH,
            'amount' => 25,
            'received_amount' => 25,
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath(
            'message',
            'Esta venta es a crédito. Los pagos deben realizarse desde el módulo de créditos.'
        );
    }

    public function test_sales_payment_delete_rejects_credit_sales(): void
    {
        [$sale] = $this->createCreditSaleFixture();

        $payment = SalesPayment::create([
            'sale_id' => $sale->id,
            'reference' => 'MANUAL-TEST',
            'payment_date' => now()->format('Y-m-d'),
            'payment_type' => SalesPayment::CASH,
            'amount' => 25,
            'received_amount' => 25,
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->deleteJson('/api/sales/'.$payment->id.'/payment');

        $response->assertStatus(422);
        $response->assertJsonPath(
            'message',
            'Esta venta es a crédito. Los pagos deben realizarse desde el módulo de créditos.'
        );
    }

    private function createCreditSaleFixture(array $creditOverrides = []): array
    {
        $suffix = $this->uniqueSuffix();

        $customer = Customer::create([
            'name' => 'Cliente Venta Credito '.$suffix,
            'email' => 'cliente_venta_credito_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);

        $warehouse = Warehouse::create([
            'name' => 'Bodega Venta Credito '.$suffix,
            'phone' => substr($suffix, 0, 10),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'email' => 'warehouse_sale_credit_'.$suffix.'@example.test',
            'zip_code' => '11001',
        ]);

        $sale = Sale::create([
            'date' => now()->format('Y-m-d'),
            'customer_id' => $customer->id,
            'warehouse_id' => $warehouse->id,
            'tax_rate' => 0,
            'tax_amount' => 0,
            'discount' => 0,
            'shipping' => 0,
            'grand_total' => 100,
            'received_amount' => 0,
            'paid_amount' => 0,
            'payment_type' => Sale::CASH,
            'note' => 'Venta a credito de prueba',
            'status' => Sale::COMPLETED,
            'payment_status' => Sale::UNPAID,
            'reference_code' => 'SALE-CREDIT-'.$suffix,
            'is_return' => 0,
            'user_id' => $this->user->id,
        ]);

        $creditPayload = [
            'sale_id' => $sale->id,
            'customer_id' => $customer->id,
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 100,
            'interest_rate' => 0,
            'total_with_interest' => 100,
            'installments' => 1,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonth()->format('Y-m-d'),
            'note' => 'Credito asociado a la venta',
        ];

        if (Schema::hasColumn('credits', 'credit_type')) {
            $creditPayload['credit_type'] = Credit::TYPE_AUTOMATIC;
        }

        $credit = Credit::create(array_merge($creditPayload, $creditOverrides));

        return [$sale->fresh('credit'), $credit, $customer];
    }

    private function requiredTablesExist(): bool
    {
        foreach ([
            'users',
            'customers',
            'warehouses',
            'sales',
            'sales_payments',
            'credits',
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
