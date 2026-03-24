import React, { useEffect, useState } from "react";
import MasterLayout from "../../MasterLayout";
import TabTitle from "../../../shared/tab-title/TabTitle";
import { constants } from "../../../constants";
import {
    currencySymbolHandling,
    getAvatarName,
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import ReactDataTable from "../../../shared/table/ReactDataTable";
import TopProgressBar from "../../../shared/components/loaders/TopProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { getAllRegisterReportDetailsAction } from "../../../store/action/pos/posRegisterDetailsAction";
import moment from "moment";
import ReactSelect from "../../../shared/select/reactSelect";
import { fetchUsers } from "../../../store/action/userAction";
import { Button, Form } from "react-bootstrap-v5";

const RegisterReport = () => {
    const dispatch = useDispatch();
    const {
        isLoading,
        totalRecord,
        registerReportDetails,
        frontSetting,
        allConfigData,
        dates,
        users,
    } = useSelector((state) => state);

    const [userData, setUserData] = useState({});
    const [usersData, setUsersData] = useState({
        usersDataOptions: [],
        userDataOptiosType: [],
    });
    const [commissionPercent, setCommissionPercent] = useState("");
    const [commissionResult, setCommissionResult] = useState(null);

    useEffect(() => {
        dispatch(fetchUsers({}, true, "?page[size]=0&returnAll=true"));
        dispatch({ type: constants.DATE_ACTION, payload: "" });
    }, []);

    useEffect(() => {
        if (users?.length > 0) {
            setUsersData((data) => ({
                ...data,
                usersDataOptions: users?.map((user) => ({
                    id: user?.id,
                    name: `${user?.attributes?.first_name} ${
                        user?.attributes?.last_name !== "" &&
                        user?.attributes?.last_name !== null &&
                        user?.attributes?.last_name !== undefined
                            ? user?.attributes?.last_name
                            : ""
                    }`,
                })),
            }));
        }
    }, [users]);

    useEffect(() => {
        if (usersData?.usersDataOptions?.length > 0) {
            const allUsersOption = {
                value: 0,
                label: getFormattedMessage("unit.filter.all.label"),
            };
            setUsersData((data) => ({
                ...data,
                userDataOptiosType: [
                    allUsersOption,
                    ...usersData?.usersDataOptions?.map((user) => ({
                        value: user.id,
                        label: user?.name,
                    })),
                ],
            }));
        }
    }, [usersData?.usersDataOptions]);

    useEffect(() => {
        if (!userData?.value && usersData?.userDataOptiosType?.length > 0) {
            setUserData({
                value: 0,
                label: getFormattedMessage("unit.filter.all.label"),
            });
        }
    }, [usersData?.userDataOptiosType]);

    const buildReportQuery = () => {
        const params = [];
        if (userData?.value !== undefined && Number(userData?.value) > 0) {
            params.push(`user_id=${userData.value}`);
        }
        if (dates?.start_date && dates?.end_date) {
            params.push(`start_date=${dates.start_date}`);
            params.push(`end_date=${dates.end_date}`);
        }

        return params.length ? `?${params.join("&")}` : "";
    };

    useEffect(() => {
        dispatch(
            getAllRegisterReportDetailsAction({
                query: buildReportQuery(),
            })
        );
    }, [dates, userData]);

    const itemsValue =
        registerReportDetails?.length > 0
            ? registerReportDetails?.map((registerReport) => ({
            open_date: moment(registerReport?.attributes?.created_at).format(
                "DD-MM-YYYY"
            ),
            open_time: moment(registerReport?.attributes?.created_at).format(
                "LT"
            ),
            close_date: moment(registerReport?.attributes?.closed_at).format(
                "DD-MM-YYYY"
            ),
            close_time: moment(registerReport?.attributes?.closed_at).format(
                "LT"
            ),
            user_first_name: registerReport?.attributes?.user?.first_name,
            user_last_name: registerReport?.attributes?.user?.last_name,
            user_email: registerReport?.attributes?.user?.email,
            user_image: registerReport?.attributes?.user?.image_url,
            cash_in_hand: registerReport?.attributes?.cash_in_hand,
            cash_in_hand_while_closing:
                registerReport?.attributes?.cash_in_hand_while_closing,
            total_sale: registerReport?.attributes?.total_sale,
            total_return: registerReport?.attributes?.total_return,
            total_amount: registerReport?.attributes?.total_amount,
            credit_collections_total:
                registerReport?.attributes?.credit_collections_total,
            credit_interest_amount:
                registerReport?.attributes?.credit_interest_amount,
            gross_income_amount:
                registerReport?.attributes?.gross_income_amount,
            currency: frontSetting?.value?.currency_symbol,
            notes: registerReport?.attributes?.notes,
        }))
            : [];

    const onChange = (filter) => {
        dispatch(
            getAllRegisterReportDetailsAction({
                query: buildReportQuery(),
                filter,
            })
        );
    };

    const columns = [
        {
            name: getFormattedMessage("user-details.table.opened-on.row.label"),
            selector: (row) => row.date,
            sortField: "created_at",
            sortable: false,
            cell: (row) => {
                return (
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.open_date}</div>
                        {row.open_time}
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("user-details.table.closde-on.row.label"),
            selector: (row) => row.date,
            sortField: "created_at",
            sortable: false,
            cell: (row) => {
                return (
                    <span className="badge bg-light-info">
                        <div className="mb-1">{row.close_date}</div>
                        {row.close_time}
                    </span>
                );
            },
        },
        {
            name: getFormattedMessage("users.table.user.column.title"),
            selector: (row) => row.user_first_name,
            sortField: "first_name",
            sortable: false,
            cell: (row) => {
                const imageUrl = row.user_image ? row.user_image : null;
                const lastName =
                    row.user_last_name !== "" &&
                    row.user_last_name !== null &&
                    row.user_last_name !== undefined
                        ? row.user_last_name
                        : "";
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <div>
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        height="50"
                                        width="50"
                                        alt="User Image"
                                        className="image image-circle image-mini"
                                    />
                                ) : (
                                    <span className="custom-user-avatar fs-5">
                                        {getAvatarName(
                                            row.user_first_name + " " + lastName
                                        )}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <div>{row.user_first_name + " " + lastName}</div>
                            <span>{row.user_email}</span>
                        </div>
                    </div>
                );
            },
        },
        {
            name: getFormattedMessage("globally.input.cash-in-hand.label"),
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.cash_in_hand
                ),
            sortField: "cash_in_hand",
            sortable: false,
        },
        {
            name: getFormattedMessage(
                "globally.input.cash-in-hand-while-closing.label"
            ),
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.cash_in_hand_while_closing
                ),
            sortField: "cash_in_hand_while_closing",
            sortable: false,
        },
        {
            name: getFormattedMessage("register.total-sales.label"),
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.total_sale
                ),
            sortField: "total_sale",
            sortable: false,
        },
        {
            name: getFormattedMessage("credit.collections.title"),
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.credit_collections_total
                ),
            sortField: "credit_collections_total",
            sortable: false,
        },
        {
            name: getFormattedMessage("credit.report.total-received.label"),
            selector: (row) =>
                currencySymbolHandling(
                    allConfigData,
                    row.currency,
                    row.gross_income_amount
                ),
            sortField: "gross_income_amount",
            sortable: false,
        },
        {
            name: getFormattedMessage("globally.input.notes.label"),
            selector: (row) => row.notes,
            sortField: "notes",
            sortable: false,
            cell: (row) => {
                return (
                    <div>
                        {row.notes?.length > 30
                            ? row.notes?.substring(0, 29) + "..."
                            : row.notes}
                    </div>
                );
            },
        },
    ];

    const onUserChange = (data) => {
        setUserData(data);
        setCommissionResult(null);
    };

    const onCommissionPercentChange = (event) => {
        const { value } = event.target;
        if (value === "") {
            setCommissionPercent("");
            return;
        }
        const numericValue = Number(value);
        if (Number.isNaN(numericValue)) {
            return;
        }
        if (numericValue < 0) {
            setCommissionPercent("0");
            return;
        }
        if (numericValue > 100) {
            setCommissionPercent("100");
            return;
        }
        setCommissionPercent(value);
    };

    const getCurrentPeriodLabel = () => {
        if (!dates?.start_date || !dates?.end_date) {
            return "Sin filtro";
        }

        const startDate = dates.start_date;
        const endDate = dates.end_date;
        const today = moment().format("YYYY-MM-DD");
        const thisWeekStart = moment().startOf("week").format("YYYY-MM-DD");
        const lastWeekStart = moment()
            .subtract(1, "week")
            .startOf("isoWeek")
            .format("YYYY-MM-DD");
        const thisMonthStart = moment().startOf("month").format("YYYY-MM-DD");
        const thisMonthEnd = moment().endOf("month").format("YYYY-MM-DD");
        const lastMonthStart = moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DD");
        const lastMonthEnd = moment()
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM-DD");

        if (startDate === today && endDate === today) {
            return "Hoy";
        }
        if (startDate === thisWeekStart && endDate === today) {
            return "Esta semana";
        }
        if (startDate === lastWeekStart && endDate === thisWeekStart) {
            return "Semana pasada";
        }
        if (startDate === thisMonthStart && endDate === thisMonthEnd) {
            return "Este mes";
        }
        if (startDate === lastMonthStart && endDate === lastMonthEnd) {
            return "Mes pasado";
        }

        return "Rango personalizado";
    };

    const getCurrentPeriodRange = () => {
        if (dates?.start_date && dates?.end_date) {
            return `${dates.start_date} - ${dates.end_date}`;
        }
        return "Todos los registros";
    };

    const getCurrentUserLabel = () => {
        if (Number(userData?.value) === 0) {
            return getFormattedMessage("unit.filter.all.label");
        }
        if (userData?.label) {
            return userData.label;
        }
        return getFormattedMessage("unit.filter.all.label");
    };

    const onCalculateCommission = () => {
        const percent = Number(commissionPercent || 0);
        const totalSales = itemsValue.reduce((sum, row) => {
            const rowSaleTotal = Number(
                row?.total_sale ??
                    row?.total_amount ??
                    row?.cash_in_hand_while_closing ??
                    0
            );
            return sum + (Number.isNaN(rowSaleTotal) ? 0 : rowSaleTotal);
        }, 0);

        const commission = (totalSales * percent) / 100;
        setCommissionResult({
            userLabel: getCurrentUserLabel(),
            periodLabel: getCurrentPeriodLabel(),
            periodRange: getCurrentPeriodRange(),
            totalSales,
            percent,
            commission,
        });
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("register.report.title")} />
            <div>
                <ReactDataTable
                    columns={columns}
                    isShowSearch
                    items={itemsValue}
                    onChange={onChange}
                    isLoading={isLoading}
                    totalRows={totalRecord}
                    isShowDateRangeField
                    AddButton={
                        <div className="w-100 me-3 mb-2">
                            <div className="d-flex flex-wrap align-items-end">
                                <div
                                    className="me-3 mb-2"
                                    style={{ minWidth: "260px" }}
                                >
                                    <ReactSelect
                                        multiLanguageOption={
                                            usersData?.usersDataOptions
                                        }
                                        onChange={onUserChange}
                                        value={userData}
                                        title={getFormattedMessage("users.title")}
                                        errors={""}
                                        placeholder={placeholderText("select.report.label")}
                                        isRequired
                                    />
                                </div>
                                <div className="me-3 mb-2" style={{ minWidth: "140px" }}>
                                    <Form.Label className="mb-1">
                                        % Comision
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={0}
                                        max={100}
                                        step="0.01"
                                        value={commissionPercent}
                                        onChange={onCommissionPercentChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <Button
                                        variant="primary"
                                        className="mt-4"
                                        onClick={onCalculateCommission}
                                    >
                                        Calcular comision
                                    </Button>
                                </div>
                            </div>
                            {commissionResult && (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <h5 className="mb-3">Resumen de comision</h5>
                                        <div className="mb-2">
                                            <strong>Usuario:</strong> {commissionResult.userLabel}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Periodo:</strong> {commissionResult.periodLabel}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Rango de fechas:</strong> {commissionResult.periodRange}
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <strong>Total ventas:</strong>
                                            <span>
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    frontSetting?.value?.currency_symbol,
                                                    commissionResult.totalSales
                                                )}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <strong>% comision:</strong>
                                            <span>{commissionResult.percent}%</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <strong>TOTAL COMISION:</strong>
                                            <strong className="text-success">
                                                {currencySymbolHandling(
                                                    allConfigData,
                                                    frontSetting?.value?.currency_symbol,
                                                    commissionResult.commission
                                                )}
                                            </strong>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                />
            </div>
        </MasterLayout>
    );
};

export default RegisterReport;
