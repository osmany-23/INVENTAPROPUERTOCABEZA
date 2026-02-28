import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { connect, useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchSales } from "../../store/action/salesAction";
import DeleteSale from "./DeleteSale";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import { salePdfAction } from "../../store/action/salePdfAction";
import ActionDropDownButton from "../../shared/action-buttons/ActionDropDownButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import { fetchSetting } from "../../store/action/settingAction";
import ShowPayment from "../../shared/showPayment/ShowPayment";
import CreatePaymentModal from "./CreatePaymentModal";
import { fetchSalePayments } from "../../store/action/salePaymentAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import PrintData from "../../frontend/components/printModal/PrintData";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType } from "../../constants";
import { addToast } from "../../store/action/toastAction";
import { can } from "../../shared/can";

const Sales = (props) => {
    const {
        sales,
        fetchSales,
        totalRecord,
        isLoading,
        salePdfAction,
        fetchFrontSetting,
        fetchSetting,
        frontSetting,
        settings,
        isCallSaleApi,
        allConfigData,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isShowPaymentModel, setIsShowPaymentModel] = useState(false);
    const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [createPaymentItem, setCreatePaymentItem] = useState({});
    const { allSalePayments } = useSelector((state) => state);
    const receiptRef = useRef();
    const [saleReceiptData, setSaleReceiptData] = useState(null);
    const [saleReceiptPaymentType, setSaleReceiptPaymentType] = useState("");
    const [tableArray, setTableArray] = useState([]);
    const canEditSale = can("pos.edit_sale", { strict: true });
    const canDeleteSale = can("pos.delete_sale", { strict: true });
    useEffect(() => {
        fetchFrontSetting();
        fetchSetting({}, false);
    }, []);

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    const onChange = (filter) => {
        fetchSales(filter, true);
    };

    //sale edit function
    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/sales/edit/" + id;
    };

    // delete sale function
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };
    const dispatch = useDispatch();

    const onShowPaymentClick = (item) => {
        setIsShowPaymentModel(!isShowPaymentModel);
        setCreatePaymentItem(item);
        if (item) {
            dispatch(fetchSalePayments(item.id));
        }
    };

    const onCreatePaymentClick = (item) => {
        setIsCreatePaymentOpen(!isCreatePaymentOpen);
        setCreatePaymentItem(item);
        if (item) {
            dispatch(fetchSalePayments(item.id));
        }
    };

    //sale details function
    const goToDetailScreen = (ProductId) => {
        window.location.href = "#/app/sales/detail/" + ProductId;
    };

    //onClick pdf function
    const onPdfClick = (id) => {
        salePdfAction(id);
    };

    const onCreateSaleReturnClick = (item) => {
        const id = item.id;
        window.location.href =
            item.is_return === 1
                ? "#/app/sales/return/edit/" + id
                : "#/app/sales/return/" + id;
    };

    const handleSaleReceiptPrint = useReactToPrint({
        content: () => receiptRef.current,
    });

    const getPaymentTypeLabel = (paymentType) => {
        if (paymentType === 1) {
            return getFormattedMessage("payment-type.filter.cash.label");
        }
        if (paymentType === 2) {
            return getFormattedMessage("payment-type.filter.cheque.label");
        }
        if (paymentType === 3) {
            return getFormattedMessage("payment-type.filter.bank-transfer.label");
        }
        if (paymentType === 4) {
            return getFormattedMessage("payment-type.filter.other.label");
        }

        return getFormattedMessage("payment-type.filter.cash.label");
    };

    const prepareSaleReceiptData = (saleInfo, currentSettings) => {
        const referenceCode = saleInfo?.reference_code || "";
        const barcodeUrl =
            saleInfo?.barcode_url ||
            (referenceCode
                ? `${window.location.origin}/storage/sales/barcode-${referenceCode}.png`
                : "");

        const receivedAmount = Number(saleInfo?.received_amount || 0);
        const grandTotalAmount = Number(saleInfo?.grand_total || 0);
        const changeReturn =
            receivedAmount > grandTotalAmount
                ? receivedAmount - grandTotalAmount
                : 0;

        const products =
            saleInfo?.sale_items?.map((saleItem) => ({
                name: saleItem?.product?.name || "",
                code: saleItem?.product?.code || "",
                quantity: Number(saleItem?.quantity || 0),
                product_unit:
                    saleItem?.product?.product_unit || saleItem?.sale_unit || "",
                net_unit_cost:
                    Number(saleItem?.quantity || 0) > 0
                        ? Number(saleItem?.sub_total || 0) / Number(saleItem?.quantity || 1)
                        : Number(saleItem?.sub_total || 0),
                discount_type: 2,
                discount_value: 0,
                tax_type: 2,
                tax_value: 0,
            })) || [];

        const subTotal = products.reduce(
            (sum, product) =>
                sum +
                product.quantity *
                    Number(product.net_unit_cost || 0),
            0
        );

        return {
            products,
            discount: Number(saleInfo?.discount || 0),
            tax: Number(saleInfo?.tax_rate || 0),
            taxTotal: Number(saleInfo?.tax_amount || 0),
            shipping: Number(saleInfo?.shipping || 0),
            subTotal,
            grandTotal: grandTotalAmount,
            frontSetting,
            settings: currentSettings,
            customer_name: { label: saleInfo?.customer?.name || "" },
            note: saleInfo?.note || "",
            changeReturn,
            barcode_url: barcodeUrl,
            reference_code: referenceCode,
            date: saleInfo?.date || saleInfo?.created_at || new Date(),
        };
    };

    const onPrintReceiptClick = async (item) => {
        try {
            const [saleResponse, settingResponse] = await Promise.all([
                apiConfig.get(`${apiBaseURL.SALE_DETAILS}/${item.id}`),
                apiConfig.get(apiBaseURL.SETTINGS),
            ]);
            const saleInfo = saleResponse?.data?.data;
            const latestSettings = settingResponse?.data?.data || settings;
            const receiptData = prepareSaleReceiptData(saleInfo, latestSettings);
            setSaleReceiptData(receiptData);
            setSaleReceiptPaymentType(getPaymentTypeLabel(saleInfo?.payment_type));

            setTimeout(() => {
                const printButton = document.getElementById("printSaleReceipt");
                if (printButton) {
                    printButton.click();
                }
            }, 0);
        } catch (error) {
            dispatch(
                addToast({
                    text: error?.response?.data?.message || "Error al imprimir recibo",
                    type: toastType.ERROR,
                })
            );
        }
    };

    const itemsValue =
        currencySymbol &&
        sales.length >= 0 &&
        sales.map((sale) => ({
            date: getFormattedDate(
                sale.attributes.created_at,
                allConfigData && allConfigData
            ),
            // date_for_payment: sale.attributes.date,
            time: moment(sale.attributes.created_at).format("LT"),
            reference_code: sale.attributes.reference_code,
            customer_name: sale.attributes.customer_name,
            warehouse_name: sale.attributes.warehouse_name,
            status: sale.attributes.status,
            payment_status: sale.attributes.payment_status,
            payment_type: sale.attributes.payment_type,
            grand_total: sale.attributes.grand_total,
            paid_amount: sale.attributes.paid_amount
                ? sale.attributes.paid_amount
                : (0.0).toFixed(2),
            id: sale.id,
            currency: currencySymbol,
            is_return: sale.attributes.is_return,
        }));

    useEffect(() => {
        const grandTotalSum = () => {
            let x = 0;
            itemsValue.length &&
                itemsValue.map((item) => {
                    x = x + Number(item.grand_total);
                    return x;
                });
            return x;
        };
        const paidTotalSum = (itemsValue) => {
            let x = 0;
            itemsValue.length &&
                itemsValue.map((item) => {
                    x = x + Number(item.paid_amount);
                    return x;
                });
            return x;
        };
        if (sales.length) {
            const newObject = itemsValue.length && {
                date: "",
                time: "",
                reference_code: "Total",
                customer_name: "",
                warehouse_name: "",
                status: "",
                payment_status: "",
                payment_type: "",
                grand_total: grandTotalSum(itemsValue),
                paid_amount: paidTotalSum(itemsValue),
                id: "",
                currency: currencySymbol,
            };
            const newItemValue =
                itemsValue.length && newObject && itemsValue.concat(newObject);
            const latestArray = newItemValue.map((item) => item);
            newItemValue.length && setTableArray(latestArray);
        } else {
            setTableArray([]);
        }
    }, [sales]);

    const columns = [
        {
            name: getFormattedMessage("dashboard.recentSales.reference.label"),
            sortField: "reference_code",
            sortable: false,
            cell: (row) => {
                return row.reference_code === "Total" ? (
                    <span className="fw-bold fs-4">
                        {getFormattedMessage("pos-total.title")}
                    </span>
                ) : (
                    <span className="badge bg-light-danger">
                        <span>{row.reference_code}</span>
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("customer.title"),
            selector: (row) => row.customer_name,
            sortField: "customer_name",
            sortable: false,
        },
        {
            name: getFormattedMessage("warehouse.title"),
            selector: (row) => row.warehouse_name,
            sortField: "warehouse_name",
            sortable: false,
        },
        {
            name: getFormattedMessage("purchase.select.status.label"),
            sortField: "status",
            sortable: false,
            cell: (row) => {
                return (
                    (row.status === 1 && (
                        <span className="badge bg-light-success">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.complated.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 2 && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.pending.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.status === 3 && (
                        <span className="badge bg-light-warning">
                            <span>
                                {getFormattedMessage(
                                    "status.filter.ordered.label"
                                )}
                            </span>
                        </span>
                    ))
                );
            },
        },
        {
            name: getFormattedMessage("purchase.grant-total.label"),
            sortField: "grand_total",
            cell: (row) => {
                return row.reference_code === "Total" ? (
                    <span className="fw-bold fs-4">
                        {currencySymbolHandling(
                            allConfigData,
                            row.currency,
                            row.grand_total
                        )}
                    </span>
                ) : (
                    <span>
                        {currencySymbolHandling(
                            allConfigData,
                            row.currency,
                            row.grand_total
                        )}
                    </span>
                );
            },
            sortable: true,
        },
        {
            name: getFormattedMessage("dashboard.recentSales.paid.label"),
            sortField: "paid_amount",
            cell: (row) => {
                return row.reference_code === "Total" ? (
                    <span className="fw-bold fs-4">
                        {currencySymbolHandling(
                            allConfigData,
                            row.currency,
                            row.paid_amount
                        )}
                    </span>
                ) : (
                    <span>
                        {currencySymbolHandling(
                            allConfigData,
                            row.currency,
                            row.paid_amount
                        )}
                    </span>
                );
            },
            sortable: true,
        },
        {
            name: getFormattedMessage(
                "dashboard.recentSales.paymentStatus.label"
            ),
            sortField: "payment_status",
            sortable: false,
            cell: (row) => {
                return (
                    (row.payment_status === 1 && (
                        <span className="badge bg-light-success">
                            <span>
                                {getFormattedMessage(
                                    "payment-status.filter.paid.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.payment_status === 2 && (
                        <span className="badge bg-light-danger">
                            <span>
                                {getFormattedMessage(
                                    "payment-status.filter.unpaid.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.payment_status === 3 && (
                        <span className="badge bg-light-warning">
                            {/*<span>{getFormattedMessage("payment-status.filter.unpaid.label")}</span>*/}
                            <span>
                                {getFormattedMessage(
                                    "payment-status.filter.partial.label"
                                )}
                            </span>
                        </span>
                    ))
                );
            },
        },
        {
            name: getFormattedMessage("select.payment-type.label"),
            sortField: "payment_type",
            sortable: false,
            cell: (row) => {
                return (
                    (row.payment_status !== 2 && row.payment_type === 1 && (
                        <span className="badge bg-light-primary">
                            <span>{getFormattedMessage("cash.label")}</span>
                        </span>
                    )) ||
                    (row.payment_status !== 2 && row.payment_type === 2 && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "payment-type.filter.cheque.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.payment_status !== 2 && row.payment_type === 3 && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "payment-type.filter.bank-transfer.label"
                                )}
                            </span>
                        </span>
                    )) ||
                    (row.payment_status !== 2 && row.payment_type === 4 && (
                        <span className="badge bg-light-primary">
                            <span>
                                {getFormattedMessage(
                                    "payment-type.filter.other.label"
                                )}
                            </span>
                        </span>
                    ))
                );
            },
        },
        {
            name: getFormattedMessage(
                "globally.react-table.column.created-date.label"
            ),
            selector: (row) => row.date,
            sortField: "date",
            sortable: true,
            cell: (row) => {
                return (
                    row.date && (
                        <span className="badge bg-light-info">
                            <div className="mb-1">{row.time}</div>
                            <div>{row.date}</div>
                        </span>
                    )
                );
            },
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) =>
                row.reference_code === "Total" ? null : (
                    <ActionDropDownButton
                        item={row}
                        goToEditProduct={goToEdit}
                        isEditMode={true}
                        isPdfIcon={true}
                        onClickDeleteModel={onClickDeleteModel}
                        onPdfClick={onPdfClick}
                        title={getFormattedMessage("sale.title")}
                        isPaymentShow={true}
                        isCreatePayment={true}
                        isViewIcon={true}
                        goToDetailScreen={goToDetailScreen}
                        onShowPaymentClick={onShowPaymentClick}
                        isCreateSaleReturn={true}
                        onCreatePaymentClick={onCreatePaymentClick}
                        onCreateSaleReturnClick={onCreateSaleReturnClick}
                        isPrintReceipt={true}
                        onPrintReceiptClick={onPrintReceiptClick}
                        showEdit={canEditSale}
                        showDelete={canDeleteSale}
                    />
                ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            {saleReceiptData && (
                <div className="d-none">
                    <button id="printSaleReceipt" onClick={handleSaleReceiptPrint}>
                        Print this out!
                    </button>
                    <PrintData
                        ref={receiptRef}
                        paymentType={saleReceiptPaymentType}
                        allConfigData={allConfigData}
                        updateProducts={saleReceiptData}
                    />
                </div>
            )}
            <TabTitle title={placeholderText("sales.title")} />
            <div className="sale_table">
                <ReactDataTable
                    columns={columns}
                    items={tableArray}
                    to="#/app/sales/create"
                    ButtonValue={getFormattedMessage("sale.create.title")}
                    isShowPaymentModel={isShowPaymentModel}
                    isCallSaleApi={isCallSaleApi}
                    isShowDateRangeField
                    onChange={onChange}
                    totalRows={totalRecord}
                    goToEdit={goToEdit}
                    isLoading={isLoading}
                    isShowFilterField
                    isPaymentStatus
                    isStatus
                    isPaymentType
                />
            </div>
            <DeleteSale
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
            <ShowPayment
                setIsShowPaymentModel={setIsShowPaymentModel}
                currencySymbol={currencySymbol}
                allSalePayments={allSalePayments}
                createPaymentItem={createPaymentItem}
                onShowPaymentClick={onShowPaymentClick}
                isShowPaymentModel={isShowPaymentModel}
            />
            <ShowPayment
                allConfigData={allConfigData}
                setIsShowPaymentModel={setIsShowPaymentModel}
                currencySymbol={currencySymbol}
                allSalePayments={allSalePayments}
                createPaymentItem={createPaymentItem}
                onShowPaymentClick={onShowPaymentClick}
                isShowPaymentModel={isShowPaymentModel}
            />
            <CreatePaymentModal
                setIsCreatePaymentOpen={setIsCreatePaymentOpen}
                onCreatePaymentClick={onCreatePaymentClick}
                isCreatePaymentOpen={isCreatePaymentOpen}
                createPaymentItem={createPaymentItem}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        settings,
        isCallSaleApi,
        allConfigData,
    } = state;
    return {
        sales,
        totalRecord,
        isLoading,
        frontSetting,
        settings,
        isCallSaleApi,
        allConfigData,
    };
};

export default connect(mapStateToProps, {
    fetchSales,
    salePdfAction,
    fetchFrontSetting,
    fetchSetting,
})(Sales);
