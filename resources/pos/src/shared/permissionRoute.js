const permissionMappings = {
    manage_dashboard: "/app/dashboard",
    manage_roles: "/app/roles",
    manage_brands: "/app/brands",
    manage_currency: "/app/currencies",
    manage_warehouses: "/app/warehouse",
    manage_units: "/app/units",
    manage_product_categories: "/app/product-categories",
    manage_variations: "/app/variations",
    manage_products: "/app/products",
    manage_suppliers: "/app/suppliers",
    manage_customers: "/app/customers",
    manage_users: "/app/users",
    manage_expense_categories: "/app/expense-categories",
    manage_expenses: "/app/expenses",
    manage_setting: "/app/settings",
    manage_purchase: "/app/purchases",
    manage_purchase_return: "/app/purchase-return",
    manage_pos_screen: "/app/pos",
    manage_sale: "/app/sales",
    manage_sale_return: "/app/sale-return",
    manage_print_barcode: "/app/print/barcode",
    manage_adjustments: "/app/adjustments",
    manage_transfers: "/app/transfers",
    manage_reports: "/app/report/report-warehouse",
    manage_report: "/app/report/report-warehouse",
    manage_email_templates: "/app/email-templates",
    manage_quotations: "/app/quotations",
    manage_sms_apis: "/app/sms-api",
    manage_sms_templates: "/app/sms-templates",
    manage_language: "/app/languages",
    "credit.view": "/app/credits",
    "credit.create": "/app/credits",
    "credit.edit": "/app/credits",
    "credit.delete": "/app/credits",
    ver_creditos: "/app/credits",
    crear_creditos: "/app/credits",
    editar_creditos: "/app/credits",
    eliminar_creditos: "/app/credits",
    ver_detalle_credito: "/app/credits",
    registrar_pagos_credito: "/app/credits",
    "lot.view": "/app/products",
    "lot.create": "/app/products",
    "lot.edit": "/app/products",
    "lot.delete": "/app/products",
    ver_lotes: "/app/products",
    crear_lotes: "/app/products",
    editar_lotes: "/app/products",
    eliminar_lotes: "/app/products",
    asignar_lotes: "/app/products",
    ver_stock_lote: "/app/report/report-batch-expiry",
};

const moduleLegacyMap = {
    adjustments: "manage_adjustments",
    transfers: "manage_transfers",
    roles: "manage_roles",
    brands: "manage_brands",
    currency: "manage_currency",
    warehouses: "manage_warehouses",
    units: "manage_units",
    product_categories: "manage_product_categories",
    products: "manage_products",
    suppliers: "manage_suppliers",
    customers: "manage_customers",
    users: "manage_users",
    expense_categories: "manage_expense_categories",
    expenses: "manage_expenses",
    setting: "manage_setting",
    dashboard: "manage_dashboard",
    pos_screen: "manage_pos_screen",
    purchase: "manage_purchase",
    sale: "manage_sale",
    purchase_return: "manage_purchase_return",
    sale_return: "manage_sale_return",
    email_templates: "manage_email_templates",
    reports: "manage_reports",
    quotations: "manage_quotations",
    sms_templates: "manage_sms_templates",
    sms_apis: "manage_sms_apis",
    language: "manage_language",
    variations: "manage_variations",
};

const moduleAliases = {
    adjustment: "adjustments",
    transfer: "transfers",
    role: "roles",
    brand: "brands",
    warehouse: "warehouses",
    unit: "units",
    product: "products",
    product_category: "product_categories",
    supplier: "suppliers",
    customer: "customers",
    user: "users",
    expense: "expenses",
    expense_category: "expense_categories",
    report: "reports",
    quotation: "quotations",
    email_template: "email_templates",
    sms_template: "sms_templates",
    sms_api: "sms_apis",
    pos: "pos_screen",
    variation: "variations",
};

const explicitLegacyMap = {
    "pos.view": ["manage_pos_screen", "manage_sale"],
    "pos.create_sale": ["manage_pos_screen", "manage_sale"],
    "pos.edit_sale": ["manage_sale"],
    "pos.delete_sale": ["manage_sale"],
    "pos.apply_discount": ["manage_pos_screen", "manage_sale"],
    "pos.cancel_sale": ["manage_pos_screen", "manage_sale"],
    "product.view_purchase_price": ["manage_products"],
    "view_purchase_price": ["manage_products"],
    "edit_pos_sale_price": ["manage_pos_screen", "manage_sale"],
    "view_stock_alerts": ["manage_dashboard"],
    "user.update_credentials": ["manage_users"],
    "user.edit_credentials": ["manage_users"],
    "credit.view": ["ver_creditos"],
    "credits.view": ["ver_creditos"],
    "credit.create": ["crear_creditos"],
    "credits.create": ["crear_creditos"],
    "credit.edit": ["editar_creditos"],
    "credit.update": ["editar_creditos"],
    "credits.edit": ["editar_creditos"],
    "credits.update": ["editar_creditos"],
    "credit.delete": ["eliminar_creditos"],
    "credits.delete": ["eliminar_creditos"],
    ver_creditos: ["manage_sale", "manage_pos_screen"],
    crear_creditos: ["manage_sale", "manage_pos_screen"],
    editar_creditos: ["manage_sale", "manage_pos_screen"],
    eliminar_creditos: ["manage_sale", "manage_pos_screen"],
    ver_detalle_credito: ["manage_sale", "manage_pos_screen"],
    registrar_pagos_credito: ["manage_sale", "manage_pos_screen"],
    "lot.view": ["ver_lotes"],
    "lots.view": ["ver_lotes"],
    "lot.create": ["crear_lotes"],
    "lots.create": ["crear_lotes"],
    "lot.edit": ["editar_lotes"],
    "lot.update": ["editar_lotes"],
    "lots.edit": ["editar_lotes"],
    "lots.update": ["editar_lotes"],
    "lot.delete": ["eliminar_lotes"],
    "lots.delete": ["eliminar_lotes"],
    ver_lotes: ["manage_products", "manage_pos_screen"],
    crear_lotes: ["manage_products"],
    editar_lotes: ["manage_products"],
    eliminar_lotes: ["manage_products"],
    asignar_lotes: ["manage_products"],
    ver_stock_lote: [
        "manage_products",
        "manage_reports",
        "manage_report",
        "manage_pos_screen",
    ],
};

