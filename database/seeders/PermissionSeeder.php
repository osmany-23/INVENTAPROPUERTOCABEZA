<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hasDisplayName = Schema::hasColumn('permissions', 'display_name');
        $hasModule = Schema::hasColumn('permissions', 'module');
        $hasAction = Schema::hasColumn('permissions', 'action');

        foreach ($this->permissionNames() as $permissionName) {
            $metadata = $this->buildPermissionMetadata($permissionName);
            $createPayload = ['guard_name' => 'web'];

            if ($hasDisplayName) {
                $createPayload['display_name'] = $metadata['display_name'];
            }
            if ($hasModule) {
                $createPayload['module'] = $metadata['module'];
            }
            if ($hasAction) {
                $createPayload['action'] = $metadata['action'];
            }

            $permission = Permission::query()->firstOrCreate(
                [
                    'name' => $permissionName,
                    'guard_name' => 'web',
                ],
                $createPayload
            );

            $updates = [];
            if ($hasDisplayName && empty($permission->display_name)) {
                $updates['display_name'] = $metadata['display_name'];
            }
            if ($hasModule && empty($permission->module)) {
                $updates['module'] = $metadata['module'];
            }
            if ($hasAction && empty($permission->action)) {
                $updates['action'] = $metadata['action'];
            }

            if (!empty($updates)) {
                $permission->update($updates);
            }
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    /**
     * @return string[]
     */
    private function permissionNames(): array
    {
        $legacyPermissions = [
            'manage_dashboard',
            'manage_roles',
            'manage_brands',
            'manage_currency',
            'manage_warehouses',
            'manage_units',
            'manage_product_categories',
            'manage_variations',
            'manage_products',
            'manage_suppliers',
            'manage_customers',
            'manage_users',
            'manage_expense_categories',
            'manage_expenses',
            'manage_setting',
            'manage_purchase',
            'manage_purchase_return',
            'manage_pos_screen',
            'manage_sale',
            'manage_sale_return',
            'manage_print_barcode',
            'manage_adjustments',
            'manage_transfers',
            'manage_reports',
            'manage_report',
            'manage_email_templates',
            'manage_quotations',
            'manage_sms_apis',
            'manage_sms_templates',
            'manage_language',
        ];

        $granularPermissions = [
            'products.view',
            'products.create',
            'products.update',
            'products.delete',
            'products.view_purchase_price',
            'product.view',
            'product.create',
            'product.edit',
            'product.delete',
            'product.view_purchase_price',

            'purchase.view',
            'purchase.create',
            'purchase.update',
            'purchase.delete',
            'purchase.edit',
            'purchases.view',
            'purchases.create',
            'purchases.update',
            'purchases.edit',
            'purchases.delete',

            'customer.view',
            'customer.create',
            'customer.update',
            'customer.delete',
            'customer.edit',
            'customers.view',
            'customers.create',
            'customers.update',
            'customers.edit',
            'customers.delete',

            'supplier.view',
            'supplier.create',
            'supplier.update',
            'supplier.delete',
            'supplier.edit',
            'suppliers.view',
            'suppliers.create',
            'suppliers.update',
            'suppliers.edit',
            'suppliers.delete',

            'user.view',
            'user.create',
            'user.update',
            'user.delete',
            'user.edit',
            'user.update_credentials',
            'user.edit_credentials',
            'users.view',
            'users.create',
            'users.update',
            'users.edit',
            'users.delete',

            'pos.view',
            'pos.create_sale',
            'pos.edit_sale',
            'pos.delete_sale',
            'pos.apply_discount',
            'pos.cancel_sale',
            'pos.edit_product',
            'pos.edit_cart_product',
            'pos_screen.view',
            'pos_screen.apply_discount',
            'pos_screen.cancel_sale',
            'pos_screen.edit_product',
            'sale.create',
            'sale.update',
            'sale.edit',
            'sale.delete',

            'view_purchase_price',
            'edit_pos_sale_price',
            'view_stock_alerts',
            'dashboard.view_stock_alerts',

            'report.sales',
            'report.purchases',
            'report.profit',
        ];

        $fromHelpers = [];
        foreach (array_keys(strictPermissionConfigMap()) as $permissionName) {
            $fromHelpers[] = $permissionName;
            $config = strictPermissionConfigMap()[$permissionName] ?? [];
            foreach ($config['aliases'] ?? [] as $aliasPermission) {
                $fromHelpers[] = $aliasPermission;
            }
            if (!empty($config['legacy_permission'])) {
                $fromHelpers[] = $config['legacy_permission'];
            }
        }

        foreach (permissionLegacyMap() as $permissionName => $legacyPermissionsForName) {
            $fromHelpers[] = $permissionName;
            foreach ($legacyPermissionsForName as $legacyPermission) {
                $fromHelpers[] = $legacyPermission;
            }
        }

        foreach (permissionModuleLegacyMap() as $legacyPermission) {
            $fromHelpers[] = $legacyPermission;
        }

        $permissions = array_merge($legacyPermissions, $granularPermissions, $fromHelpers);

        return array_values(array_unique(array_filter(array_map('normalizePermissionName', $permissions))));
    }

    /**
     * @return array{display_name: string, module: string, action: string}
     */
    private function buildPermissionMetadata(string $permissionName): array
    {
        $permissionName = normalizePermissionName($permissionName);

        if (str_starts_with($permissionName, 'manage_')) {
            $module = Str::after($permissionName, 'manage_');

            return [
                'display_name' => 'Manage '.Str::headline(str_replace('_', ' ', $module)),
                'module' => $module,
                'action' => 'manage',
            ];
        }

        if (str_contains($permissionName, '.')) {
            [$module, $rawAction] = explode('.', $permissionName, 2);
            $action = $this->normalizeAction($rawAction);

            return [
                'display_name' => Str::headline(str_replace('_', ' ', $module)).' - '.Str::headline(str_replace('_', ' ', $action)),
                'module' => $module,
                'action' => $action,
            ];
        }

        $specialMap = [
            'view_purchase_price' => ['module' => 'products', 'action' => 'special', 'display' => 'Products - View Purchase Price'],
            'edit_pos_sale_price' => ['module' => 'pos_screen', 'action' => 'special', 'display' => 'POS - Edit Sale Price'],
            'view_stock_alerts' => ['module' => 'dashboard', 'action' => 'special', 'display' => 'Dashboard - View Stock Alerts'],
        ];

        if (isset($specialMap[$permissionName])) {
            return [
                'display_name' => $specialMap[$permissionName]['display'],
                'module' => $specialMap[$permissionName]['module'],
                'action' => $specialMap[$permissionName]['action'],
            ];
        }

        return [
            'display_name' => Str::headline(str_replace(['_', '.'], ' ', $permissionName)),
            'module' => Str::before($permissionName, '_') ?: 'general',
            'action' => 'special',
        ];
    }

    private function normalizeAction(string $action): string
    {
        $normalizedAction = normalizePermissionName($action);

        return match ($normalizedAction) {
            'edit' => 'update',
            'remove' => 'delete',
            'view', 'create', 'update', 'delete', 'manage' => $normalizedAction,
            default => 'special',
        };
    }
}
