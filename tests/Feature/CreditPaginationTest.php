<?php

namespace Tests\Feature;

use App\Models\Credit;
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

class CreditPaginationTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

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
        $role = Role::create([
            'name' => 'credit_pagination_test_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $role->syncPermissions(['manage_sale', 'pos.view']);

        $this->user = User::create([
            'first_name' => 'Credit',
            'last_name' => 'Pagination',
            'email' => 'credit_pagination_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($role);

        Sanctum::actingAs($this->user);
    }

    public function test_credits_endpoint_returns_real_pagination_metadata(): void
    {
        $customerName = 'Cliente paginado '.(string) random_int(1000, 9999);
        $customer = $this->createCustomer($customerName);

        foreach (range(1, 5) as $index) {
            Credit::create([
                'sale_id' => null,
                'customer_id' => $customer->id,
                'total_amount' => 100 + $index,
                'principal_balance' => 100 + $index,
                'balance' => 100 + $index,
                'interest_rate' => 0,
                'total_with_interest' => 100 + $index,
                'installments' => 1,
                'status' => Credit::STATUS_PENDING,
                'start_date' => now()->subDays(3)->format('Y-m-d'),
                'due_date' => now()->addDays(10 + $index)->format('Y-m-d'),
                'note' => 'Credito '.$index,
            ]);
        }

        $response = $this->getJson(
            '/api/credits?page=2&limit=3&section=credits&search='.urlencode($customerName)
        );

        $response->assertOk();
        $response->assertJsonPath('meta.total', 5);
        $response->assertJsonPath('meta.per_page', 3);
        $response->assertJsonPath('meta.current_page', 2);
        $response->assertJsonPath('meta.last_page', 2);
        $response->assertJsonCount(2, 'data');
    }

    public function test_credits_endpoint_applies_backend_search_and_status_filters(): void
    {
        $pendingCustomer = $this->createCustomer('Cliente Activo');
        $overdueCustomer = $this->createCustomer('Cliente Moroso');

        Credit::create([
            'sale_id' => null,
            'customer_id' => $pendingCustomer->id,
            'total_amount' => 80,
            'principal_balance' => 80,
            'balance' => 80,
            'interest_rate' => 0,
            'total_with_interest' => 80,
            'installments' => 1,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subDays(2)->format('Y-m-d'),
            'due_date' => now()->addDays(12)->format('Y-m-d'),
            'note' => 'Credito vigente',
        ]);

        $overdueCredit = Credit::create([
            'sale_id' => null,
            'customer_id' => $overdueCustomer->id,
            'total_amount' => 120,
            'principal_balance' => 120,
            'balance' => 120,
            'interest_rate' => 0,
            'total_with_interest' => 120,
            'installments' => 1,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->subDays(25)->format('Y-m-d'),
            'due_date' => now()->subDays(5)->format('Y-m-d'),
            'note' => 'Credito vencido',
        ]);

        $response = $this->getJson(
            '/api/credits?section=credits&limit=3&page=1&search=Moroso&status=vencido'
        );

        $response->assertOk();
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.id', $overdueCredit->id);
        $response->assertJsonPath('data.0.status', Credit::STATUS_OVERDUE);
    }

    public function test_credit_dashboard_endpoint_returns_summary_without_full_credit_list_payload(): void
    {
        $baselineTotalCredits = (int) Credit::query()->count();
        $customer = $this->createCustomer('Cliente dashboard');

        foreach (range(1, 4) as $index) {
            Credit::create([
                'sale_id' => null,
                'customer_id' => $customer->id,
                'total_amount' => 50 + $index,
                'principal_balance' => 50 + $index,
                'balance' => 50 + $index,
                'interest_rate' => 0,
                'total_with_interest' => 50 + $index,
                'installments' => 1,
                'status' => Credit::STATUS_PENDING,
                'start_date' => now()->subDays(2)->format('Y-m-d'),
                'due_date' => now()->addDays(7)->format('Y-m-d'),
                'note' => 'Credito dashboard '.$index,
            ]);
        }

        $response = $this->getJson('/api/credits/dashboard');

        $response->assertOk();
        $response->assertJsonPath(
            'data.summary.total_credits',
            $baselineTotalCredits + 4
        );
        $response->assertJsonCount(0, 'data.credits');
        $response->assertJsonCount(0, 'data.customer_configs');
        $response->assertJsonCount(0, 'data.overdue_customers');
        $response->assertJsonCount(0, 'data.interest_report');
    }

    private function createCustomer(string $name): Customer
    {
        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);

        return Customer::create([
            'name' => $name.' '.$suffix,
            'email' => 'credit_customer_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function creditModuleTablesExist(): bool
    {
        foreach (['credits', 'customer_credit_configs', 'credit_payments', 'credit_logs'] as $table) {
            if (! Schema::hasTable($table)) {
                return false;
            }
        }

        return true;
    }
}
