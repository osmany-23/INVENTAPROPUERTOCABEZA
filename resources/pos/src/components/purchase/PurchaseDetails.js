import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Table } from "react-bootstrap-v5";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import moment from "moment";
import {
    faUser,
    faEnvelope,
    faLocationDot,
    faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    formatNumber,
    formatQuantityAuto,
    getFormattedMessage,
    parseNumber,
    placeholderText,
} from "../../shared/sharedMethod";
import { purchaseDetailsAction } from "../../store/action/purchaseDetailsAction";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";

const normalizePurchaseLots = (details) => {
    const rawLots = details?.purchase_lots?.data || details?.purchase_lots || [];

    return Array.isArray(rawLots) ? rawLots : [];
};

const resolveBatchRecord = (purchaseLot, details) =>
    purchaseLot?.batch?.data?.attributes || purchaseLot?.batch || details?.batch_reference || null;

const resolveBatchStatus = (batch) => {
    const expiryDate = batch?.fecha_vencimiento || batch?.expires_at || null;
    const expired =
        expiryDate && moment(expiryDate).endOf("day").isBefore(moment());

    return expired
        ? {
              label: "Vencido",
              pillClass: "batch-manager__status-pill batch-manager__status-pill--danger",
              cardClass: "purchase-lot-card purchase-lot-card--danger",
          }
        : {
              label: "Disponible",
              pillClass: "batch-manager__status-pill batch-manager__status-pill--success",
              cardClass: "purchase-lot-card purchase-lot-card--success",
          };
};

const formatBatchDate = (value) =>
    value ? moment(value).format("YYYY-MM-DD") : "Sin fecha";

const formatBatchTax = (batch) =>
    `${batch?.impuesto_tipo || "EXCLUSIVO"} ${formatNumber(
        parseNumber(batch?.impuesto_valor, 0),
        2
    )}%`;

const createPurchaseLotCards = (details) => {
    const purchaseLots = normalizePurchaseLots(details);

    if (purchaseLots.length) {
        return purchaseLots.map((purchaseLot, index) => ({
            id: purchaseLot?.id || `purchase-lot-${details.id}-${index}`,
            quantity: purchaseLot?.cantidad ?? 0,
            purchasePrice: purchaseLot?.costo_unitario ?? details.product_cost,
            salePrice:
                purchaseLot?.precio_venta ??
                details?.product?.product_price ??
                null,
            batch: resolveBatchRecord(purchaseLot, details),
        }));
    }

    if (details?.batch_reference) {
        return [
            {
                id: `purchase-batch-reference-${details.id}`,
                quantity: details?.quantity ?? 0,
                purchasePrice: details?.product_cost ?? 0,
                salePrice: details?.product?.product_price ?? null,
                batch: details.batch_reference,
            },
        ];
    }

    return [];
};

