import React from "react";
import { Button, ProgressBar } from "react-bootstrap-v5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faCoins,
    faCreditCard,
    faLandmark,
    faTriangleExclamation,
    faUser,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";

export const DEFAULT_CONFIG_FORM = {
    customer_id: null,
    credit_limit: "0.00",
    interest_rate: "0.00",
    max_installments: "1",
    status: "activo",
};

export const DEFAULT_MANUAL_FORM = {
    customer_id: null,
    warehouse_id: null,
    product_search: "",
    total_amount: "0.00",
    interest_rate: "0.00",
    installments: "1",
    start_date: "",
    due_date: "",
    note: "",
    items: [],
};

export const DEFAULT_PAYMENT_FORM = {
    amount: "",
    payment_type: "1",
    note: "",
};

export const DEFAULT_RETURN_FORM = {
    quantities: {},
    note: "",
};

export const DEFAULT_EDIT_CREDIT_FORM = {
    credit_type: "automatico",
    installments: "1",
    interest_rate: "0.00",
    start_date: "",
    due_date: "",
    note: "",
    confirm: false,
};

export const DEFAULT_RESTRUCTURE_CREDIT_FORM = {
    credit_type: "automatico",
    installments: "1",
    interest_rate: "0.00",
    start_date: "",
    due_date: "",
    note: "",
    reason: "",
    confirm: false,
};

export const createManualCreditItem = () => ({
    product_id: "",
    quantity: "1",
});

const joinClassNames = (...classNames) =>
    classNames.filter(Boolean).join(" ");

const CREDIT_BUTTON_TONE_BY_ACTION = {
    "apply-restructure": "warning",
    "cancel-modal": "neutral",
    "close-modal": "neutral",
    "configure-customer": "primary",
    "create-credit": "success",
    "create-manual-credit": "success",
    "edit-config": "primary",
    "edit-credit": "primary",
    "manual-qty": "neutral",
    "page-current": "primary",
    "page-nav": "neutral",
    "register-payment": "success",
    "register-return": "danger",
    "remove-manual-item": "danger",
    "restructure-credit": "warning",
    "save-alert-days": "primary",
    "save-config": "primary",
    "save-credit-edit": "primary",
    section: "neutral",
    "view-credit": "primary",
};

const CREDIT_BUTTON_TONE_CLASS = {
    danger: "credits-action-btn--danger",
    neutral: "credits-action-btn--neutral",
    primary: "credits-action-btn--primary",
    success: "credits-action-btn--success",
    warning: "credits-action-btn--warning",
};

export const getCreditActionTone = (action, tone) =>
    tone || CREDIT_BUTTON_TONE_BY_ACTION[action] || "primary";

export const getCreditActionClassName = ({
    action,
    tone,
    className = "",
    icon = false,
} = {}) =>
    joinClassNames(
        "credits-action-btn",
        CREDIT_BUTTON_TONE_CLASS[getCreditActionTone(action, tone)],
        icon ? "credits-action-btn--icon" : "",
        className
    );

export const CreditActionButton = React.memo(
    ({ action, tone, className = "", icon = false, variant, ...props }) => (
        <Button
            variant={variant || "light"}
            className={getCreditActionClassName({
                action,
                tone,
                className,
                icon,
            })}
            {...props}
        />
    )
);

const clampPercent = (value) => {
    const safeValue = Number.isFinite(value) ? value : 0;
    return Math.max(0, Math.min(100, safeValue));
};

const safeText = (value, fallback = "-") => {
    if (value === null || value === undefined) {
        return fallback;
    }

    const trimmedValue = String(value).trim();
    return trimmedValue === "" || trimmedValue === "undefined"
        ? fallback
        : trimmedValue;
};

const getUsagePercent = (used, limit) => {
    const safeLimit = Number(limit || 0);
    if (safeLimit <= 0) {
        return 0;
    }

    return clampPercent((Number(used || 0) / safeLimit) * 100);
};

const getCollectionPercent = (paid, total) => {
    const safeTotal = Number(total || 0);
    if (safeTotal <= 0) {
        return 0;
    }

    return clampPercent((Number(paid || 0) / safeTotal) * 100);
};

