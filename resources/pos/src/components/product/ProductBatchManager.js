import React, { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import {
    Alert,
    Badge,
    Button,
    Col,
    Form,
    Image,
    Row,
    Spinner,
} from "react-bootstrap-v5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import apiConfig from "../../config/apiConfig";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import TabTitle from "../../shared/tab-title/TabTitle";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { toastType } from "../../constants";
import { addToast } from "../../store/action/toastAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchAllSuppliers } from "../../store/action/supplierAction";
import {
    currencySymbolHandling,
    getCurrencySymbol,
} from "../../shared/sharedMethod";
import { getBatchStatusMeta } from "../../shared/batchHelpers";

const EMPTY_DASHBOARD = {
    product: null,
    settings: {
        track_batches: false,
        alert_days: 30,
        deny_expired_sale: true,
    },
    draft: {
        next_codigo_lote_sistema: "",
    },
    summary: {
        total_stock: 0,
        batch_stock: 0,
        stock_difference: 0,
        active_batches: 0,
        expired_batches: 0,
        expiring_batches: 0,
    },
    batches: [],
};

const createInitialBatchForm = (previewCode = "") => ({
    warehouse_id: "",
    purchase_supplier_id: "",
    codigo_lote_sistema: previewCode,
    lote_fabricante: "",
    lot_barcode: "",
    ubicacion: "",
    quantity: "",
    product_cost: "",
    product_price: "",
    received_at: moment().format("YYYY-MM-DD"),
    fecha_fabricacion: moment().format("YYYY-MM-DD"),
    fecha_vencimiento: "",
    impuesto_tipo: "EXCLUSIVO",
    impuesto_valor: "",
    descripcion: "",
});

const createEditBatchForm = (batch) => ({
    lote_fabricante: batch?.lote_fabricante || batch?.lot_code || "",
    ubicacion: batch?.ubicacion || "",
    descripcion: batch?.descripcion || batch?.note || "",
    fecha_fabricacion: batch?.fecha_fabricacion || "",
    fecha_vencimiento: batch?.fecha_vencimiento || batch?.expires_at || "",
    impuesto_tipo: batch?.impuesto_tipo || "EXCLUSIVO",
    impuesto_valor:
        batch?.impuesto_valor === null || batch?.impuesto_valor === undefined
            ? ""
            : String(batch.impuesto_valor),
    product_price:
        batch?.product_price === null || batch?.product_price === undefined
            ? ""
            : String(batch.product_price),
});

const ProductBatchManager = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const warehouses = useSelector((state) => state.warehouses);
    const suppliers = useSelector((state) => state.suppliers);
    const settings = useSelector((state) => state.settings);
    const allConfigData = useSelector((state) => state.allConfigData);
    const [loading, setLoading] = useState(true);
    const [savingSettings, setSavingSettings] = useState(false);
    const [savingBatch, setSavingBatch] = useState(false);
    const [savingBatchUpdate, setSavingBatchUpdate] = useState(false);
    const [error, setError] = useState("");
    const [dashboard, setDashboard] = useState(EMPTY_DASHBOARD);
    const [settingsForm, setSettingsForm] = useState(EMPTY_DASHBOARD.settings);
    const [batchForm, setBatchForm] = useState(createInitialBatchForm());
    const [editingBatchId, setEditingBatchId] = useState(null);
    const [batchEditForm, setBatchEditForm] = useState(null);

    const toast = useCallback(
        (text, type) => {
            if (!text) {
                return;
            }

            dispatch(
                addToast({
                    text,
                    ...(type ? { type } : {}),
                })
            );
        },
        [dispatch]
    );

    const money = useMemo(
        () => (value) =>
            currencySymbolHandling(
                allConfigData,
                getCurrencySymbol(settings),
                Number(value || 0)
            ),
        [allConfigData, settings]
    );

    const warehouseOptions = useMemo(() => {
        if (!Array.isArray(warehouses)) {
            return [];
        }

        return warehouses.map((warehouse) => ({
            value: String(warehouse.id),
            label: warehouse?.attributes?.name || warehouse?.name || `Bodega ${warehouse.id}`,
        }));
    }, [warehouses]);

    const supplierOptions = useMemo(() => {
        if (!Array.isArray(suppliers)) {
            return [];
        }

        return suppliers.map((supplier) => ({
            value: String(supplier.id),
            label:
                supplier?.attributes?.name ||
                supplier?.name ||
                `Proveedor ${supplier.id}`,
        }));
    }, [suppliers]);

    const applyDashboard = useCallback(
        (payload) => {
            const nextDashboard = payload || EMPTY_DASHBOARD;
            setDashboard(nextDashboard);
            const nextPreviewCode =
                nextDashboard?.draft?.next_codigo_lote_sistema || "";
            setSettingsForm({
                track_batches: Boolean(nextDashboard?.settings?.track_batches),
                alert_days: Number(nextDashboard?.settings?.alert_days || 30),
                deny_expired_sale: Boolean(
                    nextDashboard?.settings?.deny_expired_sale
                ),
            });
            setBatchForm((previous) => ({
                ...createInitialBatchForm(nextPreviewCode),
                warehouse_id:
                    previous.warehouse_id ||
                    warehouseOptions[0]?.value ||
                    "",
                purchase_supplier_id: previous.purchase_supplier_id || "",
                received_at: previous.received_at || moment().format("YYYY-MM-DD"),
                fecha_fabricacion:
                    previous.fecha_fabricacion || moment().format("YYYY-MM-DD"),
            }));
        },
        [warehouseOptions]
    );

    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const response = await apiConfig.get(`/products/${productId}/batches`);
            applyDashboard(response?.data?.data || EMPTY_DASHBOARD);
        } catch (requestError) {
            setError(
                requestError?.response?.data?.message ||
                    "No se pudo cargar la gestion por lotes."
            );
        } finally {
            setLoading(false);
        }
    }, [applyDashboard, productId]);

    useEffect(() => {
        dispatch(fetchAllWarehouses());
        dispatch(fetchAllSuppliers());
    }, [dispatch]);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    useEffect(() => {
        if (!batchForm.warehouse_id && warehouseOptions[0]?.value) {
            setBatchForm((previous) => ({
                ...previous,
                warehouse_id: warehouseOptions[0].value,
            }));
        }
    }, [batchForm.warehouse_id, warehouseOptions]);

    const handleSettingsChange = (event) => {
        const { name, type, checked, value } = event.target;
        setSettingsForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleBatchInputChange = (event) => {
        const { name, value } = event.target;
        setBatchForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const saveSettings = async (event) => {
        event.preventDefault();

        try {
            setSavingSettings(true);
            setError("");
            const response = await apiConfig.put(
                `/products/${productId}/batch-settings`,
                {
                    track_batches: settingsForm.track_batches,
                    alert_days: Number(settingsForm.alert_days || 0),
                    deny_expired_sale: settingsForm.deny_expired_sale,
                }
            );
            applyDashboard(response?.data?.data || EMPTY_DASHBOARD);
            toast("Configuracion de lotes actualizada.");
        } catch (requestError) {
            const message =
                requestError?.response?.data?.message ||
                "No se pudo guardar la configuracion del producto.";
            setError(message);
            toast(message, toastType.ERROR);
        } finally {
            setSavingSettings(false);
        }
    };

    const createBatch = async (event) => {
        event.preventDefault();

        try {
            setSavingBatch(true);
            setError("");
            const response = await apiConfig.post(`/products/${productId}/batches`, {
                warehouse_id: Number(batchForm.warehouse_id || 0),
                purchase_supplier_id: Number(batchForm.purchase_supplier_id || 0),
                lote_fabricante: batchForm.lote_fabricante,
                lot_code: batchForm.lote_fabricante,
                lot_barcode: batchForm.lot_barcode,
                ubicacion: batchForm.ubicacion,
                quantity: Number(batchForm.quantity || 0),
                product_cost: Number(batchForm.product_cost || 0),
                product_price:
                    batchForm.product_price === "" || batchForm.product_price === null
                        ? Number(dashboard?.product?.product_price || 0) || null
                        : Number(batchForm.product_price || 0),
                received_at: batchForm.received_at,
                fecha_fabricacion: batchForm.fecha_fabricacion || null,
                fecha_vencimiento: batchForm.fecha_vencimiento || null,
                impuesto_tipo: batchForm.impuesto_tipo || "EXCLUSIVO",
                impuesto_valor:
                    batchForm.impuesto_valor === "" || batchForm.impuesto_valor === null
                        ? 0
                        : Number(batchForm.impuesto_valor || 0),
                descripcion: batchForm.descripcion,
            });
            applyDashboard(response?.data?.data || EMPTY_DASHBOARD);
            setBatchForm((previous) => ({
                ...createInitialBatchForm(
                    response?.data?.data?.draft?.next_codigo_lote_sistema || ""
                ),
                warehouse_id: previous.warehouse_id || warehouseOptions[0]?.value || "",
                purchase_supplier_id: previous.purchase_supplier_id || "",
            }));
            toast("Lote y compra registrados correctamente.");
        } catch (requestError) {
            const message =
                requestError?.response?.data?.message ||
                "No se pudo registrar el lote.";
            setError(message);
            toast(message, toastType.ERROR);
        } finally {
            setSavingBatch(false);
        }
    };

    const startEditingBatch = (batch) => {
        setEditingBatchId(batch.id);
        setBatchEditForm(createEditBatchForm(batch));
    };

    const cancelBatchEdit = () => {
        setEditingBatchId(null);
        setBatchEditForm(null);
    };

    const handleBatchEditChange = (event) => {
        const { name, value } = event.target;
        setBatchEditForm((previous) => ({
            ...(previous || {}),
            [name]: value,
        }));
    };

    const saveBatchChanges = async (event) => {
        event.preventDefault();

        if (!editingBatchId || !batchEditForm) {
            return;
        }

        try {
            setSavingBatchUpdate(true);
            setError("");
            const response = await apiConfig.put(
                `/products/${productId}/batches/${editingBatchId}`,
                {
                    lote_fabricante: batchEditForm.lote_fabricante,
                    ubicacion: batchEditForm.ubicacion,
                    descripcion: batchEditForm.descripcion,
                    fecha_fabricacion: batchEditForm.fecha_fabricacion || null,
                    fecha_vencimiento: batchEditForm.fecha_vencimiento || null,
                    impuesto_tipo: batchEditForm.impuesto_tipo || "EXCLUSIVO",
                    impuesto_valor:
                        batchEditForm.impuesto_valor === "" ||
                        batchEditForm.impuesto_valor === null
                            ? 0
                            : Number(batchEditForm.impuesto_valor || 0),
                    product_price:
                        batchEditForm.product_price === "" ||
                        batchEditForm.product_price === null
                            ? null
                            : Number(batchEditForm.product_price || 0),
                }
            );
            applyDashboard(response?.data?.data || EMPTY_DASHBOARD);
            cancelBatchEdit();
            toast("Lote actualizado correctamente.");
        } catch (requestError) {
            const message =
                requestError?.response?.data?.message ||
                "No se pudo actualizar el lote.";
            setError(message);
            toast(message, toastType.ERROR);
        } finally {
            setSavingBatchUpdate(false);
        }
    };

    const backLink = dashboard?.product?.main_product_id
        ? `/app/products/detail/${dashboard.product.main_product_id}`
        : "/app/products";
    const productImage = dashboard?.product?.image_url || "";
    const summary = dashboard?.summary || EMPTY_DASHBOARD.summary;
    const batches = dashboard?.batches || [];

    const statusCards = [
        {
            label: "Stock total",
            value: summary.total_stock,
            accent: "primary",
            formatter: (value) => `${Number(value || 0).toFixed(2)} u`,
        },
        {
            label: "Stock por lotes",
            value: summary.batch_stock,
            accent: "success",
            formatter: (value) => `${Number(value || 0).toFixed(2)} u`,
        },
        {
            label: "Lotes activos",
            value: summary.active_batches,
            accent: "primary",
            formatter: (value) => value,
        },
        {
            label: "Por vencer",
            value: summary.expiring_batches,
            accent: "warning",
            formatter: (value) => value,
        },
        {
            label: "Vencidos",
            value: summary.expired_batches,
            accent: "danger",
            formatter: (value) => value,
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Gestion de lotes" />
            <HeaderTitle title="Gestion de lotes" to={backLink} />

            {loading ? (
                <div className="card card-body">
                    <div className="d-flex align-items-center justify-content-center py-5">
                        <Spinner animation="border" variant="primary" />
                    </div>
                </div>
            ) : (
                <div className="batch-manager">
                    {error ? <Alert variant="danger">{error}</Alert> : null}

                    <section className="batch-manager__hero">
                        <div className="batch-manager__hero-main">
                            <div className="batch-manager__hero-media">
                                {productImage ? (
                                    <Image src={productImage} alt={dashboard?.product?.name} />
                                ) : (
                                    <div className="batch-manager__hero-placeholder">
                                        {dashboard?.product?.name?.charAt(0) || "P"}
                                    </div>
                                )}
                            </div>
                            <div className="batch-manager__hero-copy">
                                <Badge className="batch-manager__hero-badge">
                                    {settingsForm.track_batches
                                        ? "Control por lote activo"
                                        : "Control por lote inactivo"}
                                </Badge>
                                <h2>{dashboard?.product?.name || "Producto"}</h2>
                                <div className="batch-manager__hero-meta">
                                    <span>Codigo: {dashboard?.product?.code || "N/A"}</span>
                                    {dashboard?.product?.product_code &&
                                    dashboard?.product?.product_code !==
                                        dashboard?.product?.code ? (
                                        <span>
                                            Codigo secundario:{" "}
                                            {dashboard?.product?.product_code}
                                        </span>
                                    ) : null}
                                    <span>
                                        Precio: {money(dashboard?.product?.product_price || 0)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="batch-manager__hero-actions">
                            <Button
                                className="batch-manager__primary-btn"
                                onClick={() => navigate("/app/report/report-batch-expiry")}
                            >
                                Ver reporte de vencimientos
                            </Button>
                        </div>
                    </section>

                    {Number(summary.stock_difference || 0) !== 0 ? (
                        <Alert variant="warning" className="batch-manager__sync-alert">
                            El stock general y el stock por lotes no coinciden. Diferencia actual:{" "}
                            <strong>{Number(summary.stock_difference || 0).toFixed(2)}</strong>.
                        </Alert>
                    ) : null}

                    <Row className="g-3 mb-4">
                        {statusCards.map((card) => (
                            <Col lg={card.label === "Stock total" ? 4 : 2} md={4} sm={6} key={card.label}>
                                <article
                                    className={`batch-manager__summary-card batch-manager__summary-card--${card.accent}`}
                                >
                                    <span>{card.label}</span>
                                    <strong>{card.formatter(card.value)}</strong>
                                </article>
                            </Col>
                        ))}
                    </Row>

                    <Row className="g-4">
                        <Col xl={4}>
                            <section className="batch-manager__panel">
                                <div className="batch-manager__panel-header">
                                    <h4>Configuracion del producto</h4>
                                    <p>Activa control por lotes, alertas y bloqueo por vencimiento.</p>
                                </div>
                                <Form onSubmit={saveSettings}>
                                    <Form.Check
                                        type="switch"
                                        id="track-batches"
                                        name="track_batches"
                                        label="Activar control por lotes"
                                        className="mb-3"
                                        checked={settingsForm.track_batches}
                                        onChange={handleSettingsChange}
                                    />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Dias para alerta</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="alert_days"
                                            min="1"
                                            value={settingsForm.alert_days}
                                            onChange={handleSettingsChange}
                                        />
                                    </Form.Group>
                                    <Alert className="batch-manager__rule-alert mb-4">
                                        Venta de lotes vencidos: bloqueada siempre.
                                    </Alert>
                                    <Button
                                        type="submit"
                                        className="batch-manager__primary-btn w-100"
                                        disabled={savingSettings}
                                    >
                                        {savingSettings ? "Guardando..." : "Guardar configuracion"}
                                    </Button>
                                </Form>
                            </section>
                        </Col>

                        <Col xl={8}>
                            <section className="batch-manager__panel">
                                <div className="batch-manager__panel-header">
                                    <h4>Registrar lote</h4>
                                    <p>Ingresa lote, proveedor, costo, bodega, cantidad y fechas para alimentar el inventario.</p>
                                </div>
                                <Alert variant="info" className="mb-4">
                                    Este lote generara automaticamente una compra en el sistema.
                                </Alert>
                                <Form onSubmit={createBatch}>
                                    <Row className="g-3">
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Bodega</Form.Label>
                                                <Form.Select
                                                    name="warehouse_id"
                                                    value={batchForm.warehouse_id}
                                                    onChange={handleBatchInputChange}
                                                >
                                                    <option value="">Seleccione</option>
                                                    {warehouseOptions.map((warehouse) => (
                                                        <option key={warehouse.value} value={warehouse.value}>
                                                            {warehouse.label}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Proveedor</Form.Label>
                                                <Form.Select
                                                    name="purchase_supplier_id"
                                                    value={batchForm.purchase_supplier_id}
                                                    onChange={handleBatchInputChange}
                                                >
                                                    <option value="">Seleccione</option>
                                                    {supplierOptions.map((supplier) => (
                                                        <option key={supplier.value} value={supplier.value}>
                                                            {supplier.label}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Lote sistema</Form.Label>
                                                <Form.Control
                                                    name="codigo_lote_sistema"
                                                    value={
                                                        batchForm.codigo_lote_sistema ||
                                                        dashboard?.draft?.next_codigo_lote_sistema ||
                                                        "Autogenerado"
                                                    }
                                                    readOnly
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Lote fabricante</Form.Label>
                                                <Form.Control
                                                    name="lote_fabricante"
                                                    value={batchForm.lote_fabricante}
                                                    onChange={handleBatchInputChange}
                                                    placeholder="Lote impreso por el fabricante"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Barcode lote</Form.Label>
                                                <Form.Control
                                                    name="lot_barcode"
                                                    value={batchForm.lot_barcode}
                                                    onChange={handleBatchInputChange}
                                                    placeholder="Codigo escaneable"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Ubicacion</Form.Label>
                                                <Form.Control
                                                    name="ubicacion"
                                                    value={batchForm.ubicacion}
                                                    onChange={handleBatchInputChange}
                                                    placeholder="Pasillo / Estante / Gaveta"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Costo unitario</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="product_cost"
                                                    min="0.01"
                                                    step="0.01"
                                                    value={batchForm.product_cost}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Precio venta</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="product_price"
                                                    min="0.01"
                                                    step="0.01"
                                                    value={batchForm.product_price}
                                                    onChange={handleBatchInputChange}
                                                    placeholder={String(
                                                        dashboard?.product?.product_price || ""
                                                    )}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Cantidad</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="quantity"
                                                    min="0.01"
                                                    step="0.01"
                                                    value={batchForm.quantity}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Recibido</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="received_at"
                                                    value={batchForm.received_at}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Vence</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="fecha_vencimiento"
                                                    value={batchForm.fecha_vencimiento}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Fabricacion</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="fecha_fabricacion"
                                                    value={batchForm.fecha_fabricacion}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Tipo impuesto</Form.Label>
                                                <Form.Select
                                                    name="impuesto_tipo"
                                                    value={batchForm.impuesto_tipo}
                                                    onChange={handleBatchInputChange}
                                                >
                                                    <option value="EXCLUSIVO">EXCLUSIVO</option>
                                                    <option value="INCLUSIVO">INCLUSIVO</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group>
                                                <Form.Label>Impuesto %</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    name="impuesto_valor"
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    value={batchForm.impuesto_valor}
                                                    onChange={handleBatchInputChange}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            <Form.Group>
                                                <Form.Label>Descripcion</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="descripcion"
                                                    value={batchForm.descripcion}
                                                    onChange={handleBatchInputChange}
                                                    maxLength={1000}
                                                    placeholder="Observaciones legales, sanitarias o logisticas del lote"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12}>
                                            {!settingsForm.track_batches ? (
                                                <Alert variant="warning" className="mb-3">
                                                    Active primero el control por lotes para poder registrar existencias por lote.
                                                </Alert>
                                            ) : null}
                                            <Button
                                                type="submit"
                                                className="batch-manager__primary-btn"
                                                disabled={savingBatch || !settingsForm.track_batches}
                                            >
                                                {savingBatch ? "Registrando..." : "Registrar lote"}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </section>
                        </Col>
                    </Row>

                    <section className="batch-manager__list-panel">
                        <div className="batch-manager__panel-header">
                            <h4>Lotes registrados</h4>
                            <p>Vista rapida tipo farmacia para disponibilidad, alerta y vencimiento.</p>
                        </div>

                        {batches.length === 0 ? (
                            <div className="batch-manager__empty">
                                Aun no hay lotes registrados para este producto.
                            </div>
                        ) : (
                            <div className="batch-manager__batch-grid">
                                {batches.map((batch) => {
                                    const meta = getBatchStatusMeta(batch.status);

                                    return (
                                        <article
                                            key={batch.id}
                                            className={`batch-manager__batch-card batch-manager__batch-card--${meta.tone}`}
                                        >
                                            <div className="batch-manager__batch-top">
                                                <div>
                                                    <span className="batch-manager__lot-code">
                                                        [{batch.codigo_lote_sistema || batch.lot_code}]
                                                    </span>
                                                    <h5>{batch.warehouse_name || "Sin bodega"}</h5>
                                                </div>
                                                <span
                                                    className={`batch-manager__status-pill batch-manager__status-pill--${meta.tone}`}
                                                >
                                                    {batch.status_label}
                                                </span>
                                            </div>

                                            <div
                                                className={`batch-manager__batch-line batch-manager__batch-line--${meta.tone}`}
                                            >
                                                [{batch.codigo_lote_sistema || batch.lot_code}]{" "}
                                                {Number(batch.available_quantity || 0).toFixed(2)} unidades{" "}
                                                {batch.fecha_vencimiento || batch.expires_at
                                                    ? `Vence: ${batch.fecha_vencimiento || batch.expires_at}`
                                                    : "Sin fecha de vencimiento"}
                                            </div>

                                            <div className="batch-manager__batch-stats">
                                                <div>
                                                    <span>Disponible</span>
                                                    <strong>{Number(batch.available_quantity || 0).toFixed(2)} u</strong>
                                                </div>
                                                <div>
                                                    <span>Recibido</span>
                                                    <strong>{Number(batch.received_quantity || 0).toFixed(2)} u</strong>
                                                </div>
                                                <div>
                                                    <span>Vence</span>
                                                    <strong>{batch.fecha_vencimiento || batch.expires_at || "Sin fecha"}</strong>
                                                </div>
                                                <div>
                                                    <span>Dias</span>
                                                    <strong>
                                                        {batch.days_remaining === null
                                                            ? "N/A"
                                                            : batch.days_remaining}
                                                    </strong>
                                                </div>
                                            </div>

                                            {batch.lot_barcode ? (
                                                <div className="batch-manager__batch-barcode">
                                                    Barcode: {batch.lot_barcode}
                                                </div>
                                            ) : null}
                                            {batch.lote_fabricante ? (
                                                <div className="batch-manager__batch-barcode">
                                                    Fabricante: {batch.lote_fabricante}
                                                </div>
                                            ) : null}
                                            {batch.ubicacion ? (
                                                <div className="batch-manager__batch-barcode">
                                                    Ubicacion: {batch.ubicacion}
                                                </div>
                                            ) : null}
                                            <div className="batch-manager__batch-barcode">
                                                Impuesto: {batch.impuesto_tipo || "EXCLUSIVO"}{" "}
                                                {Number(batch.impuesto_valor || 0).toFixed(2)}%
                                            </div>
                                            <div className="batch-manager__batch-barcode">
                                                Compra: {money(batch.product_cost || 0)} | Venta:{" "}
                                                {batch.product_price !== null &&
                                                batch.product_price !== undefined
                                                    ? money(batch.product_price)
                                                    : "N/A"}
                                            </div>
                                            {batch.descripcion || batch.note ? (
                                                <p className="batch-manager__batch-note">
                                                    {batch.descripcion || batch.note}
                                                </p>
                                            ) : null}
                                            <div className="d-flex gap-2 mt-3">
                                                <Button
                                                    variant="outline-primary"
                                                    size="sm"
                                                    onClick={() => startEditingBatch(batch)}
                                                >
                                                    Editar lote
                                                </Button>
                                            </div>
                                            {editingBatchId === batch.id && batchEditForm ? (
                                                <Form className="mt-3" onSubmit={saveBatchChanges}>
                                                    <Row className="g-2">
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Lote fabricante</Form.Label>
                                                                <Form.Control
                                                                    name="lote_fabricante"
                                                                    value={batchEditForm.lote_fabricante}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Ubicacion</Form.Label>
                                                                <Form.Control
                                                                    name="ubicacion"
                                                                    value={batchEditForm.ubicacion}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Fecha fabricacion</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="fecha_fabricacion"
                                                                    value={batchEditForm.fecha_fabricacion}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Fecha vencimiento</Form.Label>
                                                                <Form.Control
                                                                    type="date"
                                                                    name="fecha_vencimiento"
                                                                    value={batchEditForm.fecha_vencimiento}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Tipo impuesto</Form.Label>
                                                                <Form.Select
                                                                    name="impuesto_tipo"
                                                                    value={batchEditForm.impuesto_tipo}
                                                                    onChange={handleBatchEditChange}
                                                                >
                                                                    <option value="EXCLUSIVO">EXCLUSIVO</option>
                                                                    <option value="INCLUSIVO">INCLUSIVO</option>
                                                                </Form.Select>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Impuesto %</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0"
                                                                    max="100"
                                                                    step="0.01"
                                                                    name="impuesto_valor"
                                                                    value={batchEditForm.impuesto_valor}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Precio venta</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    min="0.01"
                                                                    step="0.01"
                                                                    name="product_price"
                                                                    value={batchEditForm.product_price}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label>Cantidad recibida</Form.Label>
                                                                <Form.Control
                                                                    value={Number(
                                                                        batch.received_quantity || 0
                                                                    ).toFixed(2)}
                                                                    readOnly
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <Form.Group>
                                                                <Form.Label>Descripcion</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    rows={3}
                                                                    maxLength={1000}
                                                                    name="descripcion"
                                                                    value={batchEditForm.descripcion}
                                                                    onChange={handleBatchEditChange}
                                                                />
                                                            </Form.Group>
                                                        </Col>
                                                        <Col xs={12}>
                                                            <div className="small text-muted mb-2">
                                                                Stock disponible:{" "}
                                                                {Number(
                                                                    batch.available_quantity || 0
                                                                ).toFixed(2)}{" "}
                                                                u. Cantidad y stock son solo lectura.
                                                            </div>
                                                            <div className="d-flex gap-2">
                                                                <Button
                                                                    type="submit"
                                                                    size="sm"
                                                                    className="batch-manager__primary-btn"
                                                                    disabled={savingBatchUpdate}
                                                                >
                                                                    {savingBatchUpdate
                                                                        ? "Guardando..."
                                                                        : "Guardar cambios"}
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="outline-secondary"
                                                                    size="sm"
                                                                    onClick={cancelBatchEdit}
                                                                    disabled={savingBatchUpdate}
                                                                >
                                                                    Cancelar
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            ) : null}
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            )}
        </MasterLayout>
    );
};

export default ProductBatchManager;
