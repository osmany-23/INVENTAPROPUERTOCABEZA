<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class SyncAdminAllPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /** @var Role $adminRole */
        $adminRole = Role::query()->firstOrCreate(
            ['name' => Role::ADMIN],
            [
                'display_name' => ' Admin',
                'guard_name' => 'web',
            ]
        );

        $allPermissionNames = Permission::query()->pluck('name')->values()->all();
        $adminRole->syncPermissions($allPermissionNames);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}

