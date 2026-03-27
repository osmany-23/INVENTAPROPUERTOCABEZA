import React, {
    forwardRef,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import moment from "moment";
import { Modal, Spinner, Table } from "react-bootstrap-v5";
import { useReactToPrint } from "react-to-print";
import apiConfig from "../../config/apiConfig";
import { formatQuantityAuto } from "../../shared/sharedMethod";
import { CreditActionButton } from "./creditHelpers";

const MODAL_PROPS = {
    centered: true,
    dialogClassName: "credits-modal-dialog credits-modal-dialog--print",
    contentClassName: "creditos-module credits-modal-content credits-print-modal",
    backdropClassName: "credits-modal-backdrop",
};

const POS_PAGE_STYLE = `
    @page {
        size: 80mm auto;
        margin: 0;
    }

    html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
`;

const LETTER_PAGE_STYLE = `
    @page {
        size: A4 portrait;
        margin: 12mm;
    }

    html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
`;

const formatDate = (value, fallback = "-") => {
    if (!value) {
        return fallback;
    }

    const parsedValue = moment(value);
    return parsedValue.isValid() ? parsedValue.format("DD/MM/YYYY") : fallback;
};

const formatDateTime = (value, fallback = "-") => {
    if (!value) {
        return fallback;
    }

    const parsedValue = moment(value);
    return parsedValue.isValid()
        ? parsedValue.format("DD/MM/YYYY hh:mm A")
        : fallback;
};

const formatShortDate = (value, fallback = "--/--") => {
    if (!value) {
        return fallback;
    }

    const parsedValue = moment(value);
    return parsedValue.isValid() ? parsedValue.format("DD/MM") : fallback;
};

const normalizeText = (value, fallback = "-") => {
    if (value === null || value === undefined) {
        return fallback;
    }

    const normalizedValue = String(value).trim();
    return normalizedValue !== "" ? normalizedValue : fallback;
};

const CreditPrintableDocument = forwardRef(
    ({ data, format, money }, ref) => {
        if (!data) {
            return null;
        }

        const formatMoneyValue = (value) =>
            typeof money === "function" ? money(value) : String(value ?? "0.00");
        const {
            business = {},
            customer = {},
            credit = {},
            summary = {},
            products = [],
            payments = [],
            footer = {},
        } = data;

        if (format === "pos") {
            return (
                <article
                    ref={ref}
                    className="credit-print-document credit-print-document--pos"
                >
                    <header className="credit-print-pos__header">
                        {business.logo_url ? (
                            <div className="credit-print-pos__logo-wrap">
                                <img
                                    src={business.logo_url}
                                    alt={normalizeText(
                                        business.name,
                                        "AUTO REPUESTOS BRYAN"
                                    )}
                                    className="credit-print-logo credit-print-logo--pos"
                                />
                            </div>
                        ) : null}
                        <div className="credit-print-pos__title">
                            {normalizeText(business.name, "AUTO REPUESTOS BRYAN")}
                        </div>
                        {business.address ? (
                            <div>{normalizeText(business.address, "")}</div>
                        ) : null}
                        {business.phone ? (
                            <div>Tel: {normalizeText(business.phone, "")}</div>
                        ) : null}
                        <div>Impreso: {formatDateTime(business.printed_at)}</div>
                    </header>

                    <section className="credit-print-pos__block">
                        <div className="credit-print-pos__label">CLIENTE</div>
                        <div>{normalizeText(customer.name, "Cliente sin nombre")}</div>
                        {customer.phone ? (
                            <div>
                                Telefono: {normalizeText(customer.phone, "")}
                            </div>
                        ) : null}
                        {customer.code ? (
                            <div>Codigo: {normalizeText(customer.code, "")}</div>
                        ) : null}
                    </section>

                    <section className="credit-print-pos__block">
                        <div className="credit-print-pos__label">CREDITO</div>
                        <div>Numero: {normalizeText(credit.reference_code)}</div>
                        <div>
                            Venta:{" "}
                            {normalizeText(
                                credit.sale_reference_code,
                                "Sin venta asociada"
                            )}
                        </div>
                        <div>
                            Usuario:{" "}
                            {normalizeText(
                                credit.responsible_user_name ||
                                    credit.served_by_name,
                                "No disponible"
                            )}
                        </div>
                        <div>Creado: {formatDate(credit.created_at)}</div>
                        <div>Vence: {formatDate(credit.due_date)}</div>
                        <div>Tipo: {normalizeText(credit.credit_type_label)}</div>
                        <div>
                            Interes: {Number(credit.interest_rate || 0).toFixed(2)}%
                        </div>
                    </section>

                    <section className="credit-print-pos__block">
                        <div className="credit-print-pos__label">RESUMEN</div>
                        <div className="credit-print-pos__line">
                            <span>Total original</span>
                            <strong>
                                {formatMoneyValue(summary.total_original)}
                            </strong>
                        </div>
                        <div className="credit-print-pos__line">
                            <span>Abonado</span>
                            <strong>{formatMoneyValue(summary.total_paid)}</strong>
                        </div>
                        <div className="credit-print-pos__line">
                            <span>Saldo actual</span>
                            <strong>
                                {formatMoneyValue(summary.current_balance)}
                            </strong>
                        </div>
                    </section>

                    {products.length > 0 ? (
                        <section className="credit-print-pos__block">
                            <div className="credit-print-pos__label">
                                PRODUCTOS
                            </div>
                            {products.map((item) => (
                                <div
                                    key={item.id || item.name}
                                    className="credit-print-pos__item"
                                >
                                    <div className="credit-print-pos__item-name">
                                        {normalizeText(item.name, "Producto")}
                                    </div>
                                    <div className="credit-print-pos__line">
                                        <span>
                                            {formatQuantityAuto(item.quantity)} x{" "}
                                            {formatMoneyValue(item.price)}
                                        </span>
                                        <strong>
                                            {formatMoneyValue(item.subtotal)}
                                        </strong>
                                    </div>
                                </div>
                            ))}
                        </section>
                    ) : null}

                    <section className="credit-print-pos__block">
                        <div className="credit-print-pos__label">PAGOS</div>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <div
                                    key={`${payment.id}-${payment.date}`}
                                    className="credit-print-pos__payment"
                                >
                                    <div className="credit-print-pos__line">
                                        <span>{formatShortDate(payment.date)}</span>
                                        <span>
                                            {normalizeText(payment.type_label, "Pago")}
                                        </span>
                                    </div>
                                    <div className="credit-print-pos__line">
                                        <span>
                                            {normalizeText(
                                                payment.method_label,
                                                "Otro"
                                            )}
                                        </span>
                                        <strong>{formatMoneyValue(payment.amount)}</strong>
                                    </div>
                                    <div className="credit-print-pos__payment-balance">
                                        Saldo:{" "}
                                        {formatMoneyValue(payment.remaining_balance)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="credit-print-pos__empty">
                                Sin pagos registrados.
                            </div>
                        )}
                    </section>

                    <footer className="credit-print-pos__footer">
                        <div>
                            {normalizeText(
                                footer.thank_you_message,
                                "Gracias por su preferencia"
                            )}
                        </div>
                        <div>
                            {normalizeText(
                                footer.note,
                                "Este documento refleja el estado actual del credito"
                            )}
                        </div>
                    </footer>
                </article>
            );
        }

        return (
            <article
                ref={ref}
                className="credit-print-document credit-print-document--letter"
            >
                <header className="credit-print-letter__header">
                    <div className="credit-print-letter__brand">
                        {business.logo_url ? (
                            <img
                                src={business.logo_url}
                                alt={normalizeText(
                                    business.name,
                                    "AUTO REPUESTOS BRYAN"
                                )}
                                className="credit-print-logo credit-print-logo--letter"
                            />
                        ) : null}
                        <div className="credit-print-letter__eyebrow">
                            Estado de credito
                        </div>
                        <h1 className="credit-print-letter__title">
                            {normalizeText(business.name, "AUTO REPUESTOS BRYAN")}
                        </h1>
                        {business.address ? (
                            <div className="credit-print-letter__meta">
                                {normalizeText(business.address, "")}
                            </div>
                        ) : null}
                        {business.phone ? (
                            <div className="credit-print-letter__meta">
                                Tel: {normalizeText(business.phone, "")}
                            </div>
                        ) : null}
                    </div>
                    <div className="credit-print-letter__header-card">
                        <div>
                            <strong>Credito</strong>
                            <span>{normalizeText(credit.reference_code)}</span>
                        </div>
                        <div>
                            <strong>Impreso</strong>
                            <span>{formatDateTime(business.printed_at)}</span>
                        </div>
                        <div>
                            <strong>Estado</strong>
                            <span>{normalizeText(credit.status_label)}</span>
                        </div>
                    </div>
                </header>

                <section className="credit-print-letter__grid">
                    <div className="credit-print-letter__panel">
                        <h2>Datos del cliente</h2>
                        <div className="credit-print-letter__panel-grid">
                            <div>
                                <strong>Nombre</strong>
                                <span>
                                    {normalizeText(
                                        customer.name,
                                        "Cliente sin nombre"
                                    )}
                                </span>
                            </div>
                            <div>
                                <strong>Telefono</strong>
                                <span>
                                    {normalizeText(
                                        customer.phone,
                                        "No disponible"
                                    )}
                                </span>
                            </div>
                            {customer.code ? (
                                <div>
                                    <strong>Codigo</strong>
                                    <span>{normalizeText(customer.code, "")}</span>
                                </div>
                            ) : null}
                            {customer.address ? (
                                <div>
                                    <strong>Direccion</strong>
                                    <span>{normalizeText(customer.address, "")}</span>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="credit-print-letter__panel">
                        <h2>Datos del credito</h2>
                        <div className="credit-print-letter__panel-grid">
                            <div>
                                <strong>Numero</strong>
                                <span>{normalizeText(credit.reference_code)}</span>
                            </div>
                            <div>
                                <strong>Fecha de creacion</strong>
                                <span>{formatDate(credit.created_at)}</span>
                            </div>
                            <div>
                                <strong>Fecha de inicio</strong>
                                <span>{formatDate(credit.start_date)}</span>
                            </div>
                            <div>
                                <strong>Fecha de vencimiento</strong>
                                <span>{formatDate(credit.due_date)}</span>
                            </div>
                            <div>
                                <strong>Codigo de venta asociada</strong>
                                <span>
                                    {normalizeText(
                                        credit.sale_reference_code,
                                        "Sin venta asociada"
                                    )}
                                </span>
                            </div>
                            <div>
                                <strong>Usuario que otorgo el credito</strong>
                                <span>
                                    {normalizeText(
                                        credit.responsible_user_name ||
                                            credit.served_by_name,
                                        "No disponible"
                                    )}
                                </span>
                            </div>
                            <div>
                                <strong>Tipo</strong>
                                <span>
                                    {normalizeText(
                                        credit.credit_type_label,
                                        "Automatico"
                                    )}
                                </span>
                            </div>
                            <div>
                                <strong>Interes aplicado</strong>
                                <span>
                                    {Number(credit.interest_rate || 0).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="credit-print-letter__summary">
                    <div className="credit-print-letter__summary-card">
                        <span>Total original</span>
                        <strong>{formatMoneyValue(summary.total_original)}</strong>
                    </div>
                    <div className="credit-print-letter__summary-card">
                        <span>Total abonado</span>
                        <strong>{formatMoneyValue(summary.total_paid)}</strong>
                    </div>
                    <div className="credit-print-letter__summary-card">
                        <span>Saldo actual</span>
                        <strong>
                            {formatMoneyValue(summary.current_balance)}
                        </strong>
                    </div>
                </section>

                {products.length > 0 ? (
                    <section className="credit-print-letter__section">
                        <h2>Productos asociados</h2>
                        <Table className="credit-print-table" bordered>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => (
                                    <tr key={item.id || item.name}>
                                        <td>{normalizeText(item.name, "Producto")}</td>
                                        <td>{formatQuantityAuto(item.quantity)}</td>
                                        <td>{formatMoneyValue(item.price)}</td>
                                        <td>{formatMoneyValue(item.subtotal)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </section>
                ) : null}

                <section className="credit-print-letter__section">
                    <h2>Historial de pagos</h2>
                    <Table className="credit-print-table" bordered>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                                <th>Metodo</th>
                                <th>Saldo restante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={`${payment.id}-${payment.date}`}>
                                        <td>{formatDateTime(payment.date)}</td>
                                        <td>
                                            {normalizeText(payment.type_label, "Pago")}
                                        </td>
                                        <td>{formatMoneyValue(payment.amount)}</td>
                                        <td>
                                            {normalizeText(
                                                payment.method_label,
                                                "Otro"
                                            )}
                                        </td>
                                        <td>
                                            {formatMoneyValue(
                                                payment.remaining_balance
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="credit-print-table__empty">
                                            Este credito aun no registra pagos.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </section>

                <footer className="credit-print-letter__footer">
                    <div>
                        {normalizeText(
                            footer.thank_you_message,
                            "Gracias por su preferencia"
                        )}
                    </div>
                    <div>
                        {normalizeText(
                            footer.note,
                            "Este documento refleja el estado actual del credito"
                        )}
                    </div>
                </footer>
            </article>
        );
    }
);

const CreditPrintPreviewModal = ({ show, onHide, creditId, money }) => {
    const previewRef = useRef(null);
    const [selectedFormat, setSelectedFormat] = useState("letter");
    const [printableState, setPrintableState] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPrintableState = useCallback(async () => {
        if (!creditId) {
            return;
        }

        setLoading(true);
        setError("");
        setPrintableState(null);

        try {
            const response = await apiConfig.get(
                `/creditos/${creditId}/estado-imprimible`
            );
            setPrintableState(response?.data?.data || null);
        } catch (fetchError) {
            setPrintableState(null);
            setError(
                fetchError?.response?.data?.message ||
                    "No se pudo cargar el estado imprimible del credito."
            );
        } finally {
            setLoading(false);
        }
    }, [creditId]);

    useEffect(() => {
        if (!show || !creditId) {
            return;
        }

        setSelectedFormat("letter");
        fetchPrintableState();
    }, [creditId, fetchPrintableState, show]);

    useEffect(() => {
        if (show) {
            return;
        }

        setSelectedFormat("letter");
        setPrintableState(null);
        setError("");
        setLoading(false);
    }, [show]);

    const handlePrint = useReactToPrint({
        content: () => previewRef.current,
        documentTitle:
            printableState?.credit?.reference_code &&
            printableState?.customer?.name
                ? `estado-${printableState.credit.reference_code}-${printableState.customer.name}`
                : `estado-credito-${creditId || "preview"}`,
        pageStyle:
            selectedFormat === "pos" ? POS_PAGE_STYLE : LETTER_PAGE_STYLE,
    });

    return (
        <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Imprimir estado de credito</Modal.Title>
            </Modal.Header>
            <Modal.Body className="credits-print-modal__body">
                <div className="credits-print-modal__toolbar">
                    <div className="credits-print-modal__format-switch">
                        <CreditActionButton
                            action="view-credit"
                            tone={selectedFormat === "pos" ? "primary" : "neutral"}
                            onClick={() => setSelectedFormat("pos")}
                        >
                            POS
                        </CreditActionButton>
                        <CreditActionButton
                            action="view-credit"
                            tone={
                                selectedFormat === "letter"
                                    ? "primary"
                                    : "neutral"
                            }
                            onClick={() => setSelectedFormat("letter")}
                        >
                            CARTA
                        </CreditActionButton>
                    </div>
                    <div className="credits-print-modal__meta">
                        {printableState?.credit?.reference_code
                            ? `Vista previa ${printableState.credit.reference_code}`
                            : "Vista previa del documento"}
                    </div>
                </div>

                {loading ? (
                    <div className="credits-print-modal__loading">
                        <Spinner animation="border" />
                        <span>Cargando estado imprimible...</span>
                    </div>
                ) : error ? (
                    <div className="credits-print-modal__error">
                        <div className="alert alert-danger mb-3">{error}</div>
                        <CreditActionButton
                            action="view-credit"
                            onClick={fetchPrintableState}
                        >
                            Reintentar
                        </CreditActionButton>
                    </div>
                ) : printableState ? (
                    <div
                        className={`credits-print-preview-shell credits-print-preview-shell--${selectedFormat}`}
                    >
                        <CreditPrintableDocument
                            ref={previewRef}
                            data={printableState}
                            format={selectedFormat}
                            money={money}
                        />
                    </div>
                ) : null}
            </Modal.Body>
            <Modal.Footer className="credits-print-modal__footer">
                <CreditActionButton action="close-modal" onClick={onHide}>
                    Cerrar
                </CreditActionButton>
                <CreditActionButton
                    action="view-credit"
                    onClick={handlePrint}
                    disabled={loading || !printableState}
                >
                    {selectedFormat === "pos"
                        ? "Imprimir ticket"
                        : "Imprimir carta"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
};

export default CreditPrintPreviewModal;
