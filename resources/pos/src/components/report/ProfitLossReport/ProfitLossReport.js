import React, { useEffect, useState } from "react";
import MasterLayout from "../../MasterLayout";
import TabTitle from "../../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    formatNumber,
    getFormattedMessage,
    parseNumber,
    placeholderText,
} from "../../../shared/sharedMethod";
import { connect } from "react-redux";
import TopProgressBar from "../../../shared/components/loaders/TopProgressBar";
import { Col, Row } from "react-bootstrap";
import ProfitLossWidget from "../../../shared/Widget/ProfitLossWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faArrowRight,
    faCartPlus,
    faSquarePlus,
    faShoppingCart,
    faSquareMinus,
    faMoneyBillTrendUp,
    faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../shared/datepicker/DateRangePicker";
import { Filters } from "../../../constants";
import { dateFormat } from "../../../constants";
import moment from "moment";
import { fetchProfitAndLossReports } from "../../../store/action/profitAndLossReportAction";
import { fetchFrontSetting } from "../../../store/action/frontSettingAction";

const ProfitLossReport = (props) => {
    const {
        fetchFrontSetting,
        frontSetting,
        fetchProfitAndLossReports,
        profitAndLossReport,
        allConfigData,
    } = props;
    const [selectDate, setSelectDate] = useState();
    const [created_at] = useState(Filters.OBJ.created_at);
    const startMonth = moment().startOf("month").format(dateFormat.NATIVE);
    const today = moment().format(dateFormat.NATIVE);

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        onChangeDidMount();
    }, [selectDate]);

    const onChange = (filter) => {
        fetchProfitAndLossReports(filter, true);
    };

    const onDateSelector = (date) => {
        setSelectDate(date.params);
    };

    const onChangeDidMount = () => {
        const filters = {
            created_at: created_at,
            search: "",
            start_date: selectDate ? selectDate.start_date : startMonth,
            end_date: selectDate ? selectDate.end_date : today,
        };
        onChange(filters);
    };

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("profit-loss.reports.title")} />
            <div className={"d-flex justify-content-center"}>
                <DateRangePicker
                    onDateSelector={onDateSelector}
                    isProfitReport={true}
                    selectDate={selectDate}
                />
            </div>
            <Row className="g-4">
                <Col className="col-12 mb-4">
                    <Row className={"align-items-start"}>
                        <ProfitLossWidget
                            className={"bg-primary"}
                            iconClass="bg-cyan-300"
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage("sales.title")}
                            allConfigData={allConfigData}
                            value={
                                profitAndLossReport.sales
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.sales,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"bg-success"}
                            iconClass="bg-green-300"
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faCartPlus}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage("purchases.title")}
                            allConfigData={allConfigData}
                            value={
                                profitAndLossReport.purchases
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.purchases,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"bg-info"}
                            iconClass="bg-blue-300"
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage("sales-return.title")}
                            allConfigData={allConfigData}
                            value={
                                profitAndLossReport.sale_returns
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.sale_returns,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"bg-warning"}
                            iconClass="bg-yellow-300"
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage(
                                "purchases.return.title"
                            )}
                            allConfigData={allConfigData}
                            value={
                                profitAndLossReport.purchase_returns
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.purchase_returns,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"widget-bg-purple"}
                            iconClass="widget-bg-blue-700 "
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faSquareMinus}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage("expenses.title")}
                            allConfigData={allConfigData}
                            value={
                                profitAndLossReport.expenses
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.expenses,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"widget-bg-pink"}
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faSquarePlus}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage("global.revenue.title")}
                            allConfigData={allConfigData}
                            moreText={`(
                                        ${currencySymbolHandling(
                                            allConfigData,
                                            frontSetting.value &&
                                                frontSetting.value
                                                    .currency_symbol,
                                            profitAndLossReport.sales
                                                ? profitAndLossReport.sales
                                                : "0.00"
                                        )}
                                        ${placeholderText("sales.title")}) - (
                                        ${currencySymbolHandling(
                                            allConfigData,
                                            frontSetting.value &&
                                                frontSetting.value
                                                    .currency_symbol,
                                            profitAndLossReport.sale_returns
                                                ? profitAndLossReport.sale_returns
                                                : "0.00"
                                        )}
                                        ${placeholderText(
                                            "sales-return.title"
                                        )})`}
                            value={
                                profitAndLossReport.Revenue
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.Revenue,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"widget-bg-blue"}
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faMoneyBillTrendUp}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage(
                                "global.gross-profit.title"
                            )}
                            allConfigData={allConfigData}
                            moreText={`(
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.sales
                                                    ? profitAndLossReport.sales
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "sales.title"
                                            )})  - (
                                                ${currencySymbolHandling(
                                                    allConfigData,
                                                    frontSetting.value &&
                                                        frontSetting.value
                                                            .currency_symbol,
                                                    profitAndLossReport.sale_returns
                                                        ? profitAndLossReport.sale_returns
                                                        : "0.00"
                                                )}
                                                ${placeholderText(
                                                    "sales-return.title"
                                                )}) - (
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.product_cost
                                                    ? profitAndLossReport.product_cost
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "product.input.product-cost.label"
                                            )})`}
                            value={
                                profitAndLossReport.gross_profit
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.gross_profit,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"widget-bg-red"}
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faMoneyBillTransfer}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage(
                                "global.payment-received.title"
                            )}
                            allConfigData={allConfigData}
                            moreText={`(
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.sales_payment_amount
                                                    ? profitAndLossReport.sales_payment_amount
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "global.payment-received.title"
                                            )}) + (
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.credit_payment_amount
                                                    ? profitAndLossReport.credit_payment_amount
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "credit.collections.title"
                                            )}) + (
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.purchase_returns
                                                    ? profitAndLossReport.purchase_returns
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "purchases.return.title"
                                            )})`}
                            value={
                                profitAndLossReport.payments_received
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.payments_received,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"bg-primary"}
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faMoneyBillTransfer}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage(
                                "credit.collections.title"
                            )}
                            allConfigData={allConfigData}
                            moreText={`(
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.credit_principal_amount
                                                    ? profitAndLossReport.credit_principal_amount
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "credits.title"
                                            )}) + (
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.credit_interest_amount
                                                    ? profitAndLossReport.credit_interest_amount
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "credit.interest-earned.title"
                                            )})`}
                            value={
                                profitAndLossReport.credit_payment_amount
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.credit_payment_amount,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />

                        <ProfitLossWidget
                            className={"bg-success"}
                            currency={
                                frontSetting.value &&
                                frontSetting.value.currency_symbol
                            }
                            icon={
                                <FontAwesomeIcon
                                    icon={faMoneyBillTrendUp}
                                    className="fs-1-xl text-white"
                                />
                            }
                            title={getFormattedMessage(
                                "credit.interest-earned.title"
                            )}
                            allConfigData={allConfigData}
                            moreText={`(
                                            ${currencySymbolHandling(
                                                allConfigData,
                                                frontSetting.value &&
                                                    frontSetting.value
                                                        .currency_symbol,
                                                profitAndLossReport.credit_payment_amount
                                                    ? profitAndLossReport.credit_payment_amount
                                                    : "0.00"
                                            )}
                                            ${placeholderText(
                                                "credit.report.payments.label"
                                            )})`}
                            value={
                                profitAndLossReport.credit_interest_amount
                                    ? formatNumber(
                                          parseNumber(
                                              profitAndLossReport.credit_interest_amount,
                                              0
                                          ),
                                          2
                                      )
                                    : "0.00"
                            }
                        />
                        {/* <ProfitLossWidget className={'bg-dark'} currency={frontSetting.value && frontSetting.value.currency_symbol}
                                          icon={<FontAwesomeIcon icon={faShoppingCart} className='fs-1-xl text-white'/>}
                                          title={getFormattedMessage('global.payment-sent.title')} moreText={'( $ 13474.00 Payments Purchases + $ 0.00 Sales Return) + $ 350.00 Expenses)'} value={"500"}/>

                        <ProfitLossWidget className={'bg-danger'} currency={frontSetting.value && frontSetting.value.currency_symbol}
                                          icon={<FontAwesomeIcon icon={faShoppingCart} className='fs-1-xl text-white'/>}
                                          title={getFormattedMessage('global.net-payment.title')} moreText={'( $ 12053.80 Recieved - $ 13824.00 Sent)'} value={"500"}/> */}
                    </Row>
                </Col>
            </Row>
            <Row className="g-4 mt-1">
                <Col md={6}>
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <div className="text-muted small mb-2">
                                    {getFormattedMessage("credit.active.title")}
                                </div>
                                <div className="fs-2 fw-bold text-primary">
                                    {formatNumber(
                                        parseNumber(
                                            profitAndLossReport.active_credits,
                                            0
                                        ),
                                        0
                                    )}
                                </div>
                            </div>
                            <div className="rounded-circle bg-light-primary text-primary d-flex align-items-center justify-content-center p-4">
                                <FontAwesomeIcon icon={faSquarePlus} />
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <div className="text-muted small mb-2">
                                    {getFormattedMessage("credit.overdue.title")}
                                </div>
                                <div className="fs-2 fw-bold text-danger">
                                    {formatNumber(
                                        parseNumber(
                                            profitAndLossReport.overdue_credits,
                                            0
                                        ),
                                        0
                                    )}
                                </div>
                            </div>
                            <div className="rounded-circle bg-light-danger text-danger d-flex align-items-center justify-content-center p-4">
                                <FontAwesomeIcon icon={faSquareMinus} />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </MasterLayout>
    );
};
const mapStateToProps = (state) => {
    const { frontSetting, profitAndLossReport, allConfigData } = state;
    return { frontSetting, profitAndLossReport, allConfigData };
};

export default connect(mapStateToProps, {
    fetchProfitAndLossReports,
    fetchFrontSetting,
})(ProfitLossReport);
