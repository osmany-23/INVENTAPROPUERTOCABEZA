import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Col, Container, Row, Table } from "react-bootstrap-v5";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Category from "./Category";
import Brands from "./Brand";
import Product from "./product/Product";
import ProductCartList from "./cart-product/ProductCartList";
import ProductSearchbar from "./product/ProductSearchbar";
import ProductBatchSelectionModal from "./product/ProductBatchSelectionModal";
import FefoSaleValidationModal from "./product/FefoSaleValidationModal";
import { createCartProductTemplate } from "../shared/PrepareCartArray";
import ProductDetailsModel from "../shared/ProductDetailsModel";
import CartItemMainCalculation from "./cart-product/CartItemMainCalculation";
import PosHeader from "./header/PosHeader";
import { posCashPaymentAction } from "../../store/action/pos/posCashPaymentAction";
import PaymentButton from "./cart-product/PaymentButton";
import CashPaymentModel from "./cart-product/paymentModel/CashPaymentModel";
import PrintData from "./printModal/PrintData";
import PaymentSlipModal from "./paymentSlipModal/PaymentSlipModal";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import { fetchSetting } from "../../store/action/settingAction";
import { calculateProductCost } from "../shared/SharedMethod";
import {
    fetchBrandClickable,
} from "../../store/action/pos/posAllProductAction";
import TabTitle from "../../shared/tab-title/TabTitle";
import HeaderAllButton from "./header/HeaderAllButton";
import RegisterDetailsModel from "./register-detailsModal/RegisterDetailsModel";
import PrintRegisterDetailsData from "./printModal/PrintRegisterDetailsData";
import {
    closeRegisterAction,
    fetchTodaySaleOverAllReport,
    getAllRegisterDetailsAction,
} from "../../store/action/pos/posRegisterDetailsAction";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import { discountType, paymentMethodOptions, toastType } from "../../constants";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import CustomerForm from "./customerModel/CustomerForm";
import HoldListModal from "./holdListModal/HoldListModal";
import { fetchHoldLists } from "../../store/action/pos/HoldListAction";
import { useNavigate } from "react-router";
import PosCloseRegisterDetailsModel from "../../components/posRegister/PosCloseRegisterDetailsModel.js";
import { addToast } from "../../store/action/toastAction";
import PosRegisterModel from "../../components/posRegister/PosRegisterModel.js";
import { can } from "../../shared/can";
import apiConfig from "../../config/apiConfig";
import {
    buildCartRowId,
    getCartProductId,
    getCartRowId,
    sortBatchesByFefo,
} from "../../shared/batchHelpers";

const POS_PAYMENT_STATUS = {
    PAID: 1,
    CREDIT: 2,
};

const POS_CREDIT_TYPE = {
    INSTALLMENTS: "automatico",
    FREE: "libre",
};

const toMoneyNumber = (value) => {
    const parsedValue = Number.parseFloat(value);

    if (!Number.isFinite(parsedValue)) {
        return 0;
    }

    return Number(parsedValue.toFixed(2));
};

const calculateCreditPendingAmount = (grandTotal, initialPayment) =>
    Math.max(toMoneyNumber(grandTotal) - toMoneyNumber(initialPayment), 0);

const isTruthySettingValue = (value) => {
    if (typeof value === "string") {
        const normalizedValue = value.trim().toLowerCase();

        return normalizedValue === "1" || normalizedValue === "true";
    }

    return value === true || value === 1;
};

const createInitialCashPaymentValue = (getFormattedMessage) => ({
    notes: "",
    credit_enabled: false,
    credit_sale: false,
    credit_type: POS_CREDIT_TYPE.INSTALLMENTS,
    credit_initial_payment: "0.00",
    use_customer_credit_config: true,
    credit_interest_rate: "0.00",
    credit_installments: "1",
    credit_due_date: moment().add(1, "month").format("YYYY-MM-DD"),
    payment_status: {
        label: getFormattedMessage("dashboard.recentSales.paid.label"),
        value: POS_PAYMENT_STATUS.PAID,
    },
});

const INITIAL_CREDIT_AVAILABILITY = {
    allowed: true,
    message: "",
    credit_limit: 0,
    current_balance: 0,
    used_credit: 0,
    available_credit: 0,
    requested_amount: 0,
    requested_principal_amount: 0,
    requested_interest_rate: 0,
    projected_interest_amount: 0,
    next_balance: 0,
    interest_rate: 0,
    max_installments: 1,
    has_overdue_credits: false,
    overdue_credits: 0,
    can_create: true,
    allow_exceed: false,
    status: null,
};

const BATCH_SELECTION_MODE = {
    FEFO: "fefo",
    SPECIFIC: "specific",
};

const createEmptyFefoValidationState = () => ({
    show: false,
    productName: "",
    selectedBatches: [],
    recommendedBatches: [],
});

const roundBatchQuantity = (value) => Number(Number(value || 0).toFixed(2));

const toFefoBatchDisplayItem = (batch, quantity = 1) => ({
    batch_id: Number(batch?.batch_id || batch?.id || 0) || null,
    lot_code: batch?.lot_code || batch?.batch_code || null,
    expires_at: batch?.expires_at || batch?.batch_expires_at || null,
    quantity: roundBatchQuantity(quantity),
});

const buildAllocationMap = (allocations = []) =>
    allocations.reduce((carry, allocation) => {
        const batchId = Number(allocation?.batch_id || allocation?.id || 0) || null;
        if (!batchId) {
            return carry;
        }

        carry.set(
            batchId,
            roundBatchQuantity(
                Number(carry.get(batchId) || 0) + Number(allocation?.quantity || 0)
            )
        );

        return carry;
    }, new Map());

