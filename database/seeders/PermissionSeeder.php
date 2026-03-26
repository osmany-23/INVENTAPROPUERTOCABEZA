<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $hasDisplayName = Schema::hasColumn('permissions', 'display_name');
        $hasModule = Schema::hasColumn('permissions', 'module');
        $hasAction = Schema::hasColumn('permissions', 'action');

        foreach ($this->permissionCatalog() as $permissionData) {
            $attributes = [
                'name' => $permissionData['name'],
                'guard_name' => 'web',
            ];

            $values = [];
            if ($hasDisplayName) {
                $values['display_name'] = $permissionData['display_name'];
            }
            if ($hasModule) {
                $values['module'] = $permissionData['module'];
            }
            if ($hasAction) {
                $values['action'] = $permissionData['action'];
            }

            $permission = Permission::query()->firstOrCreate($attributes);

            if (! empty($values)) {
                $permission->fill($values);
                if ($permission->isDirty()) {
                    $permission->save();
                }
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @return array<int, array{name: string, display_name: string, module: string, action: string}>
     */
    private function permissionCatalog(): array
    {
        $catalog = [];

        foreach ($this->legacyManagePermissions() as $name => $displayName) {
            $catalog[] = [
                'name' => $name,
                'display_name' => $displayName,
                'module' => Str::after($name, 'manage_'),
                'action' => 'manage',
            ];
        }

        foreach ($this->englishCrudModules() as $module => $viewLabel) {
            $catalog[] = [
                'name' => $module.'.view',
                'display_name' => $viewLabel.' - Ver listado y detalle',
                'module' => $module,
                'action' => 'view',
            ];

            foreach ($this->actionLabels() as $action => $actionLabel) {
                $catalog[] = [
                    'name' => $module.'.'.$action,
                    'display_name' => $this->englishModuleLabel($module).' - '.$actionLabel,
                    'module' => $module,
                    'action' => $action,
                ];
            }
        }

        foreach ($this->canonicalCrudModules() as $module => $label) {
            $catalog[] = [
                'name' => $module.'.view',
                'display_name' => $label.' - Ver listado y detalle',
                'module' => $module,
                'action' => 'view',
            ];

            foreach ($this->actionLabels() as $action => $actionLabel) {
                $catalog[] = [
                    'name' => $module.'.'.$action,
                    'display_name' => $label.' - '.$actionLabel,
                    'module' => $module,
                    'action' => $action,
                ];
            }
        }

        foreach ($this->posScreenPermissions() as $permissionData) {
            $catalog[] = $permissionData;
        }

        foreach ($this->specialPermissions() as $permissionData) {
            $catalog[] = $permissionData;
        }

        return $catalog;
    }

    /**
     * @return array<string, string>
     */
    private function legacyManagePermissions(): array
    {
        return [
            'manage_adjustments' => 'Manage Adjustments',
            'manage_brands' => 'Manage Brands',
            'manage_currency' => 'Manage Currency',
            'manage_customers' => 'Manage Customers',
            'manage_dashboard' => 'Manage Dashboard',
            'manage_email_templates' => 'Manage Email Templates',
            'manage_expense_categories' => 'Manage Expense Categories',
            'manage_expenses' => 'Manage Expenses',
            'manage_language' => 'Manage Language',
            'manage_pos_screen' => 'Manage Pos Screen',
            'manage_product_categories' => 'Manage Product Categories',
            'manage_products' => 'Manage Products',
            'manage_purchase' => 'Manage Purchase',
            'manage_purchase_return' => 'Manage Purchase Return',
            'manage_quotations' => 'Manage Quotations',
            'manage_reports' => 'Manage Reports',
            'manage_roles' => 'Manage Roles',
            'manage_sale' => 'Manage Sale',
            'manage_sale_return' => 'Manage Sale Return',
            'manage_setting' => 'Manage Setting',
            'manage_sms_apis' => 'Manage Sms Apis',
            'manage_sms_templates' => 'Manage Sms Templates',
            'manage_suppliers' => 'Manage Suppliers',
            'manage_transfers' => 'Manage Transfers',
            'manage_units' => 'Manage Units',
            'manage_users' => 'Manage Users',
            'manage_variations' => 'Manage Variations',
            'manage_warehouses' => 'Manage Warehouses',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function englishCrudModules(): array
    {
        return [
            'adjustments' => 'Ajustes',
            'brands' => 'Marcas',
            'currency' => 'Monedas',
            'dashboard' => 'Dashboard',
            'email_templates' => 'Plantillas de correo',
            'expense_categories' => 'Categorias de gastos',
            'expenses' => 'Gastos',
            'language' => 'Idiomas',
            'product_categories' => 'Categorias de productos',
            'purchase_return' => 'Devoluciones de compras',
            'quotations' => 'Cotizaciones',
            'reports' => 'Reportes',
            'roles' => 'Roles',
            'sale' => 'Ventas',
            'sale_return' => 'Devoluciones de ventas',
            'setting' => 'Configuracion',
            'sms_apis' => 'Integraciones SMS',
            'sms_templates' => 'Plantillas SMS',
            'transfers' => 'Transferencias',
            'units' => 'Unidades',
            'variations' => 'Variaciones',
            'warehouses' => 'Almacenes',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function canonicalCrudModules(): array
    {
        return [
            'products' => 'Productos',
            'purchase' => 'Compras',
            'customer' => 'Clientes',
            'supplier' => 'Proveedores',
            'user' => 'Usuarios',
        ];
    }

    /**
     * @return array<string, string>
     */
    private function actionLabels(): array
    {
        return [
            'create' => 'Crear',
            'update' => 'Actualizar',
            'delete' => 'Eliminar',
        ];
    }

    /**
     * @return array<int, array{name: string, display_name: string, module: string, action: string}>
     */
    private function posScreenPermissions(): array
    {
        return [
            [
                'name' => 'pos_screen.create',
                'display_name' => 'Pos Screen - Crear',
                'module' => 'pos_screen',
                'action' => 'create',
            ],
            [
                'name' => 'pos_screen.update',
                'display_name' => 'Pos Screen - Actualizar',
                'module' => 'pos_screen',
                'action' => 'update',
            ],
            [
                'name' => 'pos_screen.delete',
                'display_name' => 'Pos Screen - Eliminar',
                'module' => 'pos_screen',
                'action' => 'delete',
            ],
        ];
    }

    /**
     * @return array<int, array{name: string, display_name: string, module: string, action: string}>
     */
    private function specialPermissions(): array
    {
        return [
            [
                'name' => 'customer.edit',
                'display_name' => 'Clientes - Editar',
                'module' => 'customer',
                'action' => 'update',
            ],
            [
                'name' => 'pos.view',
                'display_name' => 'POS - Ver pantalla de ventas',
                'module' => 'pos',
                'action' => 'view',
            ],
            [
                'name' => 'pos.create_sale',
                'display_name' => 'POS - Crear venta',
                'module' => 'pos',
                'action' => 'create',
            ],
            [
                'name' => 'pos.edit_sale',
                'display_name' => 'POS - Editar venta',
                'module' => 'pos',
                'action' => 'update',
            ],
            [
                'name' => 'pos.delete_sale',
                'display_name' => 'POS - Eliminar venta',
                'module' => 'pos',
                'action' => 'delete',
            ],
            [
                'name' => 'pos.apply_discount',
                'display_name' => 'POS - Aplicar descuento',
                'module' => 'pos',
                'action' => 'special',
            ],
            [
                'name' => 'pos.cancel_sale',
                'display_name' => 'POS - Cancelar venta',
                'module' => 'pos',
                'action' => 'special',
            ],
            [
                'name' => 'report.sales',
                'display_name' => 'Reportes - Ventas',
                'module' => 'report',
                'action' => 'special',
            ],
            [
                'name' => 'report.purchases',
                'display_name' => 'Reportes - Compras',
                'module' => 'report',
                'action' => 'special',
            ],
            [
                'name' => 'report.profit',
                'display_name' => 'Reportes - Utilidad',
                'module' => 'report',
                'action' => 'special',
            ],
            [
                'name' => 'view_purchase_price',
                'display_name' => 'Productos - Ver precio de compra',
                'module' => 'products',
                'action' => 'special',
            ],
            [
                'name' => 'edit_pos_sale_price',
                'display_name' => 'POS - Editar precio de venta',
                'module' => 'pos_screen',
                'action' => 'special',
            ],
            [
                'name' => 'view_stock_alerts',
                'display_name' => 'Dashboard - Ver alertas de stock',
                'module' => 'dashboard',
                'action' => 'special',
            ],
            [
                'name' => 'user.update_credentials',
                'display_name' => 'Usuarios - Editar credenciales (correo y contrasena)',
                'module' => 'user',
                'action' => 'special',
            ],
        ];
    }

    private function englishModuleLabel(string $module): string
    {
        return Str::headline(str_replace('_', ' ', $module));
    }
}