const normalizeStatus = (status) => String(status || "").toLowerCase();

const getProgressVariant = (percent, status) => {
    const normalizedStatus = normalizeStatus(status);

    if (normalizedStatus === "pagado" || percent >= 100) {
        return "success";
    }

    if (normalizedStatus === "vencido" || normalizedStatus === "atrasado") {
        return "danger";
    }

    if (normalizedStatus === "parcial") {
        return "warning";
    }

    if (percent >= 90) {
        return "danger";
    }

    return "primary";
};

const tooltipId = (text) =>
    `credits-tooltip-${String(text || "item")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`;

export const TooltipWrap = React.memo(
    ({ text, children, placement = "top", block = false }) => {
        if (!text) {
            return children;
        }

        const WrapperTag = block ? "div" : "span";

        return (
            <WrapperTag
                className={`credits-tooltip-trigger${
                    block ? " credits-tooltip-trigger--block" : ""
                }`}
                title={text}
                aria-label={text}
            >
                {children}
            </WrapperTag>
        );
    }
);

const iconMap = {
    balance: faWallet,
    capital: faLandmark,
    overdue: faTriangleExclamation,
    interest: faCoins,
    credit: faCreditCard,
    customer: faUser,
    paid: faCircleCheck,
};

const iconToneMap = {
    balance: "credit",
    capital: "usage",
    overdue: "alert",
    interest: "positive",
    credit: "credit",
    customer: "credit",
    paid: "positive",
};

const CardIcon = React.memo(({ icon }) => {
    const resolvedIcon = iconMap[icon] || faCreditCard;
    const tone = iconToneMap[icon] || "credit";

    return (
        <span
            className={`credits-card-icon credits-card-icon--${tone}`}
            aria-hidden="true"
        >
            <FontAwesomeIcon icon={resolvedIcon} />
        </span>
    );
});

const StatusDot = () => <span className="credits-status-dot" />;

const MetricItem = React.memo(
    ({ label, value, highlight = false, tooltip, tone = "default" }) => {
        const content = (
            <div
                className={`credits-metric${
                    highlight ? " credits-metric--highlight" : ""
                } credits-metric--${tone}`}
            >
                <span>{label}</span>
                <strong>{safeText(value, "0.00")}</strong>
            </div>
        );

        return (
            <TooltipWrap text={tooltip} block>
                {content}
            </TooltipWrap>
        );
    }
);

const ProgressBlock = React.memo(
    ({
        label,
        percent,
        variant,
        caption,
        tooltip,
        moneySummary,
        tone = "default",
    }) => (
        <TooltipWrap
            text={tooltip || moneySummary || "Indicador de progreso del credito"}
            block
        >
            <div
                className={`credits-progress-block credits-progress-block--${tone}`}
            >
                <div className="credits-progress-heading">
                    <span>{label}</span>
                    <strong>{Math.round(percent)}%</strong>
                </div>
                <ProgressBar
                    now={percent}
                    variant={variant}
                    className="credits-progress"
                />
                {caption ? (
                    <div className="credits-progress-caption">{caption}</div>
                ) : null}
            </div>
        </TooltipWrap>
    )
);

export const EmptyStateCard = React.memo(({ text }) => (
    <div className="credits-empty credits-empty-card">{text}</div>
));

export const CreditCardSkeleton = React.memo(() => (
    <article className="credits-record-card credits-record-card--skeleton" aria-hidden="true">
        <div className="credits-skeleton credits-skeleton--title" />
        <div className="credits-skeleton credits-skeleton--subtitle" />
        <div className="credits-record-grid">
            <div className="credits-skeleton credits-skeleton--metric" />
            <div className="credits-skeleton credits-skeleton--metric" />
            <div className="credits-skeleton credits-skeleton--metric" />
            <div className="credits-skeleton credits-skeleton--metric" />
        </div>
        <div className="credits-skeleton credits-skeleton--progress" />
        <div className="credits-skeleton credits-skeleton--actions" />
    </article>
));

