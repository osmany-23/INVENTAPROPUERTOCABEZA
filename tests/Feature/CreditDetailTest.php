<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditInstallment;
use App\Models\CreditLog;
use App\Models\CreditPayment;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class CreditDetailTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;
    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->creditModuleTablesExist()) {
            $this->markTestSkipped('Las tablas del modulo de creditos no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('manage_sale', 'web');
        Permission::findOrCreate('pos.view', 'web');

        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);

        $this->role = Role::create([
            'name' => 'credit_detail_test_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $this->role->syncPermissions(['manage_sale', 'pos.view']);

        $this->user = User::create([
            'first_name' => 'Credit',
            'last_name' => 'Tester',
            'email' => 'credit_detail_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($this->role);
    }

    public function test_credit_detail_endpoint_returns_installment_rows_instead_of_integer_collision(): void
    {
        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);
        $customer = Customer::create([
            'name' => 'Cliente Credito '.$suffix,
            'email' => 'cliente_credito_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);

        $credit = Credit::create([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 100,
            'principal_balance' => 80,
            'balance' => 90,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subDays(5)->format('Y-m-d'),
            'due_date' => now()->addDays(25)->format('Y-m-d'),
            'note' => 'Credito de prueba',
        ]);

        CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 1,
            'amount' => 55,
            'paid_amount' => 20,
            'due_date' => now()->addDays(10)->format('Y-m-d'),
            'status' => CreditInstallment::STATUS_PENDING,
        ]);
        CreditInstallment::create([
            'credit_id' => $credit->id,
            'installment_number' => 2,
            'amount' => 55,
            'paid_amount' => 0,
            'due_date' => now()->addDays(25)->format('Y-m-d'),
            'status' => CreditInstallment::STATUS_PENDING,
        ]);

        CreditPayment::create([
            'credit_id' => $credit->id,
            'amount' => 20,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Abono inicial',
            'created_at' => now(),
        ]);

        CreditLog::create([
            'credit_id' => $credit->id,
            'action' => 'credito_creado',
            'description' => 'Credito de prueba creado.',
            'created_at' => now(),
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/credits/'.$credit->id);

        $response->assertOk();
        $response->assertJsonPath('data.id', $credit->id);
        $response->assertJsonCount(2, 'data.installments');
        $response->assertJsonPath('data.installments.0.installment_number', 1);
        $response->assertJsonPath('data.installments.1.installment_number', 2);
    }

    private function creditModuleTablesExist(): bool
    {
        foreach (['credits', 'credit_installments', 'credit_payments', 'credit_logs'] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }
}