const PosMainPage = (props) => {
    const {
        onClickFullScreen,
        posAllProducts,
        posCashPaymentAction,
        frontSetting,
        fetchFrontSetting,
        settings,
        fetchSetting,
        paymentDetails,
        allConfigData,
        fetchBrandClickable,
        posAllTodaySaleOverAllReport,
        fetchHoldLists,
        holdListData,
    } = props;
    const PRODUCT_PAGE_SIZE = 80;
    const componentRef = useRef();
    const registerDetailsRef = useRef();
    const productRequestRef = useRef(0);
    const creditLimitRequestRef = useRef(0);
    const lastAppliedCreditConfigRef = useRef(null);
    const updateProductsRef = useRef([]);
    const productBatchCacheRef = useRef(new Map());
    const pendingFefoActionRef = useRef(null);
    // const [play] = useSound('https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3');
    const [openCalculator, setOpenCalculator] = useState(false);
    const [updateProducts, setUpdateProducts] = useState([]);
    const [isOpenCartItemUpdateModel, setIsOpenCartItemUpdateModel] =
        useState(false);
    const [product, setProduct] = useState(null);
    const [paymentPrint, setPaymentPrint] = useState({});
    const [cashPayment, setCashPayment] = useState(false);
    const [modalShowPaymentSlip, setModalShowPaymentSlip] = useState(false);
    const [modalShowCustomer, setModalShowCustomer] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [brandId, setBrandId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [batchSelectionProduct, setBatchSelectionProduct] = useState(null);
    const [showBatchSelectionModal, setShowBatchSelectionModal] = useState(false);
    const [fefoValidationState, setFefoValidationState] = useState(
        createEmptyFefoValidationState()
    );
    const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [updateHolList, setUpdateHoldList] = useState(false);
    const [hold_ref_no, setHold_ref_no] = useState("");
    const [currentProductPage, setCurrentProductPage] = useState(1);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
    const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);
    const [cartItemValue, setCartItemValue] = useState({
        discount_type: discountType.FIXED,    // 0 = fixed, 1 = percentage
        discount_value: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
    });
    const [cashPaymentValue, setCashPaymentValue] = useState(
        createInitialCashPaymentValue(getFormattedMessage)
    );
    const [creditAvailability, setCreditAvailability] = useState(
        INITIAL_CREDIT_AVAILABILITY
    );
    const [isLoadingCreditAvailability, setIsLoadingCreditAvailability] =
        useState(false);
    const [errors, setErrors] = useState({ notes: "" });
    // const [searchString, setSearchString] = useState('');
    const [changeReturn, setChangeReturn] = useState(0);
    const [showCloseDetailsModal, setShowCloseDetailsModal] = useState(false);
    const [showPosRegisterModel, setShowPosRegisterModel] = useState(false)
    const { closeRegisterDetails } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const canApplyDiscount = can("pos.apply_discount", { strict: true });
    const canCancelSale = can("pos.cancel_sale", { strict: true });
    const canCreateSale = can("pos.create_sale", { strict: true });
    const canEditPosSalePrice = can("edit_pos_sale_price", { strict: true });
    const isCreditSaleMode =
        cashPaymentValue?.payment_status?.value === POS_PAYMENT_STATUS.CREDIT;
    const creditInitialPaymentAmount = toMoneyNumber(
        cashPaymentValue?.credit_initial_payment
    );
    const creditInitialPaymentRequired = isTruthySettingValue(
        settings?.attributes?.require_initial_payment
    );

    const productById = useMemo(() => {
        const productMap = new Map();
        posAllProducts.forEach((productItem) => {
            productMap.set(Number(productItem.id), productItem);
        });

        return productMap;
    }, [posAllProducts]);

    const productStockById = useMemo(() => {
        const stockMap = {};
        posAllProducts.forEach((productItem) => {
            stockMap[Number(productItem.id)] = Number(
                productItem?.attributes?.stock?.quantity || 0
            );
        });

        return stockMap;
    }, [posAllProducts]);

    const normalizeCartItems = useCallback(
        (cartItems = []) => {
            if (!Array.isArray(cartItems)) {
                return [];
            }

            return cartItems.map((cartItem) => {
                const productId = getCartProductId(cartItem);
                const availableStock = Number(
                    cartItem?.batch_id
                        ? cartItem?.stock_quantity || cartItem?.batch_available_quantity || 0
                        : productStockById[productId] || cartItem?.stock_quantity || 0
                );
                const cartRowId = getCartRowId(cartItem);
                const requestedQuantity = Number(cartItem?.quantity || 0);
                const minValidQuantity = requestedQuantity > 0 ? requestedQuantity : 1;
                const normalizedQuantity =
                    availableStock > 0
                        ? Math.min(minValidQuantity, availableStock)
                        : minValidQuantity;

                const normalizedItem = {
                    ...cartItem,
                    id: productId,
                    product_id: productId,
                    cart_row_id: cartRowId,
                    stock_quantity: availableStock > 0 ? availableStock : Number(cartItem?.stock_quantity || 0),
                    quantity: normalizedQuantity,
                };

                return {
                    ...normalizedItem,
                    sub_total:
                        Number(calculateProductCost(normalizedItem) || 0) *
                        normalizedQuantity,
                };
            });
        },
        [productStockById]
    );

    const totalQty = useMemo(() => {
        return updateProducts.reduce(
            (sum, cartProduct) => sum + Number(cartProduct.quantity || 0),
            0
        );
    }, [updateProducts]);

    const subTotal = useMemo(() => {
        return updateProducts.reduce((sum, cartProduct) => {
            return sum + Number(calculateProductCost(cartProduct) || 0) * Number(cartProduct.quantity || 0);
        }, 0);
    }, [updateProducts]);

    const [holdListId, setHoldListValue] = useState({
        referenceNumber: "",
    });

    const closeFefoValidationModal = useCallback(() => {
        pendingFefoActionRef.current = null;
        setFefoValidationState(createEmptyFefoValidationState());
    }, []);

    const openFefoValidationModal = useCallback(
        ({ productName, selectedBatches, recommendedBatches, onConfirm }) => {
            pendingFefoActionRef.current = onConfirm;
            setFefoValidationState({
                show: true,
                productName: productName || "Producto con lotes",
                selectedBatches,
                recommendedBatches,
            });
        },
        []
    );

    const confirmFefoValidation = useCallback(() => {
        const pendingAction = pendingFefoActionRef.current;
        closeFefoValidationModal();

        if (typeof pendingAction === "function") {
            void Promise.resolve(pendingAction());
        }
    }, [closeFefoValidationModal]);

    const buildReservedBatchQuantities = useCallback((cartItems, productId) => {
        return cartItems.reduce((carry, cartItem) => {
            if (getCartProductId(cartItem) !== Number(productId)) {
                return carry;
            }

            const batchId = Number(cartItem?.batch_id || 0);
            if (!batchId) {
                return carry;
            }

            carry.set(
                batchId,
                roundBatchQuantity(
                    Number(carry.get(batchId) || 0) + Number(cartItem?.quantity || 0)
                )
            );

            return carry;
        }, new Map());
    }, []);

    const fetchProductBatches = useCallback(
        async (productId, { forceRefresh = false } = {}) => {
            const normalizedProductId = Number(productId || 0);
            const warehouseId = Number(selectedOption?.value || 0);

            if (!normalizedProductId || !warehouseId) {
                return [];
            }

            const cacheKey = `${warehouseId}:${normalizedProductId}`;
            if (!forceRefresh && productBatchCacheRef.current.has(cacheKey)) {
                return productBatchCacheRef.current.get(cacheKey);
            }

            const response = await apiConfig.get(`/products/${normalizedProductId}/batches`);
            const batches = sortBatchesByFefo(
                (response?.data?.data?.batches || []).filter(
                    (batch) =>
                        Number(batch.warehouse_id) === warehouseId &&
                        Number(batch.available_quantity || 0) > 0 &&
                        batch.status !== "expired"
                )
            );

            productBatchCacheRef.current.set(cacheKey, batches);
            return batches;
        },
        [selectedOption?.value]
    );

    const resolveFefoBatchFromBatches = useCallback(
        (batches, productId, cartItems) => {
            const reservedQuantities = buildReservedBatchQuantities(cartItems, productId);

            for (const batch of sortBatchesByFefo(batches)) {
                const effectiveAvailableQuantity = roundBatchQuantity(
                    Number(batch.available_quantity || 0) -
                        Number(reservedQuantities.get(Number(batch.id)) || 0)
                );

                if (effectiveAvailableQuantity > 0) {
                    return {
                        ...batch,
                        effective_available_quantity: effectiveAvailableQuantity,
                    };
                }
            }

            return null;
        },
        [buildReservedBatchQuantities]
    );

    const decorateProductWithBatchSelection = useCallback(
        (
            sourceProduct,
            batch,
            {
                selectionMode = BATCH_SELECTION_MODE.FEFO,
                recommendedBatch = batch,
                forced = false,
            } = {}
        ) => {
            if (!sourceProduct?.attributes || !batch) {
                return sourceProduct;
            }

            return {
                ...sourceProduct,
                attributes: {
                    ...sourceProduct.attributes,
                    batch_context: {
                        ...(sourceProduct.attributes?.batch_context || {}),
                        id: Number(batch.id || 0) || null,
                        lot_code: batch.lot_code,
                        lot_barcode: batch.lot_barcode,
                        expires_at: batch.expires_at,
                        available_quantity: roundBatchQuantity(
                            batch.available_quantity ??
                                sourceProduct.attributes?.batch_context?.available_quantity
                        ),
                        effective_available_quantity: roundBatchQuantity(
                            batch.effective_available_quantity ??
                                batch.available_quantity ??
                                sourceProduct.attributes?.batch_context?.effective_available_quantity ??
                                sourceProduct.attributes?.batch_context?.available_quantity
                        ),
                    },
                    batch_status:
                        batch.status || sourceProduct.attributes?.batch_status || null,
                    batch_selection_mode: selectionMode,
                    fefo_context: recommendedBatch
                        ? {
                              recommended_batch_id:
                                  Number(recommendedBatch.id || 0) || null,
                              recommended_lot_code: recommendedBatch.lot_code || null,
                              recommended_expires_at:
                                  recommendedBatch.expires_at || null,
                              compliant:
                                  Number(batch.id || 0) ===
                                  Number(recommendedBatch.id || 0),
                              forced,
                          }
                        : null,
                },
            };
        },
        []
    );

    const buildExpectedFefoAllocations = useCallback((batches, requestedQuantity) => {
        const allocations = [];
        let remainingQuantity = roundBatchQuantity(requestedQuantity);

        for (const batch of sortBatchesByFefo(batches)) {
            if (remainingQuantity <= 0) {
                break;
            }

            const availableQuantity = roundBatchQuantity(batch.available_quantity);
            if (availableQuantity <= 0) {
                continue;
            }

            const consumedQuantity = Math.min(remainingQuantity, availableQuantity);
            allocations.push(
                toFefoBatchDisplayItem(batch, consumedQuantity)
            );
            remainingQuantity = roundBatchQuantity(remainingQuantity - consumedQuantity);
        }

        return {
            allocations,
            remainingQuantity,
        };
    }, []);

    const validateCartFefoCompliance = useCallback(async () => {
        const trackedGroups = updateProductsRef.current.reduce((carry, cartItem) => {
            if (!cartItem?.batch_id) {
                return carry;
            }

            const productId = getCartProductId(cartItem);
            if (!productId) {
                return carry;
            }

            if (!carry.has(productId)) {
                carry.set(productId, []);
            }

            carry.get(productId).push(cartItem);
            return carry;
        }, new Map());

        for (const [productId, productLines] of trackedGroups.entries()) {
            const batches = await fetchProductBatches(productId, { forceRefresh: true });
            const requestedQuantity = roundBatchQuantity(
                productLines.reduce(
                    (sum, cartItem) => sum + Number(cartItem?.quantity || 0),
                    0
                )
            );

            const expectedPlan = buildExpectedFefoAllocations(
                batches,
                requestedQuantity
            );

            if (expectedPlan.remainingQuantity > 0) {
                return {
                    ok: false,
                    type: "stock",
                    message:
                        "No hay suficiente stock por lote para completar la venta con la prioridad FEFO.",
                };
            }

            const selectedAllocations = productLines.map((cartItem) =>
                toFefoBatchDisplayItem(cartItem, cartItem.quantity)
            );
            const selectedMap = buildAllocationMap(selectedAllocations);
            const expectedMap = buildAllocationMap(expectedPlan.allocations);
            const selectedKeys = Array.from(selectedMap.keys()).sort((a, b) => a - b);
            const expectedKeys = Array.from(expectedMap.keys()).sort((a, b) => a - b);

            const sameKeys =
                selectedKeys.length === expectedKeys.length &&
                selectedKeys.every((key, index) => key === expectedKeys[index]);
            const sameQuantities =
                sameKeys &&
                selectedKeys.every(
                    (key) =>
                        roundBatchQuantity(selectedMap.get(key)) ===
                        roundBatchQuantity(expectedMap.get(key))
                );

            if (!sameKeys || !sameQuantities) {
                return {
                    ok: false,
                    type: "mismatch",
                    productName: productLines[0]?.name || "Producto con lotes",
                    selectedBatches: selectedAllocations,
                    recommendedBatches: expectedPlan.allocations,
                };
            }
        }

        return {
            ok: true,
        };
    }, [buildExpectedFefoAllocations, fetchProductBatches]);

    const discountTotal = subTotal - cartItemValue.discount;
    const taxTotal = (discountTotal * cartItemValue.tax) / 100;
    const mainTotal = discountTotal + taxTotal;
    const grandTotal = (
        Number(mainTotal) + Number(cartItemValue.shipping)
    ).toFixed(2);
    const creditPendingAmount = calculateCreditPendingAmount(
        grandTotal,
        creditInitialPaymentAmount
    );

    useEffect(() => {
        setPaymentPrint((previous) => ({
            ...previous,
            barcode_url:
                paymentDetails.attributes &&
                paymentDetails.attributes.barcode_url,
            reference_code:
                paymentDetails.attributes &&
                paymentDetails.attributes.reference_code,
        }));
    }, [paymentDetails]);

    useEffect(() => {
        setSelectedCustomerOption(
            settings.attributes && {
                value: Number(settings.attributes.default_customer),
                label: settings.attributes.customer_name,
            }
        );
        setSelectedOption(
            settings.attributes && {
                value: Number(settings.attributes.default_warehouse),
                label: settings.attributes.warehouse_name,
            }
        );
    }, [settings]);

    useEffect(() => {
        fetchSetting();
        fetchFrontSetting();
        dispatch(fetchTodaySaleOverAllReport());
        fetchHoldLists();
    }, [fetchSetting, fetchFrontSetting, dispatch, fetchHoldLists]);

    useEffect(() => {
        if(allConfigData){
            setShowPosRegisterModel(allConfigData?.open_register)
        }
    },[allConfigData])

    useEffect(() => {
        if (updateHolList === true) {
            fetchHoldLists();
            setUpdateHoldList(false);
        }
    }, [updateHolList]);

    useEffect(() => {
        updateProductsRef.current = updateProducts;
    }, [updateProducts]);

    useEffect(() => {
        productBatchCacheRef.current.clear();
    }, [selectedOption?.value]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 250);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchTerm]);

    const handleValidation = () => {
        let errors = {};
        let isValid = false;
        if (
            cashPaymentValue["notes"] &&
            cashPaymentValue["notes"].length > 100
        ) {
            errors["notes"] =
                "The notes must not be greater than 100 characters";
        } else if (
            isCreditSaleMode &&
            creditInitialPaymentRequired &&
            creditInitialPaymentAmount <= 0
        ) {
            errors["credit_initial_payment"] =
                "El pago inicial es obligatorio para ventas a credito.";
        } else if (
            isCreditSaleMode &&
            creditPendingAmount <= 0
        ) {
            errors["credit_initial_payment"] =
                "El pago inicial debe ser menor al total de la venta.";
        } else if (
            isCreditSaleMode &&
            !cashPaymentValue?.credit_due_date
        ) {
            errors["credit_due_date"] = "Seleccione la fecha de vencimiento";
        } else if (
            isCreditSaleMode &&
            cashPaymentValue?.credit_type !== POS_CREDIT_TYPE.FREE &&
            Number(cashPaymentValue?.credit_installments || 0) < 1
        ) {
            errors["credit_installments"] = "Ingrese al menos una cuota";
        } else if (
            isCreditSaleMode &&
            cashPaymentValue?.credit_type !== POS_CREDIT_TYPE.FREE &&
            Number(cashPaymentValue?.credit_installments || 0) >
                Number(creditAvailability?.max_installments || 1)
        ) {
            errors["credit_installments"] = `No puede exceder ${Number(
                creditAvailability?.max_installments || 1
            )} cuotas.`;
        } else {
            isValid = true;
        }
        setErrors(errors);
        return isValid;
    };

    const fetchProductsPage = useCallback(
        async (pageNumber, append = false) => {
            if (!selectedOption?.value) {
                return;
            }

            const requestId = ++productRequestRef.current;
            setIsLoadingMoreProducts(true);

            const meta = await fetchBrandClickable(
                brandId,
                categoryId,
                selectedOption.value,
                {
                    page: pageNumber,
                    pageSize: PRODUCT_PAGE_SIZE,
                    append,
                    search: debouncedSearchTerm,
                    isLoading: !append,
                }
            );

            if (requestId !== productRequestRef.current) {
                return;
            }

            setCurrentProductPage(pageNumber);
            setHasMoreProducts(Boolean(meta?.has_more_pages));
            setIsLoadingMoreProducts(false);
        },
        [
            selectedOption,
            fetchBrandClickable,
            brandId,
            categoryId,
            debouncedSearchTerm,
            PRODUCT_PAGE_SIZE,
        ]
    );

    useEffect(() => {
        if (!selectedOption?.value) {
            return;
        }

        fetchProductsPage(1, false);
    }, [selectedOption, brandId, categoryId, debouncedSearchTerm, fetchProductsPage]);

    const loadMoreProducts = useCallback(() => {
        if (!selectedOption?.value || isLoadingMoreProducts || !hasMoreProducts) {
            return;
        }

        fetchProductsPage(currentProductPage + 1, true);
    }, [
        selectedOption,
        isLoadingMoreProducts,
        hasMoreProducts,
        currentProductPage,
        fetchProductsPage,
    ]);

    const setCategory = useCallback((item) => {
        setCategoryId(item);
    }, []);

    const setBrand = useCallback((item) => {
        setBrandId(item);
    }, []);

    const onChangeInput = useCallback((e) => {
        e.preventDefault();
        setCashPaymentValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const onPaymentStatusChange = useCallback((obj) => {
        if (obj.value !== POS_PAYMENT_STATUS.CREDIT) {
            lastAppliedCreditConfigRef.current = null;
            setCreditAvailability(INITIAL_CREDIT_AVAILABILITY);
            setIsLoadingCreditAvailability(false);
        }

        setCashPaymentValue((inputs) => ({
            ...inputs,
            payment_status: obj,
            ...(obj.value === POS_PAYMENT_STATUS.CREDIT
                ? {
                      credit_sale: true,
                      credit_enabled: true,
                      credit_type:
                          inputs?.credit_type || POS_CREDIT_TYPE.INSTALLMENTS,
                      credit_initial_payment:
                          inputs?.credit_initial_payment || "0.00",
                      received_amount: undefined,
                  }
                : {
                      credit_sale: false,
                      credit_enabled: false,
                      credit_type: POS_CREDIT_TYPE.INSTALLMENTS,
                      credit_initial_payment: "0.00",
                      use_customer_credit_config: true,
                      credit_interest_rate: "0.00",
                      credit_installments: "1",
                      credit_due_date: moment()
                          .add(1, "month")
                          .format("YYYY-MM-DD"),
                      received_amount: undefined,
                  }),
        }));
    }, []);

    const onCreditTypeChange = useCallback(
        (event) => {
            const nextCreditType = event.target.value;
            lastAppliedCreditConfigRef.current = null;

            setCashPaymentValue((inputs) => ({
                ...inputs,
                credit_type: nextCreditType,
                credit_installments:
                    nextCreditType === POS_CREDIT_TYPE.FREE
                        ? "1"
                        : inputs?.credit_installments || "1",
            }));
        },
        []
    );

    const onChangeReturnChange = useCallback((change) => {
        setChangeReturn(change);
    }, []);

    const getSelectedCustomerId = useCallback(() => {
        return selectedCustomerOption && selectedCustomerOption[0]
            ? selectedCustomerOption[0].value
            : selectedCustomerOption && selectedCustomerOption.value;
    }, [selectedCustomerOption]);

    const getSelectedCustomerName = useCallback(() => {
        return selectedCustomerOption && selectedCustomerOption[0]
            ? selectedCustomerOption[0].label
            : selectedCustomerOption && selectedCustomerOption.label;
    }, [selectedCustomerOption]);

    const onUseCustomerCreditConfigChange = useCallback((event) => {
        const shouldUseCustomerConfig = event.target.checked;
        if (shouldUseCustomerConfig) {
            lastAppliedCreditConfigRef.current = null;
        }

        setCashPaymentValue((inputs) => ({
            ...inputs,
            use_customer_credit_config: shouldUseCustomerConfig,
        }));
    }, []);

    const fetchCreditAvailability = useCallback(
        async ({ showErrors = false } = {}) => {
            if (!isCreditSaleMode) {
                setCreditAvailability(INITIAL_CREDIT_AVAILABILITY);
                setIsLoadingCreditAvailability(false);
                return true;
            }

            const customerId = getSelectedCustomerId();
            if (!customerId) {
                const message = "Seleccione un cliente para vender al credito.";
                setCreditAvailability({
                    ...INITIAL_CREDIT_AVAILABILITY,
                    allowed: false,
                    can_create: false,
                    message,
                });

                if (showErrors) {
                    dispatch(
                        addToast({
                            text: message,
                            type: toastType.ERROR,
                        })
                    );
                }

                return false;
            }

            if (creditPendingAmount <= 0) {
                const message =
                    "El saldo pendiente del crédito debe ser mayor a cero.";
                setCreditAvailability({
                    ...INITIAL_CREDIT_AVAILABILITY,
                    allowed: false,
                    can_create: false,
                    message,
                });

                if (showErrors) {
                    dispatch(
                        addToast({
                            text: message,
                            type: toastType.ERROR,
                        })
                    );
                }

                return false;
            }

            const requestId = ++creditLimitRequestRef.current;
            setIsLoadingCreditAvailability(true);

            try {
                const requestParams = {
                    customer_id: customerId,
                    amount: creditPendingAmount,
                };

                if (!cashPaymentValue?.use_customer_credit_config) {
                    requestParams.interest_rate = Number(
                        cashPaymentValue?.credit_interest_rate || 0
                    );
                }

                const response = await apiConfig.get("/credits/check-limit", {
                    params: requestParams,
                });

                if (requestId !== creditLimitRequestRef.current) {
                    return true;
                }

                const payload = {
                    ...INITIAL_CREDIT_AVAILABILITY,
                    ...(response?.data?.data || {}),
                };

                setCreditAvailability(payload);
                setIsLoadingCreditAvailability(false);

                if (!payload.allowed && showErrors) {
                    dispatch(
                        addToast({
                            text:
                                payload.message ||
                                "El cliente no tiene credito disponible.",
                            type: toastType.ERROR,
                        })
                    );
                }

                return Boolean(payload.allowed);
            } catch (error) {
                if (requestId !== creditLimitRequestRef.current) {
                    return false;
                }

                const message =
                    error?.response?.data?.message ||
                    "No se pudo validar el credito del cliente.";

                setCreditAvailability({
                    ...INITIAL_CREDIT_AVAILABILITY,
                    allowed: false,
                    can_create: false,
                    message,
                });
                setIsLoadingCreditAvailability(false);

                if (showErrors) {
                    dispatch(
                        addToast({
                            text: message,
                            type: toastType.ERROR,
                        })
                    );
                }

                return false;
            }
        },
        [
            cashPaymentValue?.credit_interest_rate,
            cashPaymentValue?.use_customer_credit_config,
            creditPendingAmount,
            dispatch,
            getSelectedCustomerId,
            isCreditSaleMode,
        ]
    );

    const verifyCreditAvailability = useCallback(async () => {
        return fetchCreditAvailability({ showErrors: true });
        /*
        if (!cashPaymentValue?.credit_enabled) {
            return true;
        }

        const customerId = getSelectedCustomerId();
        if (!customerId) {
            dispatch(
                addToast({
                    text: "Seleccione un cliente para vender al crédito.",
                    type: toastType.ERROR,
                })
            );
            return false;
        }

        try {
            const response = await apiConfig.get("/credits/check-limit", {
                params: {
                    customer_id: customerId,
                    amount: grandTotal,
                },
            });

            const payload = response?.data?.data || {};
            if (!payload.allowed) {
                dispatch(
                    addToast({
                        text:
                            payload.message ||
                            "El cliente no tiene crédito disponible.",
                        type: toastType.ERROR,
                    })
                );
                return false;
            }

            return true;
        } catch (error) {
            dispatch(
                addToast({
                    text:
                        error?.response?.data?.message ||
                        "No se pudo validar el crédito del cliente.",
                    type: toastType.ERROR,
                })
            );
            return false;
        }
        */
    }, [fetchCreditAvailability]);

    useEffect(() => {
        if (!cashPayment || !isCreditSaleMode) {
            return;
        }

        fetchCreditAvailability();
    }, [
        cashPayment,
        fetchCreditAvailability,
        isCreditSaleMode,
        selectedCustomerOption,
    ]);

    useEffect(() => {
        const customerId = getSelectedCustomerId();
        if (
            !isCreditSaleMode ||
            !cashPaymentValue?.use_customer_credit_config ||
            !customerId
        ) {
            return;
        }

        const nextInstallments =
            cashPaymentValue?.credit_type === POS_CREDIT_TYPE.FREE
                ? 1
                : Math.max(Number(creditAvailability?.max_installments || 1), 1);

        const nextSignature = `${customerId}:${Number(
            creditAvailability?.interest_rate || 0
        ).toFixed(2)}:${nextInstallments}:${cashPaymentValue?.credit_type}`;

        if (lastAppliedCreditConfigRef.current === nextSignature) {
            return;
        }

        lastAppliedCreditConfigRef.current = nextSignature;
        setCashPaymentValue((inputs) => ({
            ...inputs,
            credit_interest_rate: Number(
                creditAvailability?.interest_rate || 0
            ).toFixed(2),
            credit_installments: String(nextInstallments),
        }));
    }, [
        cashPaymentValue?.credit_type,
        cashPaymentValue?.use_customer_credit_config,
        creditAvailability?.interest_rate,
        creditAvailability?.max_installments,
        getSelectedCustomerId,
        isCreditSaleMode,
    ]);

    // payment type dropdown functionality
    const paymentTypeFilterOptions = getFormattedOptions(paymentMethodOptions);
    const paymentTypeDefaultValue = paymentTypeFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });
    const [paymentValue, setPaymentValue] = useState({
        payment_type: paymentTypeDefaultValue[0],
    });

    const onPaymentTypeChange = useCallback((obj) => {
        setPaymentValue((previous) => ({ ...previous, payment_type: obj }));
    }, []);

    const onChangeCart = useCallback((event) => {
        if (updateProducts.length === 0) {
            dispatch(addToast({ text: getFormattedMessage("pos.cash-payment.product-error.message"), type: toastType.ERROR }));
            return;
        }
        const { value } = event.target;
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }

        let discount = cartItemValue.discount;
        if (
            (event.target.name === "discount_value" || event.target.name === "discount_type") &&
            !canApplyDiscount
        ) {
            dispatch(
                addToast({
                    text: "No tiene permiso para aplicar descuentos.",
                    type: toastType.ERROR,
                })
            );
            return;
        }

        if (event.target.name == 'discount_value') {
            if (cartItemValue.discount_type == discountType.FIXED) {
                discount = value;
            } else {
                discount = (Number(subTotal) * Number(value)) / 100;
            }
        }
        if (event.target.name === 'discount_type') {
            if (value == discountType.FIXED) {
                discount = cartItemValue.discount_value;
            } else {
                discount = (Number(subTotal) * Number(cartItemValue.discount_value)) / 100;
            }
        }

        setCartItemValue((inputs) => ({
            ...inputs,
            discount: discount,
            [event.target.name]: value,
        }));
    }, [updateProducts.length, dispatch, getFormattedMessage, cartItemValue, canApplyDiscount, subTotal]);

    const onChangeTaxCart = useCallback((event) => {
        if (updateProducts.length === 0) {
            dispatch(addToast({ text: getFormattedMessage("pos.cash-payment.product-error.message"), type: toastType.ERROR }));
            return;
        }
        const min = 0;
        const max = 100;
        const { value } = event.target;
        const values = Math.max(min, Math.min(max, Number(value)));
        // check if value includes a decimal point
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            // restrict value to only 2 decimal places
            if (decimal?.length > 2) {
                // do nothing
                return;
            }
        }
        setCartItemValue((inputs) => ({
            ...inputs,
            [event.target.name]: values,
        }));
    }, [updateProducts.length, dispatch, getFormattedMessage]);

    //payment slip model onchange
    const handleCashPayment = useCallback(() => {
        lastAppliedCreditConfigRef.current = null;
        setCreditAvailability(INITIAL_CREDIT_AVAILABILITY);
        setIsLoadingCreditAvailability(false);
        setCashPaymentValue(createInitialCashPaymentValue(getFormattedMessage));
        setCashPayment((previous) => !previous);
    }, [getFormattedMessage]);

    //product details model onChange
    const openProductDetailModal = useCallback(() => {
        setIsOpenCartItemUpdateModel((previous) => !previous);
    }, []);

    //product details model updated value
    const onClickUpdateItemInCart = useCallback((item) => {
        if (!canEditPosSalePrice) {
            dispatch(
                addToast({
                    text: "No tiene permiso para editar el precio de venta en POS.",
                    type: toastType.ERROR,
                })
            );
            return;
        }

        setProduct(item);
        setIsOpenCartItemUpdateModel(true);
    }, [canEditPosSalePrice, dispatch]);

    const onProductUpdateInCart = useCallback((updatedProduct) => {
        if (!updatedProduct) {
            return;
        }

        setUpdateProducts((products) =>
            normalizeCartItems(
                products.map((cartProduct) =>
                    getCartRowId(cartProduct) === getCartRowId(updatedProduct)
                        ? { ...updatedProduct }
                        : cartProduct
                )
            )
        );
    }, [normalizeCartItems]);

    const updateCart = useCallback(
        (cartProductsOrUpdater) => {
            setUpdateProducts((previousProducts) => {
                const nextProducts =
                    typeof cartProductsOrUpdater === "function"
                        ? cartProductsOrUpdater(previousProducts)
                        : cartProductsOrUpdater;

                if (!Array.isArray(nextProducts)) {
                    return previousProducts;
                }

                return normalizeCartItems(nextProducts);
            });
        },
        [normalizeCartItems]
    );

    //cart item delete
    const onDeleteCartItem = useCallback((cartRowId) => {
        setUpdateProducts((products) =>
            products.filter((cartProduct) => getCartRowId(cartProduct) !== String(cartRowId))
        );
    }, []);

    const addProductToCart = useCallback(async (productPayload) => {
        if (!selectedOption?.value) {
            dispatch(
                addToast({
                    text: getFormattedMessage("purchase.select.warehouse.validate.label"),
                    type: toastType.ERROR,
                })
            );
            return false;
        }

        const baseProduct =
            typeof productPayload === "object" && productPayload?.attributes
                ? productPayload
                : posAllProducts.find(
                      (productItem) =>
                          Number(productItem.id) === Number(productPayload || 0)
                  ) || null;
        const productId = getCartProductId(baseProduct || { id: productPayload });
        let resolvedProduct = baseProduct;

        try {
            if (resolvedProduct?.attributes?.batch_enabled) {
                const batches = await fetchProductBatches(productId);
                const selectionMode =
                    resolvedProduct?.attributes?.batch_selection_mode ===
                    BATCH_SELECTION_MODE.SPECIFIC
                        ? BATCH_SELECTION_MODE.SPECIFIC
                        : BATCH_SELECTION_MODE.FEFO;

                if (selectionMode === BATCH_SELECTION_MODE.SPECIFIC) {
                    const selectedBatchId =
                        Number(resolvedProduct?.attributes?.batch_context?.id || 0) || null;
                    const selectedBatch = batches.find(
                        (batch) => Number(batch.id) === selectedBatchId
                    );

                    if (!selectedBatch) {
                        dispatch(
                            addToast({
                                text: "El lote seleccionado ya no tiene stock disponible.",
                                type: toastType.ERROR,
                            })
                        );
                        return false;
                    }

                    const reservedQuantities = buildReservedBatchQuantities(
                        updateProductsRef.current,
                        productId
                    );
                    const effectiveAvailableQuantity = roundBatchQuantity(
                        Number(selectedBatch.available_quantity || 0) -
                            Number(reservedQuantities.get(selectedBatchId) || 0)
                    );

                    if (effectiveAvailableQuantity <= 0) {
                        dispatch(
                            addToast({
                                text: "La cantidad solicitada excede la disponibilidad del lote seleccionado.",
                                type: toastType.ERROR,
                            })
                        );
                        return false;
                    }

                    const recommendedBatch =
                        resolveFefoBatchFromBatches(
                            batches,
                            productId,
                            updateProductsRef.current
                        ) || selectedBatch;

                    resolvedProduct = decorateProductWithBatchSelection(
                        resolvedProduct,
                        {
                            ...selectedBatch,
                            effective_available_quantity: effectiveAvailableQuantity,
                        },
                        {
                            selectionMode: BATCH_SELECTION_MODE.SPECIFIC,
                            recommendedBatch,
                            forced: Boolean(
                                resolvedProduct?.attributes?.fefo_context?.forced
                            ),
                        }
                    );
                } else {
                    const fefoBatch = resolveFefoBatchFromBatches(
                        batches,
                        productId,
                        updateProductsRef.current
                    );

                    if (!fefoBatch) {
                        dispatch(
                            addToast({
                                text: "Este producto maneja lotes, pero no tiene lotes FEFO disponibles en la bodega seleccionada.",
                                type: toastType.ERROR,
                            })
                        );
                        return false;
                    }

                    resolvedProduct = decorateProductWithBatchSelection(
                        resolvedProduct,
                        fefoBatch,
                        {
                            selectionMode: BATCH_SELECTION_MODE.FEFO,
                            recommendedBatch: fefoBatch,
                            forced: false,
                        }
                    );
                }
            }
        } catch (error) {
            dispatch(
                addToast({
                    text:
                        error?.response?.data?.message ||
                        "No se pudieron validar los lotes disponibles para este producto.",
                    type: toastType.ERROR,
                })
            );
            return false;
        }

        const batchContext = resolvedProduct?.attributes?.batch_context || null;
        const batchId = Number(batchContext?.id || 0) || null;
        const templateSourceProduct = resolvedProduct || productById.get(productId);
        const template = templateSourceProduct
            ? createCartProductTemplate(templateSourceProduct)
            : null;
        const batchEnabled = Boolean(
            resolvedProduct?.attributes?.batch_enabled ?? template?.batch_enabled
        );
        const availableStock = Number(
            batchId
                ? batchContext?.available_quantity || template?.stock_quantity || 0
                : productStockById[productId] || template?.stock_quantity || 0
        );
        const cartRowId = buildCartRowId(productId, batchId);
        const fefoContext = resolvedProduct?.attributes?.fefo_context || null;

        if (batchEnabled && !batchId) {
            dispatch(
                addToast({
                    text: "Este producto maneja lotes, pero no tiene lotes vendibles disponibles en la bodega seleccionada.",
                    type: toastType.ERROR,
                })
            );
            return false;
        }

        if (!template || availableStock <= 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage("pos.this.product.out.of.stock.message"),
                    type: toastType.ERROR,
                })
            );
            return false;
        }

        let productAdded = false;

        setUpdateProducts((previousProducts) => {
            const existingLine = previousProducts.find(
                (cartProduct) => getCartRowId(cartProduct) === cartRowId
            );
            const quantityInCart = Number(existingLine?.quantity || 0);
            const totalQuantityForProduct = previousProducts.reduce(
                (sum, cartProduct) =>
                    getCartProductId(cartProduct) === productId
                        ? sum + Number(cartProduct.quantity || 0)
                        : sum,
                0
            );
            const productTotalAvailable = Number(
                productStockById[productId] || template?.stock_quantity || availableStock
            );

            if (quantityInCart + 1 > availableStock) {
                dispatch(
                    addToast({
                        text: getFormattedMessage("pos.product-quantity-error.message"),
                        type: toastType.ERROR,
                    })
                );
                return previousProducts;
            }

            if (totalQuantityForProduct + 1 > productTotalAvailable) {
                dispatch(
                    addToast({
                        text: getFormattedMessage("pos.product-quantity-error.message"),
                        type: toastType.ERROR,
                    })
                );
                return previousProducts;
            }

            let isUpdated = false;
            const nextProducts = previousProducts.map((cartProduct) => {
                if (isUpdated || getCartRowId(cartProduct) !== cartRowId) {
                    return cartProduct;
                }

                isUpdated = true;
                productAdded = true;
                const nextQuantity = Number(cartProduct.quantity || 0) + 1;

                return {
                    ...cartProduct,
                    id: productId,
                    product_id: productId,
                    cart_row_id: cartRowId,
                    batch_id: batchId,
                    batch_code: batchContext?.lot_code || cartProduct?.batch_code || null,
                    batch_barcode:
                        batchContext?.lot_barcode || cartProduct?.batch_barcode || null,
                    batch_expires_at:
                        batchContext?.expires_at || cartProduct?.batch_expires_at || null,
                    batch_available_quantity:
                        batchId && batchContext?.available_quantity
                            ? Number(batchContext.available_quantity)
                            : cartProduct?.batch_available_quantity || null,
                    batch_status:
                        resolvedProduct?.attributes?.batch_status ||
                        cartProduct?.batch_status ||
                        null,
                    batch_selection_mode:
                        resolvedProduct?.attributes?.batch_selection_mode ||
                        cartProduct?.batch_selection_mode ||
                        BATCH_SELECTION_MODE.FEFO,
                    fefo_priority_batch_id:
                        Number(fefoContext?.recommended_batch_id || 0) ||
                        cartProduct?.fefo_priority_batch_id ||
                        null,
                    fefo_priority_batch_code:
                        fefoContext?.recommended_lot_code ||
                        cartProduct?.fefo_priority_batch_code ||
                        null,
                    fefo_priority_expires_at:
                        fefoContext?.recommended_expires_at ||
                        cartProduct?.fefo_priority_expires_at ||
                        null,
                    fefo_compliant:
                        typeof fefoContext?.compliant === "boolean"
                            ? fefoContext.compliant
                            : cartProduct?.fefo_compliant ?? true,
                    fefo_forced:
                        typeof fefoContext?.forced === "boolean"
                            ? fefoContext.forced
                            : cartProduct?.fefo_forced ?? false,
                    stock_quantity:
                        Number(cartProduct.stock_quantity || 0) > 0
                            ? Number(cartProduct.stock_quantity || 0)
                            : availableStock,
                    quantity: nextQuantity,
                    warehouse_id: selectedOption.value,
                    sub_total:
                        Number(calculateProductCost(cartProduct) || 0) *
                        nextQuantity,
                };
            });

            if (isUpdated) {
                return nextProducts;
            }

            productAdded = true;
            const nextProduct = {
                ...template,
                id: productId,
                product_id: productId,
                cart_row_id: cartRowId,
                quantity: 1,
                stock_quantity: availableStock,
                warehouse_id: selectedOption.value,
                batch_id: batchId,
                batch_code: batchContext?.lot_code || template?.batch_code || null,
                batch_barcode:
                    batchContext?.lot_barcode || template?.batch_barcode || null,
                batch_expires_at:
                    batchContext?.expires_at || template?.batch_expires_at || null,
                batch_available_quantity: batchId ? availableStock : null,
                batch_status:
                    resolvedProduct?.attributes?.batch_status ||
                    template?.batch_status ||
                    null,
                batch_selection_mode:
                    resolvedProduct?.attributes?.batch_selection_mode ||
                    template?.batch_selection_mode ||
                    BATCH_SELECTION_MODE.FEFO,
                fefo_priority_batch_id:
                    Number(fefoContext?.recommended_batch_id || 0) ||
                    template?.fefo_priority_batch_id ||
                    null,
                fefo_priority_batch_code:
                    fefoContext?.recommended_lot_code ||
                    template?.fefo_priority_batch_code ||
                    null,
                fefo_priority_expires_at:
                    fefoContext?.recommended_expires_at ||
                    template?.fefo_priority_expires_at ||
                    null,
                fefo_compliant:
                    typeof fefoContext?.compliant === "boolean"
                        ? fefoContext.compliant
                        : template?.fefo_compliant ?? true,
                fefo_forced:
                    typeof fefoContext?.forced === "boolean"
                        ? fefoContext.forced
                        : template?.fefo_forced ?? false,
            };

            return [
                ...previousProducts,
                {
                    ...nextProduct,
                    sub_total: Number(calculateProductCost(nextProduct) || 0),
                },
            ];
        });

        return productAdded;
    }, [
        buildCartRowId,
        buildReservedBatchQuantities,
        createCartProductTemplate,
        decorateProductWithBatchSelection,
        dispatch,
        fetchProductBatches,
        getFormattedMessage,
        productById,
        productStockById,
        resolveFefoBatchFromBatches,
        selectedOption,
    ]);

    const closeBatchSelectionModal = useCallback(() => {
        setShowBatchSelectionModal(false);
        setBatchSelectionProduct(null);
    }, []);

    const handleProductCardClick = useCallback(
        (selectedProduct) => {
            if (!selectedProduct?.attributes?.batch_enabled) {
                addProductToCart(selectedProduct);
                return;
            }

            if (!selectedOption?.value) {
                addProductToCart(selectedProduct);
                return;
            }

            setBatchSelectionProduct(selectedProduct);
            setShowBatchSelectionModal(true);
        },
        [addProductToCart, selectedOption]
    );

    const handleSpecificBatchSelection = useCallback(
        async (sourceProduct, selectedBatch, { afterAdd = null } = {}) => {
            if (!sourceProduct?.attributes?.batch_enabled || !selectedBatch?.id) {
                return false;
            }

            try {
                const productId = getCartProductId(sourceProduct);
                const batches = await fetchProductBatches(productId, {
                    forceRefresh: true,
                });
                const preferredBatch = resolveFefoBatchFromBatches(
                    batches,
                    productId,
                    updateProductsRef.current
                );

                if (!preferredBatch) {
                    dispatch(
                        addToast({
                            text: "No hay lotes FEFO disponibles para este producto.",
                            type: toastType.ERROR,
                        })
                    );
                    return false;
                }

                const normalizedSelectedBatch =
                    batches.find(
                        (batch) => Number(batch.id) === Number(selectedBatch.id)
                    ) || null;

                if (!normalizedSelectedBatch) {
                    dispatch(
                        addToast({
                            text: "El lote seleccionado ya no tiene stock disponible.",
                            type: toastType.ERROR,
                        })
                    );
                    return false;
                }

                const reservedQuantities = buildReservedBatchQuantities(
                    updateProductsRef.current,
                    productId
                );
                const effectiveAvailableQuantity = roundBatchQuantity(
                    Number(normalizedSelectedBatch.available_quantity || 0) -
                        Number(
                            reservedQuantities.get(
                                Number(normalizedSelectedBatch.id)
                            ) || 0
                        )
                );

                if (effectiveAvailableQuantity <= 0) {
                    dispatch(
                        addToast({
                            text: "La cantidad solicitada excede la disponibilidad del lote seleccionado.",
                            type: toastType.ERROR,
                        })
                    );
                    return false;
                }

                const selectedProduct = decorateProductWithBatchSelection(
                    sourceProduct,
                    {
                        ...normalizedSelectedBatch,
                        effective_available_quantity: effectiveAvailableQuantity,
                    },
                    {
                        selectionMode: BATCH_SELECTION_MODE.SPECIFIC,
                        recommendedBatch: preferredBatch,
                        forced: false,
                    }
                );

                if (
                    Number(normalizedSelectedBatch.id) !== Number(preferredBatch.id)
                ) {
                    const forcedProduct = decorateProductWithBatchSelection(
                        sourceProduct,
                        {
                            ...normalizedSelectedBatch,
                            effective_available_quantity: effectiveAvailableQuantity,
                        },
                        {
                            selectionMode: BATCH_SELECTION_MODE.SPECIFIC,
                            recommendedBatch: preferredBatch,
                            forced: true,
                        }
                    );

                    openFefoValidationModal({
                        productName:
                            sourceProduct?.attributes?.name || sourceProduct?.name,
                        selectedBatches: [
                            toFefoBatchDisplayItem(normalizedSelectedBatch, 1),
                        ],
                        recommendedBatches: [
                            toFefoBatchDisplayItem(preferredBatch, 1),
                        ],
                        onConfirm: async () => {
                            const added = await addProductToCart(forcedProduct);
                            if (added) {
                                afterAdd?.();
                            }
                        },
                    });
                    return false;
                }

                const added = await addProductToCart(selectedProduct);
                if (added) {
                    afterAdd?.();
                }
                return added;
            } catch (error) {
                dispatch(
                    addToast({
                        text:
                            error?.response?.data?.message ||
                            "No se pudo validar el lote seleccionado con la regla FEFO.",
                        type: toastType.ERROR,
                    })
                );
                return false;
            }
        },
        [
            addProductToCart,
            buildReservedBatchQuantities,
            decorateProductWithBatchSelection,
            dispatch,
            fetchProductBatches,
            openFefoValidationModal,
            resolveFefoBatchFromBatches,
        ]
    );

    const handleSelectBatchFromModal = useCallback(
        async (batch) => {
            if (!batchSelectionProduct) {
                return;
            }

            await handleSpecificBatchSelection(batchSelectionProduct, batch, {
                afterAdd: closeBatchSelectionModal,
            });
        },
        [batchSelectionProduct, closeBatchSelectionModal, handleSpecificBatchSelection]
    );

    const handleUseBatchFifo = useCallback(async () => {
        if (!batchSelectionProduct) {
            return;
        }

        const added = await addProductToCart({
            ...batchSelectionProduct,
            attributes: {
                ...batchSelectionProduct.attributes,
                batch_selection_mode: BATCH_SELECTION_MODE.FEFO,
            },
        });

        if (added) {
            closeBatchSelectionModal();
        }
    }, [addProductToCart, batchSelectionProduct, closeBatchSelectionModal]);

    const onScanFeedback = useCallback(
        (message, level = "info") => {
            if (!message) {
                return;
            }

            dispatch(
                addToast({
                    text: message,
                    ...(level === "error" ? { type: toastType.ERROR } : {}),
                })
            );
        },
        [dispatch]
    );

    const handleSearchbarAddProduct = useCallback(
        async (selectedProduct) => {
            if (!selectedProduct?.attributes?.batch_enabled) {
                await addProductToCart(selectedProduct);
                return;
            }

            if (
                selectedProduct?.attributes?.batch_selection_mode ===
                BATCH_SELECTION_MODE.SPECIFIC
            ) {
                await handleSpecificBatchSelection(
                    selectedProduct,
                    selectedProduct?.attributes?.batch_context
                );
                return;
            }

            await addProductToCart({
                ...selectedProduct,
                attributes: {
                    ...selectedProduct.attributes,
                    batch_selection_mode: BATCH_SELECTION_MODE.FEFO,
                },
            });
        },
        [addProductToCart, handleSpecificBatchSelection]
    );

    //product add to cart function
    const addToCarts = useCallback((items) => {
        updateCart(items);
    }, [updateCart]);

    // create customer model
    const customerModel = useCallback((val) => {
        setModalShowCustomer(val);
    }, []);

    //prepare data for print Model
    const preparePrintData = (saleData = paymentDetails) => {
        const saleAttributes = saleData?.attributes || {};
        const isCreditSale = Boolean(
            saleAttributes?.is_credit_sale ?? isCreditSaleMode
        );
        const paidAmount = toMoneyNumber(
            saleAttributes?.paid_amount ??
                (isCreditSale ? creditInitialPaymentAmount : grandTotal)
        );
        const dueAmount = toMoneyNumber(
            saleAttributes?.due_amount ??
                (isCreditSale
                    ? calculateCreditPendingAmount(grandTotal, paidAmount)
                    : 0)
        );
        const formValue = {
            products: updateProducts,
            discount: cartItemValue.discount ? cartItemValue.discount : 0,
            tax: cartItemValue.tax ? cartItemValue.tax : 0,
            cartItemPrint: cartItemValue,
            taxTotal: taxTotal,
            grandTotal: grandTotal,
            shipping: cartItemValue.shipping,
            subTotal: subTotal,
            frontSetting: frontSetting,
            customer_name: selectedCustomerOption,
            settings: settings,
            note: cashPaymentValue.notes,
            changeReturn: isCreditSale
                ? 0
                : Number(
                      saleAttributes?.change_return ??
                          saleData?.change_return ??
                          changeReturn
                  ),
            payment_status: cashPaymentValue.payment_status,
            received_amount: isCreditSale
                ? paidAmount
                : Number(
                      saleAttributes?.received_amount ??
                          cashPaymentValue.received_amount ??
                          grandTotal
                  ),
            paid_amount: paidAmount,
            due_amount: dueAmount,
            is_credit_sale: isCreditSale,
            credit_receipt_status:
                saleAttributes?.credit_payment_status_label ||
                (paidAmount > 0 ? "PARCIAL" : "CRÉDITO"),
            barcode_url: saleAttributes?.barcode_url || saleData?.barcode_url || "",
            reference_code:
                saleAttributes?.reference_code || saleData?.reference_code || "",
            sale_date:
                saleAttributes?.created_at ||
                saleAttributes?.date ||
                saleData?.created_at ||
                saleData?.date ||
                new Date(),
        };
        return formValue;
    };

    //prepare data for payment api
    const prepareData = (updateProducts) => {
        const isCreditSale = isCreditSaleMode;
        const initialPayment = isCreditSale ? creditInitialPaymentAmount : 0;
        const creditType =
            cashPaymentValue?.credit_type || POS_CREDIT_TYPE.INSTALLMENTS;
        const salePaymentStatus = isCreditSale
            ? initialPayment > 0
                ? 3
                : 2
            : 1;
        const shouldSendPaymentType =
            !isCreditSale || initialPayment > 0;
        const receivedAmount = isCreditSale
            ? initialPayment
            : toMoneyNumber(
                  cashPaymentValue?.received_amount ?? grandTotal
              );
        const formValue = {
            date: moment(new Date()).format("YYYY-MM-DD"),
            customer_id:
                selectedCustomerOption && selectedCustomerOption[0]
                    ? selectedCustomerOption[0].value
                    : selectedCustomerOption && selectedCustomerOption.value,
            warehouse_id:
                selectedOption && selectedOption[0]
                    ? selectedOption[0].value
                    : selectedOption && selectedOption.value,
            sale_items: updateProducts,
            grand_total: grandTotal,
            ...(shouldSendPaymentType
                ? { payment_type: paymentValue?.payment_type?.value }
                : {}),
            received_amount: receivedAmount,
            discount: cartItemValue.discount,
            shipping: cartItemValue.shipping,
            tax_rate: cartItemValue.tax,
            note: cashPaymentValue.notes,
            status: 1,
            hold_ref_no: hold_ref_no,
            payment_status: salePaymentStatus,
            credit_sale: isCreditSale,
            credit_enabled: isCreditSale,
            ...(isCreditSale
                ? {
                      credit_initial_payment: initialPayment.toFixed(2),
                      credit_type: creditType,
                      credit_interest_rate: Number(
                          cashPaymentValue?.credit_interest_rate || 0
                      ).toFixed(2),
                      credit_installments:
                          creditType === POS_CREDIT_TYPE.FREE
                              ? 1
                              : Math.max(
                                    parseInt(
                                        cashPaymentValue?.credit_installments || 1,
                                        10
                                    ),
                                    1
                                ),
                      credit_due_date: cashPaymentValue?.credit_due_date,
                  }
                : {}),
        };
        return formValue;
    };

    const submitCashPayment = useCallback(
        async (printSlip = false, { skipFefoValidation = false } = {}) => {
            const valid = handleValidation();
            if (!valid) {
                return false;
            }

            const canContinue = await verifyCreditAvailability();
            if (!canContinue) {
                return false;
            }

            if (!skipFefoValidation) {
                const fefoValidation = await validateCartFefoCompliance();
                if (!fefoValidation?.ok) {
                    if (fefoValidation?.type === "stock") {
                        dispatch(
                            addToast({
                                text:
                                    fefoValidation?.message ||
                                    "No hay suficiente stock por lote para completar la venta.",
                                type: toastType.ERROR,
                            })
                        );
                        return false;
                    }

                    openFefoValidationModal({
                        productName: fefoValidation?.productName,
                        selectedBatches: fefoValidation?.selectedBatches || [],
                        recommendedBatches:
                            fefoValidation?.recommendedBatches || [],
                        onConfirm: async () => {
                            await submitCashPayment(printSlip, {
                                skipFefoValidation: true,
                            });
                        },
                    });
                    return false;
                }
            }

            const saleResponse = await posCashPaymentAction(
                prepareData(updateProductsRef.current),
                setUpdateProducts,
                setModalShowPaymentSlip,
                {
                    brandId,
                    categoryId,
                    selectedOption,
                    search: debouncedSearchTerm,
                },
                printSlip
            );
            if (!saleResponse) {
                return false;
            }

            setCashPayment(false);
            setPaymentPrint(preparePrintData(saleResponse));
            setCartItemValue({
                discount_type: discountType.FIXED,
                discount_value: 0,
                discount: 0,
                tax: 0,
                shipping: 0,
            });
            lastAppliedCreditConfigRef.current = null;
            setCreditAvailability(INITIAL_CREDIT_AVAILABILITY);
            setIsLoadingCreditAvailability(false);
            setCashPaymentValue(
                createInitialCashPaymentValue(getFormattedMessage)
            );
            productBatchCacheRef.current.clear();
            closeFefoValidationModal();
            return true;
        },
        [
            brandId,
            categoryId,
            closeFefoValidationModal,
            debouncedSearchTerm,
            dispatch,
            getFormattedMessage,
            handleValidation,
            openFefoValidationModal,
            posCashPaymentAction,
            prepareData,
            preparePrintData,
            selectedOption,
            validateCartFefoCompliance,
            verifyCreditAvailability,
        ]
    );

    //cash payment method
    const onCashPayment = useCallback(
        async (event, printSlip = false) => {
            event?.preventDefault?.();
            await submitCashPayment(printSlip);
        },
        [submitCashPayment]
    );

    const printPaymentReceiptPdf = () => {
        document.getElementById("printReceipt").click();
    };

    const printRegisterDetails = () => {
        document.getElementById("printRegisterDetailsId").click();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleRegisterDetailsPrint = useReactToPrint({
        content: () => registerDetailsRef.current,
    });

    //payment print
    const loadPrintBlock = () => {
        return (
            <div className="d-none">
                <button id="printReceipt" onClick={handlePrint}>
                    Print this out!
                </button>
                <PrintData
                    ref={componentRef}
                    paymentType={paymentValue.payment_type.label}
                    allConfigData={allConfigData}
                    updateProducts={paymentPrint}
                />
            </div>
        );
    };

    //Register details  slip
    const loadRegisterDetailsPrint = () => {
        return (
            <div className="d-none">
                <button
                    id="printRegisterDetailsId"
                    onClick={handleRegisterDetailsPrint}
                >
                    Print this out!
                </button>
                <PrintRegisterDetailsData
                    ref={registerDetailsRef}
                    allConfigData={allConfigData}
                    frontSetting={frontSetting}
                    posAllTodaySaleOverAllReport={posAllTodaySaleOverAllReport}
                    updateProducts={paymentPrint}
                    closeRegisterDetails={closeRegisterDetails}
                />
            </div>
        );
    };

    //payment slip
    const loadPaymentSlip = () => {
        return (
            <div className="d-none">
                <PaymentSlipModal
                    printPaymentReceiptPdf={printPaymentReceiptPdf}
                    setPaymentValue={setPaymentValue}
                    setModalShowPaymentSlip={setModalShowPaymentSlip}
                    settings={settings}
                    frontSetting={frontSetting}
                    modalShowPaymentSlip={modalShowPaymentSlip}
                    allConfigData={allConfigData}
                    paymentDetails={paymentDetails}
                    updateProducts={paymentPrint}
                    paymentType={paymentValue.payment_type.label}
                    paymentTypeDefaultValue={paymentTypeDefaultValue}
                />
            </div>
        );
    };
    const [isDetails, setIsDetails] = useState(null);
    const [lgShow, setLgShow] = useState(false);
    const [holdShow, setHoldShow] = useState(false);

    const onClickDetailsModel = (isDetails = null) => {
        setLgShow(true);
    };

    const onClickHoldModel = (isDetails = null) => {
        setHoldShow(true);
    };

    const handleClickCloseRegister = () => {
        dispatch(getAllRegisterDetailsAction());
        setShowCloseDetailsModal(true);
    };

    const handleCloseRegisterDetails = (data) => {
        if (data.cash_in_hand_while_closing.toString().trim()?.length === 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "pos.cclose-register.enter-total-cash.message"
                    ),
                    type: toastType.ERROR,
                })
            );
        } else {
            setShowCloseDetailsModal(false);
            dispatch(closeRegisterAction(data, navigate));
        }
    };

    return (
        <Container className="pos-screen px-3" fluid>
            <TabTitle title="POS" />
            {loadPrintBlock()}
            {loadPaymentSlip()}
            {loadRegisterDetailsPrint()}
            <Row>
                <TopProgressBar />
                <Col lg={5} xxl={4} xs={12} className="pos-left-scs">
                    <div className="d-flex flex-column h-100">
                        <PosHeader
                            setSelectedCustomerOption={setSelectedCustomerOption}
                            selectedCustomerOption={selectedCustomerOption}
                            setSelectedOption={setSelectedOption}
                            selectedOption={selectedOption}
                            customerModel={customerModel}
                            updateCustomer={modalShowCustomer}
                        />
                        <div className="left-content custom-card mb-3 p-3 d-flex flex-column justify-content-between">
                            <div className="main-table overflow-auto">
                                <Table className="mb-0">
                                    <thead className="position-sticky top-0">
                                        <tr>
                                            <th>
                                                {getFormattedMessage(
                                                    "pos-product.title"
                                                )}
                                            </th>
                                            <th
                                                className={
                                                    updateProducts &&
                                                        updateProducts.length
                                                        ? "text-center"
                                                        : ""
                                                }
                                            >
                                                {getFormattedMessage(
                                                    "pos-qty.title"
                                                )}
                                            </th>
                                            <th>
                                                {getFormattedMessage(
                                                    "pos-price.title"
                                                )}
                                            </th>
                                            <th colSpan="2">
                                                {getFormattedMessage(
                                                    "pos-sub-total.title"
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0">
                                        {updateProducts && updateProducts.length ? (
                                            updateProducts.map(
                                                (updateProduct) => {
                                                    return (
                                                        <ProductCartList
                                                            singleProduct={
                                                                updateProduct
                                                            }
                                                            canEditPosSalePrice={canEditPosSalePrice}
                                                            key={updateProduct.cart_row_id || updateProduct.id}
                                                            onClickUpdateItemInCart={
                                                                onClickUpdateItemInCart
                                                            }
                                                            availableStock={
                                                                (() => {
                                                                    const productId =
                                                                        getCartProductId(updateProduct);
                                                                    const productAvailable = Number(
                                                                        productStockById[productId] ||
                                                                            updateProduct.stock_quantity ||
                                                                            0
                                                                    );
                                                                    const otherLinesQuantity =
                                                                        updateProducts.reduce(
                                                                            (sum, cartLine) =>
                                                                                getCartProductId(cartLine) ===
                                                                                    productId &&
                                                                                getCartRowId(cartLine) !==
                                                                                    getCartRowId(updateProduct)
                                                                                    ? sum +
                                                                                      Number(
                                                                                          cartLine.quantity || 0
                                                                                      )
                                                                                    : sum,
                                                                            0
                                                                        );
                                                                    const remainingForProduct = Math.max(
                                                                        productAvailable -
                                                                            otherLinesQuantity,
                                                                        0
                                                                    );

                                                                    if (!updateProduct?.batch_id) {
                                                                        return remainingForProduct;
                                                                    }

                                                                    return Math.min(
                                                                        Number(
                                                                            updateProduct.stock_quantity ||
                                                                                updateProduct.batch_available_quantity ||
                                                                                0
                                                                        ),
                                                                        remainingForProduct
                                                                    );
                                                                })()
                                                            }
                                                            onDeleteCartItem={
                                                                onDeleteCartItem
                                                            }
                                                            frontSetting={
                                                                frontSetting
                                                            }
                                                            allConfigData={
                                                                allConfigData
                                                            }
                                                            setUpdateProducts={
                                                                setUpdateProducts
                                                            }
                                                        />
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="custom-text-center text-gray-900 fw-bold py-5"
                                                >
                                                    {getFormattedMessage(
                                                        "sale.product.table.no-data.label"
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <div>
                                <CartItemMainCalculation
                                    totalQty={totalQty}
                                    subTotal={subTotal}
                                    grandTotal={grandTotal}
                                    cartItemValue={cartItemValue}
                                    canApplyDiscount={canApplyDiscount}
                                    onChangeCart={onChangeCart}
                                    allConfigData={allConfigData}
                                    frontSetting={frontSetting}
                                    onChangeTaxCart={onChangeTaxCart}
                                />
                                <PaymentButton
                                    updateProducts={updateProducts}
                                    updateCart={addToCarts}
                                    setUpdateProducts={setUpdateProducts}
                                    setCartItemValue={setCartItemValue}
                                    setCashPayment={setCashPayment}
                                    cartItemValue={cartItemValue}
                                    grandTotal={grandTotal}
                                    subTotal={subTotal}
                                    selectedOption={selectedOption}
                                    cashPaymentValue={cashPaymentValue}
                                    holdListId={holdListId}
                                    setHoldListValue={setHoldListValue}
                                    selectedCustomerOption={selectedCustomerOption}
                                    setUpdateHoldList={setUpdateHoldList}
                                    canCancelSale={canCancelSale}
                                    canCreateSale={canCreateSale}
                                />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={7} xxl={8} xs={12} className="ps-lg-0 pos-right-scs">
                    <div className="right-content mb-3 d-flex flex-column h-100">
                        <div className="d-sm-flex align-items-center flex-xxl-nowrap flex-wrap">
                            <ProductSearchbar
                                posAllProducts={posAllProducts}
                                onAddProduct={handleSearchbarAddProduct}
                                onSearchTermChange={setSearchTerm}
                                warehouseId={selectedOption?.value}
                                onScanFeedback={onScanFeedback}
                            />
                            <HeaderAllButton
                                holdListData={holdListData}
                                goToHoldScreen={onClickHoldModel}
                                goToDetailScreen={onClickDetailsModel}
                                onClickFullScreen={onClickFullScreen}
                                opneCalculator={openCalculator}
                                setOpneCalculator={setOpenCalculator}
                                handleClickCloseRegister={
                                    handleClickCloseRegister
                                }
                            />
                        </div>
                        <div className="custom-card h-100 mb-3">
                            <div className="p-3">
                                <Category
                                    setCategory={setCategory}
                                    brandId={brandId}
                                    selectedOption={selectedOption}
                                />
                                <Brands
                                    categoryId={categoryId}
                                    setBrand={setBrand}
                                    selectedOption={selectedOption}
                                />
                            </div>
                            <Product
                                posAllProducts={posAllProducts}
                                cartProducts={updateProducts}
                                settings={settings}
                                searchTerm={searchTerm}
                                allConfigData={allConfigData}
                                isLoading={isLoadingMoreProducts}
                                onAddProduct={handleProductCardClick}
                                hasMoreProducts={hasMoreProducts}
                                onLoadMoreProducts={loadMoreProducts}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {canEditPosSalePrice && isOpenCartItemUpdateModel && (
                <ProductDetailsModel
                    openProductDetailModal={openProductDetailModal}
                    productModelId={product?.cart_row_id || product?.id}
                    onProductUpdateInCart={onProductUpdateInCart}
                    cartProduct={product}
                    isOpenCartItemUpdateModel={isOpenCartItemUpdateModel}
                    frontSetting={frontSetting}
                    canEditPosSalePrice={canEditPosSalePrice}
                />
            )}
            <ProductBatchSelectionModal
                show={showBatchSelectionModal}
                product={batchSelectionProduct}
                warehouseId={selectedOption?.value}
                cartProducts={updateProducts}
                onHide={closeBatchSelectionModal}
                onSelectBatch={handleSelectBatchFromModal}
                onUseFifo={handleUseBatchFifo}
            />
            <FefoSaleValidationModal
                show={fefoValidationState.show}
                productName={fefoValidationState.productName}
                selectedBatches={fefoValidationState.selectedBatches}
                recommendedBatches={fefoValidationState.recommendedBatches}
                onCancel={closeFefoValidationModal}
                onConfirm={confirmFefoValidation}
            />
            {cashPayment && (
                <CashPaymentModel
                    cashPayment={cashPayment}
                    totalQty={totalQty}
                    cartItemValue={cartItemValue}
                    onChangeInput={onChangeInput}
                    onPaymentStatusChange={onPaymentStatusChange}
                    cashPaymentValue={cashPaymentValue}
                    allConfigData={allConfigData}
                    subTotal={subTotal}
                    onPaymentTypeChange={onPaymentTypeChange}
                    grandTotal={grandTotal}
                    onCashPayment={onCashPayment}
                    taxTotal={taxTotal}
                    handleCashPayment={handleCashPayment}
                    settings={settings}
                    errors={errors}
                    paymentTypeDefaultValue={paymentTypeDefaultValue}
                    paymentTypeFilterOptions={paymentTypeFilterOptions}
                    onChangeReturnChange={onChangeReturnChange}
                    onCreditTypeChange={onCreditTypeChange}
                    onUseCustomerCreditConfigChange={
                        onUseCustomerCreditConfigChange
                    }
                    creditAvailability={creditAvailability}
                    isLoadingCreditAvailability={isLoadingCreditAvailability}
                    isInitialPaymentRequired={creditInitialPaymentRequired}
                    selectedCustomerName={getSelectedCustomerName()}
                    setPaymentValue={setPaymentValue}
                />
            )}
            {lgShow && (
                <RegisterDetailsModel
                    printRegisterDetails={printRegisterDetails}
                    frontSetting={frontSetting}
                    lgShow={lgShow}
                    setLgShow={setLgShow}
                />
            )}
            {holdShow && (
                <HoldListModal
                    setUpdateHoldList={setUpdateHoldList}
                    setCartItemValue={setCartItemValue}
                    setUpdateProducts={setUpdateProducts}
                    updateProduct={updateProducts}
                    printRegisterDetails={printRegisterDetails}
                    frontSetting={frontSetting}
                    holdListData={holdListData}
                    setHold_ref_no={setHold_ref_no}
                    holdShow={holdShow}
                    setHoldShow={setHoldShow}
                    addCart={addToCarts}
                    updateCart={updateCart}
                    setSelectedCustomerOption={setSelectedCustomerOption}
                    setSelectedOption={setSelectedOption}
                />
            )}
            {modalShowCustomer && (
                <CustomerForm
                    show={modalShowCustomer}
                    hide={setModalShowCustomer}
                />
            )}
            <PosCloseRegisterDetailsModel
                showCloseDetailsModal={showCloseDetailsModal}
                handleCloseRegisterDetails={handleCloseRegisterDetails}
                setShowCloseDetailsModal={setShowCloseDetailsModal}
            />
            {allConfigData?.permissions?.length === 1 && <PosRegisterModel showPosRegisterModel={showPosRegisterModel} isCloseButton={false} onClickshowPosRegisterModel={() => setShowPosRegisterModel(false)} />}
        </Container>
    );
};

const mapStateToProps = (state) => {
    const {
        posAllProducts,
        frontSetting,
        settings,
        cashPayment,
        allConfigData,
        posAllTodaySaleOverAllReport,
        holdListData,
    } = state;
    return {
        holdListData,
        posAllProducts,
        frontSetting,
        settings,
        paymentDetails: cashPayment,
        allConfigData,
        posAllTodaySaleOverAllReport,
    };
};

export default connect(mapStateToProps, {
    fetchSetting,
    fetchFrontSetting,
    posCashPaymentAction,
    fetchBrandClickable,
    fetchHoldLists,
})(PosMainPage);
