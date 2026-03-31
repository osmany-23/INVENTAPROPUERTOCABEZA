<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

class CreditAndBatchPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $tableNames = config('permission.table_names', []);
        $columnNames = config('permission.column_names', []);
        $teams = (bool) config('permission.teams', false);

        if (empty($tableNames)) {
            return;
        }

        $permissionsTable = $tableNames['permissions'] ?? 'permissions';
        $rolesTable = $tableNames['roles'] ?? 'roles';
        $roleHasPermissionsTable = $tableNames['role_has_permissions'] ?? 'role_has_permissions';
        $modelHasPermissionsTable = $tableNames['model_has_permissions'] ?? 'model_has_permissions';
        $modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';
        $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';

        if (
            ! Schema::hasTable($permissionsTable) ||
            ! Schema::hasTable($rolesTable) ||
            ! Schema::hasTable($roleHasPermissionsTable)
        ) {
            return;
        }

        $hasDisplayName = Schema::hasColumn($permissionsTable, 'display_name');
        $hasModule = Schema::hasColumn($permissionsTable, 'module');
        $hasAction = Schema::hasColumn($permissionsTable, 'action');
        $hasModelPermissions = Schema::hasTable($modelHasPermissionsTable);
        $hasModelPermissionTeams = $hasModelPermissions && $teams && Schema::hasColumn($modelHasPermissionsTable, $teamForeignKey);

        foreach ($this->permissionCatalog() as $permissionData) {
            $permission = Permission::query()->firstOrCreate([
                'name' => $permissionData['name'],
                'guard_name' => 'web',
            ]);

            $updates = [];
            if ($hasDisplayName && ($permission->display_name ?? null) !== $permissionData['display_name']) {
                $updates['display_name'] = $permissionData['display_name'];
            }
            if ($hasModule && ($permission->module ?? null) !== $permissionData['module']) {
                $updates['module'] = $permissionData['module'];
            }
            if ($hasAction && ($permission->action ?? null) !== $permissionData['action']) {
                $updates['action'] = $permissionData['action'];
            }

            if (! empty($updates)) {
                $permission->fill($updates);
                if ($permission->isDirty()) {
                    $permission->save();
                }
            }
        }

        $permissionIdByName = Permission::query()->pluck('id', 'name')->all();

        foreach ($this->permissionInheritanceMap() as $targetPermissionName => $sourcePermissionNames) {
            $targetPermissionId = $permissionIdByName[$targetPermissionName] ?? null;
            if (empty($targetPermissionId)) {
                continue;
            }

            $sourcePermissionIds = collect($sourcePermissionNames)
                ->map(fn ($permissionName) => $permissionIdByName[$permissionName] ?? null)
                ->filter()
                ->unique()
                ->values()
                ->all();

            if (empty($sourcePermissionIds)) {
                continue;
            }

            $roleIds = DB::table($roleHasPermissionsTable)
                ->whereIn('permission_id', $sourcePermissionIds)
                ->pluck('role_id')
                ->unique()
                ->values()
                ->all();

            foreach ($roleIds as $roleId) {
                DB::table($roleHasPermissionsTable)->insertOrIgnore([
                    'permission_id' => (int) $targetPermissionId,
                    'role_id' => (int) $roleId,
                ]);
            }

            if (! $hasModelPermissions) {
                continue;
            }

            $modelPermissionQuery = DB::table($modelHasPermissionsTable)
                ->whereIn('permission_id', $sourcePermissionIds)
                ->select(['model_type', $modelMorphKey]);

            if ($hasModelPermissionTeams) {
                $modelPermissionQuery->addSelect($teamForeignKey);
            }

            $directModelPermissions = $modelPermissionQuery->get();

            foreach ($directModelPermissions as $modelPermission) {
                $insertData = [
                    'permission_id' => (int) $targetPermissionId,
                    'model_type' => $modelPermission->model_type,
                    $modelMorphKey => $modelPermission->{$modelMorphKey},
                ];

                if ($hasModelPermissionTeams) {
                    $insertData[$teamForeignKey] = $modelPermission->{$teamForeignKey};
                }

                DB::table($modelHasPermissionsTable)->insertOrIgnore($insertData);
            }
        }

        $this->assignDefaultRolePermissions($permissionIdByName);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @return array<int, array{name: string, display_name: string, module: string, action: string}>
     */
    private function permissionCatalog(): array
    {
        return [
            [
                'name' => 'ver_creditos',
                'display_name' => 'Creditos - Ver listado',
                'module' => 'creditos',
                'action' => 'view',
            ],
            [
                'name' => 'credit.view',
                'display_name' => 'Credito - Ver listado',
                'module' => 'credit',
                'action' => 'view',
            ],
            [
                'name' => 'crear_creditos',
                'display_name' => 'Creditos - Crear',
                'module' => 'creditos',
                'action' => 'create',
            ],
            [
                'name' => 'credit.create',
                'display_name' => 'Credito - Crear',
                'module' => 'credit',
                'action' => 'create',
            ],
            [
                'name' => 'editar_creditos',
                'display_name' => 'Creditos - Actualizar',
                'module' => 'creditos',
                'action' => 'update',
            ],
            [
                'name' => 'credit.edit',
                'display_name' => 'Credito - Editar',
                'module' => 'credit',
                'action' => 'update',
            ],
            [
                'name' => 'eliminar_creditos',
                'display_name' => 'Creditos - Eliminar',
                'module' => 'creditos',
                'action' => 'delete',
            ],
            [
                'name' => 'credit.delete',
                'display_name' => 'Credito - Eliminar',
                'module' => 'credit',
                'action' => 'delete',
            ],
            [
                'name' => 'ver_detalle_credito',
                'display_name' => 'Creditos - Ver detalle',
                'module' => 'creditos',
                'action' => 'special',
            ],
            [
                'name' => 'registrar_pagos_credito',
                'display_name' => 'Creditos - Registrar pagos',
                'module' => 'creditos',
                'action' => 'special',
            ],
            [
                'name' => 'ver_lotes',
                'display_name' => 'Lotes - Ver listado',
                'module' => 'lotes',
                'action' => 'view',
            ],
            [
                'name' => 'lot.view',
                'display_name' => 'Lotes - Ver listado',
                'module' => 'lot',
                'action' => 'view',
            ],
            [
                'name' => 'crear_lotes',
                'display_name' => 'Lotes - Crear',
                'module' => 'lotes',
                'action' => 'create',
            ],
            [
                'name' => 'lot.create',
                'display_name' => 'Lotes - Crear',
                'module' => 'lot',
                'action' => 'create',
            ],
            [
                'name' => 'editar_lotes',
                'display_name' => 'Lotes - Actualizar',
                'module' => 'lotes',
                'action' => 'update',
            ],
            [
                'name' => 'lot.edit',
                'display_name' => 'Lotes - Editar',
                'module' => 'lot',
                'action' => 'update',
            ],
            [
                'name' => 'eliminar_lotes',
                'display_name' => 'Lotes - Eliminar',
                'module' => 'lotes',
                'action' => 'delete',
            ],
            [
                'name' => 'lot.delete',
                'display_name' => 'Lotes - Eliminar',
                'module' => 'lot',
                'action' => 'delete',
            ],
            [
                'name' => 'asignar_lotes',
                'display_name' => 'Lotes - Asignar',
                'module' => 'lotes',
                'action' => 'special',
            ],
            [
                'name' => 'ver_stock_lote',
                'display_name' => 'Lotes - Ver stock',
                'module' => 'lotes',
                'action' => 'special',
            ],
        ];
    }

    /**
     * @return array<string, array<int, string>>
     */
    private function permissionInheritanceMap(): array
    {
        return [
            'ver_creditos' => ['manage_sale', 'manage_pos_screen', 'pos.view', 'credit.view'],
            'credit.view' => ['ver_creditos'],
            'crear_creditos' => ['manage_sale', 'manage_pos_screen', 'pos.create_sale', 'credit.create'],
            'credit.create' => ['crear_creditos'],
            'editar_creditos' => ['manage_sale', 'manage_pos_screen', 'pos.create_sale', 'pos.edit_sale', 'credit.edit'],
            'credit.edit' => ['editar_creditos'],
            'eliminar_creditos' => ['manage_sale', 'pos.delete_sale', 'credit.delete'],
            'credit.delete' => ['eliminar_creditos'],
            'ver_detalle_credito' => ['manage_sale', 'manage_pos_screen', 'pos.view', 'ver_creditos'],
            'registrar_pagos_credito' => ['manage_sale', 'manage_pos_screen', 'pos.create_sale'],
            'ver_lotes' => ['manage_products', 'manage_pos_screen', 'products.view', 'pos.view', 'lot.view'],
            'lot.view' => ['ver_lotes'],
            'crear_lotes' => ['manage_products', 'products.create', 'products.update', 'lot.create'],
            'lot.create' => ['crear_lotes'],
            'editar_lotes' => ['manage_products', 'products.update', 'lot.edit'],
            'lot.edit' => ['editar_lotes'],
            'eliminar_lotes' => ['manage_products', 'products.delete', 'lot.delete'],
            'lot.delete' => ['eliminar_lotes'],
            'asignar_lotes' => ['manage_products', 'products.update'],
            'ver_stock_lote' => ['manage_products', 'manage_reports', 'manage_report', 'products.view', 'pos.view'],
        ];
    }

    /**
     * @param  array<string, int|string>  $permissionIdByName
     */
    private function assignDefaultRolePermissions(array $permissionIdByName): void
    {
        $adminRole = Role::query()->firstOrCreate(
            [
                'name' => Role::ADMIN,
                'guard_name' => 'web',
            ],
            [
                'display_name' => 'Admin',
                'guard_name' => 'web',
            ]
        );

        if (empty($adminRole->display_name)) {
            $adminRole->update(['display_name' => 'Admin']);
        }

        $allPermissionIds = Permission::query()->pluck('id')->values()->all();
        if (! empty($allPermissionIds)) {
            $adminRole->permissions()->syncWithoutDetaching($allPermissionIds);
        }

        $cashierRole = Role::query()->firstOrCreate(
            [
                'name' => 'CAJERO',
                'guard_name' => 'web',
            ],
            [
                'display_name' => 'CAJERO',
                'guard_name' => 'web',
            ]
        );

        if (empty($cashierRole->display_name)) {
            $cashierRole->update(['display_name' => 'CAJERO']);
        }

        $cashierPermissionIds = collect([
            'ver_creditos',
            'credit.view',
            'crear_creditos',
            'credit.create',
            'ver_lotes',
            'lot.view',
        ])
            ->map(fn ($permissionName) => $permissionIdByName[$permissionName] ?? null)
            ->filter()
            ->unique()
            ->values()
            ->all();

        if (! empty($cashierPermissionIds)) {
            $cashierRole->permissions()->syncWithoutDetaching($cashierPermissionIds);
        }
    }
}
