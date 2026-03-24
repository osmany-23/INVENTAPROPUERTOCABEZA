<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\CreditInstallment;
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

class CreditEditRestructureTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->creditEditTablesExist()) {
            $this->markTestSkipped('Las migraciones de edicion y reestructuracion de creditos no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('manage_sale', 'web');
        Permission::findOrCreate('pos.view', 'web');
        Permission::findOrCreate('pos.create_sale', 'web');

        $suffix = $this->uniqueSuffix();

        $this->role = Role::create([
            'name' => 'credit_edit_test_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $this->role->syncPermissions(['manage_sale', 'pos.view', 'pos.create_sale']);

        $this->user = User::create([
            'first_name' => 'Credit',
            'last_name' => 'Editor',
            'email' => 'credit_edit_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($this->role);
    }

    public function test_credit_can_be_edited_when_it_has_no_payments(): void
    {
        Sanctum::actingAs($this->user);

        $customer = $this->createCustomer();
        $credit = $this->createCredit($customer, [
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 110,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'credit_type' => Credit::TYPE_AUTOMATIC,
        ]);

        $this->seedInstallments($credit, [
            ['number' => 1, 'amount' => 55, 'due_date' => now()->addDays(15)],
            ['number' => 2, 'amount' => 55, 'due_date' => now()->addDays(30)],
        ]);

        $response = $this->putJson('/api/credits/'.$credit->id, [
            'credit_type' => Credit::TYPE_MANUAL,
            'installments' => 4,
            'interest_rate' => 12,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(4)->format('Y-m-d'),
            'note' => 'Plan editado',
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.credit_type', Credit::TYPE_MANUAL);
        $response->assertJsonPath('data.installments', 4);
        $response->assertJsonPath('data.total_with_interest', 112.0);
        $response->assertJsonCount(4, 'data.installments');

        $this->assertDatabaseHas('credits', [
            'id' => $credit->id,
            'credit_type' => Credit::TYPE_MANUAL,
            'installments' => 4,
            'interest_rate' => 12,
            'total_with_interest' => 112.00,
            'balance' => 112.00,
        ]);
        $this->assertDatabaseHas('credit_logs', [
            'credit_id' => $credit->id,
            'action' => 'credito_editado',
        ]);
        $this->assertDatabaseHas('credit_logs', [
            'credit_id' => $credit->id,
            'action' => 'tipo_credito_actualizado',
        ]);
    }

    public function test_credit_with_payments_cannot_be_edited_directly(): void
    {
        Sanctum::actingAs($this->user);

        $customer = $this->createCustomer();
        $credit = $this->createCredit($customer, [
            'total_amount' => 100,
            'principal_balance' => 80,
            'balance' => 88,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'credit_type' => Credit::TYPE_AUTOMATIC,
        ]);

        $this->seedInstallments($credit, [
            [
                'number' => 1,
                'amount' => 55,
                'paid_amount' => 22,
                'due_date' => now()->addDays(10),
                'status' => CreditInstallment::STATUS_PENDING,
            ],
            ['number' => 2, 'amount' => 55, 'due_date' => now()->addDays(30)],
        ]);

        CreditPayment::create([
            'credit_id' => $credit->id,
            'amount' => 22,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Abono previo',
            'created_at' => now(),
        ]);

        $response = $this->putJson('/api/credits/'.$credit->id, [
            'credit_type' => Credit::TYPE_MANUAL,
            'installments' => 4,
            'interest_rate' => 8,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(4)->format('Y-m-d'),
        ]);

        $response->assertStatus(422);
        $response->assertJsonPath(
            'message',
            'Este credito ya tiene pagos registrados y solo puede modificarse mediante reestructuracion.'
        );
    }

    public function test_credit_can_be_restructured_and_audit_trail_is_persisted(): void
    {
        Sanctum::actingAs($this->user);

        $customer = $this->createCustomer();
        $credit = $this->createCredit($customer, [
            'total_amount' => 100,
            'principal_balance' => 80,
            'balance' => 88,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'credit_type' => Credit::TYPE_AUTOMATIC,
        ]);

        $this->seedInstallments($credit, [
            [
                'number' => 1,
                'amount' => 55,
                'paid_amount' => 22,
                'due_date' => now()->subDays(5),
                'status' => CreditInstallment::STATUS_LATE,
            ],
            ['number' => 2, 'amount' => 55, 'due_date' => now()->addDays(20)],
        ]);

        CreditPayment::create([
            'credit_id' => $credit->id,
            'amount' => 22,
            'payment_type' => 1,
            'payment_method' => 'cash',
            'note' => 'Abono previo',
            'created_at' => now(),
        ]);

        $response = $this->postJson('/api/credits/'.$credit->id.'/restructure', [
            'credit_type' => Credit::TYPE_FREE,
            'installments' => 10,
            'interest_rate' => 5,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addMonths(2)->format('Y-m-d'),
            'note' => 'Plan libre por mora',
            'reason' => 'Cliente moroso solicita extension',
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.restructured', true);
        $response->assertJsonPath('data.credit_type', Credit::TYPE_FREE);
        $response->assertJsonPath('data.installments', 1);
        $response->assertJsonPath('data.previous_balance', 88.0);
        $response->assertJsonCount(1, 'data.installments');
        $response->assertJsonCount(1, 'data.restructures');

        $this->assertDatabaseHas('credits', [
            'id' => $credit->id,
            'credit_type' => Credit::TYPE_FREE,
            'restructured' => 1,
            'previous_balance' => 88.00,
            'total_amount' => 88.00,
            'principal_balance' => 88.00,
            'total_with_interest' => 92.40,
            'balance' => 92.40,
        ]);
        $this->assertDatabaseHas('credit_restructures', [
            'credit_id' => $credit->id,
            'old_balance' => 88.00,
            'new_balance' => 92.40,
            'reason' => 'Cliente moroso solicita extension',
        ]);
        $this->assertDatabaseHas('credit_logs', [
            'credit_id' => $credit->id,
            'action' => 'credito_reestructurado',
        ]);
        $this->assertDatabaseHas('credit_logs', [
            'credit_id' => $credit->id,
            'action' => 'cuotas_actualizadas',
        ]);
    }

    private function createCustomer(): Customer
    {
        $suffix = $this->uniqueSuffix();

        return Customer::create([
            'name' => 'Cliente Credito '.$suffix,
            'email' => 'cliente_credito_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function createCredit(Customer $customer, array $overrides = []): Credit
    {
        return Credit::create(array_merge([
            'sale_id' => null,
            'customer_id' => $customer->id,
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 110,
            'interest_rate' => 10,
            'total_with_interest' => 110,
            'installments' => 2,
            'credit_type' => Credit::TYPE_AUTOMATIC,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subDays(5)->format('Y-m-d'),
            'due_date' => now()->addDays(25)->format('Y-m-d'),
            'note' => 'Credito para pruebas',
            'restructured' => false,
            'restructured_at' => null,
            'previous_balance' => null,
        ], $overrides));
    }

    private function seedInstallments(Credit $credit, array $installments): void
    {
        foreach ($installments as $row) {
            CreditInstallment::create([
                'credit_id' => $credit->id,
                'installment_number' => $row['number'],
                'amount' => $row['amount'],
                'paid_amount' => $row['paid_amount'] ?? 0,
                'due_date' => $row['due_date']->format('Y-m-d'),
                'status' => $row['status'] ?? CreditInstallment::STATUS_PENDING,
            ]);
        }
    }

    private function creditEditTablesExist(): bool
    {
        foreach ([
            'credits',
            'credit_installments',
            'credit_logs',
            'credit_payments',
            'credit_restructures',
        ] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        foreach (['credit_type', 'restructured', 'restructured_at', 'previous_balance'] as $column) {
            if (! Schema::hasColumn('credits', $column)) {
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