export const SECTION_OPTIONS = [
    {
        id: "credits",
        label: "Creditos",
        tooltip: "Vista general de todos los creditos registrados",
    },
    {
        id: "customers",
        label: "Clientes con credito",
        tooltip: "Clientes con limite y condiciones de credito configuradas",
    },
    {
        id: "overdue",
        label: "Morosos",
        tooltip: "Clientes con creditos vencidos o atrasados",
    },
    {
        id: "interest",
        label: "Intereses",
        tooltip: "Seguimiento de interes proyectado, cobrado y pendiente",
    },
];

export const PAYMENT_METHOD_OPTIONS = [
    { value: "1", label: "Efectivo" },
    { value: "2", label: "Cheque" },
    { value: "3", label: "Transferencia" },
    { value: "4", label: "Otro" },
];

export const STATUS_FILTER_OPTIONS = [
    { value: "", label: "Todos" },
    { value: "pendiente", label: "Pendiente" },
    { value: "parcial", label: "Parcial" },
    { value: "pagado", label: "Pagado" },
    { value: "vencido", label: "Vencido" },
];

export const CREDIT_TYPE_OPTIONS = [
    { value: "automatico", label: "Automatico" },
    { value: "manual", label: "Manual" },
    { value: "libre", label: "Libre" },
];

export const getCreditTypeLabel = (creditType) =>
    CREDIT_TYPE_OPTIONS.find((option) => option.value === creditType)?.label ||
    "Automatico";

export const SummaryCard = React.memo(({ label, value, icon, tooltip }) => (
    <div className="card credits-summary-card credits-interactive-card">
        <div className="card-body">
            <CardIcon icon={icon} />
            <TooltipWrap text={tooltip} block>
                <div className="credits-summary-content">
                    <div className="credits-summary-label mb-2">{label}</div>
                    <div className="credits-summary-value">
                        {safeText(value, "0.00")}
                    </div>
                </div>
            </TooltipWrap>
        </div>
    </div>
));

export const StatusBadge = React.memo(({ status }) => {
    const normalizedStatus = normalizeStatus(status);

    return (
        <span
            className={`credits-status-badge credits-status-badge--${normalizedStatus}`}
        >
            <StatusDot />
            {normalizedStatus || "sin estado"}
        </span>
    );
});

