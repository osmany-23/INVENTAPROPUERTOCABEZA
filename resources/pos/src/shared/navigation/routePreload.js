import { lazy } from "react";

const preloadCache = new Map();

const loadDashboardModule = () => import("../../components/dashboard/Dashboard");
const loadBrandsModule = () => import("../../components/brands/Brands");
const loadProductCategoryModule = () =>
    import("../../components/productCategory/ProductCategory");
const loadVariationModule = () => import("../../components/variation/Variation");
const loadUnitsModule = () => import("../../components/units/Units");
const loadBaseUnitsModule = () => import("../../components/base-unit/BaseUnits");
const loadProductModule = () => import("../../components/product/Product");
const loadProductBatchManagerModule = () =>
    import("../../components/product/ProductBatchManager");
const loadCreateProductModule = () =>
    import("../../components/product/CreateProduct");
const loadEditProductModule = () => import("../../components/product/EditProduct");
const loadProductDetailModule = () =>
    import("../../components/product/ProductDetail");
const loadCreditsModule = () => import("../../components/credits/Credits");

export const LazyDashboard = lazy(loadDashboardModule);
export const LazyBrands = lazy(loadBrandsModule);
export const LazyProductCategory = lazy(loadProductCategoryModule);
export const LazyVariation = lazy(loadVariationModule);
export const LazyUnits = lazy(loadUnitsModule);
export const LazyBaseUnits = lazy(loadBaseUnitsModule);
export const LazyProduct = lazy(loadProductModule);
export const LazyProductBatchManager = lazy(loadProductBatchManagerModule);
export const LazyCreateProduct = lazy(loadCreateProductModule);
export const LazyEditProduct = lazy(loadEditProductModule);
export const LazyProductDetail = lazy(loadProductDetailModule);
export const LazyCredits = lazy(loadCreditsModule);

const ROUTE_PRELOADERS = [
    { prefix: "/app/dashboard", loader: loadDashboardModule },
    { prefix: "/app/brands", loader: loadBrandsModule },
    { prefix: "/app/product-categories", loader: loadProductCategoryModule },
    { prefix: "/app/variations", loader: loadVariationModule },
    { prefix: "/app/units", loader: loadUnitsModule },
    { prefix: "/app/base-units", loader: loadBaseUnitsModule },
    { prefix: "/app/products/batches", loader: loadProductBatchManagerModule },
    { prefix: "/app/products/detail", loader: loadProductDetailModule },
    { prefix: "/app/products/edit", loader: loadEditProductModule },
    { prefix: "/app/products/create", loader: loadCreateProductModule },
    { prefix: "/app/products", loader: loadProductModule },
    { prefix: "/app/creditos", loader: loadCreditsModule },
    { prefix: "/app/credits", loader: loadCreditsModule },
];

const matchesPreloadPath = (path, prefix) =>
    path === prefix || path.startsWith(`${prefix}/`);

export const preloadRouteModule = (path = "") => {
    const normalizedPath = String(path || "").split("?")[0];
    const matchedRoute = ROUTE_PRELOADERS.find(({ prefix }) =>
        matchesPreloadPath(normalizedPath, prefix)
    );

    if (!matchedRoute) {
        return Promise.resolve(null);
    }

    if (preloadCache.has(matchedRoute.prefix)) {
        return preloadCache.get(matchedRoute.prefix);
    }

    const preloadPromise = matchedRoute
        .loader()
        .catch(() => {
            preloadCache.delete(matchedRoute.prefix);
            return null;
        });

    preloadCache.set(matchedRoute.prefix, preloadPromise);
    return preloadPromise;
};
