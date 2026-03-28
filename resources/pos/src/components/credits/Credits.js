import React, {
    Suspense,
    lazy,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Col, Form, Row } from "react-bootstrap-v5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import TabTitle from "../../shared/tab-title/TabTitle";
import apiConfig from "../../config/apiConfig";
import { addToast } from "../../store/action/toastAction";
import { toastType } from "../../constants";
import {
    currencySymbolHandling,
    getCurrencySymbol,
    parseNumber,
} from "../../shared/sharedMethod";
import {
    clearCreditListCache,
    CREDIT_PAGE_SIZE_OPTIONS,
    buildCreditListRequestKey,
    fetchCreditListPage,
} from "../../store/action/creditListAction";
import {
    CreditCard,
    CreditCardSkeleton,
    CreditActionButton,
    CustomerCreditCard,
    DEFAULT_CONFIG_FORM,
    DEFAULT_EDIT_CREDIT_FORM,
    DEFAULT_MANUAL_FORM,
    DEFAULT_PAYMENT_FORM,
    DEFAULT_RESTRUCTURE_CREDIT_FORM,
    DEFAULT_RETURN_FORM,
    EmptyStateCard,
    InterestCard,
    OverdueCustomerCard,
    SectionButtons,
    STATUS_FILTER_OPTIONS,
    SummaryCard,
    TooltipWrap,
} from "./creditHelpers";
const ConfigModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.ConfigModal,
    }))
);
const DetailModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.DetailModal,
    }))
);
const EditCreditModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.EditCreditModal,
    }))
);
const ManualCreditModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.ManualCreditModal,
    }))
);
const PaymentModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.PaymentModal,
    }))
);
const CreditPrintPreviewModal = lazy(() =>
    import("./CreditPrintPreviewModal").then((module) => ({
        default: module.default,
    }))
);
const RestructureCreditModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.RestructureCreditModal,
    }))
);
const ReturnModal = lazy(() =>
    import("./CreditModals").then((module) => ({
        default: module.ReturnModal,
    }))
);
const preloadCreditModalBundles = () => {
    import("./CreditModals");
    import("./CreditPrintPreviewModal");
};

const PAGE_SIZE = 3;
const PAGE_WINDOW_SIZE = 5;
const MANUAL_PRODUCT_PAGE_SIZE = 250;
const MANUAL_SEARCH_RESULT_LIMIT = 6;
const createDefaultManualForm = () => ({
    ...DEFAULT_MANUAL_FORM,
    start_date: moment().format("YYYY-MM-DD"),
    due_date: moment().add(1, "month").format("YYYY-MM-DD"),
});

const resolveCreditInstallmentsCount = (detail) => {
    if (detail?.credit_type === "libre") {
        return 1;
    }

    if (Number.isFinite(Number(detail?.installments_count))) {
        return Number(detail.installments_count);
    }

    if (Array.isArray(detail?.installments)) {
        return detail.installments.length || 1;
    }

    return Number(detail?.installments || 1) || 1;
};

const SECTION_RESULT_LABELS = {
    credits: "creditos",
    customers: "clientes",
    overdue: "morosos",
    interest: "registros",
};