export const CreditCard = React.memo(
    ({ row, money, onView, onPay, onEdit, onRestructure }) => {
    const normalizedStatus = normalizeStatus(row.status);
    const recoveredAmount = Number(row.recovered_amount ?? row.paid_total ?? 0);
    const collectionTarget = Number(
        row.collection_target_amount ?? row.total_with_interest ?? 0
    );
    const collectionPercent = getCollectionPercent(
        recoveredAmount,
        collectionTarget
    );

    return (
        <article
            className={`credits-record-card credits-record-card--${normalizedStatus}`}
        >
            <CardIcon
                icon={normalizedStatus === "pagado" ? "paid" : "credit"}
            />
            <div className="credits-record-card__header">
                <div>
                    <div className="credits-record-eyebrow">
                        Credito #{safeText(row.id, "0")}
                    </div>
                    <h3 className="credits-record-title">
                        {safeText(row.customer_name, "Cliente sin nombre")}
                    </h3>
                    <div className="credits-record-subtitle">
                        <span>{safeText(row.customer_phone, "Sin telefono")}</span>
                        <span>
                            {safeText(row.sale_reference_code, "Venta manual")}
                        </span>
                    </div>
                </div>
                <StatusBadge status={row.status} />
            </div>

            <div className="credits-record-grid">
                <MetricItem
                    label="Total original"
                    value={money(row.original_total_amount || row.total_amount)}
                    tooltip="Monto original de la venta antes de descontar el pago inicial"
                />
                <MetricItem
                    label="Saldo actual"
                    value={money(row.balance)}
                    highlight
                    tone="available"
                    tooltip="Monto pendiente por pagar en este credito"
                />
                <MetricItem
                    label="Recuperado"
                    value={money(recoveredAmount)}
                    tooltip="Total cobrado del credito incluyendo el pago inicial cuando exista"
                />
                <MetricItem
                    label="Vence"
                    value={safeText(row.due_date)}
                    tooltip="Fecha limite de pago del credito"
                />
            </div>

            <ProgressBlock
                label="Recuperado"
                percent={collectionPercent}
                variant={getProgressVariant(collectionPercent, row.status)}
                caption={`Recuperado ${money(recoveredAmount)}`}
                tooltip={`Porcentaje recuperado del credito. Recuperado: ${money(
                    recoveredAmount
                )} / Objetivo: ${money(collectionTarget)}`}
            />

            <div className="credits-card-meta">
                <span className="credits-card-pill">
                    {safeText(row.installments, "0")} cuotas
                </span>
                <span className="credits-card-pill">
                    {getCreditTypeLabel(row.credit_type)}
                </span>
                <span className="credits-card-pill">
                    Interes {Number(row.interest_rate || 0).toFixed(2)}%
                </span>
            </div>

            <div className="credits-card-actions">
                <TooltipWrap text="Ver detalle completo del credito">
                    <CreditActionButton
                        action="view-credit"
                        size="sm"
                        onClick={() => onView(row.id)}
                    >
                        Ver detalle
                    </CreditActionButton>
                </TooltipWrap>
                {row.can_edit_directly ? (
                    <TooltipWrap text="Actualizar cuotas, fechas o tipo de credito sin alterar pagos">
                        <CreditActionButton
                            action="edit-credit"
                            size="sm"
                            onClick={() => onEdit(row.id)}
                        >
                            Editar credito
                        </CreditActionButton>
                    </TooltipWrap>
                ) : null}
                {!row.can_edit_directly && row.can_restructure ? (
                    <TooltipWrap text="Crear un nuevo plan sobre el saldo pendiente y conservar historial">
                        <CreditActionButton
                            action="restructure-credit"
                            size="sm"
                            onClick={() => onRestructure(row.id)}
                        >
                            Reestructurar
                        </CreditActionButton>
                    </TooltipWrap>
                ) : null}
                {Number(row.balance) > 0 ? (
                    <TooltipWrap text="Registrar un abono o pago sobre este credito">
                        <CreditActionButton
                            action="register-payment"
                            size="sm"
                            onClick={() => onPay(row.id)}
                        >
                            Registrar pago
                        </CreditActionButton>
                    </TooltipWrap>
                ) : null}
            </div>
        </article>
    );
    }
);

export const CustomerCreditCard = React.memo(({ row, money, onEdit }) => {
    const normalizedStatus = normalizeStatus(row.status);
    const usagePercent = getUsagePercent(row.used, row.credit_limit);

    return (
        <article
            className={`credits-record-card credits-record-card--${normalizedStatus}`}
        >
            <CardIcon icon="customer" />
            <div className="credits-record-card__header">
                <div>
                    <div className="credits-record-eyebrow">
                        Cliente con credito
                    </div>
                    <h3 className="credits-record-title">
                        {safeText(row.customer_name, "Cliente sin nombre")}
                    </h3>
                    <div className="credits-record-subtitle">
                        <span>{safeText(row.customer_phone, "Sin telefono")}</span>
                        <span>
                            Maximo {safeText(row.max_installments, "0")} cuotas
                        </span>
                    </div>
                </div>
                <StatusBadge status={row.status} />
            </div>

            <div className="credits-record-grid">
                <MetricItem
                    label="Limite"
                    value={money(row.credit_limit)}
                    tone="usage"
                    tooltip="Monto maximo autorizado para este cliente"
                />
                <MetricItem
                    label="Usado"
                    value={money(row.used)}
                    tone="usage"
                    tooltip="Monto del limite actualmente comprometido"
                />
                <MetricItem
                    label="Disponible"
                    value={money(row.available)}
                    highlight
                    tone="available"
                    tooltip="Monto disponible para nuevas ventas a credito"
                />
                <MetricItem
                    label="Interes"
                    value={`${Number(row.interest_rate || 0).toFixed(2)}%`}
                    tooltip="Porcentaje de interes aplicado por defecto"
                />
            </div>

            <ProgressBlock
                label="Uso de linea"
                percent={usagePercent}
                variant="primary"
                tone="usage"
                caption="Limite estricto"
                tooltip={`Porcentaje utilizado del limite de credito. Usado: ${money(
                    row.used || 0
                )} / Limite: ${money(row.credit_limit || 0)}`}
            />

            <div className="credits-card-meta">
                <span className="credits-card-pill">
                    Moroso {money(row.overdue_balance || 0)}
                </span>
                <span className="credits-card-pill">
                    Actualizado {safeText(row.updated_at)}
                </span>
            </div>

            <div className="credits-card-actions">
                <TooltipWrap text="Editar limite de credito, interes y condiciones del cliente">
                    <CreditActionButton
                        action="edit-config"
                        size="sm"
                        onClick={() => onEdit(row)}
                    >
                        Editar configuracion
                    </CreditActionButton>
                </TooltipWrap>
            </div>
        </article>
    );
});

