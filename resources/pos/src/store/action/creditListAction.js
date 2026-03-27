import apiConfig from "../../config/apiConfig";
import {
    apiBaseURL,
    creditListActionType,
    toastType,
} from "../../constants";
import { addToast } from "./toastAction";

export const CREDIT_SECTION_OPTIONS = [
    "credits",
    "customers",
    "overdue",
    "interest",
];

export const CREDIT_PAGE_SIZE_OPTIONS = [3, 6, 9];

const DEFAULT_CREDIT_LIST_PARAMS = {
    section: "credits",
    search: "",
    status: "",
    page: 1,
    limit: 3,
};

export const normalizeCreditListParams = (params = {}) => {
    const section = CREDIT_SECTION_OPTIONS.includes(params.section)
        ? params.section
        : DEFAULT_CREDIT_LIST_PARAMS.section;
    const search = String(params.search || "").trim();
    const status = String(params.status || "").trim();
    const page = Math.max(Number(params.page || 1), 1);
    const limit = CREDIT_PAGE_SIZE_OPTIONS.includes(Number(params.limit))
        ? Number(params.limit)
        : DEFAULT_CREDIT_LIST_PARAMS.limit;

    return {
        section,
        search,
        status,
        page,
        limit,
    };
};

export const buildCreditListQueryKey = (params = {}) => {
    const normalized = normalizeCreditListParams(params);

    return [
        normalized.section,
        normalized.limit,
        normalized.status || "all",
        normalized.search.toLowerCase() || "all",
    ].join("|");
};

export const buildCreditListRequestKey = (params = {}) => {
    const normalized = normalizeCreditListParams(params);

    return `${buildCreditListQueryKey(normalized)}|${normalized.page}`;
};

const buildPaginationMeta = (meta = {}, params = {}) => {
    const normalized = normalizeCreditListParams(params);

    return {
        total: Number(meta.total || 0),
        per_page: Number(meta.per_page || normalized.limit),
        current_page: Number(meta.current_page || normalized.page),
        last_page: Number(meta.last_page || 0),
        from: Number(meta.from || 0),
        to: Number(meta.to || 0),
    };
};

export const clearCreditListCache = () => ({
    type: creditListActionType.CLEAR,
});

export const fetchCreditListPage =
    (params = {}, options = {}) =>
    async (dispatch, getState) => {
        const normalized = normalizeCreditListParams(params);
        const requestKey = buildCreditListRequestKey(normalized);
        const queryKey = buildCreditListQueryKey(normalized);
        const cachedPage = getState().creditList?.cacheByRequestKey?.[requestKey];
        const shouldUseCache = cachedPage && !options.force;

        if (shouldUseCache) {
            return cachedPage;
        }

        if (!options.background) {
            dispatch({
                type: creditListActionType.REQUEST,
                payload: {
                    requestKey,
                },
            });
        }

        try {
            const response = await apiConfig.get(apiBaseURL.CREDITS, {
                params: {
                    section: normalized.section,
                    page: normalized.page,
                    limit: normalized.limit,
                    search: normalized.search || undefined,
                    status:
                        normalized.section === "credits" ||
                        normalized.section === "interest"
                            ? normalized.status || undefined
                            : undefined,
                },
            });

            const payload = response?.data || {};
            const rows = Array.isArray(payload.data) ? payload.data : [];
            const meta = buildPaginationMeta(payload.meta, normalized);
            const pageData = {
                section: payload.section || normalized.section,
                rows,
                meta,
                queryKey,
                requestKey,
                receivedAt: Date.now(),
            };

            dispatch({
                type: creditListActionType.SUCCESS,
                payload: pageData,
            });

            return pageData;
        } catch (error) {
            dispatch({
                type: creditListActionType.FAILURE,
                payload: {
                    requestKey,
                    error:
                        error?.response?.data?.message ||
                        error?.message ||
                        "No se pudo cargar la lista de creditos.",
                },
            });

            if (!options.silent) {
                dispatch(
                    addToast({
                        text:
                            error?.response?.data?.message ||
                            error?.message ||
                            "No se pudo cargar la lista de creditos.",
                        type: toastType.ERROR,
                    })
                );
            }

            throw error;
        }
    };
