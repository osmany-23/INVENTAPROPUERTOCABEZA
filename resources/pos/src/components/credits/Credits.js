import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap-v5";
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
    CreditCard,
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
import {
    ConfigModal,
    DetailModal,
    EditCreditModal,
    ManualCreditModal,
    PaymentModal,
    RestructureCreditModal,
    ReturnModal,
} from "./CreditModals";

const PAGE_SIZE = 8;
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

const Credits = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { creditId } = useParams();
    const settings = useSelector((state) => state.settings);
    const allConfigData = useSelector((state) => state.allConfigData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseProducts, setWarehouseProducts] = useState([]);
    const [activeSection, setActiveSection] = useState("credits");
    const [filters, setFilters] = useState({ search: "", status: "" });
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
    const [showRestructureModal, setShowRestructureModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [currentAction, setCurrentAction] = useState(null);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
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
    const routeCreditId = Number(creditId || 0);
    const routeAction = useMemo(
        () => new URLSearchParams(location.search).get("action"),
        [location.search]
    );

    const toast = (text, type = toastType.SUCCESS) =>
        dispatch(addToast({ text, type }));

    const getErrorMessage = (error) =>
        error?.response?.data?.message ||
        error?.message ||
        "No se pudo completar la operacion.";

    const money = (value) => {
        const safeNumber = parseNumber(value, 0);
        const safeCurrency = getCurrencySymbol(settings);
        return currencySymbolHandling(
            allConfigData,
            safeCurrency,
            safeNumber
        );
    };

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

    const closeAllCreditModals = () => {
        setShowConfigModal(false);
        setShowManualModal(false);
        setShowDetailModal(false);
        setShowEditModal(false);
        setShowPaymentModal(false);
        setShowRestructureModal(false);
        setShowReturnModal(false);
    };

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

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setCurrentAction(null);
        setCreditDetail(null);

        if (routeCreditId) {
            navigate("/app/credits", { replace: true });
        }
    };

    const openDetailModal = (creditId) => {
        setCurrentAction("view");
        fetchCreditDetail(creditId, () => {
            closeAllCreditModals();
            setShowDetailModal(true);
        });
    };

    const closeEditModal = () => {
        const shouldReturnToDetail = currentAction === "view" && !!creditDetail;
        setShowEditModal(false);

        if (shouldReturnToDetail) {
            closeAllCreditModals();
            setShowDetailModal(true);
            return;
        }

        setCurrentAction(null);
        setCreditDetail(null);
    };

    const closeRestructureModal = () => {
        const shouldReturnToDetail = currentAction === "view" && !!creditDetail;
        setShowRestructureModal(false);

        if (shouldReturnToDetail) {
            closeAllCreditModals();
            setShowDetailModal(true);
            return;
        }

        setCurrentAction(null);
        setCreditDetail(null);
    };

    const closeConfigModal = () => {
        setShowConfigModal(false);
        setCurrentAction(null);
    };

    const closePaymentModal = () => {
        setShowPaymentModal(false);
        setCurrentAction(null);
        setCreditDetail(null);
        setPaymentForm(DEFAULT_PAYMENT_FORM);
        setPaymentErrors({});

        if (routeCreditId && routeAction === "payment") {
            navigate("/app/credits", { replace: true });
        }
    };

    const closeReturnModal = () => {
        setShowReturnModal(false);
        setCurrentAction(null);
        setCreditDetail(null);
        setReturnForm(DEFAULT_RETURN_FORM);
        setReturnErrors({});
    };

    const openManualModal = () => {
        closeAllCreditModals();
        setCurrentAction("create");
        setCreditDetail(null);
        resetManualModalState();
        setShowManualModal(true);
    };

    const existingCustomerIds = useMemo(
        () =>
            (dashboard.customer_configs || []).map((row) =>
                Number(row.customer_id)
            ),
        [dashboard.customer_configs]
    );

    const activeRows = useMemo(() => {
        if (activeSection === "customers") {
            return dashboard.customer_configs || [];
        }

        if (activeSection === "overdue") {
            return dashboard.overdue_customers || [];
        }

        if (activeSection === "interest") {
            return dashboard.interest_report || [];
        }

        return dashboard.credits || [];
    }, [
        activeSection,
        dashboard.credits,
        dashboard.customer_configs,
        dashboard.overdue_customers,
        dashboard.interest_report,
    ]);

    const visibleRows = useMemo(
        () => activeRows.slice(0, visibleCount),
        [activeRows, visibleCount]
    );

    const hasMoreRows = visibleCount < activeRows.length;

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

    const fetchDashboard = async (params = filters) => {
        try {
            setLoading(true);
            const response = await apiConfig.get("/credits/dashboard", {
                params: {
                    search: params.search || undefined,
                    status: params.status || undefined,
                },
            });
            setDashboard(response?.data?.data || {});
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setLoading(false);
        }
    };

    const fetchCreditDetail = async (creditId, onSuccess) => {
        try {
            setDetailLoading(true);
            const response = await apiConfig.get(`/credits/${creditId}`);
            const detail = response?.data?.data || null;
            setCreditDetail(detail);
            if (onSuccess) {
                onSuccess(detail);
            }
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setDetailLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchWarehouses();
        fetchDashboard();
    }, []);

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
        const timer = setTimeout(() => fetchDashboard(filters), 350);
        return () => clearTimeout(timer);
    }, [filters.search, filters.status]);

    useEffect(() => {
        if (!routeCreditId) {
            return;
        }

        if (routeAction === "payment") {
            setPaymentErrors({});
            setCurrentAction("payment");
            fetchCreditDetail(routeCreditId, (detail) => {
                setPaymentForm({
                    ...DEFAULT_PAYMENT_FORM,
                    amount:
                        Number(detail?.balance || 0) > 0
                            ? String(detail.balance)
                            : "",
                });
                closeAllCreditModals();
                setShowPaymentModal(true);
            });
            return;
        }

        openDetailModal(routeCreditId);
    }, [routeCreditId, routeAction]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [activeSection, filters.search, filters.status, activeRows.length]);

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
            await fetchDashboard();
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
            await fetchDashboard();
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
            await fetchDashboard();
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
            await fetchDashboard();
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
            await fetchDashboard();
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
            await fetchDashboard();
            toast("Devolucion registrada.");
        } catch (error) {
            toast(getErrorMessage(error), toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const openConfigModal = (row = null) => {
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
    };

    const openPaymentModal = (row) => {
        setPaymentErrors({});
        setPaymentForm({
            ...DEFAULT_PAYMENT_FORM,
            amount: String(row.balance),
        });
        setCurrentAction("payment");
        fetchCreditDetail(row.id, () => {
            closeAllCreditModals();
            setShowPaymentModal(true);
        });
    };

    const openEditCreditModal = (detail = creditDetail) => {
        if (!detail) {
            return;
        }

        setEditErrors({});
        setEditForm(buildCreditEditForm(detail));
        closeAllCreditModals();
        setShowEditModal(true);
    };

    const openEditCreditModalFromRow = (row) => {
        setCurrentAction("edit");
        fetchCreditDetail(row.id, (detail) => {
            setEditErrors({});
            setEditForm(buildCreditEditForm(detail));
            closeAllCreditModals();
            setShowEditModal(true);
        });
    };

    const openRestructureModal = (detail = creditDetail) => {
        if (!detail) {
            return;
        }

        setRestructureErrors({});
        setRestructureForm(buildCreditRestructureForm(detail));
        closeAllCreditModals();
        setShowRestructureModal(true);
    };

    const openRestructureModalFromRow = (row) => {
        setCurrentAction("restructure");
        fetchCreditDetail(row.id, (detail) => {
            setRestructureErrors({});
            setRestructureForm(buildCreditRestructureForm(detail));
            closeAllCreditModals();
            setShowRestructureModal(true);
        });
    };

    const openReturnModal = (detail = creditDetail) => {
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
    };

    const renderCreditCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay creditos registrados." />;
        }

        return rows.map((row) => (
            <CreditCard
                key={row.id}
                row={row}
                money={money}
                onView={() => openDetailModal(row.id)}
                onEdit={() => openEditCreditModalFromRow(row)}
                onPay={() => openPaymentModal(row)}
                onRestructure={() => openRestructureModalFromRow(row)}
            />
        ));
    };

    const renderCustomerCards = (rows) => {
        if (!rows.length) {
            return (
                <EmptyStateCard text="No hay clientes configurados para credito." />
            );
        }

        return rows.map((row) => (
            <CustomerCreditCard
                key={row.id}
                row={row}
                money={money}
                onEdit={() => openConfigModal(row)}
            />
        ));
    };

    const renderOverdueCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay clientes morosos." />;
        }

        return rows.map((row) => (
            <OverdueCustomerCard
                key={row.customer_id}
                row={row}
                money={money}
            />
        ));
    };

    const renderInterestCards = (rows) => {
        if (!rows.length) {
            return <EmptyStateCard text="No hay datos de interes disponibles." />;
        }

        return rows.map((row) => (
            <InterestCard key={row.credit_id} row={row} money={money} />
        ));
    };

    const renderActiveSection = () => {
        if (activeSection === "customers") {
            return renderCustomerCards(visibleRows);
        }

        if (activeSection === "overdue") {
            return renderOverdueCards(visibleRows);
        }

        if (activeSection === "interest") {
            return renderInterestCards(visibleRows);
        }

        return renderCreditCards(visibleRows);
    };

    const summary = dashboard.summary || {};

    return (
        <MasterLayout>
            <div className="credits-page">
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
                                setActiveSection={setActiveSection}
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
                                        onChange={(event) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                search: event.target.value,
                                            }))
                                        }
                                    />
                                </TooltipWrap>
                                <TooltipWrap
                                    text="Filtrar la lista de creditos por estado"
                                    block
                                >
                                    <Form.Select
                                        className="credits-toolbar-field"
                                        value={filters.status}
                                        onChange={(event) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                status: event.target.value,
                                            }))
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
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => openConfigModal()}
                                    >
                                        Configurar cliente
                                    </Button>
                                </TooltipWrap>
                                <TooltipWrap text="Crear un credito sin necesidad de factura">
                                    <Button
                                        onClick={openManualModal}
                                    >
                                        Credito manual
                                    </Button>
                                </TooltipWrap>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-8">
                                <Spinner animation="border" />
                            </div>
                        ) : (
                            <>
                                <div
                                    className={`credits-card-grid${
                                        activeSection === "overdue"
                                            ? " credits-card-grid--compact"
                                            : ""
                                    }`}
                                >
                                    {renderActiveSection()}
                                </div>

                                {hasMoreRows ? (
                                    <div className="credits-load-more">
                                        <TooltipWrap text="Mostrar mas resultados sin recargar la pantalla">
                                            <Button
                                                variant="outline-primary"
                                                onClick={() =>
                                                    setVisibleCount(
                                                        (prev) => prev + PAGE_SIZE
                                                    )
                                                }
                                            >
                                                Mostrar mas
                                            </Button>
                                        </TooltipWrap>
                                    </div>
                                ) : null}
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ConfigModal
                show={showConfigModal}
                onHide={closeConfigModal}
                form={configForm}
                setForm={setConfigForm}
                errors={configErrors}
                customers={customers}
                saving={saving}
                onSubmit={saveConfig}
                existingCustomerIds={existingCustomerIds.filter(
                    (id) => id !== Number(configForm.customer_id?.value)
                )}
            />
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
            <DetailModal
                show={showDetailModal}
                onHide={closeDetailModal}
                detailLoading={detailLoading}
                creditDetail={creditDetail}
                money={money}
                onOpenEdit={() => openEditCreditModal()}
                onOpenRestructure={() => openRestructureModal()}
                onOpenReturn={() => openReturnModal()}
            />
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
        </MasterLayout>
    );
};

export default Credits;
