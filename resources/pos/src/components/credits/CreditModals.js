import React from "react";
import moment from "moment";
import {
    Col,
    Form,
    InputGroup,
    Modal,
    Row,
    Spinner,
    Table,
} from "react-bootstrap-v5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBarcode,
    faMinus,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ReactSelect from "../../shared/select/reactSelect";
import { parseNumber } from "../../shared/sharedMethod";
import {
    CREDIT_TYPE_OPTIONS,
    CreditActionButton,
    PAYMENT_METHOD_OPTIONS,
    StatusBadge,
    getCreditActionClassName,
    getCreditTypeLabel,
} from "./creditHelpers";

const MODAL_PROPS = {
    centered: true,
    dialogClassName: "credits-modal-dialog",
    contentClassName: "creditos-module credits-modal-content",
    backdropClassName: "credits-modal-backdrop",
};

const formatHistoryDateTime = (value) => {
    if (!value) {
        return "-";
    }

    const parsedValue = moment(value);

    if (!parsedValue.isValid()) {
        return value;
    }

    return parsedValue.format("YYYY-MM-DD hh:mm A");
};

const TableBox = React.memo(({ headers, rows, emptyText }) => (
    <div className="credits-table-wrapper">
        <div className="table-responsive">
            <Table hover className="align-middle credits-table">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.length > 0 ? (
                        rows
                    ) : (
                        <tr>
                            <td colSpan={headers.length}>
                                <div className="credits-empty">{emptyText}</div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    </div>
));

const ModalLoading = React.memo(() => (
    <div className="credits-modal-loading">
        <Spinner animation="border" />
    </div>
));

const useDeferredModalContent = (show, ready = true) => {
    const [shouldRenderContent, setShouldRenderContent] = React.useState(false);

    React.useEffect(() => {
        if (!show || !ready) {
            setShouldRenderContent(false);
            return undefined;
        }

        let frameId = 0;
        frameId = window.requestAnimationFrame(() => {
            setShouldRenderContent(true);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
        };
    }, [ready, show]);

    // Avoid rendering stale modal bodies during the close frame after detail data
    // has already been cleared from parent state.
    return show && ready && shouldRenderContent;
};

const toFiniteNumber = (value, fallback = 0) => {
    const parsed = parseNumber(value, fallback);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeInstallments = (form) => {
    if (form?.credit_type === "libre") {
        return 1;
    }

    const safeInstallments = Math.trunc(toFiniteNumber(form?.installments, 1));
    return safeInstallments > 0 ? safeInstallments : 1;
};

const resolveInstallmentsCount = (creditDetail) => {
    if (creditDetail?.credit_type === "libre") {
        return 1;
    }

    if (Number.isFinite(Number(creditDetail?.installments_count))) {
        return Number(creditDetail.installments_count);
    }

    if (Array.isArray(creditDetail?.installments)) {
        return creditDetail.installments.length || 1;
    }

    return Number(creditDetail?.installments || 1) || 1;
};

const estimatePlannedTotal = (baseAmount, interestRate) => {
    const safeBase = toFiniteNumber(baseAmount, 0);
    const safeInterest = toFiniteNumber(interestRate, 0);

    return safeBase + (safeBase * safeInterest) / 100;
};

const InlineError = ({ text }) =>
    text ? <div className="text-danger mt-2">{text}</div> : null;

const CreditTermsSummary = ({
    creditDetail,
    form,
    money,
    title,
    description,
    isRestructure = false,
}) => {
    const baseAmount = isRestructure
        ? toFiniteNumber(creditDetail?.balance, 0)
        : toFiniteNumber(creditDetail?.total_amount, 0);
    const installments = normalizeInstallments(form);
    const estimatedTotal = estimatePlannedTotal(baseAmount, form.interest_rate);

    return (
        <div className="credits-form-panel credits-form-panel--accent">
            <div className="credits-form-panel__title">{title}</div>
            <div className="credits-form-panel__subtitle">{description}</div>
            <div className="credits-detail-grid credits-detail-grid--dense">
                <div className="credits-detail-item">
                    <strong>Base a recalcular</strong>
                    <span>{money(baseAmount)}</span>
                </div>
                <div className="credits-detail-item">
                    <strong>Tipo nuevo</strong>
                    <span>{getCreditTypeLabel(form.credit_type)}</span>
                </div>
                <div className="credits-detail-item">
                    <strong>Cuotas nuevas</strong>
                    <span>{String(installments)}</span>
                </div>
                <div className="credits-detail-item">
                    <strong>Total estimado</strong>
                    <span>{money(estimatedTotal)}</span>
                </div>
                <div className="credits-detail-item">
                    <strong>Inicio</strong>
                    <span>{form.start_date || "-"}</span>
                </div>
                <div className="credits-detail-item">
                    <strong>Vencimiento</strong>
                    <span>{form.due_date || "-"}</span>
                </div>
            </div>
            <div className="credits-info-banner credits-info-banner--primary mt-4">
                {isRestructure
                    ? "Los pagos previos se conservan en historial y se generara un nuevo plan sobre el saldo pendiente."
                    : "La edicion directa solo ajusta terminos del credito sin tocar pagos ni historial."}
            </div>
        </div>
    );
};

const CreditTermsFields = ({
    form,
    setForm,
    errors,
    confirmLabel,
    isRestructure = false,
}) => (
    <div className="credits-form-panel">
        <Row className="g-4">
            <Col md={4}>
                <Form.Label>Tipo de credito</Form.Label>
                <Form.Select
                    className="credits-form-control"
                    value={form.credit_type}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            credit_type: event.target.value,
                            installments:
                                event.target.value === "libre"
                                    ? "1"
                                    : prev.installments,
                        }))
                    }
                >
                    {CREDIT_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Select>
            </Col>
            <Col md={4}>
                <Form.Label>Numero de cuotas</Form.Label>
                <Form.Control
                    className="credits-form-control"
                    type="number"
                    min="1"
                    step="1"
                    disabled={form.credit_type === "libre"}
                    value={
                        form.credit_type === "libre" ? "1" : form.installments
                    }
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            installments: event.target.value,
                        }))
                    }
                />
                <InlineError text={errors.installments} />
            </Col>
            <Col md={4}>
                <Form.Label>Interes (%)</Form.Label>
                <Form.Control
                    className="credits-form-control"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.interest_rate}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            interest_rate: event.target.value,
                        }))
                    }
                />
                <InlineError text={errors.interest_rate} />
            </Col>
            <Col md={6}>
                <Form.Label>Fecha inicial</Form.Label>
                <Form.Control
                    className="credits-form-control"
                    type="date"
                    value={form.start_date}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            start_date: event.target.value,
                        }))
                    }
                />
                <InlineError text={errors.start_date} />
            </Col>
            <Col md={6}>
                <Form.Label>Fecha de vencimiento</Form.Label>
                <Form.Control
                    className="credits-form-control"
                    type="date"
                    value={form.due_date}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            due_date: event.target.value,
                        }))
                    }
                />
                <InlineError text={errors.due_date} />
            </Col>
            <Col md={12}>
                <Form.Label>Nota</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    className="credits-form-control"
                    value={form.note}
                    onChange={(event) =>
                        setForm((prev) => ({
                            ...prev,
                            note: event.target.value,
                        }))
                    }
                />
            </Col>
            {isRestructure ? (
                <Col md={12}>
                    <Form.Label>Motivo de reestructuracion</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        className="credits-form-control"
                        value={form.reason}
                        onChange={(event) =>
                            setForm((prev) => ({
                                ...prev,
                                reason: event.target.value,
                            }))
                        }
                    />
                    <InlineError text={errors.reason} />
                </Col>
            ) : null}
            <Col md={12}>
                <div className="credits-check-field">
                    <Form.Check
                        label={confirmLabel}
                        checked={form.confirm}
                        onChange={(event) =>
                            setForm((prev) => ({
                                ...prev,
                                confirm: event.target.checked,
                            }))
                        }
                    />
                </div>
                <InlineError text={errors.confirm} />
            </Col>
        </Row>
    </div>
);

