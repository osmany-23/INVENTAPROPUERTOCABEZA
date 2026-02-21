import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import MasterLayout from "../../MasterLayout";
import TabTitle from "../../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import { fetchPurchases } from "../../../store/action/purchaseAction";
import { fetchAllWarehouses } from "../../../store/action/warehouseAction";
import { fetchAllSuppliers } from "../../../store/action/supplierAction";
import { fetchFrontSetting } from "../../../store/action/frontSettingAction";
import { totalPurchaseReportExcel } from "../../../store/action/totalPurchaseReportExcel";
import TopProgressBar from "../../../shared/components/loaders/TopProgressBar";

const PurchaseReport = (props) => {
    const {
        fetchPurchases,
        fetchAllWarehouses,
        fetchAllSuppliers,
        purchases,
        totalRecord,
        isLoading,
        suppliers,
        frontSetting,
        fetchFrontSetting,
        totalPurchaseReportExcel,
        dates,
        allConfigData,
    } = props;

    const [isWarehouseValue, setIsWarehouseValue] = useState(false);
    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    useEffect(() => {
        if (isWarehouseValue === true) {
            totalPurchaseReportExcel(dates, setIsWarehouseValue);
            setIsWarehouseValue(false);
        }
    }, [isWarehouseValue]);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const purchaseRows = Array.isArray(purchases) ? purchases : [];
    const supplierRows = Array.isArray(suppliers) ? suppliers : [];

    const itemsValue =
        currencySymbol &&
        purchaseRows.length >= 0 &&
        purchaseRows.map((purchase) => {
            const purchaseData = purchase?.attributes || purchase || {};
            const supplier = supplierRows.filter(
                (supplier) => supplier.id === purchaseData.supplier_id
            );
            const supplierName =
                supplier[0] &&
                supplier[0].attributes &&
                supplier[0].attributes.name;
            return {
                reference_code: purchaseData.reference_code,
                supplier: supplierName,
                warehouse: purchaseData.warehouse_name,
                status: purchaseData.status,
                paid: 0,
                due: 0,
                payment: purchaseData.payment_type,
                date: moment(purchaseData.date).format("YYYY-MM-DD"),
                time: moment(purchaseData.created_at).format("LT"),
                grand_total: purchaseData.grand_total,
                id: purchase.id,
                currency: currencySymbol,
            };
        });

    const columns = [
        {
            name: getFormattedMessage("dashboard.recentSales.reference.label"),
            sortField: "reference_code",
            sortable: true,
            cell: (row) => {
                return (
                    <span className="badge bg-light-danger">
                        <span>{row.reference_code}</span>
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("supplier.title"),
            selector: (row) => row.supplier,
            sortField: "supplier",
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
                                    "status.filter.received.label"
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
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.grand_total
                ),
            sortField: "grand_total",
            sortable: true,
        },
        {
            name: getFormattedMessage("dashboard.recentSales.paid.label"),
            selector: (row) =>
                currencySymbolHandling(allConfigData, row.currency, row.paid),
            sortField: "paid",
            sortable: false,
        },
        {
            name: getFormattedMessage("dashboard.recentSales.due.label"),
            selector: (row) =>
                currencySymbolHandling(allConfigData, row.currency, row.due),
            sortField: "due",
            sortable: false,
        },
        {
            name: getFormattedMessage(
                "globally.react-table.column.payment-type.label"
            ),
            selector: (row) => row.payment,
            sortField: "payment",
            sortable: false,
            cell: (row) => {
                return (
                    <span className="badge bg-light-success">
                        <span>{getFormattedMessage("cash.label")}</span>
                    </span>
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
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.time}</div>
                        <div>{row.date}</div>
                    </span>
                );
            },
        },
    ];

    const onChange = (filter) => {
        fetchAllSuppliers();
        fetchAllWarehouses();
        fetchPurchases(filter, true);
    };

    const onExcelClick = () => {
        setIsWarehouseValue(true);
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("purchase.reports.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                totalRows={totalRecord}
                isShowDateRangeField
                isEXCEL={itemsValue && itemsValue.length > 0}
                isShowFilterField
                isStatus
                onExcelClick={onExcelClick}
            />
        </MasterLayout>
    );
};
const mapStateToProps = (state) => {
    const {
        dates,
        totalRecord,
        isLoading,
        suppliers,
        frontSetting,
        allConfigData,
    } = state;
    return {
        purchases: state.purchase?.purchases || [],
        dates,
        totalRecord,
        isLoading,
        suppliers: suppliers || [],
        frontSetting,
        allConfigData,
    };
};

export default connect(mapStateToProps, {
    fetchPurchases,
    fetchAllWarehouses,
    fetchAllSuppliers,
    fetchFrontSetting,
    totalPurchaseReportExcel,
})(PurchaseReport);