const normalizePermission = (permission) =>
    String(permission || "").trim().toLowerCase();

const getPermissionsUnlockedByPermission = (permission) => {
    const normalizedPermission = normalizePermission(permission);
    if (!normalizedPermission) {
        return [];
    }

    return Object.entries(explicitLegacyMap)
        .filter(([, legacyPermissions]) =>
            legacyPermissions.some(
                (legacyPermission) =>
                    normalizePermission(legacyPermission) === normalizedPermission
            )
        )
        .map(([permissionName]) => normalizePermission(permissionName));
};

export const getLegacyPermissionsForPermission = (permission) => {
    const normalizedPermission = normalizePermission(permission);
    if (!normalizedPermission) {
        return [];
    }

    const legacyPermissions = new Set();

    if (normalizedPermission.startsWith("manage_")) {
        legacyPermissions.add(normalizedPermission);
    }

    (explicitLegacyMap[normalizedPermission] || []).forEach((legacyPermission) =>
        legacyPermissions.add(legacyPermission)
    );

    if (normalizedPermission.includes(".")) {
        const moduleName = normalizedPermission.split(".")[0];
        const canonicalModule = moduleAliases[moduleName] || moduleName;
        const moduleLegacyPermission = moduleLegacyMap[canonicalModule];
        if (moduleLegacyPermission) {
            legacyPermissions.add(moduleLegacyPermission);
        }
    }

    return Array.from(legacyPermissions);
};

export const normalizePermissions = (permissions = []) => {
    const normalizedPermissions = new Set();

    permissions.forEach((permission) => {
        const normalizedPermission = normalizePermission(permission);
        if (!normalizedPermission) {
            return;
        }

        normalizedPermissions.add(normalizedPermission);

        getLegacyPermissionsForPermission(normalizedPermission).forEach(
            (legacyPermission) => normalizedPermissions.add(legacyPermission)
        );

        getPermissionsUnlockedByPermission(normalizedPermission).forEach(
            (permissionName) => normalizedPermissions.add(permissionName)
        );
    });

    return Array.from(normalizedPermissions);
};

export const mapPermissionToRoute = (permission) => {
    const normalizedPermission = normalizePermission(permission);
    if (!normalizedPermission) {
        return null;
    }

    if (permissionMappings[normalizedPermission]) {
        return permissionMappings[normalizedPermission];
    }

    const legacyPermissions = getLegacyPermissionsForPermission(normalizedPermission);
    const routedPermission = legacyPermissions.find(
        (legacyPermission) => permissionMappings[legacyPermission]
    );

    return routedPermission ? permissionMappings[routedPermission] : null;
};

export const getMappedRoutes = (permissions = []) => {
    const mappedRoutes = normalizePermissions(permissions)
        .map(mapPermissionToRoute)
        .filter(Boolean);

    return Array.from(new Set(mappedRoutes));
};

export const getDefaultRedirectRoute = (permissions = [], currentHash) => {
    const normalizedPermissions = normalizePermissions(permissions);
    const mappedRoutes = getMappedRoutes(normalizedPermissions);
    const activeHash =
        typeof currentHash === "string"
            ? currentHash
            : typeof window !== "undefined"
            ? window.location.hash
            : "";

    if (normalizedPermissions.includes("manage_dashboard")) {
        return "/app/dashboard";
    }

    if (normalizedPermissions.includes("manage_sale")) {
        return "/app/sales";
    }

    if (normalizedPermissions.includes("ver_creditos")) {
        return "/app/credits";
    }

    if (normalizedPermissions.includes("ver_stock_lote")) {
        return "/app/report/report-batch-expiry";
    }

    if (normalizedPermissions.includes("ver_lotes")) {
        return "/app/products";
    }

    if (
        mappedRoutes.length === 1 &&
        normalizedPermissions.includes("manage_pos_screen")
    ) {
        return "/app/pos";
    }

    if (mappedRoutes.length > 1 && activeHash === `#${mappedRoutes[0]}`) {
        return mappedRoutes[1];
    }

    return mappedRoutes[0] || "/app/dashboard";
};