export const ConfigModal = React.memo(({
    show,
    onHide,
    form,
    setForm,
    errors,
    customers,
    saving,
    onSubmit,
    existingCustomerIds,
}) => {
    const shouldRenderBody = useDeferredModalContent(show);

    return (
        <Modal show={show} onHide={onHide} size="lg" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Configurar credito de cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <div className="credits-form-panel">
                        <Row className="g-4 credits-manual-layout">
                            <Col md={12} className="credits-manual-layout__field">
                                <ReactSelect
                                    title="Cliente"
                                    data={customers}
                                    value={form.customer_id}
                                    onChange={(value) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            customer_id: value,
                                        }))
                                    }
                                    errors={errors.customer_id}
                                    customSelectProps={{
                                        isDisabled: existingCustomerIds.includes(
                                            Number(form.customer_id?.value)
                                        ),
                                    }}
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Limite de credito</Form.Label>
                                <Form.Control
                                    className="credits-form-control"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.credit_limit}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            credit_limit: event.target.value,
                                        }))
                                    }
                                />
                                {errors.credit_limit ? (
                                    <div className="text-danger mt-2">
                                        {errors.credit_limit}
                                    </div>
                                ) : null}
                            </Col>
                            <Col md={6}>
                                <Form.Label>Interes (%)</Form.Label>
                                <Form.Control
                                    className="credits-form-control"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.interest_rate}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            interest_rate: event.target.value,
                                        }))
                                    }
                                />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Maximo de cuotas</Form.Label>
                                <Form.Control
                                    className="credits-form-control"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={form.max_installments}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            max_installments: event.target.value,
                                        }))
                                    }
                                />
                                {errors.max_installments ? (
                                    <div className="text-danger mt-2">
                                        {errors.max_installments}
                                    </div>
                                ) : null}
                            </Col>
                            <Col md={6}>
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    className="credits-form-control"
                                    value={form.status}
                                    onChange={(event) =>
                                        setForm((prev) => ({
                                            ...prev,
                                            status: event.target.value,
                                        }))
                                    }
                                >
                                    <option value="activo">Activo</option>
                                    <option value="bloqueado">Bloqueado</option>
                                </Form.Select>
                            </Col>
                            <Col md={12} className="credits-manual-layout__field">
                                <div className="small text-muted">
                                    El limite de credito es estricto y siempre se
                                    valida en backend usando el saldo pendiente real
                                    del cliente.
                                </div>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer>
                <CreditActionButton action="cancel-modal" onClick={onHide}>
                    Cancelar
                </CreditActionButton>
                <CreditActionButton
                    action="save-config"
                    onClick={onSubmit}
                    disabled={saving}
                >
                    {saving ? "Guardando..." : "Guardar"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});

