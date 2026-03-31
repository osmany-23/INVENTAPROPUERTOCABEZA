<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    public function up(): void
    {
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        $teams = (bool) config('permission.teams');

        if (empty($tableNames) || empty($columnNames)) {
            return;
        }

        $this->ensurePermissionTablesExist($tableNames, $columnNames, $teams);
        $this->ensureMetadataColumnsExist($tableNames);
        $this->upsertPermissions($tableNames);
        $this->copyLegacyAssignments($tableNames, $columnNames, $teams);
        $this->assignDefaultRoles($tableNames);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // No se elimina nada para proteger configuraciones productivas.
    }

    /**
     * @param  array<string, string>  $tableNames
     * @param  array<string, string|null>  $columnNames
     */
    private function ensurePermissionTablesExist(array $tableNames, array $columnNames, bool $teams): void
    {
        if (! Schema::hasTable($tableNames['permissions'])) {
            Schema::create($tableNames['permissions'], function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('display_name')->nullable();
                $table->string('module')->nullable();
                $table->string('action')->nullable();
                $table->string('guard_name')->default('web');
                $table->timestamps();
                $table->unique(['name', 'guard_name'], 'permissions_name_guard_name_unique');
            });
        }

        if (! Schema::hasTable($tableNames['roles'])) {
            Schema::create($tableNames['roles'], function (Blueprint $table) use ($teams, $columnNames) {
                $table->bigIncrements('id');
                if ($teams || config('permission.testing')) {
                    $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';
                    $table->unsignedBigInteger($teamForeignKey)->nullable();
                    $table->index($teamForeignKey, 'roles_team_foreign_key_index');
                }
                $table->string('name');
                $table->string('display_name')->nullable();
                $table->string('guard_name')->default('web');
                $table->timestamps();

                if ($teams || config('permission.testing')) {
                    $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';
                    $table->unique([$teamForeignKey, 'name', 'guard_name'], 'roles_team_foreign_key_name_guard_name_unique');
                } else {
                    $table->unique(['name', 'guard_name'], 'roles_name_guard_name_unique');
                }
            });
        }

        if (! Schema::hasTable($tableNames['model_has_permissions'])) {
            Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
                $modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';
                $table->unsignedBigInteger(PermissionRegistrar::$pivotPermission);
                $table->string('model_type');
                $table->unsignedBigInteger($modelMorphKey);
                $table->index([$modelMorphKey, 'model_type'], 'model_has_permissions_model_id_model_type_index');

                if ($teams) {
                    $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';
                    $table->unsignedBigInteger($teamForeignKey);
                    $table->index($teamForeignKey, 'model_has_permissions_team_foreign_key_index');
                    $table->primary([
                        $teamForeignKey,
                        PermissionRegistrar::$pivotPermission,
                        $modelMorphKey,
                        'model_type',
                    ], 'model_has_permissions_permission_model_type_primary');
                } else {
                    $table->primary([
                        PermissionRegistrar::$pivotPermission,
                        $modelMorphKey,
                        'model_type',
                    ], 'model_has_permissions_permission_model_type_primary');
                }
            });
        }

        if (! Schema::hasTable($tableNames['model_has_roles'])) {
            Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames, $teams) {
                $modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';
                $table->unsignedBigInteger(PermissionRegistrar::$pivotRole);
                $table->string('model_type');
                $table->unsignedBigInteger($modelMorphKey);
                $table->index([$modelMorphKey, 'model_type'], 'model_has_roles_model_id_model_type_index');

                if ($teams) {
                    $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';
                    $table->unsignedBigInteger($teamForeignKey);
                    $table->index($teamForeignKey, 'model_has_roles_team_foreign_key_index');
                    $table->primary([
                        $teamForeignKey,
                        PermissionRegistrar::$pivotRole,
                        $modelMorphKey,
                        'model_type',
                    ], 'model_has_roles_role_model_type_primary');
                } else {
                    $table->primary([
                        PermissionRegistrar::$pivotRole,
                        $modelMorphKey,
                        'model_type',
                    ], 'model_has_roles_role_model_type_primary');
                }
            });
        }

        if (! Schema::hasTable($tableNames['role_has_permissions'])) {
            Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) {
                $table->unsignedBigInteger(PermissionRegistrar::$pivotPermission);
                $table->unsignedBigInteger(PermissionRegistrar::$pivotRole);
                $table->primary([
                    PermissionRegistrar::$pivotPermission,
                    PermissionRegistrar::$pivotRole,
                ], 'role_has_permissions_permission_id_role_id_primary');
            });
        }
    }

    /**
     * @param  array<string, string>  $tableNames
     */
    private function ensureMetadataColumnsExist(array $tableNames): void
    {
        $permissionsTable = $tableNames['permissions'] ?? 'permissions';
        $rolesTable = $tableNames['roles'] ?? 'roles';

        if (Schema::hasTable($permissionsTable)) {
            Schema::table($permissionsTable, function (Blueprint $table) use ($permissionsTable) {
                if (! Schema::hasColumn($permissionsTable, 'display_name')) {
                    $table->string('display_name')->nullable()->after('name');
                }
                if (! Schema::hasColumn($permissionsTable, 'module')) {
                    $table->string('module')->nullable()->after('display_name');
                }
                if (! Schema::hasColumn($permissionsTable, 'action')) {
                    $table->string('action')->nullable()->after('module');
                }
            });
        }

        if (Schema::hasTable($rolesTable) && ! Schema::hasColumn($rolesTable, 'display_name')) {
            Schema::table($rolesTable, function (Blueprint $table) {
                $table->string('display_name')->nullable()->after('name');
            });
        }
    }

    /**
     * @param  array<string, string>  $tableNames
     */
    private function upsertPermissions(array $tableNames): void
    {
        $permissionsTable = $tableNames['permissions'] ?? 'permissions';
        $hasDisplayName = Schema::hasColumn($permissionsTable, 'display_name');
        $hasModule = Schema::hasColumn($permissionsTable, 'module');
        $hasAction = Schema::hasColumn($permissionsTable, 'action');

        foreach ($this->permissionCatalog() as $permissionData) {
            $existingPermission = DB::table($permissionsTable)
                ->where('name', $permissionData['name'])
                ->where('guard_name', 'web')
                ->first();

            if (empty($existingPermission)) {
                $insertData = [
                    'name' => $permissionData['name'],
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                if ($hasDisplayName) {
                    $insertData['display_name'] = $permissionData['display_name'];
                }
                if ($hasModule) {
                    $insertData['module'] = $permissionData['module'];
                }
                if ($hasAction) {
                    $insertData['action'] = $permissionData['action'];
                }

                DB::table($permissionsTable)->insert($insertData);
                continue;
            }

            $updates = ['updated_at' => now()];

            if ($hasDisplayName && ($existingPermission->display_name ?? null) !== $permissionData['display_name']) {
                $updates['display_name'] = $permissionData['display_name'];
            }
            if ($hasModule && ($existingPermission->module ?? null) !== $permissionData['module']) {
                $updates['module'] = $permissionData['module'];
            }
            if ($hasAction && ($existingPermission->action ?? null) !== $permissionData['action']) {
                $updates['action'] = $permissionData['action'];
            }

            if (count($updates) > 1) {
                DB::table($permissionsTable)
                    ->where('id', $existingPermission->id)
                    ->update($updates);
            }
        }
    }

    /**
     * @param  array<string, string>  $tableNames
     * @param  array<string, string|null>  $columnNames
     */
    private function copyLegacyAssignments(array $tableNames, array $columnNames, bool $teams): void
    {
        $permissionsTable = $tableNames['permissions'] ?? 'permissions';
        $roleHasPermissionsTable = $tableNames['role_has_permissions'] ?? 'role_has_permissions';
        $modelHasPermissionsTable = $tableNames['model_has_permissions'] ?? 'model_has_permissions';
        $modelMorphKey = $columnNames['model_morph_key'] ?? 'model_id';
        $teamForeignKey = $columnNames['team_foreign_key'] ?? 'team_id';
        $hasModelPermissionTeams = $teams && Schema::hasTable($modelHasPermissionsTable) && Schema::hasColumn($modelHasPermissionsTable, $teamForeignKey);

        $permissionIdByName = DB::table($permissionsTable)
            ->pluck('id', 'name')
            ->all();

        $hasModelPermissions = Schema::hasTable($modelHasPermissionsTable);

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
    }

    /**
     * @param  array<string, string>  $tableNames
     */
    private function assignDefaultRoles(array $tableNames): void
    {
        $permissionsTable = $tableNames['permissions'] ?? 'permissions';
        $rolesTable = $tableNames['roles'] ?? 'roles';
        $roleHasPermissionsTable = $tableNames['role_has_permissions'] ?? 'role_has_permissions';
        $hasRoleDisplayName = Schema::hasColumn($rolesTable, 'display_name');
        $permissionIdByName = DB::table($permissionsTable)
            ->pluck('id', 'name')
            ->all();

        $adminRole = DB::table($rolesTable)
            ->where('name', 'admin')
            ->where('guard_name', 'web')
            ->first();

        if (empty($adminRole)) {
            $adminRoleId = DB::table($rolesTable)->insertGetId([
                'name' => 'admin',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
                ...($hasRoleDisplayName ? ['display_name' => 'Admin'] : []),
            ]);
        } else {
            $adminRoleId = (int) $adminRole->id;
            if ($hasRoleDisplayName && empty($adminRole->display_name)) {
                DB::table($rolesTable)->where('id', $adminRoleId)->update([
                    'display_name' => 'Admin',
                    'updated_at' => now(),
                ]);
            }
        }

        $allPermissionIds = DB::table($permissionsTable)->pluck('id')->values()->all();
        foreach ($allPermissionIds as $permissionId) {
            DB::table($roleHasPermissionsTable)->insertOrIgnore([
                'permission_id' => (int) $permissionId,
                'role_id' => (int) $adminRoleId,
            ]);
        }

        $cashierRole = DB::table($rolesTable)
            ->where('name', 'CAJERO')
            ->where('guard_name', 'web')
            ->first();

        if (empty($cashierRole)) {
            $cashierRoleId = DB::table($rolesTable)->insertGetId([
                'name' => 'CAJERO',
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
                ...($hasRoleDisplayName ? ['display_name' => 'CAJERO'] : []),
            ]);
        } else {
            $cashierRoleId = (int) $cashierRole->id;
            if ($hasRoleDisplayName && empty($cashierRole->display_name)) {
                DB::table($rolesTable)->where('id', $cashierRoleId)->update([
                    'display_name' => 'CAJERO',
                    'updated_at' => now(),
                ]);
            }
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

        foreach ($cashierPermissionIds as $permissionId) {
            DB::table($roleHasPermissionsTable)->insertOrIgnore([
                'permission_id' => (int) $permissionId,
                'role_id' => (int) $cashierRoleId,
            ]);
        }
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
};
