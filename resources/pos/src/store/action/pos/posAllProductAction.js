import {
    posProductActionType,
    productActionType,
    toastType,
} from "../../../constants";
import apiConfig from "../../../config/apiConfig";
import { addToast } from "../toastAction";
import { setLoading } from "../loadingAction";

const DEFAULT_PAGE_SIZE = 120;

const buildPosFeedQuery = ({
    warehouse = "",
    brandId = "",
    categoryId = "",
    page = 1,
    pageSize = DEFAULT_PAGE_SIZE,
    search = "",
}) => {
    const params = new URLSearchParams();
    params.set("page[number]", page);
    params.set("page[size]", pageSize);

    if (warehouse !== "" && warehouse !== null && warehouse !== undefined) {
        params.set("warehouse_id", warehouse);
    }
    if (brandId && Number(brandId) > 0) {
        params.set("filter[brand_id]", brandId);
    }
    if (categoryId && Number(categoryId) > 0) {
        params.set("filter[product_category_id]", categoryId);
    }
    if (search && search.trim()) {
        params.set("search", search.trim());
    }

    return params.toString();
};

const extractErrorMessage = (error) =>
    error?.response?.data?.message || "No se pudieron cargar los productos.";

export const posAllProductAction = () => async (dispatch) => {
    try {
        const response = await apiConfig.get(
            `products/pos-feed?${buildPosFeedQuery({ page: 1 })}`
        );

        dispatch({
            type: posProductActionType.POS_ALL_PRODUCT,
            payload: response.data.data || [],
            append: false,
        });

        return response.data.meta || null;
    } catch (error) {
        dispatch(
            addToast({
                text: extractErrorMessage(error),
                type: toastType.ERROR,
            })
        );
        return null;
    }
};

export const posAllProduct =
    (warehouse, isLoading = true, options = {}) =>
    async (dispatch) => {
        const {
            page = 1,
            pageSize = DEFAULT_PAGE_SIZE,
            search = "",
            append = false,
        } = options;

        if (isLoading) {
            dispatch(setLoading(true));
        }

        try {
            const response = await apiConfig.get(
                `products/pos-feed?${buildPosFeedQuery({
                    warehouse,
                    page,
                    pageSize,
                    search,
                })}`
            );

            dispatch({
                type: posProductActionType.POS_ALL_PRODUCTS,
                payload: response.data.data || [],
                append,
            });

            return response.data.meta || null;
        } catch (error) {
            dispatch(
                addToast({
                    text: extractErrorMessage(error),
                    type: toastType.ERROR,
                })
            );
            return null;
        } finally {
            if (isLoading) {
                dispatch(setLoading(false));
            }
        }
    };

export const fetchBrandClickable =
    (brandId, categoryId, warehouse, options = {}) => async (dispatch) => {
        const {
            page = 1,
            pageSize = DEFAULT_PAGE_SIZE,
            search = "",
            append = false,
            isLoading = true,
        } = options;

        if (isLoading) {
            dispatch(setLoading(true));
        }

        try {
            const response = await apiConfig.get(
                `products/pos-feed?${buildPosFeedQuery({
                    warehouse: warehouse || "",
                    brandId: brandId || "",
                    categoryId: categoryId || "",
                    page,
                    pageSize,
                    search,
                })}`
            );

            dispatch({
                type: productActionType.FETCH_BRAND_CLICKABLE,
                payload: response.data.data || [],
                append,
            });

            return response.data.meta || null;
        } catch (error) {
            dispatch(
                addToast({
                    text: extractErrorMessage(error),
                    type: toastType.ERROR,
                })
            );
            return null;
        } finally {
            if (isLoading) {
                dispatch(setLoading(false));
            }
        }
    };