export const ManualCreditModal = React.memo(({
    show,
    onHide,
    form,
    setForm,
    errors,
    customers,
    warehouses,
    productsById,
    productsLoading,
    manualTotal,
    money,
    productPreview,
    searchResults,
    productInputRef,
    saving,
    onWarehouseChange,
    onProductSearchChange,
    onProductSearchSubmit,
    onSelectSearchResult,
    onQuantityChange,
    onRemoveItem,
    onSubmit,
}) => {
    const shouldRenderBody = useDeferredModalContent(show);

    return (
        <Modal
            show={show}
            onHide={onHide}
            {...MODAL_PROPS}
            dialogClassName="credits-modal-dialog credits-modal-dialog--manual"
        >
            <Modal.Header closeButton>
                <Modal.Title>Crear credito manual</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <div className="credits-form-panel">
                <Row className="g-4 credits-manual-layout">
                    <Col md={12} className="credits-manual-layout__field">
                        <ReactSelect
                            title="Cliente"
                            data={customers}
                            value={form.customer_id}
                            onChange={(value) =>
                                setForm((prev) => ({ ...prev, customer_id: value }))
                            }
                            errors={errors.customer_id}
                        />
                    </Col>
                    <Col md={12} className="credits-manual-layout__field">
                        <ReactSelect
                            title="Bodega"
                            data={warehouses}
                            value={form.warehouse_id}
                            onChange={onWarehouseChange}
                            errors={errors.warehouse_id}
                        />
                    </Col>
                    <Col
                        md={12}
                        className="credits-manual-layout__field credits-manual-layout__field--product-section"
                    >
                        <div className="credits-form-panel credits-form-panel--accent credits-manual-products">
                            <div className="credits-manual-products__header">
                                <div>
                                    <div className="credits-form-panel__title mb-1">
                                        Productos del credito
                                    </div>
                                    <div className="credits-form-panel__subtitle mb-0">
                                        Escanea o escribe nombre o codigo. El
                                        codigo exacto se agrega al instante y
                                        los productos repetidos suman cantidad.
                                    </div>
                                </div>
                                <div className="credits-manual-products__count">
                                    {(form.items || []).length} producto
                                    {(form.items || []).length === 1 ? "" : "s"}
                                </div>
                            </div>
                            <div className="credits-manual-products__scan">
                                <Form.Label>Escanear o buscar producto</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className="credits-manual-products__scan-icon">
                                        <FontAwesomeIcon icon={faBarcode} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        ref={productInputRef}
                                        className="credits-form-control credits-manual-products__scan-input"
                                        type="text"
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck={false}
                                        value={form.product_search || ""}
                                        placeholder={
                                            form.warehouse_id
                                                ? "Escanea o escribe nombre o codigo"
                                                : "Seleccione una bodega para comenzar"
                                        }
                                        disabled={!form.warehouse_id}
                                        onChange={(event) =>
                                            onProductSearchChange(
                                                event.target.value
                                            )
                                        }
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                onProductSearchSubmit(
                                                    event.currentTarget.value
                                                );
                                            }
                                        }}
                                    />
                                </InputGroup>
                                <div className="credits-manual-products__hint">
                                    {productsLoading ? (
                                        <span className="credits-manual-products__status">
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                            />
                                            Cargando catalogo de la bodega...
                                        </span>
                                    ) : productPreview ? (
                                        <>
                                            Coincidencia lista:{" "}
                                            <strong>
                                                {productPreview?.attributes?.name}
                                            </strong>
                                            <span>
                                                {` · ${String(
                                                    productPreview?.attributes
                                                        ?.code ||
                                                        productPreview?.attributes
                                                            ?.product_code ||
                                                        "sin codigo"
                                                )}`}
                                            </span>
                                        </>
                                    ) : form.warehouse_id ? (
                                        "Escribe o escanea. El codigo exacto entra sin Enter y el cursor sigue listo."
                                    ) : (
                                        "Selecciona una bodega para habilitar el flujo de escaneo."
                                    )}
                                </div>
                                {searchResults?.length > 0 ? (
                                    <div className="credits-manual-products__results">
                                        {searchResults.map((product) => {
                                            const productCode =
                                                product?.attributes?.code ||
                                                product?.attributes?.product_code ||
                                                `ID ${product?.id}`;
                                            const stockQty =
                                                product?.attributes?.stock
                                                    ?.quantity ?? 0;

                                            return (
                                                <button
                                                    key={`manual-search-result-${product.id}`}
                                                    type="button"
                                                    className="credits-manual-products__result"
                                                    onClick={() =>
                                                        onSelectSearchResult(
                                                            product
                                                        )
                                                    }
                                                >
                                                    <span className="credits-manual-products__result-name">
                                                        {product?.attributes?.name ||
                                                            "Producto"}
                                                    </span>
                                                    <span className="credits-manual-products__result-meta">
                                                        {`${productCode} | Stock ${Number(
                                                            stockQty || 0
                                                        ).toFixed(2)}`}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : null}
                                <InlineError text={errors.product_search} />
                            </div>
                            <div className="credits-table-wrapper credits-table-wrapper--manual">
                                <div className="table-responsive">
                                    <Table hover className="align-middle credits-table">
                                        <thead>
                                            <tr>
                                                <th>Producto</th>
                                                <th>Precio</th>
                                                <th>Disponible</th>
                                                <th className="text-center">
                                                    Cantidad
                                                </th>
                                                <th>Subtotal</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {(form.items || []).length > 0 ? (
                                                (form.items || []).map(
                                                    (item, index) => {
                                                        const product =
                                                            productsById?.get(
                                                                Number(
                                                                    item.product_id ||
                                                                        0
                                                                )
                                                            );
                                                        const stockQty =
                                                            product?.attributes?.stock
                                                                ?.quantity ?? 0;
                                                        const price =
                                                            product?.attributes
                                                                ?.product_price ?? 0;
                                                        const subTotal =
                                                            Number(price || 0) *
                                                            Number(
                                                                item.quantity || 0
                                                            );
                                                        const quantity =
                                                            parseNumber(
                                                                item.quantity,
                                                                1
                                                            ) || 1;
                                                        const safeQuantity =
                                                            quantity < 1
                                                                ? 1
                                                                : quantity;
                                                        const availableStock =
                                                            parseNumber(
                                                                stockQty,
                                                                0
                                                            );
                                                        const maxQuantity =
                                                            availableStock > 0
                                                                ? availableStock
                                                                : safeQuantity;
                                                        const canDecrement =
                                                            safeQuantity > 1;
                                                        const canIncrement =
                                                            safeQuantity <
                                                            maxQuantity;
                                                        const displayQuantity =
                                                            Number.isInteger(
                                                                safeQuantity
                                                            )
                                                                ? String(
                                                                      safeQuantity
                                                                  )
                                                                : safeQuantity.toFixed(
                                                                      2
                                                                  );
                                                        const stockUnit =
                                                            product?.attributes
                                                                ?.sale_unit_name
                                                                ?.short_name ||
                                                            product?.attributes
                                                                ?.product_unit_name
                                                                ?.short_name ||
                                                            product?.attributes
                                                                ?.product_unit_name
                                                                ?.name ||
                                                            "U";
                                                        const productCode =
                                                            product?.attributes
                                                                ?.code ||
                                                            product?.attributes
                                                                ?.product_code ||
                                                            `ID ${product?.id}`;

                                                        return (
                                                            <tr
                                                                key={`manual-credit-item-${
                                                                    item.product_id ||
                                                                    index
                                                                }`}
                                                                className="credits-manual-product-row"
                                                            >
                                                                <td>
                                                                    <div className="credits-manual-product">
                                                                        <h4 className="product-name credits-manual-product__code">
                                                                            {productCode}
                                                                        </h4>
                                                                        <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                                                                            <span className="credits-manual-product__name-badge">
                                                                                <span>
                                                                                    {product?.attributes?.name ||
                                                                                        "Producto no disponible"}
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="text-end credits-manual-product__money">
                                                                    {money(
                                                                        price
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <span className="credits-manual-product__stock-badge">
                                                                        <span>
                                                                            {`${Number(
                                                                                stockQty ||
                                                                                    0
                                                                            ).toFixed(
                                                                                2
                                                                            )} ${stockUnit}`}
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                <td className="text-center">
                                                                    <div className="credits-manual-product__qty">
                                                                        <button
                                                                            type="button"
                                                                            className={getCreditActionClassName(
                                                                                {
                                                                                    action: "manual-qty",
                                                                                    className:
                                                                                        "credits-manual-product__qty-button",
                                                                                    icon: true,
                                                                                }
                                                                            )}
                                                                            disabled={
                                                                                !canDecrement
                                                                            }
                                                                            onClick={() =>
                                                                                canDecrement &&
                                                                                onQuantityChange(
                                                                                    index,
                                                                                    String(
                                                                                        Math.max(
                                                                                            1,
                                                                                            safeQuantity -
                                                                                                1
                                                                                        )
                                                                                    )
                                                                                )
                                                                            }
                                                                            aria-label="Disminuir cantidad"
                                                                        >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faMinus
                                                                                    }
                                                                                />
                                                                        </button>
                                                                        <Form.Control
                                                                            aria-label="Cantidad del producto"
                                                                            className="credits-manual-product__qty-input"
                                                                            value={
                                                                                displayQuantity
                                                                            }
                                                                            type="text"
                                                                            readOnly
                                                                            tabIndex={
                                                                                -1
                                                                            }
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            className={getCreditActionClassName(
                                                                                {
                                                                                    action: "manual-qty",
                                                                                    className:
                                                                                        "credits-manual-product__qty-button",
                                                                                    icon: true,
                                                                                }
                                                                            )}
                                                                            disabled={
                                                                                !canIncrement
                                                                            }
                                                                            onClick={() =>
                                                                                canIncrement &&
                                                                                onQuantityChange(
                                                                                    index,
                                                                                    String(
                                                                                        Math.min(
                                                                                            maxQuantity,
                                                                                            safeQuantity +
                                                                                                1
                                                                                        )
                                                                                    )
                                                                                )
                                                                            }
                                                                            aria-label="Aumentar cantidad"
                                                                        >
                                                                                <FontAwesomeIcon
                                                                                    icon={
                                                                                        faPlus
                                                                                    }
                                                                                />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="text-end credits-manual-product__money">
                                                                    {money(
                                                                        subTotal
                                                                    )}
                                                                </td>
                                                                <td className="text-end remove-button">
                                                                    <button
                                                                        type="button"
                                                                        className={getCreditActionClassName(
                                                                            {
                                                                                action: "remove-manual-item",
                                                                                className:
                                                                                    "credits-manual-product__remove",
                                                                                icon: true,
                                                                            }
                                                                        )}
                                                                        onClick={() =>
                                                                            onRemoveItem(
                                                                                index
                                                                            )
                                                                        }
                                                                        aria-label="Eliminar producto del credito"
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faTrash
                                                                            }
                                                                        />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr>
                                                    <td colSpan={6}>
                                                        <div className="credits-empty credits-empty--manual">
                                                            Escanea o escribe un
                                                            producto para comenzar
                                                            a cargar el credito.
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <InlineError text={errors.items} />
                        </div>
                    </Col>
                    <Col md={6} className="credits-manual-layout__field">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={
                                Number(manualTotal || 0) > 0
                                    ? Number(manualTotal).toFixed(2)
                                    : form.total_amount
                            }
                            disabled={Number(manualTotal || 0) > 0}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    total_amount: event.target.value,
                                }))
                            }
                        />
                        {errors.total_amount ? (
                            <div className="text-danger mt-2">
                                {errors.total_amount}
                            </div>
                        ) : null}
                    </Col>
                    <Col md={6} className="credits-manual-layout__field">
                        <Form.Label>Interes (%)</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.interest_rate}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    interest_rate: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4} className="credits-manual-layout__field">
                        <Form.Label>Cuotas</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="number"
                            min="1"
                            step="1"
                            value={form.installments}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    installments: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4} className="credits-manual-layout__field">
                        <Form.Label>Fecha inicial</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="date"
                            value={form.start_date}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    start_date: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col md={4} className="credits-manual-layout__field">
                        <Form.Label>Fecha de vencimiento</Form.Label>
                        <Form.Control
                            className="credits-form-control"
                            type="date"
                            value={form.due_date}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    due_date: event.target.value,
                                }))
                            }
                        />
                    </Col>
                    <Col
                        md={12}
                        className="credits-manual-layout__field credits-manual-layout__field--full"
                    >
                        <Form.Label>Nota</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            className="credits-form-control"
                            value={form.note}
                            onChange={(event) =>
                                setForm((prev) => ({
                                    ...prev,
                                    note: event.target.value,
                                }))
                            }
                        />
                    </Col>
                        </Row>
                    </div>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer>
                <CreditActionButton action="cancel-modal" onClick={onHide}>
                    Cancelar
                </CreditActionButton>
                <CreditActionButton
                    action="create-credit"
                    onClick={onSubmit}
                    disabled={saving}
                >
                    {saving ? "Guardando..." : "Crear credito"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});

