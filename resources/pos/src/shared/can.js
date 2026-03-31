import {
    getLegacyPermissionsForPermission,
    normalizePermissions,
} from "./permissionRoute";

const parseStoredPermissions = (value) => {
    if (!value) {
        return [];
    }

    if (Array.isArray(value)) {
        return value
            .map((permission) =>
                typeof permission === "string" ? permission : permission?.name
            )
            .filter(Boolean);
    }

    if (typeof value !== "string") {
        return [];
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) {
        return [];
    }

    if (
        (trimmedValue.startsWith("[") && trimmedValue.endsWith("]")) ||
        (trimmedValue.startsWith("{") && trimmedValue.endsWith("}"))
    ) {
        try {
            const parsedValue = JSON.parse(trimmedValue);
            return parseStoredPermissions(parsedValue);
        } catch (e) {
            // Fallback to CSV parsing
        }
    }

    return trimmedValue
        .split(",")
        .map((permission) => permission.trim())
        .filter(Boolean);
};

const parsePermissionsFromStorage = () => {
    const csvPermissions = parseStoredPermissions(
        localStorage.getItem("get_permissions")
    );
    if (csvPermissions.length > 0) {
        return csvPermissions;
    }

    try {
        const userRaw = localStorage.getItem("user");
        if (userRaw) {
            const user = JSON.parse(userRaw);
            const rolePermissions = user?.role?.permissions;
            const parsedPermissions = parseStoredPermissions(rolePermissions);
            if (parsedPermissions.length > 0) {
                return parsedPermissions;
            }
        }
    } catch (e) {
        // ignore invalid JSON from localStorage
    }

    try {
        const loginUserRaw = localStorage.getItem("loginUserArray");
        if (loginUserRaw) {
            const loginUser = JSON.parse(loginUserRaw);
            const rolePermissions = loginUser?.role?.permissions;
            const parsedPermissions = parseStoredPermissions(rolePermissions);
            if (parsedPermissions.length > 0) {
                return parsedPermissions;
            }
        }
    } catch (e) {
        // ignore invalid JSON from localStorage
    }

    return [];
};

const normalizePermissionName = (permission) =>
    String(permission || "").trim().toLowerCase();

const USER_CRUD_MODULE_PREFIXES = [
    "user.view",
    "users.view",
    "user.create",
    "users.create",
    "user.update",
    "users.update",
    "user.edit",
    "users.edit",
    "user.delete",
    "users.delete",
];

const CREDIT_PERMISSION_PREFIXES = [
    "credit",
    "credits",
    "credit.view",
    "credit.create",
    "credit.edit",
    "credit.update",
    "credit.delete",
    "ver_creditos",
    "crear_creditos",
    "editar_creditos",
    "eliminar_creditos",
    "ver_detalle_credito",
    "registrar_pagos_credito",
];

const BATCH_PERMISSION_PREFIXES = [
    "lot",
    "lots",
    "batch",
    "batches",
    "product_batch",
    "product_batches",
    "lot.view",
    "lot.create",
    "lot.edit",
    "lot.update",
    "lot.delete",
    "lotes",
    "ver_lotes",
    "crear_lotes",
    "editar_lotes",
    "eliminar_lotes",
    "asignar_lotes",
    "ver_stock_lote",
];

