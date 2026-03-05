<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => Role::ADMIN,
                'display_name' => 'Admin',
                'permissions' => ['*'],
            ],
        ];

        foreach ($roles as $roleData) {
            $role = Role::query()->firstOrCreate(
                [
                    'name' => $roleData['name'],
                    'guard_name' => 'web',
                ],
                [
                    'display_name' => $roleData['display_name'],
                    'guard_name' => 'web',
                ]
            );

            if (empty($role->display_name)) {
                $role->update(['display_name' => $roleData['display_name']]);
            }

            $permissionNames = $roleData['permissions'] === ['*']
                ? Permission::query()->pluck('name')->values()->all()
                : $roleData['permissions'];

            if (!empty($permissionNames)) {
                $role->syncPermissions($permissionNames);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}

