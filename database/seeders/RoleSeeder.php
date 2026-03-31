<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->roleCatalog() as $roleData) {
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

            if ($role->display_name !== $roleData['display_name']) {
                $role->update(['display_name' => $roleData['display_name']]);
            }

            $permissionIds = $roleData['permissions'] === ['*']
                ? Permission::query()->pluck('id')->values()->all()
                : Permission::query()
                    ->whereIn('name', $roleData['permissions'])
                    ->pluck('id')
                    ->values()
                    ->all();

            if (! empty($permissionIds)) {
                $role->permissions()->syncWithoutDetaching($permissionIds);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @return array<int, array{name: string, display_name: string, permissions: array<int, string>}>
     */
    private function roleCatalog(): array
    {
        return [
            [
                'name' => Role::ADMIN,
                'display_name' => ' Admin',
                'permissions' => ['*'],
            ],
            [
                'name' => 'VENTAS',
                'display_name' => 'VENTAS',
                'permissions' => [
                    'manage_pos_screen',
                    'manage_products',
                ],
            ],
            [
                'name' => 'ROL DE PRUEBA',
                'display_name' => 'ROL DE PRUEBA',
                'permissions' => ['*'],
            ],
        ];
    }
}