const DetailBody = React.memo(({ creditDetail, money }) => (
    <>
        <div className="credits-modal-hero">
            <div>
                <div className="credits-record-eyebrow">
                    Credito #{creditDetail.id}
                </div>
                <h3 className="credits-record-title mb-1">
                    {creditDetail.customer_name}
                </h3>
                <div className="credits-record-subtitle">
                    <span>{creditDetail.sale_reference_code || "Venta manual"}</span>
                    <span>Inicio {creditDetail.start_date || "-"}</span>
                </div>
            </div>
            <StatusBadge status={creditDetail.status} />
        </div>

        <div className="credits-detail-grid mb-5">
            <div className="credits-detail-item">
                <strong>Cliente</strong>
                <span>{creditDetail.customer_name}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Venta</strong>
                <span>{creditDetail.sale_reference_code || "-"}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Total original</strong>
                <span>
                    {money(
                        creditDetail.original_total_amount ||
                            creditDetail.total_amount
                    )}
                </span>
            </div>
            <div className="credits-detail-item">
                <strong>Saldo actual</strong>
                <span>{money(creditDetail.balance)}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Recuperado</strong>
                <span>
                    {money(
                        creditDetail.recovered_amount ||
                            creditDetail.paid_total ||
                            0
                    )}
                </span>
            </div>
            <div className="credits-detail-item">
                <strong>Total a recuperar</strong>
                <span>
                    {money(
                        creditDetail.collection_target_amount ||
                            creditDetail.total_with_interest
                    )}
                </span>
            </div>
            <div className="credits-detail-item">
                <strong>Capital pendiente</strong>
                <span>{money(creditDetail.principal_balance)}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Estado</strong>
                <span>{creditDetail.status}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Tipo</strong>
                <span>{creditDetail.credit_type_label || "Automatico"}</span>
            </div>
            <div className="credits-detail-item">
                <strong>Pagos registrados</strong>
                <span>{Number(creditDetail.payments_count || 0)}</span>
            </div>
            {creditDetail.restructured ? (
                <div className="credits-detail-item">
                    <strong>Saldo previo</strong>
                    <span>{money(creditDetail.previous_balance)}</span>
                </div>
            ) : null}
            {creditDetail.restructured_at ? (
                <div className="credits-detail-item">
                    <strong>Ultima reestructuracion</strong>
                    <span>{creditDetail.restructured_at}</span>
                </div>
            ) : null}
        </div>

        {!creditDetail.can_edit_directly && creditDetail.can_restructure ? (
            <div className="credits-info-banner credits-info-banner--warning mb-5">
                Este credito ya tiene movimiento financiero registrado. Para cambiar
                condiciones debe usarse reestructuracion.
            </div>
        ) : null}

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Cuotas</h5>
            <TableBox
                headers={["#", "Monto", "Pagado", "Pendiente", "Vence", "Estado"]}
                rows={(creditDetail.installments || []).map((row) => (
                    <tr key={row.id}>
                        <td>{row.installment_number}</td>
                        <td>{money(row.amount)}</td>
                        <td>{money(row.paid_amount)}</td>
                        <td>{money(row.pending_amount)}</td>
                        <td>{row.due_date}</td>
                        <td>
                            <StatusBadge status={row.status} />
                        </td>
                    </tr>
                ))}
                emptyText="Sin cuotas registradas."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Productos del credito</h5>
            <TableBox
                headers={[
                    "Producto",
                    "Bodega",
                    "Cantidad",
                    "Precio",
                    "Subtotal",
                    "Origen",
                ]}
                rows={(creditDetail.items || []).map((row) => (
                    <tr key={row.credit_item_id || row.id}>
                        <td>{row.product_name || "-"}</td>
                        <td>{row.warehouse_name || "-"}</td>
                        <td>{Number(row.quantity || 0).toFixed(2)}</td>
                        <td>{money(row.product_price)}</td>
                        <td>{money(row.sub_total)}</td>
                        <td>{row.source_label || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito no tiene productos asociados."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Historial de pagos</h5>
            <TableBox
                headers={["Fecha", "Monto", "Tipo", "Metodo", "Nota"]}
                rows={(creditDetail.payments || []).map((row) => (
                    <tr key={row.id}>
                        <td>{formatHistoryDateTime(row.created_at)}</td>
                        <td>{money(row.amount)}</td>
                        <td>{row.entry_type_label || row.entry_type || "-"}</td>
                        <td>
                            {PAYMENT_METHOD_OPTIONS.find(
                                (option) =>
                                    Number(option.value) === Number(row.payment_type)
                            )?.label || row.payment_method}
                        </td>
                        <td>{row.note || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito aun no registra pagos."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">
                Historial de devoluciones
            </h5>
            <TableBox
                headers={["Fecha", "Producto", "Cantidad", "Subtotal", "Nota"]}
                rows={(creditDetail.returns || []).map((row) => (
                    <tr key={row.id}>
                        <td>{formatHistoryDateTime(row.created_at)}</td>
                        <td>{row.product_name || "-"}</td>
                        <td>{Number(row.quantity || 0).toFixed(2)}</td>
                        <td>{money(row.sub_total)}</td>
                        <td>{row.note || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito aun no registra devoluciones."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">
                Historial de reestructuraciones
            </h5>
            <TableBox
                headers={[
                    "Fecha",
                    "Saldo anterior",
                    "Saldo nuevo",
                    "Cambio",
                    "Motivo",
                ]}
                rows={(creditDetail.restructures || []).map((row) => (
                    <tr key={row.id}>
                        <td>{formatHistoryDateTime(row.created_at)}</td>
                        <td>{money(row.old_balance)}</td>
                        <td>{money(row.new_balance)}</td>
                        <td>
                            {(row.old_terms?.credit_type_label ||
                                "Automatico") +
                                " -> " +
                                (row.new_terms?.credit_type_label ||
                                    "Automatico")}
                        </td>
                        <td>{row.reason || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito aun no registra reestructuraciones."
            />
        </div>

        <div className="credits-modal-section">
            <h5 className="credits-modal-section-title">Bitacora del credito</h5>
            <TableBox
                headers={["Fecha", "Accion", "Descripcion"]}
                rows={(creditDetail.logs || []).map((row) => (
                    <tr key={row.id}>
                        <td>{formatHistoryDateTime(row.created_at)}</td>
                        <td>{row.action}</td>
                        <td>{row.description || "-"}</td>
                    </tr>
                ))}
                emptyText="Este credito aun no registra movimientos de bitacora."
            />
        </div>
    </>
));

export const DetailModal = React.memo(({
    show,
    onHide,
    detailLoading,
    creditDetail,
    money,
    onOpenEdit,
    onOpenPrint,
    onOpenRestructure,
    onOpenReturn,
}) => {
    const shouldRenderBody = useDeferredModalContent(
        show,
        !detailLoading && !!creditDetail
    );

    return (
        <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Detalle de credito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <DetailBody creditDetail={creditDetail} money={money} />
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer className="credits-detail-modal__footer">
                <CreditActionButton
                    action="print-credit-state"
                    className="credits-detail-modal__btn"
                    onClick={onOpenPrint}
                    disabled={!creditDetail}
                >
                    Imprimir estado
                </CreditActionButton>
                <CreditActionButton
                    action="close-modal"
                    className="credits-detail-modal__btn credits-detail-modal__btn--secondary"
                    onClick={onHide}
                >
                    Cerrar
                </CreditActionButton>
                {creditDetail?.can_edit_directly ? (
                    <CreditActionButton
                        action="edit-credit"
                        className="credits-detail-modal__btn"
                        onClick={onOpenEdit}
                    >
                        Editar credito
                    </CreditActionButton>
                ) : null}
                {creditDetail?.can_restructure ? (
                    <CreditActionButton
                        action="restructure-credit"
                        className="credits-detail-modal__btn"
                        onClick={onOpenRestructure}
                    >
                        Reestructurar credito
                    </CreditActionButton>
                ) : null}
                {creditDetail?.items?.some(
                    (item) => Number(item.available_return_quantity) > 0
                ) ? (
                    <CreditActionButton
                        action="register-return"
                        className="credits-detail-modal__btn"
                        onClick={onOpenReturn}
                    >
                        Registrar devolucion
                    </CreditActionButton>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
});

export const EditCreditModal = React.memo(({
    show,
    onHide,
    creditDetail,
    money,
    form,
    setForm,
    errors,
    saving,
    onSubmit,
}) => {
    const shouldRenderBody = useDeferredModalContent(show, !!creditDetail);

    return (
        <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Editar credito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <>
                        <CreditTermsSummary
                            creditDetail={creditDetail}
                            form={form}
                            money={money}
                            title="Resumen previo"
                            description="Ajuste cuotas, fechas, interes y tipo manteniendo intacto el historial existente."
                        />

                        <div className="credits-detail-grid mb-4 mt-4">
                            <div className="credits-detail-item">
                                <strong>Cliente</strong>
                                <span>{creditDetail.customer_name}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Plan actual</strong>
                                <span>
                                    {resolveInstallmentsCount(creditDetail)} cuotas /{" "}
                                    {creditDetail.credit_type_label || "Automatico"}
                                </span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Total original</strong>
                                <span>
                                    {money(
                                        creditDetail.original_total_amount ||
                                            creditDetail.total_amount
                                    )}
                                </span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Interes actual</strong>
                                <span>
                                    {Number(creditDetail.interest_rate || 0).toFixed(
                                        2
                                    )}
                                    %
                                </span>
                            </div>
                        </div>

                        <CreditTermsFields
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            confirmLabel="Confirmo que deseo actualizar este credito sin reestructurarlo."
                        />
                    </>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer>
                <CreditActionButton action="cancel-modal" onClick={onHide}>
                    Cancelar
                </CreditActionButton>
                <CreditActionButton
                    action="save-credit-edit"
                    onClick={onSubmit}
                    disabled={saving || !creditDetail}
                >
                    {saving ? "Guardando..." : "Guardar cambios"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});

export const RestructureCreditModal = React.memo(({
    show,
    onHide,
    creditDetail,
    money,
    form,
    setForm,
    errors,
    saving,
    onSubmit,
}) => {
    const shouldRenderBody = useDeferredModalContent(show, !!creditDetail);

    return (
        <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Reestructurar credito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <>
                        <CreditTermsSummary
                            creditDetail={creditDetail}
                            form={form}
                            money={money}
                            title="Nuevo plan sobre saldo vigente"
                            description="Se recalculara un nuevo plan tomando el saldo pendiente actual como base."
                            isRestructure
                        />

                        <div className="credits-detail-grid mb-4 mt-4">
                            <div className="credits-detail-item">
                                <strong>Cliente</strong>
                                <span>{creditDetail.customer_name}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Saldo a reestructurar</strong>
                                <span>{money(creditDetail.balance)}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Estado actual</strong>
                                <span>{creditDetail.status}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Pagos historicos</strong>
                                <span>{Number(creditDetail.payments_count || 0)}</span>
                            </div>
                        </div>

                        <div className="credits-info-banner credits-info-banner--warning mb-4">
                            Las cuotas actuales seran reemplazadas por un nuevo plan
                            y el cambio quedara auditado en historial.
                        </div>

                        <CreditTermsFields
                            form={form}
                            setForm={setForm}
                            errors={errors}
                            confirmLabel="Confirmo que deseo reestructurar este credito y generar un nuevo plan."
                            isRestructure
                        />
                    </>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer>
                <CreditActionButton action="cancel-modal" onClick={onHide}>
                    Cancelar
                </CreditActionButton>
                <CreditActionButton
                    action="apply-restructure"
                    onClick={onSubmit}
                    disabled={saving || !creditDetail}
                >
                    {saving ? "Guardando..." : "Aplicar reestructuracion"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});

export const PaymentModal = React.memo(({
    show,
    onHide,
    detailLoading,
    creditDetail,
    money,
    form,
    setForm,
    errors,
    saving,
    onSubmit,
}) => {
    const shouldRenderBody = useDeferredModalContent(
        show,
        !detailLoading && !!creditDetail
    );

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            {...MODAL_PROPS}
            contentClassName={`${MODAL_PROPS.contentClassName} credits-payment-modal`}
        >
            <Modal.Header closeButton>
                <Modal.Title>Registrar pago</Modal.Title>
            </Modal.Header>
            <Modal.Body className="credits-payment-modal__body">
                {shouldRenderBody ? (
                    <>
                        <div className="credits-detail-grid mb-5">
                            <div className="credits-detail-item">
                                <strong>Cliente</strong>
                                <span>{creditDetail.customer_name}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Saldo actual</strong>
                                <span>{money(creditDetail.balance)}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Vencimiento</strong>
                                <span>{creditDetail.due_date}</span>
                            </div>
                        </div>

                        <div className="credits-form-panel mb-5">
                            {errors.general ? (
                                <div className="alert alert-danger mb-4">
                                    {errors.general}
                                </div>
                            ) : null}
                            <Row className="g-4">
                                <Col md={4}>
                                    <Form.Label>Monto recibido</Form.Label>
                                    <Form.Control
                                        className="credits-form-control"
                                        type="number"
                                        min="0.01"
                                        max={creditDetail.balance}
                                        step="0.01"
                                        value={form.amount}
                                        onChange={(event) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                amount: event.target.value,
                                            }))
                                        }
                                    />
                                    {errors.amount ? (
                                        <div className="text-danger mt-2">
                                            {errors.amount}
                                        </div>
                                    ) : null}
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Metodo de pago</Form.Label>
                                    <Form.Select
                                        className="credits-form-control"
                                        value={form.payment_type}
                                        onChange={(event) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                payment_type: event.target.value,
                                            }))
                                        }
                                    >
                                        {PAYMENT_METHOD_OPTIONS.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={12}>
                                    <Form.Label>Nota</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="credits-form-control"
                                        value={form.note}
                                        onChange={(event) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                note: event.target.value,
                                            }))
                                        }
                                    />
                                </Col>
                            </Row>
                        </div>

                        <div className="credits-modal-section">
                            <h5 className="credits-modal-section-title">
                                Cuotas pendientes
                            </h5>
                            <TableBox
                                headers={[
                                    "#",
                                    "Monto",
                                    "Pagado",
                                    "Pendiente",
                                    "Vence",
                                    "Estado",
                                ]}
                                rows={[...(creditDetail.installments || [])]
                                    .filter((row) => Number(row.pending_amount) > 0)
                                    .sort((left, right) => {
                                        const dueDateComparison = String(
                                            left.due_date || ""
                                        ).localeCompare(
                                            String(right.due_date || "")
                                        );
                                        if (dueDateComparison !== 0) {
                                            return dueDateComparison;
                                        }

                                        return (
                                            Number(left.installment_number || 0) -
                                            Number(right.installment_number || 0)
                                        );
                                    })
                                    .map((row) => (
                                        <tr key={row.id}>
                                            <td>{row.installment_number}</td>
                                            <td>{money(row.amount)}</td>
                                            <td>{money(row.paid_amount)}</td>
                                            <td>{money(row.pending_amount)}</td>
                                            <td>{row.due_date}</td>
                                            <td>
                                                <StatusBadge status={row.status} />
                                            </td>
                                        </tr>
                                    ))}
                                emptyText="No hay cuotas pendientes."
                            />
                        </div>
                    </>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer className="credits-payment-modal__footer">
                <CreditActionButton action="close-modal" onClick={onHide}>
                    Cerrar
                </CreditActionButton>
                <CreditActionButton
                    action="register-payment"
                    onClick={onSubmit}
                    disabled={saving || !creditDetail}
                    className="credits-payment-modal__submit"
                >
                    {saving ? "Guardando..." : "Registrar pago"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});

export const ReturnModal = React.memo(({
    show,
    onHide,
    detailLoading,
    creditDetail,
    money,
    form,
    setForm,
    errors,
    saving,
    onSubmit,
}) => {
    const shouldRenderBody = useDeferredModalContent(
        show,
        !detailLoading && !!creditDetail
    );

    return (
        <Modal show={show} onHide={onHide} size="xl" {...MODAL_PROPS}>
            <Modal.Header closeButton>
                <Modal.Title>Registrar devolucion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {shouldRenderBody ? (
                    <>
                        <div className="credits-detail-grid mb-5">
                            <div className="credits-detail-item">
                                <strong>Cliente</strong>
                                <span>{creditDetail.customer_name}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Credito</strong>
                                <span>#{creditDetail.id}</span>
                            </div>
                            <div className="credits-detail-item">
                                <strong>Saldo actual</strong>
                                <span>{money(creditDetail.balance)}</span>
                            </div>
                        </div>

                        <div className="credits-modal-section">
                            <h5 className="credits-modal-section-title">
                                Productos disponibles para devolucion
                            </h5>
                            <TableBox
                                headers={[
                                    "Producto",
                                    "Entregado",
                                    "Devuelto",
                                    "Disponible",
                                    "Precio",
                                    "Cantidad a devolver",
                                ]}
                                rows={(creditDetail.items || [])
                                    .filter(
                                        (row) =>
                                            Number(row.available_return_quantity) > 0
                                    )
                                    .map((row) => (
                                        <tr key={row.credit_item_id || row.id}>
                                            <td>{row.product_name}</td>
                                            <td>
                                                {Number(row.quantity).toFixed(2)}
                                            </td>
                                            <td>
                                                {Number(
                                                    row.returned_quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td>
                                                {Number(
                                                    row.available_return_quantity
                                                ).toFixed(2)}
                                            </td>
                                            <td>{money(row.product_price)}</td>
                                            <td style={{ minWidth: 160 }}>
                                                <Form.Control
                                                    className="credits-form-control"
                                                    type="number"
                                                    min="0"
                                                    max={row.available_return_quantity}
                                                    step="0.01"
                                                    value={
                                                        form.quantities?.[
                                                            row.credit_item_id
                                                        ] || ""
                                                    }
                                                    onChange={(event) =>
                                                        setForm((prev) => ({
                                                            ...prev,
                                                            quantities: {
                                                                ...prev.quantities,
                                                                [row.credit_item_id]:
                                                                    event.target.value,
                                                            },
                                                        }))
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                emptyText="Este credito no tiene productos devolvibles."
                            />
                            {errors.items ? (
                                <div className="text-danger mt-2">
                                    {errors.items}
                                </div>
                            ) : null}
                        </div>

                        <div className="credits-form-panel mt-4">
                            <Form.Label>Nota</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                className="credits-form-control"
                                value={form.note}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        note: event.target.value,
                                    }))
                                }
                            />
                        </div>
                    </>
                ) : (
                    <ModalLoading />
                )}
            </Modal.Body>
            <Modal.Footer>
                <CreditActionButton action="close-modal" onClick={onHide}>
                    Cerrar
                </CreditActionButton>
                <CreditActionButton
                    action="register-return"
                    onClick={onSubmit}
                    disabled={saving || !creditDetail}
                >
                    {saving ? "Guardando..." : "Registrar devolucion"}
                </CreditActionButton>
            </Modal.Footer>
        </Modal>
    );
});
