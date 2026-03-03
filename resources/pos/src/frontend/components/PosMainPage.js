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
import { prepareCartArray } from "../shared/PrepareCartArray";
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
    const PRODUCT_PAGE_SIZE = 120;
    const componentRef = useRef();
    const registerDetailsRef = useRef();
    const productRequestRef = useRef(0);
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
    const [cashPaymentValue, setCashPaymentValue] = useState({
        notes: "",
        payment_status: {
            label: getFormattedMessage("dashboard.recentSales.paid.label"),
            value: 1,
        },
    });
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

    const customCart = useMemo(() => prepareCartArray(posAllProducts), [posAllProducts]);
    const customCartByProductId = useMemo(() => {
        const cartTemplateMap = new Map();
        customCart.forEach((item) => {
            cartTemplateMap.set(Number(item.id), item);
        });

        return cartTemplateMap;
    }, [customCart]);

    const productStockById = useMemo(() => {
        const stockMap = {};
        posAllProducts.forEach((productItem) => {
            stockMap[Number(productItem.id)] = Number(
                productItem?.attributes?.stock?.quantity || 0
            );
        });

        return stockMap;
    }, [posAllProducts]);

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

    const discountTotal = subTotal - cartItemValue.discount;
    const taxTotal = (discountTotal * cartItemValue.tax) / 100;
    const mainTotal = discountTotal + taxTotal;
    const grandTotal = (
        Number(mainTotal) + Number(cartItemValue.shipping)
    ).toFixed(2);

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
        setCashPaymentValue((inputs) => ({ ...inputs, payment_status: obj }));
    }, []);

    const onChangeReturnChange = useCallback((change) => {
        setChangeReturn(change);
    }, []);

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
        setCashPaymentValue({
            notes: "",
            payment_status: {
                label: getFormattedMessage("dashboard.recentSales.paid.label"),
                value: 1,
            },
        });
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
            products.map((cartProduct) =>
                Number(cartProduct.id) === Number(updatedProduct.id)
                    ? { ...updatedProduct }
                    : cartProduct
            )
        );
    }, []);

    const updateCart = useCallback((cartProducts) => {
        setUpdateProducts(cartProducts);
    }, []);

    //cart item delete
    const onDeleteCartItem = useCallback((productId) => {
        setUpdateProducts((products) =>
            products.filter((cartProduct) => Number(cartProduct.id) !== Number(productId))
        );
    }, []);

    const addProductToCart = useCallback((productId) => {
        if (!selectedOption?.value) {
            dispatch(
                addToast({
                    text: getFormattedMessage("purchase.select.warehouse.validate.label"),
                    type: toastType.ERROR,
                })
            );
            return;
        }

        const template = customCartByProductId.get(Number(productId));
        const availableStock = Number(productStockById[Number(productId)] || 0);

        if (!template || availableStock <= 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage("pos.this.product.out.of.stock.message"),
                    type: toastType.ERROR,
                })
            );
            return;
        }

        setUpdateProducts((products) => {
            const productIndex = products.findIndex(
                (cartProduct) => Number(cartProduct.id) === Number(productId)
            );

            if (productIndex === -1) {
                return [...products, { ...template, warehouse_id: selectedOption.value }];
            }

            const currentProduct = products[productIndex];
            if (Number(currentProduct.quantity) >= availableStock) {
                dispatch(
                    addToast({
                        text: getFormattedMessage("pos.quantity.exceeds.quantity.available.in.stock.message"),
                        type: toastType.ERROR,
                    })
                );
                return products;
            }

            const updatedProducts = [...products];
            updatedProducts[productIndex] = {
                ...currentProduct,
                quantity: Number(currentProduct.quantity) + 1,
                warehouse_id: selectedOption.value,
            };

            return updatedProducts;
        });
    }, [
        selectedOption,
        customCartByProductId,
        productStockById,
        dispatch,
        getFormattedMessage,
    ]);

    //product add to cart function
    const addToCarts = useCallback((items) => {
        updateCart(items);
    }, [updateCart]);

    // create customer model
    const customerModel = useCallback((val) => {
        setModalShowCustomer(val);
    }, []);

    //prepare data for print Model
    const preparePrintData = () => {
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
            changeReturn,
            payment_status: cashPaymentValue.payment_status,
            received_amount: cashPaymentValue.received_amount // <-- Asegura que se pase el valor recibido
        };
        return formValue;
    };

    //prepare data for payment api
    const prepareData = (updateProducts) => {
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
            ...(cashPaymentValue?.payment_status?.value === 1
                ? { payment_type: paymentValue?.payment_type?.value }
                : {}),
            // Valor ingresado en el modal "RECIBIDO"
            received_amount: cashPaymentValue?.received_amount,
            discount: cartItemValue.discount,
            shipping: cartItemValue.shipping,
            tax_rate: cartItemValue.tax,
            note: cashPaymentValue.notes,
            status: 1,
            hold_ref_no: hold_ref_no,
            payment_status: cashPaymentValue?.payment_status?.value,
        };
        return formValue;
    };

    //cash payment method
    const onCashPayment = (event,printSlip=false) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            posCashPaymentAction(
                prepareData(updateProducts),
                setUpdateProducts,
                setModalShowPaymentSlip,
                {
                    brandId,
                    categoryId,
                    selectedOption,
                    search: debouncedSearchTerm,
                },printSlip
            );
            // setModalShowPaymentSlip(true);
            setCashPayment(false);
            setPaymentPrint(preparePrintData);
            setCartItemValue({
                discount_type: discountType.FIXED,
                discount_value: 0,
                discount: 0,
                tax: 0,
                shipping: 0,
            });
            setCashPaymentValue({
                notes: "",
                payment_status: {
                    label: getFormattedMessage(
                        "dashboard.recentSales.paid.label"
                    ),
                    value: 1,
                },
            });
        }
    };

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
                                                            key={updateProduct.id}
                                                            onClickUpdateItemInCart={
                                                                onClickUpdateItemInCart
                                                            }
                                                            availableStock={
                                                                productStockById[
                                                                    Number(updateProduct.id)
                                                                ] || 0
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
                                onAddProduct={addProductToCart}
                                onSearchTermChange={setSearchTerm}
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
                                onAddProduct={addProductToCart}
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
                    productModelId={product.id}
                    onProductUpdateInCart={onProductUpdateInCart}
                    cartProduct={product}
                    isOpenCartItemUpdateModel={isOpenCartItemUpdateModel}
                    frontSetting={frontSetting}
                    canEditPosSalePrice={canEditPosSalePrice}
                />
            )}
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
