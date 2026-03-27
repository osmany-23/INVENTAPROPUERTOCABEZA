import React, { useEffect, useMemo, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap-v5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faFileInvoice,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType } from "../../constants";
import {
    currencySymbolHandling,
    getCurrencySymbol,
} from "../../shared/sharedMethod";
import { addToast } from "../../store/action/toastAction";
import { can } from "../../shared/can";
import { CreditActionButton, StatusBadge } from "./creditHelpers";

const EMPTY_ALERT_PAYLOAD = {
    summary: {
        alert_days: 3,
        default_alert_days: 3,
        uses_user_preference: false,
        overdue_count: 0,
        upcoming_count: 0,
        total_alerts: 0,
    },
    upcoming: [],
    overdue: [],
};

const CreditAlertsModal = ({ show, onHide, onSummaryChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const settings = useSelector((state) => state.settings);
    const allConfigData = useSelector((state) => state.allConfigData);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [payload, setPayload] = useState(EMPTY_ALERT_PAYLOAD);
    const [alertDaysInput, setAlertDaysInput] = useState("3");
    const canRegisterPayment = can("pos.create_sale", { strict: true });

    const toast = (text, type = toastType.SUCCESS) =>
        dispatch(addToast({ text, type }));

    const summary = payload?.summary || EMPTY_ALERT_PAYLOAD.summary;
    const upcomingAlerts = payload?.upcoming || [];
    const overdueAlerts = payload?.overdue || [];
    const totalAlerts = Number(summary?.total_alerts || 0);
    const parsedAlertDays = Number(alertDaysInput);
    const alertDaysValue = Number.isFinite(parsedAlertDays)
        ? Math.max(parsedAlertDays, 0)
        : 0;

    const money = useMemo(
        () => (value) =>
            currencySymbolHandling(
                allConfigData,
                getCurrencySymbol(settings),
                Number(value || 0)
            ),
        [allConfigData, settings]
    );

    const loadAlerts = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await apiConfig.get(apiBaseURL.CREDIT_ALERTS);
            const nextPayload = response?.data?.data || EMPTY_ALERT_PAYLOAD;
            setPayload(nextPayload);
            setAlertDaysInput(
                String(nextPayload?.summary?.alert_days ?? summary?.alert_days ?? 3)
            );
            onSummaryChange?.(nextPayload?.summary || {});
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                    "No se pudieron cargar las alertas de creditos."
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

    const saveAlertDays = async () => {
        if (
            !Number.isFinite(parsedAlertDays) ||
            parsedAlertDays < 0 ||
            parsedAlertDays > 30
        ) {
            setError("Los dias de alerta deben estar entre 0 y 30.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            const response = await apiConfig.put(
                apiBaseURL.CREDIT_ALERTS_SETTINGS,
                {
                    credit_alert_days: alertDaysValue,
                }
            );
            const nextSummary = response?.data?.data || {};
            onSummaryChange?.(nextSummary);
            toast("Configuracion de alertas actualizada.");
            await loadAlerts();
        } catch (requestError) {
            const message =
                requestError?.response?.data?.message ||
                "No se pudo guardar la configuracion de alertas.";
            setError(message);
            toast(message, toastType.ERROR);
        } finally {
            setSaving(false);
        }
    };

    const handleViewCredit = (creditId) => {
        onHide?.();
        navigate(`/app/creditos/${creditId}`);
    };

    const handleRegisterPayment = (creditId) => {
        onHide?.();
        navigate(`/app/creditos/${creditId}?action=payment`);
    };

    const renderAlertRow = (item) => {
        const timingText =
            item.alert_type === "vencido"
                ? `Atrasado ${item.day_count} dia${item.day_count === 1 ? "" : "s"}`
                : `Vence en ${item.day_count} dia${item.day_count === 1 ? "" : "s"}`;

        return (
            <article
                key={item.id}
                className={`credit-alerts-modal__item credit-alerts-modal__item--${item.alert_type}`}
            >
                <div className="credit-alerts-modal__item-top">
                    <div>
                        <div className="credit-alerts-modal__item-title">
                            {item.customer_name || "Cliente sin nombre"}
                        </div>
                        <div className="credit-alerts-modal__item-subtitle">
                            Credito #{item.credit_id}
                            {item.sale_reference_code
                                ? ` - Venta ${item.sale_reference_code}`
                                : ""}
                        </div>
                    </div>
                    <span
                        className={`credit-alerts-modal__type-badge credit-alerts-modal__type-badge--${item.alert_type}`}
                    >
                        {item.alert_type === "vencido" ? "Vencido" : "Por vencer"}
                    </span>
                </div>

                <div className="credit-alerts-modal__details">
                    <div className="credit-alerts-modal__detail">
                        <span>Saldo</span>
                        <strong>{money(item.balance)}</strong>
                    </div>
                    <div className="credit-alerts-modal__detail">
                        <span>Vencimiento</span>
                        <strong>{item.due_date}</strong>
                    </div>
                    <div className="credit-alerts-modal__detail">
                        <span>Tiempo</span>
                        <strong>{timingText}</strong>
                    </div>
                    <div className="credit-alerts-modal__detail">
                        <span>Estado</span>
                        <StatusBadge status={item.payment_status} />
                    </div>
                </div>

                <div className="credit-alerts-modal__actions">
                    <CreditActionButton
                        action="view-credit"
                        size="sm"
                        className="credit-alerts-modal__button"
                        onClick={() => handleViewCredit(item.credit_id)}
                    >
                        Ver credito
                    </CreditActionButton>
                    {canRegisterPayment && (
                        <CreditActionButton
                            action="register-payment"
                            size="sm"
                            className="credit-alerts-modal__button"
                            onClick={() => handleRegisterPayment(item.credit_id)}
                        >
                            Registrar pago
                        </CreditActionButton>
                    )}
                </div>
            </article>
        );
    };

    const renderSection = (title, count, items, tone) => (
        <section className="credit-alerts-modal__section">
            <div className="credit-alerts-modal__section-header">
                <div className="credit-alerts-modal__section-heading">
                    <span
                        className={`credit-alerts-modal__section-icon credit-alerts-modal__section-icon--${tone}`}
                    >
                        <FontAwesomeIcon
                            icon={
                                tone === "danger"
                                    ? faTriangleExclamation
                                    : faClock
                            }
                        />
                    </span>
                    <div>
                    <h5 className="mb-1">{title}</h5>
                    <small className="text-muted">
                        {count} credito{count === 1 ? "" : "s"}
                    </small>
                    </div>
                </div>
                <span
                    className={`credit-alerts-modal__summary-pill credit-alerts-modal__summary-pill--${tone}`}
                >
                    {count}
                </span>
            </div>

            {items.length > 0 ? (
                <div className="credit-alerts-modal__list">
                    {items.map(renderAlertRow)}
                </div>
            ) : (
                <div className="credit-alerts-modal__empty">
                    No hay creditos {tone === "danger" ? "vencidos" : "por vencer"} en este rango.
                </div>
            )}
        </section>
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered
            contentClassName="creditos-module credit-alerts-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="credit-alerts-modal__title">
                    <span className="credit-alerts-modal__title-icon">
                        <FontAwesomeIcon icon={faFileInvoice} />
                    </span>
                    Alertas de creditos
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="credit-alerts-modal__body">
                <div className="credit-alerts-modal__toolbar">
                    <div>
                        <div className="credit-alerts-modal__toolbar-title">
                            Total de alertas: {totalAlerts}
                        </div>
                        <small className="text-muted">
                            Predeterminado del sistema: {summary.default_alert_days ?? 3} dias
                        </small>
                    </div>
                    <div className="credit-alerts-modal__settings">
                        <Form.Group className="credit-alerts-modal__settings-group">
                            <Form.Label className="mb-1">Dias de alerta</Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                max="30"
                                value={alertDaysInput}
                                onChange={(event) => setAlertDaysInput(event.target.value)}
                            />
                        </Form.Group>
                        <CreditActionButton
                            action="save-alert-days"
                            className="credit-alerts-modal__button"
                            onClick={saveAlertDays}
                            disabled={saving}
                        >
                            {saving ? "Guardando..." : "Guardar"}
                        </CreditActionButton>
                    </div>
                </div>

                {error ? (
                    <div className="alert alert-danger mb-4">{error}</div>
                ) : null}

                {loading ? (
                    <div className="credit-alerts-modal__loading">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <>
                        {renderSection(
                            "Creditos vencidos",
                            Number(summary.overdue_count || 0),
                            overdueAlerts,
                            "danger"
                        )}
                        {renderSection(
                            "Creditos por vencer",
                            Number(summary.upcoming_count || 0),
                            upcomingAlerts,
                            "warning"
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer className="credit-alerts-modal__footer">
                <CreditActionButton
                    action="close-modal"
                    className="credit-alerts-modal__button"
                    onClick={onHide}
                >
                    Cerrar
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
};

export default CreditAlertsModal;
