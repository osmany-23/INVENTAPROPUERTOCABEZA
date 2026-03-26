import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faClock,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL } from "../../constants";
import { getBatchStatusMeta } from "../../shared/batchHelpers";
import { can } from "../../shared/can";

const EMPTY_SUMMARY = {
    alert_days: 30,
    overdue_count: 0,
    upcoming_count: 0,
    total_alerts: 0,
};

const BatchAlertsModal = ({ show, onHide, onSummaryChange }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [summary, setSummary] = useState(EMPTY_SUMMARY);
    const [items, setItems] = useState([]);
    const canOpenBatchManager = can("manage_products");
    const canOpenExpiryReport = can("manage_reports") || can("manage_report");

    const splitItems = useMemo(() => {
        return {
            expired: items.filter((item) => item.status === "expired"),
            expiring: items.filter((item) => item.status === "expiring"),
        };
    }, [items]);

    const loadAlerts = async () => {
        try {
            setLoading(true);
            setError("");
            const [summaryResponse, itemsResponse] = await Promise.all([
                apiConfig.get(apiBaseURL.PRODUCT_BATCH_ALERTS_SUMMARY),
                apiConfig.get(apiBaseURL.PRODUCT_BATCH_ALERTS),
            ]);
            const nextSummary = summaryResponse?.data?.data || EMPTY_SUMMARY;
            setSummary(nextSummary);
            setItems(itemsResponse?.data?.data || []);
            onSummaryChange?.(nextSummary);
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                    "No se pudieron cargar las alertas de lotes."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!show) {
            return;
        }

        loadAlerts();
    }, [show]);

    const handleOpenProduct = (productId) => {
        onHide?.();
        navigate(`/app/products/batches/${productId}`);
    };

    const renderItems = (collection, tone) => {
        if (collection.length === 0) {
            return (
                <div className="batch-alerts-modal__empty">
                    No hay lotes {tone === "danger" ? "vencidos" : "por vencer"} ahora mismo.
                </div>
            );
        }

        return (
            <div className="batch-alerts-modal__list">
                {collection.map((item) => {
                    const meta = getBatchStatusMeta(item.status);

                    return (
                        <article
                            key={item.id}
                            className={`batch-alerts-modal__item batch-alerts-modal__item--${meta.tone}`}
                        >
                            <div className="batch-alerts-modal__item-top">
                                <div>
                                    <h5>{item.product_name}</h5>
                                    <span>{item.product_code}</span>
                                </div>
                                <span
                                    className={`batch-manager__status-pill batch-manager__status-pill--${meta.tone}`}
                                >
                                    {item.status_label}
                                </span>
                            </div>

                            <div className="batch-alerts-modal__item-grid">
                                <div>
                                    <span>Lote</span>
                                    <strong>{item.lot_code}</strong>
                                </div>
                                <div>
                                    <span>Cantidad</span>
                                    <strong>{Number(item.available_quantity || 0).toFixed(2)} u</strong>
                                </div>
                                <div>
                                    <span>Vence</span>
                                    <strong>{item.expires_at || "Sin fecha"}</strong>
                                </div>
                                <div>
                                    <span>Tiempo</span>
                                    <strong>
                                        {item.days_remaining === null
                                            ? "N/A"
                                            : item.days_remaining < 0
                                            ? `${Math.abs(item.days_remaining)} dias vencido`
                                            : `${item.days_remaining} dias`}
                                    </strong>
                                </div>
                            </div>

                            <div className="batch-alerts-modal__item-footer">
                                <span>{item.warehouse_name}</span>
                                {canOpenBatchManager ? (
                                    <Button
                                        className="batch-manager__primary-btn"
                                        onClick={() => handleOpenProduct(item.product_id)}
                                    >
                                        Ver lotes
                                    </Button>
                                ) : null}
                            </div>
                        </article>
                    );
                })}
            </div>
        );
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="xl"
            contentClassName="batch-alerts-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="batch-alerts-modal__title">
                    <span className="batch-alerts-modal__title-icon">
                        <FontAwesomeIcon icon={faBoxOpen} />
                    </span>
                    Alertas de vencimiento por lote
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="batch-alerts-modal__body">
                <section className="batch-alerts-modal__toolbar">
                    <div>
                        <strong>Total de alertas: {Number(summary.total_alerts || 0)}</strong>
                        <small>
                            Ventana actual: {Number(summary.alert_days || 30)} dias
                        </small>
                    </div>
                    {canOpenExpiryReport ? (
                        <Button
                            className="batch-manager__primary-btn"
                            onClick={() => {
                                onHide?.();
                                navigate("/app/report/report-batch-expiry");
                            }}
                        >
                            Abrir reporte
                        </Button>
                    ) : null}
                </section>

                {error ? <div className="alert alert-danger mb-4">{error}</div> : null}

                {loading ? (
                    <div className="batch-alerts-modal__loading">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>
                        <section className="batch-alerts-modal__section">
                            <div className="batch-alerts-modal__section-header">
                                <div className="batch-alerts-modal__section-title">
                                    <span className="batch-alerts-modal__section-icon batch-alerts-modal__section-icon--danger">
                                        <FontAwesomeIcon icon={faTriangleExclamation} />
                                    </span>
                                    <div>
                                        <h4>Lotes vencidos</h4>
                                        <small>{Number(summary.overdue_count || 0)} registros</small>
                                    </div>
                                </div>
                            </div>
                            {renderItems(splitItems.expired, "danger")}
                        </section>

                        <section className="batch-alerts-modal__section">
                            <div className="batch-alerts-modal__section-header">
                                <div className="batch-alerts-modal__section-title">
                                    <span className="batch-alerts-modal__section-icon batch-alerts-modal__section-icon--warning">
                                        <FontAwesomeIcon icon={faClock} />
                                    </span>
                                    <div>
                                        <h4>Lotes por vencer</h4>
                                        <small>{Number(summary.upcoming_count || 0)} registros</small>
                                    </div>
                                </div>
                            </div>
                            {renderItems(splitItems.expiring, "warning")}
                        </section>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="batch-alerts-modal__footer">
                <Button className="batch-manager__primary-btn" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BatchAlertsModal;