const strictPermissionConfigs = {
    "products.view": {
        aliases: ["product.view"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    "products.create": {
        aliases: ["product.create"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    "products.update": {
        aliases: ["product.update", "product.edit"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    "products.delete": {
        aliases: ["product.delete"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    "products.view_purchase_price": {
        aliases: ["product.view_purchase_price"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    view_purchase_price: {
        aliases: ["products.view_purchase_price", "product.view_purchase_price"],
        modulePrefixes: ["products", "product"],
        legacyPermission: "manage_products",
    },
    "purchase.view": {
        aliases: ["purchases.view"],
        modulePrefixes: ["purchase", "purchases"],
        legacyPermission: "manage_purchase",
    },
    "purchase.create": {
        aliases: ["purchases.create"],
        modulePrefixes: ["purchase", "purchases"],
        legacyPermission: "manage_purchase",
    },
    "purchase.update": {
        aliases: ["purchase.edit", "purchases.update", "purchases.edit"],
        modulePrefixes: ["purchase", "purchases"],
        legacyPermission: "manage_purchase",
    },
    "purchase.delete": {
        aliases: ["purchases.delete"],
        modulePrefixes: ["purchase", "purchases"],
        legacyPermission: "manage_purchase",
    },
    "customer.view": {
        aliases: ["customers.view"],
        modulePrefixes: ["customer", "customers"],
        legacyPermission: "manage_customers",
    },
    "customer.create": {
        aliases: ["customers.create"],
        modulePrefixes: ["customer", "customers"],
        legacyPermission: "manage_customers",
    },
    "customer.update": {
        aliases: ["customer.edit", "customers.update", "customers.edit"],
        modulePrefixes: ["customer", "customers"],
        legacyPermission: "manage_customers",
    },
    "customer.delete": {
        aliases: ["customers.delete"],
        modulePrefixes: ["customer", "customers"],
        legacyPermission: "manage_customers",
    },
    "supplier.view": {
        aliases: ["suppliers.view"],
        modulePrefixes: ["supplier", "suppliers"],
        legacyPermission: "manage_suppliers",
    },
    "supplier.create": {
        aliases: ["suppliers.create"],
        modulePrefixes: ["supplier", "suppliers"],
        legacyPermission: "manage_suppliers",
    },
    "supplier.update": {
        aliases: ["supplier.edit", "suppliers.update", "suppliers.edit"],
        modulePrefixes: ["supplier", "suppliers"],
        legacyPermission: "manage_suppliers",
    },
    "supplier.delete": {
        aliases: ["suppliers.delete"],
        modulePrefixes: ["supplier", "suppliers"],
        legacyPermission: "manage_suppliers",
    },
    "user.view": {
        aliases: ["users.view"],
        modulePrefixes: USER_CRUD_MODULE_PREFIXES,
        legacyPermission: "manage_users",
    },
    "user.create": {
        aliases: ["users.create"],
        modulePrefixes: USER_CRUD_MODULE_PREFIXES,
        legacyPermission: "manage_users",
    },
    "user.update": {
        aliases: ["user.edit", "users.update", "users.edit"],
        modulePrefixes: USER_CRUD_MODULE_PREFIXES,
        legacyPermission: "manage_users",
    },
    "user.delete": {
        aliases: ["users.delete"],
        modulePrefixes: USER_CRUD_MODULE_PREFIXES,
        legacyPermission: "manage_users",
    },
    "user.update_credentials": {
        aliases: ["user.edit_credentials"],
        modulePrefixes: ["user", "users"],
        legacyPermission: "manage_users",
    },
    "pos.view": {
        aliases: ["pos_screen.view"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_pos_screen",
    },
    "pos.create_sale": {
        aliases: ["sale.create"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_sale",
    },
    "pos.edit_sale": {
        aliases: ["sale.update", "sale.edit"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_sale",
    },
    "pos.delete_sale": {
        aliases: ["sale.delete"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_sale",
    },
    "pos.apply_discount": {
        aliases: ["pos_screen.apply_discount"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_pos_screen",
    },
    "pos.cancel_sale": {
        aliases: ["pos_screen.cancel_sale"],
        modulePrefixes: ["pos", "pos_screen", "edit_pos_sale_price"],
        legacyPermission: "manage_pos_screen",
    },
    "pos_screen.edit_product": {
        aliases: ["pos.edit_product", "pos.edit_cart_product"],
        modulePrefixes: ["pos_screen", "pos"],
        legacyPermission: "manage_pos_screen",
    },
    edit_pos_sale_price: {
        aliases: [
            "pos_screen.edit_product",
            "pos.edit_product",
            "pos.edit_cart_product",
        ],
        modulePrefixes: ["pos_screen", "pos"],
        legacyPermission: "manage_pos_screen",
    },
    view_stock_alerts: {
        aliases: ["dashboard.view_stock_alerts"],
        modulePrefixes: ["dashboard"],
    },
    "credit.view": {
        aliases: ["credits.view", "ver_creditos"],
        legacyPermissions: ["ver_creditos"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    "credit.create": {
        aliases: ["credits.create", "crear_creditos"],
        legacyPermissions: ["crear_creditos"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    "credit.edit": {
        aliases: ["credit.update", "credits.edit", "credits.update", "editar_creditos"],
        legacyPermissions: ["editar_creditos"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    "credit.delete": {
        aliases: ["credits.delete", "eliminar_creditos"],
        legacyPermissions: ["eliminar_creditos"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    ver_creditos: {
        aliases: ["credit.view", "credits.view"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    crear_creditos: {
        aliases: ["credit.create", "credits.create"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    editar_creditos: {
        aliases: ["credit.update", "credit.edit", "credits.update", "credits.edit"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    eliminar_creditos: {
        aliases: ["credit.delete", "credits.delete"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    ver_detalle_credito: {
        aliases: ["credit.detail", "credit.show", "credits.detail"],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    registrar_pagos_credito: {
        aliases: [
            "credit.payment.create",
            "credits.payment.create",
            "credit.register_payment",
        ],
        modulePrefixes: CREDIT_PERMISSION_PREFIXES,
    },
    "lot.view": {
        aliases: ["lots.view", "ver_lotes"],
        legacyPermissions: ["ver_lotes"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    "lot.create": {
        aliases: ["lots.create", "crear_lotes"],
        legacyPermissions: ["crear_lotes"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    "lot.edit": {
        aliases: ["lot.update", "lots.edit", "lots.update", "editar_lotes"],
        legacyPermissions: ["editar_lotes"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    "lot.delete": {
        aliases: ["lots.delete", "eliminar_lotes"],
        legacyPermissions: ["eliminar_lotes"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    ver_lotes: {
        aliases: ["lot.view", "lots.view", "batch.view", "batches.view", "product_batches.view"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    crear_lotes: {
        aliases: ["lot.create", "lots.create", "batch.create", "batches.create", "product_batches.create"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    editar_lotes: {
        aliases: ["lot.edit", "lot.update", "lots.edit", "lots.update", "batch.update", "batch.edit", "batches.update", "product_batches.update"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    eliminar_lotes: {
        aliases: ["lot.delete", "lots.delete", "batch.delete", "batches.delete", "product_batches.delete"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    asignar_lotes: {
        aliases: ["batch.assign", "batches.assign", "product_batches.assign"],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
    ver_stock_lote: {
        aliases: [
            "batch.stock.view",
            "batch.report.view",
            "product_batches.stock.view",
            "product_batches.report.view",
        ],
        modulePrefixes: BATCH_PERMISSION_PREFIXES,
    },
};

const hasAnyPermission = (permissions = [], candidates = []) => {
    if (!Array.isArray(permissions) || !Array.isArray(candidates)) {
        return false;
    }

    const permissionSet = new Set(
        permissions.map((permission) => normalizePermissionName(permission))
    );

    return candidates.some((candidate) =>
        permissionSet.has(normalizePermissionName(candidate))
    );
};

const hasGranularPermissionInModule = (permissions = [], modulePrefixes = []) => {
    if (!Array.isArray(permissions) || !Array.isArray(modulePrefixes)) {
        return false;
    }

    const normalizedPrefixes = modulePrefixes
        .map((prefix) => normalizePermissionName(prefix).replace(/\.$/, ""))
        .filter(Boolean);

    if (normalizedPrefixes.length === 0) {
        return false;
    }

    return permissions.some((permission) =>
        normalizedPrefixes.some((prefix) =>
            normalizePermissionName(permission) === prefix ||
            normalizePermissionName(permission).startsWith(`${prefix}.`)
        )
    );
};

const getStrictLegacyPermissions = (permission, strictConfig = {}) => {
    const configuredLegacyPermissions = [
        ...(strictConfig.legacyPermissions || []),
        ...(strictConfig.legacyPermission ? [strictConfig.legacyPermission] : []),
    ]
        .map((legacyPermission) => normalizePermissionName(legacyPermission))
        .filter(Boolean);

    if (configuredLegacyPermissions.length > 0) {
        return Array.from(new Set(configuredLegacyPermissions));
    }

    return getLegacyPermissionsForPermission(permission).map((legacyPermission) =>
        normalizePermissionName(legacyPermission)
    );
};

export function can(permission, options = {}) {
    if (!permission) {
        return false;
    }

    if (options.strict) {
        const rawPermissions = parsePermissionsFromStorage().map((permission) =>
            normalizePermissionName(permission)
        );
        const normalizedPermission = normalizePermissionName(permission);
        const strictConfig = {
            ...(strictPermissionConfigs[normalizedPermission] || {}),
            ...(options || {}),
        };

        const candidates = [
            normalizedPermission,
            ...(strictConfig.aliases || []),
        ].map((candidate) => normalizePermissionName(candidate));

        if (hasAnyPermission(rawPermissions, candidates)) {
            return true;
        }

        const legacyPermissions = getStrictLegacyPermissions(
            normalizedPermission,
            strictConfig
        );
        if (legacyPermissions.length === 0) {
            return false;
        }

        const hasModuleGranularPermissions = hasGranularPermissionInModule(
            rawPermissions,
            strictConfig.modulePrefixes || []
        );

        if (hasModuleGranularPermissions) {
            return false;
        }

        return hasAnyPermission(rawPermissions, legacyPermissions);
    }

    const permissions = normalizePermissions(parsePermissionsFromStorage());
    if (permissions.includes(permission)) {
        return true;
    }

    const legacy = getLegacyPermissionsForPermission(permission);
    return legacy.some((legacyPermission) =>
        permissions.includes(legacyPermission)
    );
}

const ROUTE_MODULE_PATTERNS = [
    { pattern: /^\/app\/products(?:\/|$)/, module: "products" },
    { pattern: /^\/app\/purchases(?:\/|$)/, module: "purchases" },
    { pattern: /^\/app\/customers(?:\/|$)/, module: "customers" },
    { pattern: /^\/app\/suppliers(?:\/|$)/, module: "suppliers" },
    { pattern: /^\/app\/users(?:\/|$)/, module: "users" },
    { pattern: /^\/app\/sales(?:\/|$)/, module: "sales" },
];

const CRUD_PERMISSION_BY_MODULE = {
    products: {
        create: { permission: "products.create" },
        update: { permission: "products.update" },
        delete: { permission: "products.delete" },
    },
    purchases: {
        create: { permission: "purchase.create" },
        update: { permission: "purchase.update" },
        delete: { permission: "purchase.delete" },
    },
    customers: {
        create: { permission: "customer.create" },
        update: { permission: "customer.update" },
        delete: { permission: "customer.delete" },
    },
    suppliers: {
        create: { permission: "supplier.create" },
        update: { permission: "supplier.update" },
        delete: { permission: "supplier.delete" },
    },
    users: {
        create: { permission: "user.create" },
        update: { permission: "user.update" },
        delete: { permission: "user.delete" },
    },
    sales: {
        create: { permission: "pos.create_sale" },
        update: { permission: "pos.edit_sale" },
        delete: { permission: "pos.delete_sale" },
    },
};

const normalizePath = (rawPath) => {
    let path = String(rawPath || "").trim();

    if (!path && typeof window !== "undefined") {
        path = window.location.hash || window.location.pathname || "";
    }

    if (path.startsWith("#")) {
        path = path.slice(1);
    }

    if (!path.startsWith("/")) {
        path = `/${path}`;
    }

    return path.split("?")[0].split("#")[0].toLowerCase();
};

const resolveModuleFromPath = (path) => {
    const normalizedPath = normalizePath(path);
    const moduleMatch = ROUTE_MODULE_PATTERNS.find(({ pattern }) =>
        pattern.test(normalizedPath)
    );

    return moduleMatch?.module || null;
};

export function canCrud(action, path = null) {
    const normalizedAction = normalizePermissionName(action);
    const module = resolveModuleFromPath(path);
    if (!module) {
        return true;
    }

    const permissionConfig =
        CRUD_PERMISSION_BY_MODULE[module]?.[normalizedAction];
    if (!permissionConfig?.permission) {
        return true;
    }

    return can(permissionConfig.permission, {
        strict: true,
        ...(permissionConfig.options || {}),
    });
}