export const OverdueCustomerCard = React.memo(({ row, money }) => (
    <article className="credits-record-card credits-record-card--vencido">
        <CardIcon icon="overdue" />
        <div className="credits-record-card__header">
            <div>
                <div className="credits-record-eyebrow">Cliente moroso</div>
                <h3 className="credits-record-title">
                    {safeText(row.customer_name, "Cliente sin nombre")}
                </h3>
                <div className="credits-record-subtitle">
                    <span>{safeText(row.customer_phone, "Sin telefono")}</span>
                    <span>
                        {safeText(row.overdue_credits, "0")} creditos vencidos
                    </span>
                </div>
            </div>
            <StatusBadge status="vencido" />
        </div>

        <div className="credits-record-grid">
            <MetricItem
                label="Saldo vencido"
                value={money(row.overdue_balance)}
                highlight
                tone="alert"
                tooltip="Monto total vencido pendiente de cobro"
            />
            <MetricItem
                label="Primer vencimiento"
                value={safeText(row.oldest_due_date)}
                tooltip="Fecha del vencimiento mas antiguo del cliente"
            />
        </div>
    </article>
));

export const InterestCard = React.memo(({ row, money }) => {
    const normalizedStatus = normalizeStatus(row.status);
    const collectionPercent = getCollectionPercent(
        row.collected_interest,
        row.planned_interest
    );

    return (
        <article
            className={`credits-record-card credits-record-card--${normalizedStatus}`}
        >
            <CardIcon
                icon={normalizedStatus === "pagado" ? "paid" : "interest"}
            />
            <div className="credits-record-card__header">
                <div>
                    <div className="credits-record-eyebrow">
                        Interes de credito #{safeText(row.credit_id, "0")}
                    </div>
                    <h3 className="credits-record-title">
                        {safeText(row.customer_name, "Cliente sin nombre")}
                    </h3>
                </div>
                <StatusBadge status={row.status} />
            </div>

            <div className="credits-record-grid">
                <MetricItem
                    label="Proyectado"
                    value={money(row.planned_interest)}
                    tooltip="Interes total estimado para este credito"
                />
                <MetricItem
                    label="Cobrado"
                    value={money(row.collected_interest)}
                    highlight
                    tooltip="Interes ya cobrado al cliente"
                />
                <MetricItem
                    label="Pendiente"
                    value={money(row.pending_interest)}
                    tooltip="Interes aun no cobrado"
                />
            </div>

            <ProgressBlock
                label="Cobro de interes"
                percent={collectionPercent}
                variant={getProgressVariant(collectionPercent, row.status)}
                caption={`Pendiente ${money(row.pending_interest)}`}
                tooltip={`Cobro de interes acumulado. Cobrado: ${money(
                    row.collected_interest || 0
                )} / Proyectado: ${money(row.planned_interest || 0)}`}
            />
        </article>
    );
});

export const SectionButtons = React.memo(
    ({ activeSection, setActiveSection }) => (
        <div className="d-flex flex-nowrap credits-sections">
            {SECTION_OPTIONS.map((section) => (
                <TooltipWrap
                    key={section.id}
                    text={section.tooltip}
                    placement="bottom"
                >
                    <CreditActionButton
                        action="section"
                        tone={
                            activeSection === section.id ? "primary" : "neutral"
                        }
                        onClick={() => setActiveSection(section.id)}
                    >
                        {section.label}
                    </CreditActionButton>
                </TooltipWrap>
            ))}
        </div>
    )
);
