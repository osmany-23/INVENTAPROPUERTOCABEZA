<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    public function up(): void
    {
        $hasDisplayName = Schema::hasColumn('permissions', 'display_name');
        $hasModule = Schema::hasColumn('permissions', 'module');
        $hasAction = Schema::hasColumn('permissions', 'action');

        $permissionName = 'user.update_credentials';
        $permissionMeta = [
            'module' => 'user',
            'action' => 'special',
            'display_name' => 'Usuarios - Editar credenciales (correo y contrasena)',
        ];

        $existingPermission = DB::table('permissions')
            ->where('name', $permissionName)
            ->first();

        if (empty($existingPermission)) {
            $insertData = [
                'name' => $permissionName,
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if ($hasModule) {
                $insertData['module'] = $permissionMeta['module'];
            }

            if ($hasAction) {
                $insertData['action'] = $permissionMeta['action'];
            }

            if ($hasDisplayName) {
                $insertData['display_name'] = $permissionMeta['display_name'];
            }

            DB::table('permissions')->insert($insertData);
        } else {
            $updates = ['updated_at' => now()];

            if ($hasModule && empty($existingPermission->module)) {
                $updates['module'] = $permissionMeta['module'];
            }

            if ($hasAction && empty($existingPermission->action)) {
                $updates['action'] = $permissionMeta['action'];
            }

            if ($hasDisplayName && $existingPermission->display_name !== $permissionMeta['display_name']) {
                $updates['display_name'] = $permissionMeta['display_name'];
            }

            if (count($updates) > 1) {
                DB::table('permissions')
                    ->where('id', $existingPermission->id)
                    ->update($updates);
            }
        }

        $permissionIdByName = DB::table('permissions')
            ->pluck('id', 'name')
            ->all();

        $targetPermissionId = $permissionIdByName[$permissionName] ?? null;
        if (empty($targetPermissionId)) {
            app(PermissionRegistrar::class)->forgetCachedPermissions();

            return;
        }

        $sourcePermissionIds = collect([
            $permissionIdByName['manage_users'] ?? null,
            $permissionIdByName['user.update'] ?? null,
            $permissionIdByName['users.update'] ?? null,
        ])
            ->filter()
            ->unique()
            ->values()
            ->all();

        if (! empty($sourcePermissionIds)) {
            $roleIds = DB::table('role_has_permissions')
                ->whereIn('permission_id', $sourcePermissionIds)
                ->pluck('role_id')
                ->unique()
                ->values()
                ->all();

            foreach ($roleIds as $roleId) {
                DB::table('role_has_permissions')->insertOrIgnore([
                    'permission_id' => (int) $targetPermissionId,
                    'role_id' => (int) $roleId,
                ]);
            }

            $directModelPermissions = DB::table('model_has_permissions')
                ->whereIn('permission_id', $sourcePermissionIds)
                ->select(['model_type', 'model_id'])
                ->get();

            foreach ($directModelPermissions as $modelPermission) {
                DB::table('model_has_permissions')->insertOrIgnore([
                    'permission_id' => (int) $targetPermissionId,
                    'model_type' => $modelPermission->model_type,
                    'model_id' => $modelPermission->model_id,
                ]);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // No se elimina para preservar asignaciones existentes.
    }
};
