<?php

namespace Tests\Feature;

use App\Models\Credit;
use App\Models\Customer;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Tests\TestCase;

class CreditAlertTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        if (! $this->requiredSchemaExists()) {
            $this->markTestSkipped('Las tablas o columnas necesarias para alertas de credito no existen en este entorno.');
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Permission::findOrCreate('pos.view', 'web');
        Permission::findOrCreate('manage_sale', 'web');

        $suffix = $this->uniqueSuffix();
        $role = Role::create([
            'name' => 'credit_alert_role_'.$suffix,
            'guard_name' => 'web',
        ]);
        $role->syncPermissions(['pos.view', 'manage_sale']);

        $this->user = User::create([
            'first_name' => 'Alert',
            'last_name' => 'User',
            'email' => 'credit_alert_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $this->user->assignRole($role);

        Setting::query()->updateOrCreate(
            ['key' => 'credit_alert_days'],
            ['value' => 3]
        );
    }

    public function test_credit_alert_endpoints_return_overdue_and_upcoming_credits_without_paid_duplicates(): void
    {
        $customer = $this->createCustomer('Cliente Alertas API');

        $overdueCredit = $this->createCredit($customer->id, [
            'balance' => 80,
            'total_with_interest' => 100,
            'due_date' => now()->subDay()->format('Y-m-d'),
        ]);

        $upcomingPartialCredit = $this->createCredit($customer->id, [
            'balance' => 40,
            'total_with_interest' => 100,
            'due_date' => now()->addDays(2)->format('Y-m-d'),
        ]);

        $this->createCredit($customer->id, [
            'balance' => 60,
            'total_with_interest' => 60,
            'due_date' => now()->addDays(8)->format('Y-m-d'),
        ]);

        $this->createCredit($customer->id, [
            'balance' => 0,
            'total_with_interest' => 90,
            'status' => Credit::STATUS_PAID,
            'due_date' => now()->addDay()->format('Y-m-d'),
        ]);

        Sanctum::actingAs($this->user);

        $summaryResponse = $this->getJson('/api/credits/alerts/summary');
        $summaryResponse->assertOk();
        $summaryResponse->assertJsonPath('data.alert_days', 3);
        $summaryResponse->assertJsonPath('data.overdue_count', 1);
        $summaryResponse->assertJsonPath('data.upcoming_count', 1);
        $summaryResponse->assertJsonPath('data.total_alerts', 2);
        $summaryResponse->assertJsonPath('data.uses_user_preference', false);

        $feedResponse = $this->getJson('/api/credits/alerts');
        $feedResponse->assertOk();
        $feedResponse->assertJsonCount(1, 'data.overdue');
        $feedResponse->assertJsonCount(1, 'data.upcoming');
        $feedResponse->assertJsonPath('data.overdue.0.credit_id', $overdueCredit->id);
        $feedResponse->assertJsonPath('data.overdue.0.alert_type', 'vencido');
        $feedResponse->assertJsonPath('data.upcoming.0.credit_id', $upcomingPartialCredit->id);
        $feedResponse->assertJsonPath('data.upcoming.0.alert_type', 'por_vencer');
        $feedResponse->assertJsonPath('data.upcoming.0.payment_status', Credit::STATUS_PARTIAL);
    }

    public function test_user_can_override_credit_alert_days(): void
    {
        $customer = $this->createCustomer('Cliente Alertas Preferencia');

        $this->createCredit($customer->id, [
            'balance' => 40,
            'total_with_interest' => 100,
            'due_date' => now()->addDays(2)->format('Y-m-d'),
        ]);

        $outsideDefaultRangeCredit = $this->createCredit($customer->id, [
            'balance' => 55,
            'total_with_interest' => 100,
            'due_date' => now()->addDays(6)->format('Y-m-d'),
        ]);

        Sanctum::actingAs($this->user);

        $response = $this->putJson('/api/credits/alerts/settings', [
            'credit_alert_days' => 7,
        ]);

        $response->assertOk();
        $response->assertJsonPath('data.alert_days', 7);
        $response->assertJsonPath('data.uses_user_preference', true);

        if (Schema::hasColumn('users', 'credit_alert_days')) {
            $this->assertSame(7, (int) $this->user->fresh()->credit_alert_days);
        } else {
            $this->assertSame('7', getSettingValue('credit_alert_days_user_'.$this->user->id));
        }

        $summaryResponse = $this->getJson('/api/credits/alerts/summary');
        $summaryResponse->assertOk();
        $summaryResponse->assertJsonPath('data.upcoming_count', 2);

        $feedResponse = $this->getJson('/api/credits/alerts');
        $feedResponse->assertOk();
        $feedResponse->assertJsonCount(2, 'data.upcoming');

        $upcomingIds = collect($feedResponse->json('data.upcoming'))
            ->pluck('credit_id')
            ->map(fn ($id) => (int) $id)
            ->all();

        $this->assertContains($outsideDefaultRangeCredit->id, $upcomingIds);
    }

    private function createCustomer(string $name): Customer
    {
        $suffix = $this->uniqueSuffix();

        return Customer::create([
            'name' => $name.' '.$suffix,
            'email' => 'credit_alert_customer_'.$suffix.'@example.test',
            'phone' => substr(strrev($suffix), 0, 12),
            'country' => 'Nicaragua',
            'city' => 'Managua',
            'address' => 'Direccion de prueba',
        ]);
    }

    private function createCredit(int $customerId, array $overrides = []): Credit
    {
        $payload = array_merge([
            'sale_id' => null,
            'customer_id' => $customerId,
            'total_amount' => 100,
            'principal_balance' => 100,
            'balance' => 100,
            'interest_rate' => 0,
            'total_with_interest' => 100,
            'installments' => 1,
            'status' => Credit::STATUS_PENDING,
            'start_date' => now()->format('Y-m-d'),
            'due_date' => now()->addDays(2)->format('Y-m-d'),
            'note' => 'Credito para alertas',
        ], $overrides);

        if (Schema::hasColumn('credits', 'credit_type')) {
            $payload['credit_type'] = Credit::TYPE_AUTOMATIC;
        }

        return Credit::create($payload);
    }

    private function requiredSchemaExists(): bool
    {
        foreach ([
            'users',
            'customers',
            'credits',
            'settings',
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
