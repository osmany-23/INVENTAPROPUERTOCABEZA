<?php

use App\Models\Currency;
use App\Models\ManageStock;
use App\Models\Setting;
use App\Models\Supplier;
use Illuminate\Support\Facades\File;

if (! function_exists('getPageSize')) {
    /**
     * @return mixed
     */
    function getPageSize($request)
    {
        $pageSize = (int) $request->input('page.size', 10);

        // Frontend usa page[size]=0 para pedir "todos".
        if ($pageSize <= 0) {
            return 100000;
        }

        return $pageSize;
    }
}

if (! function_exists('permissionLegacyMap')) {
    function permissionLegacyMap(): array
    {
        return [
            'pos.view' => ['manage_pos_screen', 'manage_sale'],
            'pos.create_sale' => ['manage_pos_screen', 'manage_sale'],
            'pos.edit_sale' => ['manage_sale'],
            'pos.delete_sale' => ['manage_sale'],
            'pos.apply_discount' => ['manage_pos_screen', 'manage_sale'],
            'pos.cancel_sale' => ['manage_pos_screen', 'manage_sale'],
            'pos_screen.edit_product' => ['manage_pos_screen'],
            'pos.edit_product' => ['manage_pos_screen'],
            'pos.edit_cart_product' => ['manage_pos_screen'],

            'product.view' => ['manage_products', 'manage_pos_screen', 'manage_sale', 'manage_purchase'],
            'products.view' => ['manage_products'],
            'product.create' => ['manage_products'],
            'products.create' => ['manage_products'],
            'product.edit' => ['manage_products'],
            'products.update' => ['manage_products'],
            'product.delete' => ['manage_products'],
            'products.delete' => ['manage_products'],
            'product.view_purchase_price' => ['manage_products'],
            'products.view_purchase_price' => ['manage_products'],
            'view_purchase_price' => ['manage_products'],
            'edit_pos_sale_price' => ['manage_pos_screen', 'manage_sale'],
            'view_stock_alerts' => ['manage_dashboard'],

            'purchase.view' => ['manage_purchase'],
            'purchase.create' => ['manage_purchase'],
            'purchase.edit' => ['manage_purchase'],
            'purchase.delete' => ['manage_purchase'],

            'customer.view' => ['manage_customers'],
            'customers.view' => ['manage_customers'],
            'customer.create' => ['manage_customers'],
            'customers.create' => ['manage_customers'],
            'customer.edit' => ['manage_customers'],
            'customers.update' => ['manage_customers'],
            'customer.delete' => ['manage_customers'],
            'customers.delete' => ['manage_customers'],

            'supplier.view' => ['manage_suppliers'],
            'suppliers.view' => ['manage_suppliers'],
            'supplier.create' => ['manage_suppliers'],
            'suppliers.create' => ['manage_suppliers'],
            'supplier.edit' => ['manage_suppliers'],
            'suppliers.update' => ['manage_suppliers'],
            'supplier.delete' => ['manage_suppliers'],
            'suppliers.delete' => ['manage_suppliers'],

            'user.view' => ['manage_users'],
            'users.view' => ['manage_users'],
            'user.create' => ['manage_users'],
            'users.create' => ['manage_users'],
            'user.edit' => ['manage_users'],
            'users.update' => ['manage_users'],
            'user.delete' => ['manage_users'],
            'users.delete' => ['manage_users'],
            'user.update_credentials' => ['manage_users'],
            'user.edit_credentials' => ['manage_users'],

            'report.sales' => ['manage_report', 'manage_reports'],
            'report.purchases' => ['manage_report', 'manage_reports'],
            'report.profit' => ['manage_report', 'manage_reports'],
        ];
    }
}