const Credits = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { creditId } = useParams();
    const settings = useSelector((state) => state.settings);
    const allConfigData = useSelector((state) => state.allConfigData);
    const creditListState = useSelector((state) => state.creditList);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseProducts, setWarehouseProducts] = useState([]);
    const [activeSection, setActiveSection] = useState("credits");
    const [filters, setFilters] = useState({ search: "", status: "" });
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [pagination, setPagination] = useState({
        page: 1,
        limit: PAGE_SIZE,
    });
    const [listReady, setListReady] = useState(false);
    const [dashboard, setDashboard] = useState({
        summary: {},
        customer_configs: [],
        credits: [],
        overdue_customers: [],
        interest_report: [],
    });
    const [creditDetail, setCreditDetail] = useState(null);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [showManualModal, setShowManualModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showPrintPreviewModal, setShowPrintPreviewModal] = useState(false);
    const [showRestructureModal, setShowRestructureModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [printPreviewCreditId, setPrintPreviewCreditId] = useState(null);
    const [currentAction, setCurrentAction] = useState(null);
    const [configForm, setConfigForm] = useState(DEFAULT_CONFIG_FORM);
    const [manualForm, setManualForm] = useState(createDefaultManualForm);
    const [manualProductsLoading, setManualProductsLoading] = useState(false);
    const [editForm, setEditForm] = useState(DEFAULT_EDIT_CREDIT_FORM);
    const [paymentForm, setPaymentForm] = useState(DEFAULT_PAYMENT_FORM);
    const [restructureForm, setRestructureForm] = useState(
        DEFAULT_RESTRUCTURE_CREDIT_FORM
    );
    const [returnForm, setReturnForm] = useState(DEFAULT_RETURN_FORM);
    const [configErrors, setConfigErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});
    const [manualErrors, setManualErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});
    const [restructureErrors, setRestructureErrors] = useState({});
    const [returnErrors, setReturnErrors] = useState({});
    const manualProductInputRef = useRef(null);
    const manualProductsCacheRef = useRef(new Map());
    const manualProductsRequestIdRef = useRef(0);
    const manualLastAutoAddedQueryRef = useRef("");
    const detailRequestIdRef = useRef(0);
    const routeCreditId = Number(creditId || 0);
    const routeAction = useMemo(
        () => new URLSearchParams(location.search).get("action"),
        [location.search]
    );

    const toast = useCallback(
        (text, type = toastType.SUCCESS) =>
            dispatch(addToast({ text, type })),
        [dispatch]
    );

    const getErrorMessage = useCallback(
        (error) =>
            error?.response?.data?.message ||
            error?.message ||
            "No se pudo completar la operacion.",
        []
    );

    const money = useCallback(
        (value) => {
            const safeNumber = parseNumber(value, 0);
            const safeCurrency = getCurrencySymbol(settings);

            return currencySymbolHandling(
                allConfigData,
                safeCurrency,
                safeNumber
            );
        },
        [allConfigData, settings]
    );

    const buildCreditEditForm = (detail) => ({
        ...DEFAULT_EDIT_CREDIT_FORM,
        credit_type: detail?.credit_type || "automatico",
        installments: String(resolveCreditInstallmentsCount(detail)),
        interest_rate: Number(detail?.interest_rate || 0).toFixed(2),
        start_date: detail?.start_date || moment().format("YYYY-MM-DD"),
        due_date:
            detail?.due_date || moment().add(1, "month").format("YYYY-MM-DD"),
        note: detail?.note || "",
    });

    const buildCreditRestructureForm = (detail) => ({
        ...DEFAULT_RESTRUCTURE_CREDIT_FORM,
        credit_type: detail?.credit_type || "automatico",
        installments: String(resolveCreditInstallmentsCount(detail)),
        interest_rate: Number(detail?.interest_rate || 0).toFixed(2),
        start_date: moment().format("YYYY-MM-DD"),
        due_date:
            detail?.due_date || moment().add(1, "month").format("YYYY-MM-DD"),
        note: detail?.note || "",
    });

    const buildCreditTermsPayload = (form) => ({
        credit_type: form.credit_type,
        installments:
            form.credit_type === "libre"
                ? 1
                : Math.max(Number(form.installments || 1), 1),
        interest_rate: Number(form.interest_rate || 0),
        start_date: form.start_date,
        due_date: form.due_date,
        note: form.note,
    });

    const currentListParams = useMemo(
        () => ({
            section: activeSection,
            search: debouncedSearch,
            status:
                activeSection === "credits" || activeSection === "interest"
                    ? filters.status
                    : "",
            page: pagination.page,
            limit: pagination.limit,
        }),
        [
            activeSection,
            debouncedSearch,
            filters.status,
            pagination.limit,
            pagination.page,
        ]
    );

    const currentRequestKey = useMemo(
        () => buildCreditListRequestKey(currentListParams),
        [currentListParams]
    );

    const currentPageData = useMemo(
        () => creditListState?.cacheByRequestKey?.[currentRequestKey] || null,
        [creditListState?.cacheByRequestKey, currentRequestKey]
    );

    const activeRows = useMemo(
        () => currentPageData?.rows || [],
        [currentPageData]
    );

    const activeMeta = useMemo(
        () =>
            currentPageData?.meta || {
                total: 0,
                per_page: pagination.limit,
                current_page: pagination.page,
                last_page: 0,
                from: 0,
                to: 0,
            },
        [currentPageData, pagination.limit, pagination.page]
    );

    const isListLoading = Boolean(
        creditListState?.loadingByRequestKey?.[currentRequestKey]
    );

    const listError = creditListState?.errorByRequestKey?.[currentRequestKey];
    const shouldShowListSkeleton = isListLoading && !currentPageData;

    const visiblePageNumbers = useMemo(() => {
        const totalPages = Math.max(Number(activeMeta.last_page || 0), 1);
        const currentPage = Math.min(
            Math.max(Number(activeMeta.current_page || 1), 1),
            totalPages
        );
        const halfWindow = Math.floor(PAGE_WINDOW_SIZE / 2);
        let startPage = Math.max(currentPage - halfWindow, 1);
        let endPage = Math.min(
            startPage + PAGE_WINDOW_SIZE - 1,
            totalPages
        );

        startPage = Math.max(endPage - PAGE_WINDOW_SIZE + 1, 1);

        return Array.from(
            { length: endPage - startPage + 1 },
            (_, index) => startPage + index
        );
    }, [activeMeta.current_page, activeMeta.last_page]);

    const paginationSummary = useMemo(() => {
        const label = SECTION_RESULT_LABELS[activeSection] || "registros";

        if (activeMeta.total <= 0) {
            return `0 ${label}`;
        }

        return `${activeMeta.from}-${activeMeta.to} de ${activeMeta.total} ${label}`;
    }, [activeMeta.from, activeMeta.to, activeMeta.total, activeSection]);

    const closeAllCreditModals = useCallback(() => {
        setShowConfigModal(false);
        setShowManualModal(false);
        setShowDetailModal(false);
        setShowEditModal(false);
        setShowPaymentModal(false);
        setShowPrintPreviewModal(false);
        setShowRestructureModal(false);
        setShowReturnModal(false);
    }, []);

    const resetManualModalState = () => {
        manualProductsRequestIdRef.current += 1;
        manualLastAutoAddedQueryRef.current = "";
        setManualErrors({});
        setManualForm(createDefaultManualForm());
        setManualProductsLoading(false);
        setWarehouseProducts([]);
    };

    const closeManualModal = () => {
        setShowManualModal(false);
        setCurrentAction(null);
        setCreditDetail(null);
        resetManualModalState();
    };

    const closeDetailModal = useCallback(() => {
        cancelPendingDetailRequest();
        setShowDetailModal(false);
        setCurrentAction(null);
        setCreditDetail(null);

        if (routeCreditId) {
            navigate("/app/credits", { replace: true });
        }
    }, [cancelPendingDetailRequest, navigate, routeCreditId]);

    const closeEditModal = useCallback(() => {
        const shouldReturnToDetail = currentAction === "view" && !!creditDetail;
        setShowEditModal(false);

        if (shouldReturnToDetail) {
            closeAllCreditModals();
            setShowDetailModal(true);
            return;
        }

        cancelPendingDetailRequest();
        setCurrentAction(null);
        setCreditDetail(null);
    }, [
        cancelPendingDetailRequest,
        closeAllCreditModals,
        creditDetail,
        currentAction,
    ]);

    const closeRestructureModal = useCallback(() => {
        const shouldReturnToDetail = currentAction === "view" && !!creditDetail;
        setShowRestructureModal(false);

        if (shouldReturnToDetail) {
            closeAllCreditModals();
            setShowDetailModal(true);
            return;
        }

        cancelPendingDetailRequest();
        setCurrentAction(null);
        setCreditDetail(null);
    }, [
        cancelPendingDetailRequest,
        closeAllCreditModals,
        creditDetail,
        currentAction,
    ]);

    const closeConfigModal = useCallback(() => {
        setShowConfigModal(false);
        setCurrentAction(null);
    }, []);

    const closePaymentModal = useCallback(() => {
        cancelPendingDetailRequest();
        setShowPaymentModal(false);
        setCurrentAction(null);
        setCreditDetail(null);
        setPaymentForm(DEFAULT_PAYMENT_FORM);
        setPaymentErrors({});

        if (routeCreditId && routeAction === "payment") {
            navigate("/app/credits", { replace: true });
        }
    }, [cancelPendingDetailRequest, navigate, routeAction, routeCreditId]);

    const closeReturnModal = useCallback(() => {
        cancelPendingDetailRequest();
        setShowReturnModal(false);
        setCurrentAction(null);
        setCreditDetail(null);
        setReturnForm(DEFAULT_RETURN_FORM);
        setReturnErrors({});
    }, [cancelPendingDetailRequest]);

    const closePrintPreviewModal = useCallback(() => {
        setShowPrintPreviewModal(false);
        setPrintPreviewCreditId(null);
    }, []);

    const openManualModal = useCallback(() => {
        closeAllCreditModals();
        setCurrentAction("create");
        setCreditDetail(null);
        resetManualModalState();
        setShowManualModal(true);
    }, [closeAllCreditModals]);

    const existingCustomerIds = useMemo(() => [], []);

    const clearManualErrorFields = (...fieldNames) => {
        if (fieldNames.length === 0) {
            return;
        }

        setManualErrors((prev) => {
            const nextErrors = { ...prev };
            fieldNames.forEach((fieldName) => {
                delete nextErrors[fieldName];
            });

            return nextErrors;
        });
    };

    const focusManualProductInput = () => {
        setTimeout(() => {
            manualProductInputRef.current?.focus();
            manualProductInputRef.current?.select?.();
        }, 80);
    };

    const normalizeManualLookup = (value) =>
        String(value || "")
            .trim()
            .toLowerCase();

    const getManualProductStock = (product) =>
        parseNumber(product?.attributes?.stock?.quantity, 0);

    const formatManualQuantity = (value) => {
        const safeValue = parseNumber(value, 0);

        if (!Number.isFinite(safeValue)) {
            return "0";
        }

        if (Number.isInteger(safeValue)) {
            return String(safeValue);
        }

        return String(Number(safeValue.toFixed(2)));
    };

    const warehouseProductsById = useMemo(() => {
        const productMap = new Map();

        (warehouseProducts || []).forEach((product) => {
            productMap.set(Number(product.id), product);
        });

        return productMap;
    }, [warehouseProducts]);

    const warehouseExactCodeMap = useMemo(() => {
        const productMap = new Map();

        (warehouseProducts || []).forEach((product) => {
            [product?.attributes?.code, product?.attributes?.product_code]
                .map(normalizeManualLookup)
                .filter(Boolean)
                .forEach((code) => {
                    if (!productMap.has(code)) {
                        productMap.set(code, product);
                    }
                });
        });

        return productMap;
    }, [warehouseProducts]);

    const warehouseSearchIndex = useMemo(
        () =>
            (warehouseProducts || []).map((product) => ({
                product,
                id: Number(product.id),
                normalizedCode: normalizeManualLookup(product?.attributes?.code),
                normalizedProductCode: normalizeManualLookup(
                    product?.attributes?.product_code
                ),
                normalizedName: normalizeManualLookup(product?.attributes?.name),
            })),
        [warehouseProducts]
    );

    const manualTotal = useMemo(
        () =>
            (manualForm.items || []).reduce((sum, item) => {
                const product = warehouseProductsById.get(
                    Number(item.product_id || 0)
                );
                const price = Number(product?.attributes?.product_price || 0);
                const quantity = Number(item.quantity || 0);

                if (!product || quantity <= 0) {
                    return sum;
                }

                return sum + price * quantity;
            }, 0),
        [manualForm.items, warehouseProductsById]
    );

    const findWarehouseProductById = (productId) =>
        warehouseProductsById.get(Number(productId || 0)) || null;

    const findWarehouseProductByExactCode = (query) => {
        const normalizedQuery = normalizeManualLookup(query);

        if (!normalizedQuery) {
            return null;
        }

        return warehouseExactCodeMap.get(normalizedQuery) || null;
    };

    const getManualSearchResults = (
        query,
        limit = MANUAL_SEARCH_RESULT_LIMIT
    ) => {
        const normalizedQuery = normalizeManualLookup(query);

        if (!normalizedQuery) {
            return [];
        }

        const results = [];
        const seenIds = new Set();
        const exactCodeMatch = findWarehouseProductByExactCode(normalizedQuery);
        const pushUniqueResult = (product) => {
            if (!product) {
                return;
            }

            const productId = Number(product.id || 0);
            if (seenIds.has(productId)) {
                return;
            }

            seenIds.add(productId);
            results.push(product);
        };

        pushUniqueResult(exactCodeMatch);

        warehouseSearchIndex.forEach((entry) => {
            const searchableValues = [
                entry.normalizedCode,
                entry.normalizedProductCode,
                entry.normalizedName,
            ].filter(Boolean);

            if (
                entry.normalizedName &&
                entry.normalizedName === normalizedQuery
            ) {
                pushUniqueResult(entry.product);
                return;
            }

            if (
                searchableValues.some((value) =>
                    value.startsWith(normalizedQuery)
                )
            ) {
                pushUniqueResult(entry.product);
            }
        });

        warehouseSearchIndex.forEach((entry) => {
            const searchableValues = [
                entry.normalizedCode,
                entry.normalizedProductCode,
                entry.normalizedName,
            ].filter(Boolean);

            if (
                searchableValues.some((value) => value.includes(normalizedQuery))
            ) {
                pushUniqueResult(entry.product);
            }
        });

        return results.slice(0, Math.max(limit, 1));
    };

    const findWarehouseProductByLookup = (query) =>
        getManualSearchResults(query, 1)[0] || null;

    const manualSearchResults = useMemo(() => {
        if (!showManualModal || !manualForm.warehouse_id?.value) {
            return [];
        }

        return getManualSearchResults(manualForm.product_search);
    }, [
        showManualModal,
        manualForm.product_search,
        manualForm.warehouse_id?.value,
        warehouseExactCodeMap,
        warehouseSearchIndex,
    ]);

    const manualProductPreview = manualSearchResults[0] || null;

    const getRequestedProductQuantity = (
        productId,
        items = manualForm.items || [],
        excludedIndex = -1
    ) =>
        (items || []).reduce((sum, item, index) => {
            if (index === excludedIndex) {
                return sum;
            }

            if (Number(item.product_id || 0) !== Number(productId || 0)) {
                return sum;
            }

            return sum + parseNumber(item.quantity, 0);
        }, 0);

    const addManualProductToForm = (product) => {
        if (!product) {
            return false;
        }

        const stockQuantity = getManualProductStock(product);
        const productName = product?.attributes?.name || "Producto";

        if (stockQuantity <= 0) {
            setManualErrors((prev) => ({
                ...prev,
                product_search: "Stock insuficiente.",
            }));
            toast("Stock insuficiente", toastType.ERROR);
            focusManualProductInput();
            return false;
        }

        let stockExceeded = false;

        setManualForm((prev) => {
            const items = Array.isArray(prev.items) ? [...prev.items] : [];
            const existingIndex = items.findIndex(
                (item) => Number(item.product_id || 0) === Number(product.id)
            );

            if (existingIndex >= 0) {
                const currentQuantity = parseNumber(
                    items[existingIndex].quantity,
                    0
                );
                const nextQuantity = currentQuantity + 1;

                if (nextQuantity > stockQuantity) {
                    stockExceeded = true;
                    return prev;
                }

                items[existingIndex] = {
                    ...items[existingIndex],
                    quantity: formatManualQuantity(nextQuantity),
                };

                return {
                    ...prev,
                    product_search: "",
                    items,
                };
            }

            return {
                ...prev,
                product_search: "",
                items: [
                    ...items,
                    {
                        product_id: String(product.id),
                        quantity: "1",
                    },
                ],
            };
        });

        if (stockExceeded) {
            setManualErrors((prev) => ({
                ...prev,
                product_search: "Stock insuficiente.",
            }));
            toast("Stock insuficiente", toastType.ERROR);
            focusManualProductInput();
            return false;
        }

        clearManualErrorFields(
            "product_search",
            "items",
            "total_amount",
            "warehouse_id"
        );
        toast(`${productName} agregado correctamente`);
        focusManualProductInput();
        return true;
    };

    const handleManualWarehouseChange = (value) => {
        setManualForm((prev) => ({
            ...prev,
            warehouse_id: value,
            product_search: "",
            items: [],
        }));
        manualLastAutoAddedQueryRef.current = "";
        clearManualErrorFields(
            "warehouse_id",
            "product_search",
            "items",
            "total_amount"
        );
        focusManualProductInput();
    };

    const handleManualProductSearchChange = (value) => {
        setManualForm((prev) => ({
            ...prev,
            product_search: value,
        }));
        clearManualErrorFields("product_search", "items", "total_amount");
        manualLastAutoAddedQueryRef.current = "";

        if (!manualForm.warehouse_id?.value) {
            return;
        }

        const normalizedQuery = normalizeManualLookup(value);
        if (!normalizedQuery) {
            return;
        }

        const matchedProduct = findWarehouseProductByExactCode(normalizedQuery);
        if (!matchedProduct) {
            return;
        }

        manualLastAutoAddedQueryRef.current = normalizedQuery;
        addManualProductToForm(matchedProduct);
    };

    const handleManualProductSearchSubmit = (searchValueArg) => {
        const searchValue = String(
            searchValueArg ?? manualForm.product_search ?? ""
        ).trim();
        const normalizedQuery = normalizeManualLookup(searchValue);

        if (!manualForm.warehouse_id?.value) {
            setManualErrors((prev) => ({
                ...prev,
                warehouse_id: "Seleccione una bodega antes de agregar productos.",
            }));
            toast("Seleccione una bodega primero.", toastType.ERROR);
            focusManualProductInput();
            return;
        }

        if (!searchValue) {
            setManualErrors((prev) => ({
                ...prev,
                product_search: "Escanee o escriba un codigo valido.",
            }));
            focusManualProductInput();
            return;
        }

        if (
            normalizedQuery &&
            normalizedQuery === manualLastAutoAddedQueryRef.current
        ) {
            manualLastAutoAddedQueryRef.current = "";
            focusManualProductInput();
            return;
        }

        const product = findWarehouseProductByLookup(searchValue);
        if (!product) {
            setManualErrors((prev) => ({
                ...prev,
                product_search: "Producto no encontrado.",
            }));
            toast("Producto no encontrado", toastType.ERROR);
            focusManualProductInput();
            return;
        }

        manualLastAutoAddedQueryRef.current = "";
        addManualProductToForm(product);
    };

    const handleManualItemQuantityChange = (index, value) => {
        if (value === "") {
            setManualForm((prev) => ({
                ...prev,
                items: prev.items.map((item, itemIndex) =>
                    itemIndex === index ? { ...item, quantity: "" } : item
                ),
            }));
            clearManualErrorFields("items", "total_amount");
            return;
        }

        const nextQuantity = parseNumber(value, 0);
        if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
            return;
        }

        let stockExceeded = false;

        setManualForm((prev) => {
            const items = prev.items.map((item) => ({ ...item }));
            const currentItem = items[index];
            if (!currentItem) {
                return prev;
            }

            const product = findWarehouseProductById(currentItem.product_id);
            const stockQuantity = getManualProductStock(product);
            const otherQuantity = getRequestedProductQuantity(
                currentItem.product_id,
                prev.items,
                index
            );
            const maxAllowedQuantity = Math.max(stockQuantity - otherQuantity, 0);
            const safeQuantity =
                product && nextQuantity > maxAllowedQuantity
                    ? maxAllowedQuantity
                    : nextQuantity;

            if (product && nextQuantity > maxAllowedQuantity) {
                stockExceeded = true;
            }

            items[index] = {
                ...currentItem,
                quantity: formatManualQuantity(safeQuantity),
            };

            return {
                ...prev,
                items,
            };
        });

        if (stockExceeded) {
            toast("Stock insuficiente", toastType.ERROR);
        }

        clearManualErrorFields("items", "total_amount");
    };

    const handleManualItemRemove = (index) => {
        setManualForm((prev) => ({
            ...prev,
            items: prev.items.filter((_, itemIndex) => itemIndex !== index),
        }));
        clearManualErrorFields("items", "total_amount", "product_search");
        focusManualProductInput();
    };

    const fetchCustomers = async () => {
        try {
            const response = await apiConfig.get("/customers?page[size]=0");
            setCustomers(response?.data?.data || []);
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        }
    };

    const fetchWarehouses = async () => {
        try {
            const response = await apiConfig.get("/warehouses?page[size]=0");
            setWarehouses(response?.data?.data || []);
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        }
    };

    const fetchWarehouseProducts = async (warehouseId) => {
        const normalizedWarehouseId = Number(warehouseId || 0);

        if (!normalizedWarehouseId) {
            manualProductsRequestIdRef.current += 1;
            setManualProductsLoading(false);
            setWarehouseProducts([]);
            return [];
        }

        const cacheKey = String(normalizedWarehouseId);
        const requestId = ++manualProductsRequestIdRef.current;
        const cachedProducts = manualProductsCacheRef.current.get(cacheKey);

        if (cachedProducts) {
            setManualProductsLoading(false);
            setWarehouseProducts(cachedProducts);
            return cachedProducts;
        }

        try {
            setManualProductsLoading(true);

            let page = 1;
            let hasMorePages = true;
            const catalogById = new Map();

            while (hasMorePages) {
                const response = await apiConfig.get(
                    `/products/pos-feed?warehouse_id=${normalizedWarehouseId}&page[number]=${page}&page[size]=${MANUAL_PRODUCT_PAGE_SIZE}`
                );
                const batch = response?.data?.data || [];
                const meta = response?.data?.meta || {};

                batch.forEach((product) => {
                    catalogById.set(Number(product.id), product);
                });

                hasMorePages = Boolean(meta.has_more_pages) && batch.length > 0;
                page += 1;
            }

            const catalog = Array.from(catalogById.values());
            manualProductsCacheRef.current.set(cacheKey, catalog);

            if (requestId === manualProductsRequestIdRef.current) {
                setWarehouseProducts(catalog);
            }

            return catalog;
        } catch (error) {
            if (requestId === manualProductsRequestIdRef.current) {
                setWarehouseProducts([]);
                toast(getErrorMessage(error), toastType.ERROR);
            }

            return [];
        } finally {
            if (requestId === manualProductsRequestIdRef.current) {
                setManualProductsLoading(false);
            }
        }
    };

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiConfig.get("/credits/dashboard");
            setDashboard(response?.data?.data || {});
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setLoading(false);
        }
    }, [getErrorMessage, toast]);

    const fetchCreditDetail = useCallback(
        async (creditId, options = {}) => {
            const requestId =
                Number(options.requestId || 0) || detailRequestIdRef.current + 1;
            detailRequestIdRef.current = requestId;

            try {
                setDetailLoading(true);
                const response = await apiConfig.get(`/credits/${creditId}`);
                if (detailRequestIdRef.current !== requestId) {
                    return null;
                }

                const detail = response?.data?.data || null;
                setCreditDetail(detail);
                options.onSuccess?.(detail);

                return detail;
            } catch (error) {
                if (detailRequestIdRef.current !== requestId) {
                    return null;
                }

                toast(getErrorMessage(error), toastType.ERROR);
                return null;
            } finally {
                if (detailRequestIdRef.current === requestId) {
                    setDetailLoading(false);
                }
            }
        },
        [getErrorMessage, toast]
    );

    const cancelPendingDetailRequest = useCallback(() => {
        detailRequestIdRef.current += 1;
        setDetailLoading(false);
    }, []);

    const openModalWithCreditDetail = useCallback(
        (creditId, { action, openModal, onSuccess } = {}) => {
            const resolvedCreditId = Number(creditId || 0);
            if (resolvedCreditId <= 0 || typeof openModal !== "function") {
                return;
            }

            const requestId = detailRequestIdRef.current + 1;
            detailRequestIdRef.current = requestId;
            setCurrentAction(action || null);
            setCreditDetail(null);
            setDetailLoading(true);
            closeAllCreditModals();
            openModal(true);
            fetchCreditDetail(resolvedCreditId, {
                requestId,
                onSuccess,
            });
        },
        [closeAllCreditModals, fetchCreditDetail]
    );

    const fetchSectionPage = useCallback(
        (options = {}) => dispatch(fetchCreditListPage(currentListParams, options)),
        [currentListParams, dispatch]
    );

    const refreshCurrentSection = useCallback(async () => {
        dispatch(clearCreditListCache());
        await fetchDashboard();
        await dispatch(fetchCreditListPage(currentListParams, { force: true }));
    }, [currentListParams, dispatch, fetchDashboard]);

    const handleOpenDetailModal = useCallback(
        (creditId) => {
            openModalWithCreditDetail(creditId, {
                action: "view",
                openModal: setShowDetailModal,
            });
        },
        [openModalWithCreditDetail]
    );

    const handleOpenPaymentModal = useCallback(
        (creditId) => {
            setPaymentErrors({});
            setPaymentForm(DEFAULT_PAYMENT_FORM);
            openModalWithCreditDetail(creditId, {
                action: "payment",
                openModal: setShowPaymentModal,
                onSuccess: (detail) => {
                    setPaymentForm({
                        ...DEFAULT_PAYMENT_FORM,
                        amount:
                            Number(detail?.balance || 0) > 0
                                ? String(detail.balance)
                                : "",
                    });
                },
            });
        },
        [openModalWithCreditDetail]
    );

    const handleOpenEditCreditModalFromRow = useCallback(
        (creditId) => {
            setEditErrors({});
            setEditForm(DEFAULT_EDIT_CREDIT_FORM);
            openModalWithCreditDetail(creditId, {
                action: "edit",
                openModal: setShowEditModal,
                onSuccess: (detail) => {
                    setEditForm(buildCreditEditForm(detail));
                },
            });
        },
        [openModalWithCreditDetail]
    );

    const handleOpenRestructureModalFromRow = useCallback(
        (creditId) => {
            setRestructureErrors({});
            setRestructureForm(DEFAULT_RESTRUCTURE_CREDIT_FORM);
            openModalWithCreditDetail(creditId, {
                action: "restructure",
                openModal: setShowRestructureModal,
                onSuccess: (detail) => {
                    setRestructureForm(buildCreditRestructureForm(detail));
                },
            });
        },
        [openModalWithCreditDetail]
    );

    useEffect(() => {
        fetchCustomers();
        fetchWarehouses();
        fetchDashboard();
    }, [fetchDashboard]);

    useEffect(() => {
        let idleId = null;
        let timeoutId = null;

        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(preloadCreditModalBundles, {
                timeout: 350,
            });
        } else {
            timeoutId = window.setTimeout(preloadCreditModalBundles, 180);
        }

        return () => {
            if (idleId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleId);
            }
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(String(filters.search || "").trim());
        }, 300);

        return () => clearTimeout(timer);
    }, [filters.search]);

    useEffect(() => {
        fetchWarehouseProducts(Number(manualForm.warehouse_id?.value || 0));
    }, [manualForm.warehouse_id?.value]);

    useEffect(() => {
        if (!showManualModal) {
            return;
        }

        const normalizedQuery = normalizeManualLookup(manualForm.product_search);
        if (
            manualProductsLoading ||
            !manualForm.warehouse_id?.value ||
            !normalizedQuery
        ) {
            return;
        }

        const matchedProduct = findWarehouseProductByExactCode(normalizedQuery);
        if (!matchedProduct) {
            return;
        }

        manualLastAutoAddedQueryRef.current = normalizedQuery;
        addManualProductToForm(matchedProduct);
    }, [
        showManualModal,
        manualProductsLoading,
        manualForm.product_search,
        manualForm.warehouse_id?.value,
        warehouseExactCodeMap,
    ]);

    useEffect(() => {
        if (!showManualModal) {
            return undefined;
        }

        const timer = setTimeout(() => {
            focusManualProductInput();
        }, 160);

        return () => clearTimeout(timer);
    }, [showManualModal, manualForm.warehouse_id?.value]);

    useEffect(() => {
        fetchSectionPage().catch(() => {});
    }, [fetchSectionPage]);

    useEffect(() => {
        if (!currentPageData?.meta) {
            return;
        }

        if (
            Number(currentPageData.meta.current_page || 0) >=
            Number(currentPageData.meta.last_page || 0)
        ) {
            return;
        }

        dispatch(
            fetchCreditListPage(
                {
                    ...currentListParams,
                    page: Number(currentPageData.meta.current_page) + 1,
                },
                {
                    background: true,
                    silent: true,
                }
            )
        ).catch(() => {});
    }, [currentListParams, currentPageData, dispatch]);

    useEffect(() => {
        setListReady(false);
        const frameId = window.requestAnimationFrame(() => {
            setListReady(true);
        });

        return () => window.cancelAnimationFrame(frameId);
    }, [activeSection, currentRequestKey]);

    useEffect(() => {
        if (!routeCreditId) {
            return;
        }

        if (routeAction === "payment") {
            handleOpenPaymentModal(routeCreditId);
            return;
        }

        handleOpenDetailModal(routeCreditId);
    }, [
        handleOpenDetailModal,
        handleOpenPaymentModal,
        routeAction,
        routeCreditId,
    ]);

    const validateConfigForm = () => {
        const errors = {};
        if (!configForm.customer_id) errors.customer_id = "Seleccione un cliente.";
        if (Number(configForm.credit_limit) < 0) {
            errors.credit_limit = "Limite invalido.";
        }
        if (Number(configForm.max_installments) < 1) {
            errors.max_installments = "Ingrese al menos una cuota.";
        }
        setConfigErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateManualForm = () => {
        const errors = {};
        if (!manualForm.customer_id) errors.customer_id = "Seleccione un cliente.";
        const normalizedItems = (manualForm.items || []).filter(
            (item) =>
                Number(item.product_id || 0) > 0 && Number(item.quantity || 0) > 0
        );

        const hasNegativeQuantity = (manualForm.items || []).some(
            (item) => parseNumber(item.quantity, 0) < 0
        );

        if (normalizedItems.length > 0 && !manualForm.warehouse_id) {
            errors.warehouse_id = "Seleccione una bodega.";
        }

        if (hasNegativeQuantity) {
            errors.items = "No se permiten cantidades negativas.";
        }

        if (!errors.items && normalizedItems.length > 0) {
            const stockIssue = normalizedItems.reduce((issue, item) => {
                if (issue) {
                    return issue;
                }

                const product = findWarehouseProductById(item.product_id);
                const requestedQuantity = getRequestedProductQuantity(
                    item.product_id,
                    normalizedItems
                );
                const stockQuantity = getManualProductStock(product);

                if (!product) {
                    return "Uno o mas productos ya no estan disponibles en la bodega.";
                }

                if (requestedQuantity > stockQuantity) {
                    return `Stock insuficiente para ${
                        product?.attributes?.name || "el producto seleccionado"
                    }.`;
                }

                return null;
            }, null);

            if (stockIssue) {
                errors.items = stockIssue;
            }
        }

        if (
            normalizedItems.length === 0 &&
            Number(manualForm.total_amount) <= 0
        ) {
            errors.total_amount = "Ingrese un monto valido.";
        }
        setManualErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validatePaymentForm = () => {
        const errors = {};
        const amount = Number(paymentForm.amount || 0);
        const currentBalance = Number(creditDetail?.balance || 0);

        if (!Number.isFinite(amount) || amount <= 0) {
            errors.amount = "Ingrese un monto valido.";
        } else if (currentBalance <= 0) {
            errors.amount = "Este credito ya no tiene saldo pendiente.";
        } else if (amount > currentBalance) {
            errors.amount = `El monto no puede ser mayor al saldo pendiente (${money(
                currentBalance
            )}).`;
        }
        setPaymentErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateEditForm = () => {
        const errors = {};
        const installments =
            editForm.credit_type === "libre"
                ? 1
                : Number(editForm.installments || 0);

        if (!editForm.start_date) errors.start_date = "Seleccione una fecha inicial.";
        if (!editForm.due_date) errors.due_date = "Seleccione una fecha final.";
        if (Number(editForm.interest_rate) < 0) {
            errors.interest_rate = "Ingrese un interes valido.";
        }
        if (installments < 1) {
            errors.installments = "Ingrese al menos una cuota.";
        }
        if (
            editForm.start_date &&
            editForm.due_date &&
            moment(editForm.due_date).isBefore(editForm.start_date, "day")
        ) {
            errors.due_date = "La fecha final no puede ser menor a la inicial.";
        }
        if (!editForm.confirm) {
            errors.confirm = "Debe confirmar los cambios antes de guardar.";
        }

        setEditErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateRestructureForm = () => {
        const errors = {};
        const installments =
            restructureForm.credit_type === "libre"
                ? 1
                : Number(restructureForm.installments || 0);

        if (!restructureForm.start_date) {
            errors.start_date = "Seleccione una fecha inicial.";
        }
        if (!restructureForm.due_date) {
            errors.due_date = "Seleccione una fecha final.";
        }
        if (Number(restructureForm.interest_rate) < 0) {
            errors.interest_rate = "Ingrese un interes valido.";
        }
        if (installments < 1) {
            errors.installments = "Ingrese al menos una cuota.";
        }
        if (!String(restructureForm.reason || "").trim()) {
            errors.reason = "Debe indicar el motivo de la reestructuracion.";
        }
        if (
            restructureForm.start_date &&
            restructureForm.due_date &&
            moment(restructureForm.due_date).isBefore(
                restructureForm.start_date,
                "day"
            )
        ) {
            errors.due_date = "La fecha final no puede ser menor a la inicial.";
        }
        if (!restructureForm.confirm) {
            errors.confirm = "Debe confirmar la reestructuracion antes de guardar.";
        }

        setRestructureErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateReturnForm = () => {
        const errors = {};
        const hasAnyQuantity = Object.values(returnForm.quantities || {}).some(
            (value) => Number(value || 0) > 0
        );

        if (!hasAnyQuantity) {
            errors.items = "Ingrese al menos una cantidad a devolver.";
        }

        setReturnErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const saveConfig = async () => {
        if (!validateConfigForm()) return;
        try {
            setSaving(true);
            await apiConfig.post("/credits/customer-config", {
                customer_id: Number(configForm.customer_id.value),
                credit_limit: Number(configForm.credit_limit || 0),
                interest_rate: Number(configForm.interest_rate || 0),
                max_installments: Number(configForm.max_installments || 1),
                status: configForm.status,
            });
            closeConfigModal();
            setConfigForm(DEFAULT_CONFIG_FORM);
            await refreshCurrentSection();
            toast("Configuracion guardada.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const saveManualCredit = async () => {
        if (!validateManualForm()) return;
        try {
            setSaving(true);
            const items = (manualForm.items || [])
                .filter(
                    (item) =>
                        Number(item.product_id || 0) > 0 &&
                        Number(item.quantity || 0) > 0
                )
                .map((item) => ({
                    product_id: Number(item.product_id),
                    quantity: Number(item.quantity),
                }));

            await apiConfig.post("/credits/manual", {
                customer_id: Number(manualForm.customer_id.value),
                warehouse_id: Number(manualForm.warehouse_id?.value || 0) || null,
                total_amount: Number(
                    items.length > 0 ? manualTotal : manualForm.total_amount || 0
                ),
                interest_rate: Number(manualForm.interest_rate || 0),
                installments: Number(manualForm.installments || 1),
                start_date: manualForm.start_date,
                due_date: manualForm.due_date,
                note: manualForm.note,
                items,
            });
            closeManualModal();
            await refreshCurrentSection();
            toast("Credito manual creado.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const saveCreditEdit = async () => {
        if (!creditDetail || !validateEditForm()) return;

        try {
            const shouldReturnToDetail = currentAction === "view";
            setSaving(true);
            const response = await apiConfig.put(
                `/credits/${creditDetail.id}`,
                buildCreditTermsPayload(editForm)
            );
            const detail = response?.data?.data || null;
            setCreditDetail(detail);
            setShowEditModal(false);
            if (shouldReturnToDetail && detail) {
                closeAllCreditModals();
                setShowDetailModal(true);
                setCurrentAction("view");
            } else {
                setCurrentAction(null);
                setCreditDetail(null);
            }
            setEditForm(DEFAULT_EDIT_CREDIT_FORM);
            await refreshCurrentSection();
            toast("Credito actualizado.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const savePayment = async () => {
        if (!creditDetail || !validatePaymentForm()) return;
        try {
            setSaving(true);
            setPaymentErrors({});
            const response = await apiConfig.post(
                `/credits/${creditDetail.id}/payments`,
                {
                    amount: Number(paymentForm.amount || 0),
                    payment_type: Number(paymentForm.payment_type || 1),
                    note: paymentForm.note,
                }
            );
            const updatedDetail = response?.data?.data || null;
            setCreditDetail(updatedDetail);
            setPaymentForm({
                ...DEFAULT_PAYMENT_FORM,
                payment_type: String(paymentForm.payment_type || 1),
                amount:
                    Number(updatedDetail?.balance || 0) > 0
                        ? String(updatedDetail.balance)
                        : "",
            });
            await refreshCurrentSection();
            toast("Pago registrado.");
        } catch (error) {
            const message = getErrorMessage(error);
            setPaymentErrors({ general: message });
            toast(message, toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const saveCreditRestructure = async () => {
        if (!creditDetail || !validateRestructureForm()) return;

        try {
            const shouldReturnToDetail = currentAction === "view";
            setSaving(true);
            const response = await apiConfig.post(
                `/credits/${creditDetail.id}/restructure`,
                {
                    ...buildCreditTermsPayload(restructureForm),
                    reason: restructureForm.reason,
                }
            );
            const detail = response?.data?.data || null;
            setCreditDetail(detail);
            setShowRestructureModal(false);
            if (shouldReturnToDetail && detail) {
                closeAllCreditModals();
                setShowDetailModal(true);
                setCurrentAction("view");
            } else {
                setCurrentAction(null);
                setCreditDetail(null);
            }
            setRestructureForm(DEFAULT_RESTRUCTURE_CREDIT_FORM);
            await refreshCurrentSection();
            toast("Credito reestructurado.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const saveReturn = async () => {
        if (!creditDetail || !validateReturnForm()) return;

        try {
            setSaving(true);
            const items = Object.entries(returnForm.quantities || {})
                .map(([creditItemId, quantity]) => ({
                    credit_item_id: Number(creditItemId),
                    quantity: Number(quantity || 0),
                }))
                .filter((item) => item.quantity > 0);

            const response = await apiConfig.post(
                `/credits/${creditDetail.id}/returns`,
                {
                    items,
                    note: returnForm.note,
                }
            );

            setCreditDetail(response?.data?.data || null);
            closeReturnModal();
            await refreshCurrentSection();
            toast("Devolucion registrada.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const openConfigModal = useCallback((row = null) => {
        setConfigErrors({});

        if (!row) {
            setConfigForm(DEFAULT_CONFIG_FORM);
        } else {
            setConfigForm({
                customer_id: {
                    value: row.customer_id,
                    label: row.customer_name,
                },
                credit_limit: String(row.credit_limit),
                interest_rate: String(row.interest_rate),
                max_installments: String(row.max_installments),
                status: row.status,
            });
        }

        closeAllCreditModals();
        setCurrentAction("config");
        setShowConfigModal(true);
    }, [closeAllCreditModals]);

    const openEditCreditModal = useCallback((detail = creditDetail) => {
        if (!detail) {
            return;
        }

        setEditErrors({});
        setEditForm(buildCreditEditForm(detail));
        closeAllCreditModals();
        setShowEditModal(true);
    }, [closeAllCreditModals, creditDetail]);

    const openRestructureModal = useCallback((detail = creditDetail) => {
        if (!detail) {
            return;
        }

        setRestructureErrors({});
        setRestructureForm(buildCreditRestructureForm(detail));
        closeAllCreditModals();
        setShowRestructureModal(true);
    }, [closeAllCreditModals, creditDetail]);

    const openReturnModal = useCallback((detail = creditDetail) => {
        if (!detail) {
            return;
        }

        setReturnErrors({});
        setReturnForm({
            quantities: (detail.items || []).reduce((carry, item) => {
                if (item.credit_item_id) {
                    carry[item.credit_item_id] = "";
                }
                return carry;
            }, {}),
            note: "",
        });
        closeAllCreditModals();
        setShowReturnModal(true);
    }, [closeAllCreditModals, creditDetail]);

    const openPrintPreviewModal = useCallback(
        (nextCreditId) => {
            const resolvedCreditId = Number(nextCreditId || creditDetail?.id || 0);
            if (resolvedCreditId <= 0) {
                return;
            }

            setPrintPreviewCreditId(resolvedCreditId);
            setShowPrintPreviewModal(true);
        },
        [creditDetail]
    );

    const handleSectionChange = useCallback((nextSection) => {
        setActiveSection(nextSection);
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    const handleSearchChange = useCallback((event) => {
        const { value } = event.target;

        setFilters((prev) => ({
            ...prev,
            search: value,
        }));
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    const handleStatusChange = useCallback((event) => {
        const { value } = event.target;

        setFilters((prev) => ({
            ...prev,
            status: value,
        }));
        setPagination((prev) => ({
            ...prev,
            page: 1,
        }));
    }, []);

    const handlePageSizeChange = useCallback((event) => {
        const nextLimit = Number(event.target.value || PAGE_SIZE);

        setPagination({
            page: 1,
            limit: CREDIT_PAGE_SIZE_OPTIONS.includes(nextLimit)
                ? nextLimit
                : PAGE_SIZE,
        });
    }, []);

    const handlePageChange = useCallback(
        (nextPage) => {
            const safeNextPage = Math.max(
                1,
                Math.min(Number(nextPage || 1), Number(activeMeta.last_page || 1))
            );

            setPagination((prev) => ({
                ...prev,
                page: safeNextPage,
            }));
        },
        [activeMeta.last_page]
    );

    const handleOpenEditFromDetail = useCallback(
        () => openEditCreditModal(),
        [openEditCreditModal]
    );

    const handleOpenPrintFromDetail = useCallback(() => {
        setShowDetailModal(false);
        openPrintPreviewModal(creditDetail?.id);
    }, [creditDetail, openPrintPreviewModal]);

    const handleOpenRestructureFromDetail = useCallback(
        () => openRestructureModal(),
        [openRestructureModal]
    );

    const handleOpenReturnFromDetail = useCallback(
        () => openReturnModal(),
        [openReturnModal]
    );

    const renderSkeletonCards = useMemo(
        () =>
            Array.from({ length: pagination.limit }, (_, index) => (
                <CreditCardSkeleton key={`credit-skeleton-${index}`} />
            )),
        [pagination.limit]
    );

    const activeSectionContent = useMemo(() => {
        if (loading || shouldShowListSkeleton) {
            return renderSkeletonCards;
        }

        if (activeSection === "customers") {
            if (!activeRows.length) {
                return (
                    <EmptyStateCard text="No hay clientes configurados para credito." />
                );
            }

            return activeRows.map((row) => (
                <CustomerCreditCard
                    key={row.id}
                    row={row}
                    money={money}
                    onEdit={openConfigModal}
                />
            ));
        }

        if (activeSection === "overdue") {
            if (!activeRows.length) {
                return <EmptyStateCard text="No hay clientes morosos." />;
            }

            return activeRows.map((row) => (
                <OverdueCustomerCard
                    key={row.customer_id}
                    row={row}
                    money={money}
                />
            ));
        }

        if (activeSection === "interest") {
            if (!activeRows.length) {
                return <EmptyStateCard text="No hay datos de interes disponibles." />;
            }

            return activeRows.map((row) => (
                <InterestCard key={row.credit_id} row={row} money={money} />
            ));
        }

        if (!activeRows.length) {
            return <EmptyStateCard text="No hay creditos registrados." />;
        }

        return activeRows.map((row) => (
            <CreditCard
                key={row.id}
                row={row}
                money={money}
                onView={handleOpenDetailModal}
                onPrint={openPrintPreviewModal}
                onEdit={handleOpenEditCreditModalFromRow}
                onPay={handleOpenPaymentModal}
                onRestructure={handleOpenRestructureModalFromRow}
            />
        ));
    }, [
        activeRows,
        activeSection,
        handleOpenDetailModal,
        handleOpenEditCreditModalFromRow,
        handleOpenPaymentModal,
        handleOpenRestructureModalFromRow,
        loading,
        money,
        openConfigModal,
        openPrintPreviewModal,
        renderSkeletonCards,
        shouldShowListSkeleton,
    ]);

    const summary = dashboard.summary || {};

    return (
        <MasterLayout>
            <div className="creditos-module credits-page">
                <TabTitle title="Creditos" />
                <HeaderTitle title="Creditos" />

                <Row className="g-4 mb-5">
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Saldo pendiente"
                            value={money(summary.pending_balance)}
                            icon="balance"
                            tooltip="Monto total que los clientes aun deben pagar"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Capital usado"
                            value={money(summary.principal_in_use)}
                            icon="capital"
                            tooltip="Monto original otorgado en creditos, sin intereses"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Creditos vencidos"
                            value={String(summary.overdue_credits || 0)}
                            icon="overdue"
                            tooltip="Cantidad de creditos con fecha de vencimiento superada"
                        />
                    </Col>
                    <Col xl={3} md={6}>
                        <SummaryCard
                            label="Interes cobrado"
                            value={money(summary.collected_interest)}
                            icon="interest"
                            tooltip="Interes efectivamente cobrado a los clientes"
                        />
                    </Col>
                </Row>

                <div className="card credits-surface-card">
                    <div className="card-body">
                        <div className="d-flex flex-wrap justify-content-between align-items-center credits-toolbar mb-4">
                            <SectionButtons
                                activeSection={activeSection}
                                setActiveSection={handleSectionChange}
                            />

                            <div className="d-flex flex-wrap credits-toolbar credits-toolbar-actions">
                                <TooltipWrap
                                    text="Buscar por cliente, numero de venta o credito"
                                    block
                                >
                                    <Form.Control
                                        className="credits-toolbar-field"
                                        placeholder="Buscar cliente, venta o credito"
                                        value={filters.search}
                                        onChange={handleSearchChange}
                                    />
                                </TooltipWrap>
                                <TooltipWrap
                                    text="Filtrar la lista de creditos por estado"
                                    block
                                >
                                    <Form.Select
                                        className="credits-toolbar-field"
                                        value={filters.status}
                                        onChange={handleStatusChange}
                                        disabled={
                                            activeSection !== "credits" &&
                                            activeSection !== "interest"
                                        }
                                    >
                                        {STATUS_FILTER_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </TooltipWrap>
                                <TooltipWrap text="Definir limite de credito y condiciones del cliente">
                                    <CreditActionButton
                                        action="configure-customer"
                                        onClick={() => openConfigModal()}
                                    >
                                        Configurar cliente
                                    </CreditActionButton>
                                </TooltipWrap>
                                <TooltipWrap text="Crear un credito sin necesidad de factura">
                                    <CreditActionButton
                                        action="create-manual-credit"
                                        onClick={openManualModal}
                                    >
                                        Credito manual
                                    </CreditActionButton>
                                </TooltipWrap>
                            </div>
                        </div>

                        <>
                            <div
                                className={`credits-card-grid credits-page-transition${
                                    listReady
                                        ? " credits-page-transition--ready"
                                        : ""
                                }${
                                    activeSection === "overdue"
                                        ? " credits-card-grid--compact"
                                        : ""
                                }`}
                            >
                                {activeSectionContent}
                            </div>

                            {listError ? (
                                <div className="credits-list-feedback">
                                    {listError}
                                </div>
                            ) : null}

                            <div className="credits-pagination">
                                <div className="credits-pagination__summary">
                                    {paginationSummary}
                                </div>
                                <div className="credits-pagination__controls">
                                    <label
                                        className="credits-pagination__limit"
                                        htmlFor="credits-page-size"
                                    >
                                        <span>Mostrar</span>
                                        <Form.Select
                                            id="credits-page-size"
                                            value={pagination.limit}
                                            onChange={handlePageSizeChange}
                                        >
                                            {CREDIT_PAGE_SIZE_OPTIONS.map(
                                                (size) => (
                                                    <option
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size}
                                                    </option>
                                                )
                                            )}
                                        </Form.Select>
                                    </label>

                                    <div className="credits-pagination__nav">
                                        <CreditActionButton
                                            action="page-nav"
                                            onClick={() =>
                                                handlePageChange(
                                                    Number(
                                                        activeMeta.current_page
                                                    ) - 1
                                                )
                                            }
                                            disabled={
                                                Number(
                                                    activeMeta.current_page || 1
                                                ) <= 1
                                            }
                                        >
                                            Anterior
                                        </CreditActionButton>

                                        <div className="credits-pagination__pages">
                                            {visiblePageNumbers.map(
                                                (pageNumber) => (
                                                    <CreditActionButton
                                                        key={pageNumber}
                                                        action={
                                                            pageNumber ===
                                                            Number(
                                                                activeMeta.current_page
                                                            )
                                                                ? "page-current"
                                                                : "page-nav"
                                                        }
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pageNumber
                                                            )
                                                        }
                                                    >
                                                        {pageNumber}
                                                    </CreditActionButton>
                                                )
                                            )}
                                        </div>

                                        <CreditActionButton
                                            action="page-nav"
                                            onClick={() =>
                                                handlePageChange(
                                                    Number(
                                                        activeMeta.current_page
                                                    ) + 1
                                                )
                                            }
                                            disabled={
                                                Number(
                                                    activeMeta.current_page || 1
                                                ) >=
                                                    Number(
                                                        activeMeta.last_page || 0
                                                    ) ||
                                                Number(activeMeta.last_page || 0) ===
                                                    0
                                            }
                                        >
                                            Siguiente
                                        </CreditActionButton>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </div>

            <Suspense fallback={null}>
                {showConfigModal ? (
                    <ConfigModal
                        show={showConfigModal}
                        onHide={closeConfigModal}
                        form={configForm}
                        setForm={setConfigForm}
                        errors={configErrors}
                        customers={customers}
                        saving={saving}
                        onSubmit={saveConfig}
                        existingCustomerIds={existingCustomerIds}
                    />
                ) : null}
                {showManualModal ? (
                    <ManualCreditModal
                        show={showManualModal}
                        onHide={closeManualModal}
                        form={manualForm}
                        setForm={setManualForm}
                        errors={manualErrors}
                        customers={customers}
                        warehouses={warehouses}
                        productsById={warehouseProductsById}
                        productsLoading={manualProductsLoading}
                        manualTotal={manualTotal}
                        money={money}
                        productPreview={manualProductPreview}
                        searchResults={manualSearchResults}
                        productInputRef={manualProductInputRef}
                        saving={saving}
                        onWarehouseChange={handleManualWarehouseChange}
                        onProductSearchChange={handleManualProductSearchChange}
                        onProductSearchSubmit={handleManualProductSearchSubmit}
                        onSelectSearchResult={addManualProductToForm}
                        onQuantityChange={handleManualItemQuantityChange}
                        onRemoveItem={handleManualItemRemove}
                        onSubmit={saveManualCredit}
                    />
                ) : null}
                {showDetailModal ? (
                    <DetailModal
                        show={showDetailModal}
                        onHide={closeDetailModal}
                        detailLoading={detailLoading}
                        creditDetail={creditDetail}
                        money={money}
                        onOpenEdit={handleOpenEditFromDetail}
                        onOpenPrint={handleOpenPrintFromDetail}
                        onOpenRestructure={handleOpenRestructureFromDetail}
                        onOpenReturn={handleOpenReturnFromDetail}
                    />
                ) : null}
                {showEditModal ? (
                    <EditCreditModal
                        show={showEditModal}
                        onHide={closeEditModal}
                        creditDetail={creditDetail}
                        money={money}
                        form={editForm}
                        setForm={setEditForm}
                        errors={editErrors}
                        saving={saving}
                        onSubmit={saveCreditEdit}
                    />
                ) : null}
                {showPaymentModal ? (
                    <PaymentModal
                        show={showPaymentModal}
                        onHide={closePaymentModal}
                        detailLoading={detailLoading}
                        creditDetail={creditDetail}
                        money={money}
                        form={paymentForm}
                        setForm={setPaymentForm}
                        errors={paymentErrors}
                        saving={saving}
                        onSubmit={savePayment}
                    />
                ) : null}
                {showPrintPreviewModal ? (
                    <CreditPrintPreviewModal
                        show={showPrintPreviewModal}
                        onHide={closePrintPreviewModal}
                        creditId={printPreviewCreditId}
                        money={money}
                    />
                ) : null}
                {showRestructureModal ? (
                    <RestructureCreditModal
                        show={showRestructureModal}
                        onHide={closeRestructureModal}
                        creditDetail={creditDetail}
                        money={money}
                        form={restructureForm}
                        setForm={setRestructureForm}
                        errors={restructureErrors}
                        saving={saving}
                        onSubmit={saveCreditRestructure}
                    />
                ) : null}
                {showReturnModal ? (
                    <ReturnModal
                        show={showReturnModal}
                        onHide={closeReturnModal}
                        detailLoading={detailLoading}
                        creditDetail={creditDetail}
                        money={money}
                        form={returnForm}
                        setForm={setReturnForm}
                        errors={returnErrors}
                        saving={saving}
                        onSubmit={saveReturn}
                    />
                ) : null}
            </Suspense>
        </MasterLayout>
    );
};

export default Credits;
