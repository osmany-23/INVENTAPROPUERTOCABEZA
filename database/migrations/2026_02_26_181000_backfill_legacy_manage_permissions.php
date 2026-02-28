<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    public function up(): void
    {
        $permissions = DB::table('permissions')
            ->select(['id', 'name'])
            ->get();

        if ($permissions->isEmpty()) {
            return;
        }

        $permissionIdByName = $permissions
            ->pluck('id', 'name')
            ->all();

        $granularToLegacyIdMap = [];

        foreach ($permissions as $permission) {
            $permissionName = strtolower(trim((string) $permission->name));
            if ($permissionName === '' || str_starts_with($permissionName, 'manage_')) {
                continue;
            }

            $legacyIds = collect(legacyPermissionsForPermissionName($permissionName))
                ->filter(fn ($legacyName) => str_starts_with($legacyName, 'manage_'))
                ->map(fn ($legacyName) => $permissionIdByName[$legacyName] ?? null)
                ->filter()
                ->unique()
                ->values()
                ->all();

            if (! empty($legacyIds)) {
                $granularToLegacyIdMap[(int) $permission->id] = $legacyIds;
            }
        }

        foreach ($granularToLegacyIdMap as $granularPermissionId => $legacyPermissionIds) {
            $roleIds = DB::table('role_has_permissions')
                ->where('permission_id', $granularPermissionId)
                ->pluck('role_id')
                ->all();

            foreach ($roleIds as $roleId) {
                foreach ($legacyPermissionIds as $legacyPermissionId) {
                    DB::table('role_has_permissions')->insertOrIgnore([
                        'permission_id' => $legacyPermissionId,
                        'role_id' => $roleId,
                    ]);
                }
            }

            $directPermissionModels = DB::table('model_has_permissions')
                ->where('permission_id', $granularPermissionId)
                ->select(['model_type', 'model_id'])
                ->get();

            foreach ($directPermissionModels as $modelPermission) {
                foreach ($legacyPermissionIds as $legacyPermissionId) {
                    DB::table('model_has_permissions')->insertOrIgnore([
                        'permission_id' => $legacyPermissionId,
                        'model_type' => $modelPermission->model_type,
                        'model_id' => $modelPermission->model_id,
                    ]);
                }
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // No se eliminan permisos en rollback para evitar perdida de datos.
    }
};
