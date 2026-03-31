import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner, Table } from "react-bootstrap-v5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../../config/apiConfig";
import MasterLayout from "../../MasterLayout";
import HeaderTitle from "../../header/HeaderTitle";
import TabTitle from "../../../shared/tab-title/TabTitle";
import TopProgressBar from "../../../shared/components/loaders/TopProgressBar";
import { apiBaseURL, toastType } from "../../../constants";
import { addToast } from "../../../store/action/toastAction";
import { fetchAllWarehouses } from "../../../store/action/warehouseAction";
import { getBatchStatusMeta } from "../../../shared/batchHelpers";
import { can } from "../../../shared/can";

const STATUS_OPTIONS = [
    { value: "alerts", label: "Alertas" },
    { value: "today", label: "Hoy" },
    { value: "upcoming", label: "Proximos dias" },
    { value: "expired", label: "Vencidos" },
];

const BatchExpiryReport = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const warehouses = useSelector((state) => state.warehouses);
    const canViewBatches = can("ver_lotes", { strict: true });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [rows, setRows] = useState([]);
    const [filters, setFilters] = useState({
        status: "alerts",
        days: 30,
        warehouse_id: "",
    });

    const warehouseOptions = useMemo(() => {
        if (!Array.isArray(warehouses)) {
            return [];
        }

        return warehouses.map((warehouse) => ({
            value: String(warehouse.id),
            label: warehouse?.attributes?.name || warehouse?.name || `Bodega ${warehouse.id}`,
        }));
    }, [warehouses]);

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

    const loadReport = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const response = await apiConfig.get(apiBaseURL.PRODUCT_BATCH_REPORT, {
                params: {
                    status: filters.status,
                    days: Number(filters.days || 0),
                    ...(filters.warehouse_id
                        ? { warehouse_id: Number(filters.warehouse_id) }
                        : {}),
                },
            });
            setRows(response?.data?.data || []);
        } catch (requestError) {
            const message =
                requestError?.response?.data?.message ||
                "No se pudo cargar el reporte de vencimientos.";
            setError(message);
            toast(message, toastType.ERROR);
        } finally {
            setLoading(false);
        }
    }, [filters.days, filters.status, filters.warehouse_id, toast]);

    useEffect(() => {
        dispatch(fetchAllWarehouses());
    }, [dispatch]);

    useEffect(() => {
        loadReport();
    }, [loadReport]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const summary = useMemo(() => {
        return rows.reduce(
            (accumulator, row) => {
                if (row.status === "expired") {
                    accumulator.expired += 1;
                } else if (row.status === "expiring") {
                    accumulator.expiring += 1;
                } else {
                    accumulator.available += 1;
                }

                return accumulator;
            },
            { expired: 0, expiring: 0, available: 0 }
        );
    }, [rows]);

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Reporte de vencimientos" />
            <HeaderTitle title="Reporte de vencimientos" to="/app/products" />

            <div className="batch-expiry-report">
                <section className="batch-expiry-report__toolbar">
                    <Row className="g-3 align-items-end">
                        <Col lg={3} md={6}>
                            <Form.Group>
                                <Form.Label>Vista</Form.Label>
                                <Form.Select
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                >
                                    {STATUS_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={3} md={6}>
                            <Form.Group>
                                <Form.Label>Bodega</Form.Label>
                                <Form.Select
                                    name="warehouse_id"
                                    value={filters.warehouse_id}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Todas</option>
                                    {warehouseOptions.map((warehouse) => (
                                        <option key={warehouse.value} value={warehouse.value}>
                                            {warehouse.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col lg={2} md={6}>
                            <Form.Group>
                                <Form.Label>Proximos dias</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="180"
                                    name="days"
                                    value={filters.days}
                                    onChange={handleFilterChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={2} md={6}>
                            <Button
                                className="batch-manager__primary-btn w-100"
                                onClick={loadReport}
                            >
                                Actualizar
                            </Button>
                        </Col>
                    </Row>
                </section>

                {error ? <Alert variant="danger">{error}</Alert> : null}

                <Row className="g-3 mb-4">
                    <Col md={4}>
                        <article className="batch-expiry-report__summary batch-expiry-report__summary--danger">
                            <span>Vencidos</span>
                            <strong>{summary.expired}</strong>
                        </article>
                    </Col>
                    <Col md={4}>
                        <article className="batch-expiry-report__summary batch-expiry-report__summary--warning">
                            <span>Por vencer</span>
                            <strong>{summary.expiring}</strong>
                        </article>
                    </Col>
                    <Col md={4}>
                        <article className="batch-expiry-report__summary batch-expiry-report__summary--primary">
                            <span>Normales</span>
                            <strong>{summary.available}</strong>
                        </article>
                    </Col>
                </Row>

                <section className="batch-expiry-report__table-card">
                    {loading ? (
                        <div className="batch-expiry-report__loading">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="batch-manager__empty">
                            No hay lotes para el filtro seleccionado.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table className="mb-0 batch-expiry-report__table">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Lote</th>
                                        <th>Ubicacion</th>
                                        <th>Fechas</th>
                                        <th>Impuesto</th>
                                        <th>Bodega</th>
                                        <th>Cantidad</th>
                                        <th>Dias</th>
                                        <th>Estado</th>
                                        <th className="text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row) => {
                                        const meta = getBatchStatusMeta(row.status);

                                        return (
                                            <tr key={row.id} className={`batch-expiry-report__row batch-expiry-report__row--${meta.tone}`}>
                                                <td>
                                                    <div className="fw-bold text-gray-900">
                                                        {row.product_name}
                                                    </div>
                                                    <small className="text-gray-700">
                                                        {row.product_code}
                                                    </small>
                                                </td>
                                                <td>
                                                    <span className="batch-expiry-report__lot">
                                                        {row.codigo_lote_sistema || row.lot_code}
                                                    </span>
                                                    {row.lote_fabricante ? (
                                                        <small className="d-block text-gray-700">
                                                            Fab: {row.lote_fabricante}
                                                        </small>
                                                    ) : null}
                                                    {row.lot_barcode ? (
                                                        <small className="d-block text-gray-700">
                                                            {row.lot_barcode}
                                                        </small>
                                                    ) : null}
                                                </td>
                                                <td>{row.ubicacion || "Sin ubicacion"}</td>
                                                <td>
                                                    <div>
                                                        Fab: {row.fecha_fabricacion || "N/A"}
                                                    </div>
                                                    <small className="text-gray-700">
                                                        Vence: {row.fecha_vencimiento || row.expires_at || "N/A"}
                                                    </small>
                                                </td>
                                                <td>
                                                    {row.impuesto_tipo || "EXCLUSIVO"}{" "}
                                                    {Number(row.impuesto_valor || 0).toFixed(2)}%
                                                </td>
                                                <td>{row.warehouse_name}</td>
                                                <td>{Number(row.available_quantity || 0).toFixed(2)}</td>
                                                <td>
                                                    {row.days_remaining === null
                                                        ? "N/A"
                                                        : row.days_remaining}
                                                </td>
                                                <td>
                                                    <span
                                                        className={`batch-manager__status-pill batch-manager__status-pill--${meta.tone}`}
                                                    >
                                                        {row.status_label}
                                                    </span>
                                                </td>
                                                <td className="text-end">
                                                    {canViewBatches ? (
                                                        <Button
                                                            variant="light"
                                                            className="batch-expiry-report__action-btn"
                                                            onClick={() =>
                                                                navigate(`/app/products/batches/${row.product_id}`)
                                                            }
                                                        >
                                                            Gestionar lotes
                                                        </Button>
                                                    ) : null}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </section>
            </div>
        </MasterLayout>
    );
};

export default BatchExpiryReport;