if (! function_exists('permissionModuleLegacyMap')) {
    function permissionModuleLegacyMap(): array
    {
        return [
            'adjustments' => 'manage_adjustments',
            'transfers' => 'manage_transfers',
            'roles' => 'manage_roles',
            'brands' => 'manage_brands',
            'currency' => 'manage_currency',
            'warehouses' => 'manage_warehouses',
            'units' => 'manage_units',
            'product_categories' => 'manage_product_categories',
            'products' => 'manage_products',
            'suppliers' => 'manage_suppliers',
            'customers' => 'manage_customers',
            'users' => 'manage_users',
            'expense_categories' => 'manage_expense_categories',
            'expenses' => 'manage_expenses',
            'setting' => 'manage_setting',
            'dashboard' => 'manage_dashboard',
            'pos_screen' => 'manage_pos_screen',
            'purchase' => 'manage_purchase',
            'sale' => 'manage_sale',
            'purchase_return' => 'manage_purchase_return',
            'sale_return' => 'manage_sale_return',
            'email_templates' => 'manage_email_templates',
            'reports' => 'manage_reports',
            'quotations' => 'manage_quotations',
            'sms_templates' => 'manage_sms_templates',
            'sms_apis' => 'manage_sms_apis',
            'language' => 'manage_language',
            'variations' => 'manage_variations',
        ];
    }
}

if (! function_exists('permissionModuleAliases')) {
    function permissionModuleAliases(): array
    {
        return [
            'adjustment' => 'adjustments',
            'transfer' => 'transfers',
            'role' => 'roles',
            'brand' => 'brands',
            'warehouse' => 'warehouses',
            'unit' => 'units',
            'product' => 'products',
            'product_category' => 'product_categories',
            'supplier' => 'suppliers',
            'customer' => 'customers',
            'user' => 'users',
            'expense' => 'expenses',
            'expense_category' => 'expense_categories',
            'report' => 'reports',
            'quotation' => 'quotations',
            'email_template' => 'email_templates',
            'sms_template' => 'sms_templates',
            'sms_api' => 'sms_apis',
            'pos' => 'pos_screen',
            'language' => 'language',
            'variation' => 'variations',
        ];
    }
}

if (! function_exists('legacyPermissionsForPermissionName')) {
    function legacyPermissionsForPermissionName(string $permissionName): array
    {
        $permissionName = strtolower(trim($permissionName));
        if ($permissionName === '') {
            return [];
        }

        $legacyPermissions = [];

        if (str_starts_with($permissionName, 'manage_')) {
            $legacyPermissions[] = $permissionName;
        }

        foreach (permissionLegacyMap()[$permissionName] ?? [] as $legacyPermission) {
            $legacyPermissions[] = $legacyPermission;
        }

        if (str_contains($permissionName, '.')) {
            $module = explode('.', $permissionName)[0];
            $module = permissionModuleAliases()[$module] ?? $module;
            $legacyPermission = permissionModuleLegacyMap()[$module] ?? null;

            if (! empty($legacyPermission)) {
                $legacyPermissions[] = $legacyPermission;
            }
        }

        return array_values(array_unique(array_filter($legacyPermissions)));
    }
}

if (! function_exists('expandPermissionsWithLegacyNames')) {
    function expandPermissionsWithLegacyNames(array $permissions): array
    {
        $expandedPermissions = [];

        foreach ($permissions as $permissionName) {
            if (! is_string($permissionName) || trim($permissionName) === '') {
                continue;
            }

            $permissionName = strtolower(trim($permissionName));
            $expandedPermissions[] = $permissionName;

            foreach (legacyPermissionsForPermissionName($permissionName) as $legacyPermission) {
                $expandedPermissions[] = $legacyPermission;
            }
        }

        return array_values(array_unique($expandedPermissions));
    }
}

if (! function_exists('hasPermission')) {
    function hasPermission(string $permission, $user = null): bool
    {
        $user = $user ?: auth()->user();
        if (! $user) {
            return false;
        }

        $permission = strtolower(trim($permission));
        if ($permission === '') {
            return false;
        }

        $userPermissionNames = $user->getAllPermissions()
            ->pluck('name')
            ->map(fn ($name) => strtolower(trim($name)))
            ->filter()
            ->values()
            ->all();

        if (in_array($permission, $userPermissionNames, true)) {
            return true;
        }

        if ($user->can($permission)) {
            return true;
        }

        foreach (legacyPermissionsForPermissionName($permission) as $legacyPermission) {
            if (in_array($legacyPermission, $userPermissionNames, true) || $user->can($legacyPermission)) {
                return true;
            }
        }

        foreach ($userPermissionNames as $userPermissionName) {
            if (in_array($permission, legacyPermissionsForPermissionName($userPermissionName), true)) {
                return true;
            }
        }

        return false;
    }
}

