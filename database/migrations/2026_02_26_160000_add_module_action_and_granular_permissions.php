<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('permissions', function (Blueprint $table) {
            if (!Schema::hasColumn('permissions', 'module')) {
                $table->string('module')->nullable()->after('name');
            }
            if (!Schema::hasColumn('permissions', 'action')) {
                $table->string('action')->nullable()->after('module');
            }
        });

        $hasDisplayName = Schema::hasColumn('permissions', 'display_name');
        $requiredPermissions = [
            ['name' => 'pos.view', 'module' => 'pos', 'action' => 'view', 'display_name' => 'POS - Ver'],
            ['name' => 'pos.create_sale', 'module' => 'pos', 'action' => 'create', 'display_name' => 'POS - Crear venta'],
            ['name' => 'pos.edit_sale', 'module' => 'pos', 'action' => 'update', 'display_name' => 'POS - Editar venta'],
            ['name' => 'pos.delete_sale', 'module' => 'pos', 'action' => 'delete', 'display_name' => 'POS - Eliminar venta'],
            ['name' => 'pos.apply_discount', 'module' => 'pos', 'action' => 'special', 'display_name' => 'POS - Aplicar descuento'],
            ['name' => 'pos.cancel_sale', 'module' => 'pos', 'action' => 'special', 'display_name' => 'POS - Cancelar venta'],

            ['name' => 'product.view', 'module' => 'product', 'action' => 'view', 'display_name' => 'Productos - Ver'],
            ['name' => 'product.create', 'module' => 'product', 'action' => 'create', 'display_name' => 'Productos - Crear'],
            ['name' => 'product.edit', 'module' => 'product', 'action' => 'update', 'display_name' => 'Productos - Editar'],
            ['name' => 'product.delete', 'module' => 'product', 'action' => 'delete', 'display_name' => 'Productos - Eliminar'],
            ['name' => 'product.view_purchase_price', 'module' => 'product', 'action' => 'special', 'display_name' => 'Productos - Ver precio compra'],

            ['name' => 'purchase.view', 'module' => 'purchase', 'action' => 'view', 'display_name' => 'Compras - Ver'],
            ['name' => 'purchase.create', 'module' => 'purchase', 'action' => 'create', 'display_name' => 'Compras - Crear'],
            ['name' => 'purchase.edit', 'module' => 'purchase', 'action' => 'update', 'display_name' => 'Compras - Editar'],
            ['name' => 'purchase.delete', 'module' => 'purchase', 'action' => 'delete', 'display_name' => 'Compras - Eliminar'],

            ['name' => 'customer.view', 'module' => 'customer', 'action' => 'view', 'display_name' => 'Clientes - Ver'],
            ['name' => 'customer.create', 'module' => 'customer', 'action' => 'create', 'display_name' => 'Clientes - Crear'],
            ['name' => 'customer.edit', 'module' => 'customer', 'action' => 'update', 'display_name' => 'Clientes - Editar'],
            ['name' => 'customer.delete', 'module' => 'customer', 'action' => 'delete', 'display_name' => 'Clientes - Eliminar'],

            ['name' => 'report.sales', 'module' => 'report', 'action' => 'special', 'display_name' => 'Reportes - Ventas'],
            ['name' => 'report.purchases', 'module' => 'report', 'action' => 'special', 'display_name' => 'Reportes - Compras'],
            ['name' => 'report.profit', 'module' => 'report', 'action' => 'special', 'display_name' => 'Reportes - Utilidad'],
        ];

        foreach ($requiredPermissions as $permission) {
            $exists = DB::table('permissions')->where('name', $permission['name'])->first();

            if ($exists) {
                $updates = [];
                if (empty($exists->module)) {
                    $updates['module'] = $permission['module'];
                }
                if (empty($exists->action)) {
                    $updates['action'] = $permission['action'];
                }
                if ($hasDisplayName && empty($exists->display_name)) {
                    $updates['display_name'] = $permission['display_name'];
                }

                if (!empty($updates)) {
                    DB::table('permissions')->where('id', $exists->id)->update($updates);
                }

                continue;
            }

            $insertData = [
                'name' => $permission['name'],
                'module' => $permission['module'],
                'action' => $permission['action'],
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now(),
            ];
            if ($hasDisplayName) {
                $insertData['display_name'] = $permission['display_name'];
            }

            DB::table('permissions')->insert($insertData);
        }
    }

    public function down(): void
    {
        // No eliminamos columnas ni permisos para proteger datos en produccion.
    }
};
