<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Spatie\Permission\PermissionRegistrar;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class PermissionStrictTest extends TestCase
{
    use DatabaseTransactions;

    private User $user;
    private Role $role;

    protected function setUp(): void
    {
        parent::setUp();

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->ensurePermission('manage_customers');
        $this->ensurePermission('customer.view');
        $this->ensurePermission('customer.create');
        $this->ensurePermission('customer.update');
        $this->ensurePermission('supplier.view');
        $this->ensurePermission('manage_users');
        $this->ensurePermission('user.view');
        $this->ensurePermission('user.update');
        $this->ensurePermission('user.update_credentials');

        $suffix = (string) (int) (microtime(true) * 1000000).(string) random_int(100, 999);

        $this->role = Role::create([
            'name' => 'permission_test_role_'.$suffix,
            'guard_name' => 'web',
        ]);

        $this->user = User::create([
            'first_name' => 'Permission',
            'last_name' => 'Tester',
            'email' => 'permission_'.$suffix.'@example.test',
            'phone' => substr($suffix, 0, 12),
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);

        $this->user->assignRole($this->role);
    }

    public function test_granular_permission_grants_only_expected_action(): void
    {
        $this->role->syncPermissions(['customer.view']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue(hasPermissionStrict('customer.view', [], $this->user));
        $this->assertFalse(hasPermissionStrict('customer.update', [], $this->user));
    }

    public function test_manage_permission_grants_action_when_module_has_no_granular_permissions(): void
    {
        $this->role->syncPermissions(['manage_customers']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue(hasPermissionStrict('customer.create', [], $this->user));
    }

    public function test_manage_permission_is_blocked_if_user_has_granular_permissions_in_same_module(): void
    {
        $this->role->syncPermissions(['manage_customers', 'customer.view']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue(hasPermissionStrict('customer.view', [], $this->user));
        $this->assertFalse(hasPermissionStrict('customer.create', [], $this->user));
    }

    public function test_supplier_view_permission_works_with_canonical_name(): void
    {
        $this->role->syncPermissions(['supplier.view']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue(hasPermissionStrict('supplier.view', [], $this->user));
    }

    public function test_user_update_credentials_permission_works_with_strict_checks(): void
    {
        $this->role->syncPermissions(['user.update_credentials']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->assertTrue(hasPermissionStrict('user.update_credentials', [], $this->user));

        $this->role->syncPermissions(['manage_users']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();
        $this->assertTrue(hasPermissionStrict('user.update_credentials', [], $this->user));
    }

    public function test_users_index_endpoint_handles_sort_and_pagination(): void
    {
        $this->role->syncPermissions(['user.view']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        Sanctum::actingAs($this->user);

        $response = $this->getJson('/api/users?sort=-created_at&page[size]=10&page[number]=1');
        $response->assertOk();
    }

    public function test_manage_users_with_special_permission_still_allows_user_view(): void
    {
        $this->role->syncPermissions(['manage_users', 'user.update_credentials']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->assertTrue(hasPermissionStrict('user.view', [], $this->user));
    }

    public function test_user_update_allows_same_phone_when_editing_name_only(): void
    {
        $this->role->syncPermissions(['user.update']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $targetUser = User::create([
            'first_name' => 'Target',
            'last_name' => 'User',
            'email' => 'target_'.uniqid().'@example.test',
            'phone' => '7771234567',
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $targetUser->assignRole($this->role);

        Sanctum::actingAs($this->user);

        $payload = [
            'first_name' => 'Target Edited',
            'last_name' => 'User',
            'email' => $targetUser->email,
            'phone' => $targetUser->phone,
            'role_id' => $this->role->id,
        ];

        $response = $this->postJson('/api/users/'.$targetUser->id, $payload);
        $response->assertOk();
    }

    public function test_user_update_allows_same_phone_with_form_post_payload(): void
    {
        $this->role->syncPermissions(['user.update']);
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $targetUser = User::create([
            'first_name' => 'Form',
            'last_name' => 'Target',
            'email' => 'form_'.uniqid().'@example.test',
            'phone' => '8881234567',
            'password' => Hash::make('password123'),
            'language' => 'en',
        ]);
        $targetUser->assignRole($this->role);

        Sanctum::actingAs($this->user);

        $payload = [
            'first_name' => 'Form Edited',
            'last_name' => 'Target',
            'email' => $targetUser->email,
            'phone' => $targetUser->phone,
            'role_id' => $this->role->id,
        ];

        $response = $this->post('/api/users/'.$targetUser->id, $payload);
        $response->assertStatus(200);
    }

    private function ensurePermission(string $permissionName): void
    {
        Permission::findOrCreate($permissionName, 'web');
    }
}