const PurchaseDetails = (props) => {
    const {
        purchaseDetailsAction,
        purchaseDetails,
        fetchFrontSetting,
        frontSetting,
        allConfigData,
    } = props;
    const { id } = useParams();

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    useEffect(() => {
        purchaseDetailsAction(id);
    }, []);

    return (
        <MasterLayout>
            <HeaderTitle
                title={getFormattedMessage("purchases.details.title")}
                to="/app/purchases"
            />
            <TabTitle title={placeholderText("purchases.details.title")} />
            <div className="card">
                <div className="card-body">
                    <Form>
                        <div className="row">
                            <div className="col-12">
                                <h4 className="font-weight-bold text-center mb-5">
                                    {getFormattedMessage(
                                        "purchases.details.title"
                                    )}{" "}
                                    :{" "}
                                    {purchaseDetails &&
                                        purchaseDetails.reference_code}
                                </h4>
                            </div>
                        </div>
                        <Row className="custom-line-height">
                            <Col md={4}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                    {getFormattedMessage(
                                        "purchase.detail.supplier.info"
                                    )}
                                </h5>
                                <div className="p-4">
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.supplier &&
                                            purchaseDetails.supplier.name}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.supplier &&
                                            purchaseDetails.supplier.email}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faMobileAlt}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.supplier &&
                                            purchaseDetails.supplier.phone}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.supplier &&
                                            purchaseDetails.supplier.address}
                                    </div>
                                </div>
                            </Col>
                            <Col md={4} className="m-md-0 m-4">
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                    {getFormattedMessage(
                                        "globally.detail.company.info"
                                    )}
                                </h5>
                                <div className="p-4">
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.company_info &&
                                            purchaseDetails.company_info
                                                .company_name}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.company_info &&
                                            purchaseDetails.company_info.email}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faMobileAlt}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.company_info &&
                                            purchaseDetails.company_info.phone}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {purchaseDetails.company_info &&
                                            purchaseDetails.company_info
                                                .address}
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                    {getFormattedMessage(
                                        "purchase.detail.purchase.info"
                                    )}
                                </h5>
                                <div className="p-4">
                                    <div className="pb-1">
                                        <span className="me-2">
                                            {getFormattedMessage(
                                                "globally.detail.reference"
                                            )}{" "}
                                            :
                                        </span>
                                        <span>
                                            {purchaseDetails &&
                                                purchaseDetails.reference_code}
                                        </span>
                                    </div>
                                    <div className="pb-1">
                                        <span className="me-2">
                                            {getFormattedMessage(
                                                "globally.detail.status"
                                            )}{" "}
                                            :
                                        </span>
                                        {(purchaseDetails &&
                                            purchaseDetails.status === 1 && (
                                                <span className="badge bg-light-success">
                                                    {getFormattedMessage(
                                                        "status.filter.received.label"
                                                    )}
                                                </span>
                                            )) ||
                                            (purchaseDetails.status === 2 && (
                                                <span className="badge bg-light-primary">
                                                    {getFormattedMessage(
                                                        "status.filter.pending.label"
                                                    )}
                                                </span>
                                            )) ||
                                            (purchaseDetails.status === 3 && (
                                                <span className="badge bg-light-warning">
                                                    {getFormattedMessage(
                                                        "status.filter.ordered.label"
                                                    )}
                                                </span>
                                            ))}
                                    </div>
                                    <div className="pb-1">
                                        <span className="me-2">
                                            {getFormattedMessage(
                                                "globally.detail.warehouse"
                                            )}{" "}
                                            :
                                        </span>
                                        <span>
                                            {purchaseDetails.warehouse &&
                                                purchaseDetails.warehouse.name}
                                        </span>
                                    </div>
                                    {purchaseDetails?.tipo_origen ? (
                                        <div className="pb-1">
                                            <span className="me-2">Origen :</span>
                                            <span className="badge bg-light-info">
                                                {purchaseDetails.tipo_origen}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                        <div className="mt-5">
                            <h5 className="text-gray-600 bg-light p-4 mb-4 text-uppercase">
                                {getFormattedMessage(
                                    "globally.detail.order.summary"
                                )}
                            </h5>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.product"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.net-unit-cost"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.quantity"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.unit-cost"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.discount"
                                            )}
                                        </th>
                                        <th className="ps-3">
                                            {getFormattedMessage(
                                                "globally.detail.tax"
                                            )}
                                        </th>
                                        <th colSpan={2}>
                                            {getFormattedMessage(
                                                "globally.detail.subtotal"
                                            )}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchaseDetails.purchase_items &&
                                        purchaseDetails.purchase_items.map(
                                            (details, index) => {
                                                const purchaseLotCards =
                                                    createPurchaseLotCards(details);

                                                return (
                                                    <tr
                                                        key={index}
                                                        className="align-middle"
                                                    >
                                                        <td className="ps-3">
                                                            {details.product &&
                                                                details.product
                                                                    .code}{" "}
                                                            (
                                                            {details.product &&
                                                                details.product
                                                                    .name}{" "}
                                                            )
                                                            {purchaseLotCards.length > 0 ? (
                                                                <div className="purchase-lot-card-grid mt-3">
                                                                    {purchaseLotCards.map(
                                                                        (purchaseLot) => {
                                                                            const batch =
                                                                                purchaseLot.batch;
                                                                            const status =
                                                                                resolveBatchStatus(
                                                                                    batch
                                                                                );
                                                                            const highlightedCode =
                                                                                batch?.lote_fabricante ||
                                                                                batch?.lot_barcode ||
                                                                                "Lote sin referencia";

                                                                            return (
                                                                                <div
                                                                                    key={purchaseLot.id}
                                                                                    className={
                                                                                        status.cardClass
                                                                                    }
                                                                                >
                                                                                    <div className="purchase-lot-card__top">
                                                                                        <div>
                                                                                            <span className="purchase-lot-card__eyebrow">
                                                                                                Lote
                                                                                            </span>
                                                                                            <h6 className="purchase-lot-card__title">
                                                                                                {highlightedCode}
                                                                                            </h6>
                                                                                            {batch?.lot_barcode ? (
                                                                                                <div className="purchase-lot-card__barcode">
                                                                                                    Codigo barra:{" "}
                                                                                                    {
                                                                                                        batch.lot_barcode
                                                                                                    }
                                                                                                </div>
                                                                                            ) : null}
                                                                                        </div>
                                                                                        <span
                                                                                            className={
                                                                                                status.pillClass
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                status.label
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="purchase-lot-card__grid">
                                                                                        <div>
                                                                                            <span>
                                                                                                Cantidad
                                                                                            </span>
                                                                                            <strong>
                                                                                                {formatQuantityAuto(
                                                                                                    purchaseLot.quantity
                                                                                                )}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span>
                                                                                                Precio compra
                                                                                            </span>
                                                                                            <strong>
                                                                                                {currencySymbolHandling(
                                                                                                    allConfigData,
                                                                                                    frontSetting.value &&
                                                                                                        frontSetting
                                                                                                            .value
                                                                                                            .currency_symbol,
                                                                                                    purchaseLot.purchasePrice
                                                                                                )}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span>
                                                                                                Precio venta
                                                                                            </span>
                                                                                            <strong>
                                                                                                {purchaseLot.salePrice !==
                                                                                                null &&
                                                                                                purchaseLot.salePrice !==
                                                                                                    undefined
                                                                                                    ? currencySymbolHandling(
                                                                                                          allConfigData,
                                                                                                          frontSetting.value &&
                                                                                                              frontSetting
                                                                                                                  .value
                                                                                                                  .currency_symbol,
                                                                                                          purchaseLot.salePrice
                                                                                                      )
                                                                                                    : "N/A"}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span>
                                                                                                Ubicacion
                                                                                            </span>
                                                                                            <strong>
                                                                                                {batch?.ubicacion ||
                                                                                                    "Sin ubicacion"}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span>
                                                                                                Fabricacion
                                                                                            </span>
                                                                                            <strong>
                                                                                                {formatBatchDate(
                                                                                                    batch?.fecha_fabricacion
                                                                                                )}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div>
                                                                                            <span>
                                                                                                Vencimiento
                                                                                            </span>
                                                                                            <strong>
                                                                                                {formatBatchDate(
                                                                                                    batch?.fecha_vencimiento ||
                                                                                                        batch?.expires_at
                                                                                                )}
                                                                                            </strong>
                                                                                        </div>
                                                                                        <div className="purchase-lot-card__wide">
                                                                                            <span>
                                                                                                Impuesto
                                                                                            </span>
                                                                                            <strong>
                                                                                                {formatBatchTax(
                                                                                                    batch
                                                                                                )}
                                                                                            </strong>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            ) : null}
                                                        </td>
                                                        <td>
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.net_unit_cost
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatQuantityAuto(details.quantity)}
                                                        </td>
                                                        <td>
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.product
                                                                    .product_cost
                                                            )}
                                                        </td>
                                                        <td>
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.discount_amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.tax_amount
                                                            )}
                                                        </td>
                                                        <td>
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                details.sub_total
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-xxl-5 col-lg-6 col-md-6 col-12 float-end">
                            <div className="card">
                                <div className="card-body pt-7 pb-2">
                                    <div className="table-responsive">
                                        <table className="table border">
                                            <tbody>
                                                <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.order.tax"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHandling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            purchaseDetails &&
                                                                purchaseDetails.tax_amount >
                                                                    0
                                                                ? purchaseDetails.tax_amount
                                                                : "0.00"
                                                        )}{" "}
                                                        (
                                                        {purchaseDetails &&
                                                            formatNumber(
                                                                parseNumber(
                                                                    purchaseDetails.tax_rate,
                                                                    0
                                                                ),
                                                                2
                                                            )}
                                                        %)
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.discount"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHandling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            purchaseDetails &&
                                                                purchaseDetails.discount
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3">
                                                        {getFormattedMessage(
                                                            "globally.detail.shipping"
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {currencySymbolHandling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            purchaseDetails &&
                                                                purchaseDetails.shipping
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="py-3 text-primary">
                                                        {getFormattedMessage(
                                                            "globally.detail.grand.total"
                                                        )}
                                                    </td>
                                                    <td className="py-3 text-primary">
                                                        {currencySymbolHandling(
                                                            allConfigData,
                                                            frontSetting.value &&
                                                                frontSetting
                                                                    .value
                                                                    .currency_symbol,
                                                            purchaseDetails &&
                                                                purchaseDetails.grand_total
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { purchaseDetails, frontSetting, allConfigData } = state;
    return { purchaseDetails, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {
    purchaseDetailsAction,
    fetchFrontSetting,
})(PurchaseDetails);
