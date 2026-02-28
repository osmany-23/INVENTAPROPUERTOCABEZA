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

        $requiredPermissions = [
            [
                'name' => 'view_purchase_price',
                'module' => 'products',
                'action' => 'special',
                'display_name' => 'Productos - Ver precio compra',
            ],
            [
                'name' => 'edit_pos_sale_price',
                'module' => 'pos_screen',
                'action' => 'special',
                'display_name' => 'POS - Editar precio de venta',
            ],
            [
                'name' => 'view_stock_alerts',
                'module' => 'dashboard',
                'action' => 'special',
                'display_name' => 'Dashboard - Ver alertas de stock',
            ],
        ];

        foreach ($requiredPermissions as $permission) {
            $existingPermission = DB::table('permissions')
                ->where('name', $permission['name'])
                ->first();

            if (! empty($existingPermission)) {
                $updates = [];

                if ($hasModule && empty($existingPermission->module)) {
                    $updates['module'] = $permission['module'];
                }

                if ($hasAction && empty($existingPermission->action)) {
                    $updates['action'] = $permission['action'];
                }

                if ($hasDisplayName && empty($existingPermission->display_name)) {
                    $updates['display_name'] = $permission['display_name'];
                }

                if (! empty($updates)) {
                    DB::table('permissions')
                        ->where('id', $existingPermission->id)
                        ->update($updates);
                }

                continue;
            }

            $insertData = [
                'name' => $permission['name'],
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ];

            if ($hasModule) {
                $insertData['module'] = $permission['module'];
            }

            if ($hasAction) {
                $insertData['action'] = $permission['action'];
            }

            if ($hasDisplayName) {
                $insertData['display_name'] = $permission['display_name'];
            }

            DB::table('permissions')->insert($insertData);
        }

        $permissionIdByName = DB::table('permissions')
            ->pluck('id', 'name')
            ->all();

        $permissionCopyMap = [
            'view_purchase_price' => [
                'products.view_purchase_price',
                'product.view_purchase_price',
            ],
            'edit_pos_sale_price' => [
                'pos_screen.edit_product',
                'pos.edit_product',
                'pos.edit_cart_product',
            ],
            'view_stock_alerts' => [
                'manage_dashboard',
                'dashboard.view_stock_alerts',
            ],
        ];

        foreach ($permissionCopyMap as $targetPermissionName => $sourcePermissionNames) {
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

            $roleIds = DB::table('role_has_permissions')
                ->whereIn('permission_id', $sourcePermissionIds)
                ->pluck('role_id')
                ->unique()
                ->values()
                ->all();

            foreach ($roleIds as $roleId) {
                DB::table('role_has_permissions')->insertOrIgnore([
                    'permission_id' => $targetPermissionId,
                    'role_id' => (int) $roleId,
                ]);
            }

            $directModelPermissions = DB::table('model_has_permissions')
                ->whereIn('permission_id', $sourcePermissionIds)
                ->select(['model_type', 'model_id'])
                ->get();

            foreach ($directModelPermissions as $modelPermission) {
                DB::table('model_has_permissions')->insertOrIgnore([
                    'permission_id' => $targetPermissionId,
                    'model_type' => $modelPermission->model_type,
                    'model_id' => $modelPermission->model_id,
                ]);
            }
        }

        $obsoletePermissionNames = [
            'specific_options',
            'specific_option',
            'options.specific',
            'specific.options',
            'opciones_especificas',
            'opcion_especifica',
        ];

        DB::table('permissions')
            ->whereIn('name', $obsoletePermissionNames)
            ->delete();

        if ($hasAction) {
            DB::table('permissions')
                ->whereIn('action', ['specific_options', 'specific_option'])
                ->delete();
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // Se preservan permisos para no perder configuracion en produccion.
    }
};