if (! function_exists('normalizePermissionName')) {
    function normalizePermissionName($permission): string
    {
        return strtolower(trim((string) $permission));
    }
}

if (! function_exists('userCrudModulePrefixes')) {
    function userCrudModulePrefixes(): array
    {
        return [
            'user.view',
            'users.view',
            'user.create',
            'users.create',
            'user.update',
            'users.update',
            'user.edit',
            'users.edit',
            'user.delete',
            'users.delete',
        ];
    }
}

if (! function_exists('strictPermissionConfigMap')) {
    function strictPermissionConfigMap(): array
    {
        return [
            'products.view' => [
                'aliases' => ['product.view'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'products.create' => [
                'aliases' => ['product.create'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'products.update' => [
                'aliases' => ['product.update', 'product.edit'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'products.delete' => [
                'aliases' => ['product.delete'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'products.view_purchase_price' => [
                'aliases' => ['product.view_purchase_price'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'view_purchase_price' => [
                'aliases' => ['products.view_purchase_price', 'product.view_purchase_price'],
                'module_prefixes' => ['products', 'product'],
                'legacy_permission' => 'manage_products',
            ],
            'purchase.view' => [
                'aliases' => ['purchases.view'],
                'module_prefixes' => ['purchase', 'purchases'],
                'legacy_permission' => 'manage_purchase',
            ],
            'purchase.create' => [
                'aliases' => ['purchases.create'],
                'module_prefixes' => ['purchase', 'purchases'],
                'legacy_permission' => 'manage_purchase',
            ],
            'purchase.update' => [
                'aliases' => ['purchase.edit', 'purchases.update', 'purchases.edit'],
                'module_prefixes' => ['purchase', 'purchases'],
                'legacy_permission' => 'manage_purchase',
            ],
            'purchase.delete' => [
                'aliases' => ['purchases.delete'],
                'module_prefixes' => ['purchase', 'purchases'],
                'legacy_permission' => 'manage_purchase',
            ],
            'customer.view' => [
                'aliases' => ['customers.view'],
                'module_prefixes' => ['customer', 'customers'],
                'legacy_permission' => 'manage_customers',
            ],
            'customer.create' => [
                'aliases' => ['customers.create'],
                'module_prefixes' => ['customer', 'customers'],
                'legacy_permission' => 'manage_customers',
            ],
            'customer.update' => [
                'aliases' => ['customer.edit', 'customers.update', 'customers.edit'],
                'module_prefixes' => ['customer', 'customers'],
                'legacy_permission' => 'manage_customers',
            ],
            'customer.delete' => [
                'aliases' => ['customers.delete'],
                'module_prefixes' => ['customer', 'customers'],
                'legacy_permission' => 'manage_customers',
            ],
            'supplier.view' => [
                'aliases' => ['suppliers.view'],
                'module_prefixes' => ['supplier', 'suppliers'],
                'legacy_permission' => 'manage_suppliers',
            ],
            'supplier.create' => [
                'aliases' => ['suppliers.create'],
                'module_prefixes' => ['supplier', 'suppliers'],
                'legacy_permission' => 'manage_suppliers',
            ],
            'supplier.update' => [
                'aliases' => ['supplier.edit', 'suppliers.update', 'suppliers.edit'],
                'module_prefixes' => ['supplier', 'suppliers'],
                'legacy_permission' => 'manage_suppliers',
            ],
            'supplier.delete' => [
                'aliases' => ['suppliers.delete'],
                'module_prefixes' => ['supplier', 'suppliers'],
                'legacy_permission' => 'manage_suppliers',
            ],
            'user.view' => [
                'aliases' => ['users.view'],
                'module_prefixes' => userCrudModulePrefixes(),
                'legacy_permission' => 'manage_users',
            ],
            'user.create' => [
                'aliases' => ['users.create'],
                'module_prefixes' => userCrudModulePrefixes(),
                'legacy_permission' => 'manage_users',
            ],
            'user.update' => [
                'aliases' => ['user.edit', 'users.update', 'users.edit'],
                'module_prefixes' => userCrudModulePrefixes(),
                'legacy_permission' => 'manage_users',
            ],
            'user.delete' => [
                'aliases' => ['users.delete'],
                'module_prefixes' => userCrudModulePrefixes(),
                'legacy_permission' => 'manage_users',
            ],
            'user.update_credentials' => [
                'aliases' => ['user.edit_credentials'],
                'module_prefixes' => ['user', 'users'],
                'legacy_permission' => 'manage_users',
            ],
            'pos.view' => [
                'aliases' => ['pos_screen.view'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_pos_screen',
            ],
            'pos.create_sale' => [
                'aliases' => ['sale.create'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_sale',
            ],
            'pos.edit_sale' => [
                'aliases' => ['sale.update', 'sale.edit'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_sale',
            ],
            'pos.delete_sale' => [
                'aliases' => ['sale.delete'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_sale',
            ],
            'pos.apply_discount' => [
                'aliases' => ['pos_screen.apply_discount'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_pos_screen',
            ],
            'pos.cancel_sale' => [
                'aliases' => ['pos_screen.cancel_sale'],
                'module_prefixes' => ['pos', 'pos_screen', 'edit_pos_sale_price'],
                'legacy_permission' => 'manage_pos_screen',
            ],
            'pos_screen.edit_product' => [
                'aliases' => ['pos.edit_product', 'pos.edit_cart_product'],
                'module_prefixes' => ['pos_screen', 'pos'],
                'legacy_permission' => 'manage_pos_screen',
            ],
            'edit_pos_sale_price' => [
                'aliases' => ['pos_screen.edit_product', 'pos.edit_product', 'pos.edit_cart_product'],
                'module_prefixes' => ['pos_screen', 'pos'],
                'legacy_permission' => 'manage_pos_screen',
            ],
            'view_stock_alerts' => [
                'aliases' => ['dashboard.view_stock_alerts'],
                'module_prefixes' => ['dashboard'],
            ],
        ];
    }
}

if (! function_exists('hasGranularPermissionInModules')) {
    function hasGranularPermissionInModules(array $permissions, array $modulePrefixes): bool
    {
        $normalizedPrefixes = array_values(array_unique(array_filter(array_map(function ($prefix) {
            $prefix = normalizePermissionName($prefix);
            if ($prefix === '') {
                return null;
            }

            return rtrim($prefix, '.');
        }, $modulePrefixes))));

        if (empty($normalizedPrefixes)) {
            return false;
        }

        foreach ($permissions as $permissionName) {
            $permissionName = normalizePermissionName($permissionName);
            if ($permissionName === '') {
                continue;
            }

            foreach ($normalizedPrefixes as $prefix) {
                if (
                    $permissionName === $prefix ||
                    str_starts_with($permissionName, $prefix.'.')
                ) {
                    return true;
                }
            }
        }

        return false;
    }
}

if (! function_exists('hasPermissionStrict')) {
    function hasPermissionStrict(string $permission, array $options = [], $user = null): bool
    {
        $user = $user ?: auth()->user();
        if (! $user) {
            return false;
        }

        $normalizedPermission = normalizePermissionName($permission);
        if ($normalizedPermission === '') {
            return false;
        }

        $defaultOptions = strictPermissionConfigMap()[$normalizedPermission] ?? [];
        $options = array_merge($defaultOptions, $options);

        $aliases = array_map(
            fn ($alias) => normalizePermissionName($alias),
            $options['aliases'] ?? []
        );
        $candidates = array_values(array_unique(array_filter([
            $normalizedPermission,
            ...$aliases,
        ])));

        $userPermissionNames = $user->getAllPermissions()
            ->pluck('name')
            ->map(fn ($name) => normalizePermissionName($name))
            ->filter()
            ->values()
            ->all();

        foreach ($candidates as $candidate) {
            if (in_array($candidate, $userPermissionNames, true) || $user->can($candidate)) {
                return true;
            }
        }

        $legacyPermission = normalizePermissionName($options['legacy_permission'] ?? '');
        if ($legacyPermission === '') {
            return false;
        }

        $modulePrefixes = array_map(
            fn ($prefix) => normalizePermissionName($prefix),
            $options['module_prefixes'] ?? []
        );

        if (empty($modulePrefixes)) {
            foreach ($candidates as $candidate) {
                if (! str_contains($candidate, '.')) {
                    continue;
                }

                [$modulePrefix] = explode('.', $candidate, 2);
                if ($modulePrefix !== '') {
                    $modulePrefixes[] = $modulePrefix;
                }
            }
        }

        if (hasGranularPermissionInModules($userPermissionNames, $modulePrefixes)) {
            return false;
        }

        return in_array($legacyPermission, $userPermissionNames, true) || $user->can($legacyPermission);
    }
}

function getLogoUrl(): string
{
    static $appLogo;

    if (empty($appLogo)) {
        $appLogo = Setting::where('key', '=', 'logo')->first();
    }

    return asset($appLogo->logo);
}

if (! function_exists('getSettingValue')) {
    /**
     * @return mixed
     */
    function getSettingValue($keyName, $default = null)
    {
        $key = 'setting'.'-'.$keyName;

        static $settingValues = [];

        if (array_key_exists($key, $settingValues)) {
            return $settingValues[$key];
        }

        /** @var Setting $setting */
        $setting = Setting::where('key', '=', $keyName)->first();
        $value = $setting ? $setting->value : $default;
        $settingValues[$key] = $value;

        return $value;
    }
}

function canDelete(array $models, string $columnName, int $id): bool
{
    foreach ($models as $model) {
        $result = $model::where($columnName, $id)->exists();

        if ($result) {
            return true;
        }
    }

    return false;
}

function getCurrencyCode()
{
    $currencyId = Setting::where('key', '=', 'currency')->first()->value;

    return Currency::whereId($currencyId)->first()->symbol;
}

function getLoginUserLanguage(): string
{
    return \Illuminate\Support\Facades\Auth::user()->language;
}

if (! function_exists('manageStock')) {
    /**
     * @param $request
     * @return mixed
     */
    function manageStock($warehouseID, $productID, $qty = 0)
    {
        $product = ManageStock::whereWarehouseId($warehouseID)
            ->whereProductId($productID)
            ->first();

        if ($product) {
            $totalQuantity = $product->quantity + $qty;

            if (($product->quantity + $qty) < 0) {
                $totalQuantity = 0;
            }
            $product->update([
                'quantity' => $totalQuantity,
            ]);
        } else {
            if ($qty < 0) {
                $qty = 0;
            }

            ManageStock::create([
                'warehouse_id' => $warehouseID,
                'product_id' => $productID,
                'quantity' => $qty,
            ]);
        }
    }
}

if (! function_exists('keyExist')) {
    function keyExist($key)
    {
        $exists = Setting::where('key', $key)->exists();

        return $exists;
    }
}

function getSupplierGrandTotalFilterIds($search)
{
    $supplierData = Supplier::with('purchases')->get();
    $ids = [];
    foreach ($supplierData as $key => $supplier) {
        $value = $supplier->purchases->sum('grand_total');
        if ($search != '') {
            if ($value == $search) {
                $ids[] = $supplier->id;
            }
        }
    }

    return $ids;
}

if (! function_exists('replaceArrayValue')) {
    function replaceArrayValue(&$array, $key, $replaceValue)
    {
        foreach ($array as $index => $value) {
            if (is_array($value)) {
                $array[$index] = replaceArrayValue($value, $key, $replaceValue);
            }
            if ($index == $key) {
                $array[$index] = $replaceValue;
            }
        }

        return $array;
    }
}

if (! function_exists('getLogo')) {
    function getLogo()
    {
        /** @var Setting $setting */
        $logoImage = Setting::where('key', '=', 'logo')->first()->value;

        $logo = '';
        if (File::exists(asset($logoImage))) {
            $logo = base64_encode(file_get_contents(asset($logoImage)));
        }

        return 'data:image/png;base64,'.$logo;
    }
}

if (! function_exists('currencyAlignment')) {
    function currencyAlignment($amount)
    {
        if (getSettingValue('is_currency_right') != 1) {
            return getCurrencyCode().' '.$amount;
        }

        return $amount.' '.getCurrencyCode();
    }
}
