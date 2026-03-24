import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import ReactDataTable from "../../../../shared/table/ReactDataTable";
import apiConfig from "../../../../config/apiConfig";
import { getFormattedMessage } from "../../../../shared/sharedMethod";

const CreditTabs = ({ id }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [creditMovements, setCreditMovements] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const fetchMovements = async (filter = {}, shouldShowLoader = true) => {
        try {
            if (shouldShowLoader) {
                setIsLoading(true);
            }

            const params = new URLSearchParams();
            params.append("product_id", id);

            if (filter.pageSize) {
                params.append("page[size]", filter.pageSize);
            }
            if (filter.page) {
                params.append("page[number]", filter.page);
            }
            if (filter.search) {
                params.append("filter[search]", filter.search.toLowerCase());
                params.append("search", filter.search.toLowerCase());
            }
            if (filter.order_By) {
                const sortValue =
                    filter.direction === "desc"
                        ? `-${filter.order_By}`
                        : filter.order_By;
                params.append("sort", sortValue);
            }
            if (filter.start_date && filter.end_date) {
                params.append("start_date", filter.start_date);
                params.append("end_date", filter.end_date);
            }

            const response = await apiConfig.get(
                `/get-credit-product-report?${params.toString()}`
            );
            setCreditMovements(response?.data?.data || []);
            setTotalRows(response?.data?.meta?.total || 0);
        } catch (_error) {
            setCreditMovements([]);
            setTotalRows(0);
        } finally {
            if (shouldShowLoader) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchMovements();
    }, [id]);

    const itemsValue = creditMovements.map((movement) => ({
        time: moment(movement.attributes.created_at).format("LT"),
        date: moment(movement.attributes.date).format("YYYY-MM-DD"),
        reference_code: movement.attributes.reference_code,
        product_name: movement.attributes.product_name,
        customer_name: movement.attributes.customer_name,
        warehouse_name: movement.attributes.warehouse_name,
        quantity: movement.attributes.quantity,
        movement_type_label: movement.attributes.movement_type_label,
        movement_badge: movement.attributes.movement_badge,
    }));

    const columns = [
        {
            name: getFormattedMessage(
                "globally.react-table.column.created-date.label"
            ),
            sortField: "movement_at",
            sortable: true,
            cell: (row) => (
                <span className="badge bg-light-primary">
                    <div className="mb-1">{row.time}</div>
                    <div>{row.date}</div>
                </span>
            ),
        },
        {
            name: getFormattedMessage("dashboard.recentSales.reference.label"),
            sortField: "reference_code",
            sortable: true,
            cell: (row) => (
                <span className="badge bg-light-primary">
                    <span>{row.reference_code}</span>
                </span>
            ),
        },
        {
            name: "Producto",
            selector: (row) => row.product_name,
            sortField: "product_name",
            sortable: true,
        },
        {
            name: getFormattedMessage("customer.title"),
            selector: (row) => row.customer_name,
            sortField: "customer_name",
            sortable: true,
        },
        {
            name: getFormattedMessage("warehouse.title"),
            selector: (row) => row.warehouse_name,
            sortField: "warehouse_name",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.detail.quantity"),
            selector: (row) => row.quantity,
            sortField: "quantity",
            sortable: true,
            cell: (row) => (
                <span className="badge bg-light-info">
                    {Number(row.quantity || 0).toFixed(2)}
                </span>
            ),
        },
        {
            name: "Tipo",
            selector: (row) => row.movement_type_label,
            sortField: "movement_type",
            sortable: true,
            cell: (row) => (
                <span className={`badge bg-light-${row.movement_badge}`}>
                    {row.movement_type_label}
                </span>
            ),
        },
    ];

    return (
        <ReactDataTable
            columns={columns}
            items={itemsValue}
            onChange={fetchMovements}
            isLoading={isLoading}
            totalRows={totalRows}
        />
    );
};

export default CreditTabs;
