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

        $canonicalPermissions = [
            'products.view' => [
                'module' => 'products',
                'action' => 'view',
                'display_name' => 'Productos - Ver listado y detalle',
            ],
            'products.create' => [
                'module' => 'products',
                'action' => 'create',
                'display_name' => 'Productos - Crear',
            ],
            'products.update' => [
                'module' => 'products',
                'action' => 'update',
                'display_name' => 'Productos - Actualizar',
            ],
            'products.delete' => [
                'module' => 'products',
                'action' => 'delete',
                'display_name' => 'Productos - Eliminar',
            ],
            'purchase.view' => [
                'module' => 'purchase',
                'action' => 'view',
                'display_name' => 'Compras - Ver listado y detalle',
            ],
            'purchase.create' => [
                'module' => 'purchase',
                'action' => 'create',
                'display_name' => 'Compras - Crear',
            ],
            'purchase.update' => [
                'module' => 'purchase',
                'action' => 'update',
                'display_name' => 'Compras - Actualizar',
            ],
            'purchase.delete' => [
                'module' => 'purchase',
                'action' => 'delete',
                'display_name' => 'Compras - Eliminar',
            ],
            'customer.view' => [
                'module' => 'customer',
                'action' => 'view',
                'display_name' => 'Clientes - Ver listado y detalle',
            ],
            'customer.create' => [
                'module' => 'customer',
                'action' => 'create',
                'display_name' => 'Clientes - Crear',
            ],
            'customer.update' => [
                'module' => 'customer',
                'action' => 'update',
                'display_name' => 'Clientes - Actualizar',
            ],
            'customer.delete' => [
                'module' => 'customer',
                'action' => 'delete',
                'display_name' => 'Clientes - Eliminar',
            ],
            'supplier.view' => [
                'module' => 'supplier',
                'action' => 'view',
                'display_name' => 'Proveedores - Ver listado y detalle',
            ],
            'supplier.create' => [
                'module' => 'supplier',
                'action' => 'create',
                'display_name' => 'Proveedores - Crear',
            ],
            'supplier.update' => [
                'module' => 'supplier',
                'action' => 'update',
                'display_name' => 'Proveedores - Actualizar',
            ],
            'supplier.delete' => [
                'module' => 'supplier',
                'action' => 'delete',
                'display_name' => 'Proveedores - Eliminar',
            ],
            'user.view' => [
                'module' => 'user',
                'action' => 'view',
                'display_name' => 'Usuarios - Ver listado y detalle',
            ],
            'user.create' => [
                'module' => 'user',
                'action' => 'create',
                'display_name' => 'Usuarios - Crear',
            ],
            'user.update' => [
                'module' => 'user',
                'action' => 'update',
                'display_name' => 'Usuarios - Actualizar',
            ],
            'user.delete' => [
                'module' => 'user',
                'action' => 'delete',
                'display_name' => 'Usuarios - Eliminar',
            ],
            'pos.view' => [
                'module' => 'pos',
                'action' => 'view',
                'display_name' => 'POS - Ver pantalla de ventas',
            ],
            'view_purchase_price' => [
                'module' => 'products',
                'action' => 'special',
                'display_name' => 'Productos - Ver precio de compra',
            ],
            'edit_pos_sale_price' => [
                'module' => 'pos_screen',
                'action' => 'special',
                'display_name' => 'POS - Editar precio de venta',
            ],
            'view_stock_alerts' => [
                'module' => 'dashboard',
                'action' => 'special',
                'display_name' => 'Dashboard - Ver alertas de stock',
            ],
        ];

        foreach ($canonicalPermissions as $name => $meta) {
            $existingPermission = DB::table('permissions')->where('name', $name)->first();

            if (empty($existingPermission)) {
                $insertData = [
                    'name' => $name,
                    'guard_name' => 'web',
                    'created_at' => now(),
                    'updated_at' => now(),
                ];

                if ($hasModule) {
                    $insertData['module'] = $meta['module'];
                }

                if ($hasAction) {
                    $insertData['action'] = $meta['action'];
                }

                if ($hasDisplayName) {
                    $insertData['display_name'] = $meta['display_name'];
                }

                DB::table('permissions')->insert($insertData);
                continue;
            }

            $updates = ['updated_at' => now()];

            if ($hasModule && empty($existingPermission->module)) {
                $updates['module'] = $meta['module'];
            }

            if ($hasAction && empty($existingPermission->action)) {
                $updates['action'] = $meta['action'];
            }

            if ($hasDisplayName && $existingPermission->display_name !== $meta['display_name']) {
                $updates['display_name'] = $meta['display_name'];
            }

            if (count($updates) > 1) {
                DB::table('permissions')
                    ->where('id', $existingPermission->id)
                    ->update($updates);
            }
        }

        $duplicateAliases = [
            'customers.view' => 'customer.view',
            'customers.create' => 'customer.create',
            'customers.update' => 'customer.update',
            'customers.delete' => 'customer.delete',
            'suppliers.view' => 'supplier.view',
            'suppliers.create' => 'supplier.create',
            'suppliers.update' => 'supplier.update',
            'suppliers.delete' => 'supplier.delete',
            'users.view' => 'user.view',
            'users.create' => 'user.create',
            'users.update' => 'user.update',
            'users.delete' => 'user.delete',
            'product.view' => 'products.view',
            'product.create' => 'products.create',
            'product.edit' => 'products.update',
            'product.delete' => 'products.delete',
            'product.view_purchase_price' => 'view_purchase_price',
            'purchase.edit' => 'purchase.update',
            'pos_screen.view' => 'pos.view',
        ];

        $permissionIdByName = DB::table('permissions')
            ->pluck('id', 'name')
            ->all();

        foreach ($duplicateAliases as $aliasName => $canonicalName) {
            $aliasPermissionId = $permissionIdByName[$aliasName] ?? null;
            $canonicalPermissionId = $permissionIdByName[$canonicalName] ?? null;

            if (empty($aliasPermissionId) || empty($canonicalPermissionId) || $aliasPermissionId === $canonicalPermissionId) {
                continue;
            }

            $roleIds = DB::table('role_has_permissions')
                ->where('permission_id', $aliasPermissionId)
                ->pluck('role_id')
                ->all();

            foreach ($roleIds as $roleId) {
                DB::table('role_has_permissions')->insertOrIgnore([
                    'permission_id' => (int) $canonicalPermissionId,
                    'role_id' => (int) $roleId,
                ]);
            }

            $directModelPermissions = DB::table('model_has_permissions')
                ->where('permission_id', $aliasPermissionId)
                ->select(['model_type', 'model_id'])
                ->get();

            foreach ($directModelPermissions as $modelPermission) {
                DB::table('model_has_permissions')->insertOrIgnore([
                    'permission_id' => (int) $canonicalPermissionId,
                    'model_type' => $modelPermission->model_type,
                    'model_id' => $modelPermission->model_id,
                ]);
            }

            DB::table('permissions')
                ->where('id', $aliasPermissionId)
                ->delete();
        }

        if ($hasDisplayName) {
            $viewPermissionLabelMap = [
                'adjustments' => 'Ajustes',
                'brands' => 'Marcas',
                'currency' => 'Monedas',
                'customer' => 'Clientes',
                'customers' => 'Clientes',
                'dashboard' => 'Dashboard',
                'email_templates' => 'Plantillas de correo',
                'expense_categories' => 'Categorias de gastos',
                'expenses' => 'Gastos',
                'language' => 'Idiomas',
                'pos' => 'POS',
                'pos_screen' => 'POS',
                'product_categories' => 'Categorias de productos',
                'products' => 'Productos',
                'purchase' => 'Compras',
                'purchase_return' => 'Devoluciones de compras',
                'quotations' => 'Cotizaciones',
                'reports' => 'Reportes',
                'roles' => 'Roles',
                'sale' => 'Ventas',
                'sale_return' => 'Devoluciones de ventas',
                'setting' => 'Configuracion',
                'sms_apis' => 'Integraciones SMS',
                'sms_templates' => 'Plantillas SMS',
                'supplier' => 'Proveedores',
                'suppliers' => 'Proveedores',
                'transfers' => 'Transferencias',
                'units' => 'Unidades',
                'user' => 'Usuarios',
                'users' => 'Usuarios',
                'variations' => 'Variaciones',
                'warehouses' => 'Almacenes',
            ];

            $viewPermissions = DB::table('permissions')
                ->where('name', 'like', '%.view')
                ->get(['id', 'name']);

            foreach ($viewPermissions as $viewPermission) {
                $moduleName = explode('.', $viewPermission->name)[0];
                $moduleLabel = $viewPermissionLabelMap[$moduleName] ?? ucfirst(str_replace('_', ' ', $moduleName));

                $displayName = $moduleLabel.' - Ver listado y detalle';

                if ($viewPermission->name === 'dashboard.view') {
                    $displayName = 'Dashboard - Ver indicadores';
                }

                if ($viewPermission->name === 'reports.view') {
                    $displayName = 'Reportes - Ver panel de reportes';
                }

                if ($viewPermission->name === 'pos.view') {
                    $displayName = 'POS - Ver pantalla de ventas';
                }

                DB::table('permissions')
                    ->where('id', $viewPermission->id)
                    ->update([
                        'display_name' => $displayName,
                        'updated_at' => now(),
                    ]);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    public function down(): void
    {
        // No se revierte para evitar perdida de asignaciones de permisos.
    }
};
