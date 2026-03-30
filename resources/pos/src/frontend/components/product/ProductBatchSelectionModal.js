import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Modal, Spinner } from "react-bootstrap-v5";
import { useIntl } from "react-intl";
import apiConfig from "../../../config/apiConfig";
import {
    getBatchStatusMeta,
    getCartProductId,
    sortBatchesByFefo,
} from "../../../shared/batchHelpers";

const roundBatchQuantity = (value) => Number(Number(value || 0).toFixed(2));

const resolveBatchCode = (batch = {}) =>
    batch?.codigo_lote_sistema ||
    batch?.lot_code ||
    batch?.lote_fabricante ||
    `Lote #${Number(batch?.id || 0) || "?"}`;

const ProductBatchSelectionModal = ({
    show,
    product,
    warehouseId,
    cartProducts = [],
    onHide,
    onSelectBatch,
    onUseFifo,
}) => {
    const intl = useIntl();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        let active = true;

        if (!show || !product?.id || !warehouseId) {
            setDashboard(null);
            setError("");
            setLoading(false);
            return undefined;
        }

        const fetchBatches = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await apiConfig.get(`/products/${product.id}/batches`);
                if (!active) {
                    return;
                }

                setDashboard(response?.data?.data || null);
            } catch (fetchError) {
                if (!active) {
                    return;
                }

                setError(
                    fetchError?.response?.data?.message ||
                        intl.formatMessage({
                            id: "pos.batch.modal.error",
                            defaultMessage:
                                "No se pudieron cargar los lotes del producto.",
                        })
                );
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchBatches();

        return () => {
            active = false;
        };
    }, [show, product?.id, warehouseId, intl]);

    const warehouseBatches = useMemo(() => {
        const batches = dashboard?.batches || [];
        const reservedQuantities = cartProducts.reduce((carry, cartItem) => {
            if (getCartProductId(cartItem) !== Number(product?.id || 0)) {
                return carry;
            }

            const batchId = Number(
                cartItem?.product_batch_id || cartItem?.batch_id || 0
            );
            if (!batchId) {
                return carry;
            }

            return {
                ...carry,
                [batchId]:
                    Number(carry[batchId] || 0) + Number(cartItem?.quantity || 0),
            };
        }, {});

        return sortBatchesByFefo(
            batches
                .filter(
                    (batch) => Number(batch.warehouse_id) === Number(warehouseId)
                )
                .map((batch) => {
                    const reservedQuantity = Number(
                        reservedQuantities[Number(batch.id)] || 0
                    );
                    const effectiveAvailableQuantity = Math.max(
                        Number(batch.available_quantity || 0) - reservedQuantity,
                        0
                    );

                    return {
                        ...batch,
                        effective_available_quantity: roundBatchQuantity(
                            effectiveAvailableQuantity
                        ),
                        reserved_quantity: roundBatchQuantity(reservedQuantity),
                    };
                })
        );
    }, [cartProducts, dashboard, product?.id, warehouseId]);

    const sellableBatches = useMemo(
        () =>
            warehouseBatches.filter(
                (batch) =>
                    batch.status !== "expired" &&
                    Number(batch.effective_available_quantity || 0) > 0
            ),
        [warehouseBatches]
    );

    const preferredBatchId = Number(sellableBatches[0]?.id || 0) || null;
    const largestStockBatchId = useMemo(() => {
        const candidate = [...sellableBatches].sort(
            (leftBatch, rightBatch) =>
                Number(rightBatch.effective_available_quantity || 0) -
                Number(leftBatch.effective_available_quantity || 0)
        )[0];

        return Number(candidate?.id || 0) || null;
    }, [sellableBatches]);
    const newestBatchId = useMemo(() => {
        const candidate = [...sellableBatches].sort((leftBatch, rightBatch) => {
            const leftReceived = leftBatch?.received_at
                ? new Date(leftBatch.received_at).getTime()
                : 0;
            const rightReceived = rightBatch?.received_at
                ? new Date(rightBatch.received_at).getTime()
                : 0;

            return rightReceived - leftReceived;
        })[0];

        return Number(candidate?.id || 0) || null;
    }, [sellableBatches]);

    const preferredBatch =
        warehouseBatches.find((batch) => Number(batch.id) === preferredBatchId) ||
        null;

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
            className="pos-batch-picker"
        >
            <Modal.Header closeButton>
                <div className="pos-batch-picker__title-wrap">
                    <span className="pos-batch-picker__eyebrow">
                        {intl.formatMessage({
                            id: "pos.batch.modal.eyebrow",
                            defaultMessage: "Producto con lotes",
                        })}
                    </span>
                    <Modal.Title>
                        {product?.attributes?.name ||
                            intl.formatMessage({
                                id: "product.title",
                                defaultMessage: "Producto",
                            })}
                    </Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body className="pos-batch-picker__body">
                {loading ? (
                    <div className="pos-batch-picker__state">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : error ? (
                    <div className="pos-batch-picker__state pos-batch-picker__state--error">
                        {error}
                    </div>
                ) : warehouseBatches.length === 0 ? (
                    <div className="pos-batch-picker__state">
                        {intl.formatMessage({
                            id: "pos.batch.modal.empty",
                            defaultMessage:
                                "No hay lotes disponibles para la bodega seleccionada.",
                        })}
                    </div>
                ) : (
                    <div className="pos-batch-picker__list">
                        {warehouseBatches.map((batch) => {
                            const meta = getBatchStatusMeta(batch.status);
                            const isExpired = batch.status === "expired";
                            const isWithoutStock =
                                Number(batch.effective_available_quantity || 0) <= 0;
                            const isDisabled = isExpired || isWithoutStock;
                            const isPreferred =
                                Number(batch.id) === Number(preferredBatchId);
                            const isLargestStock =
                                Number(batch.id) === Number(largestStockBatchId);
                            const isNewest =
                                Number(batch.id) === Number(newestBatchId);
                            const hasReservedQty =
                                Number(batch.reserved_quantity || 0) > 0;

                            return (
                                <div
                                    key={batch.id}
                                    className={`pos-batch-picker__item pos-batch-picker__item--${meta.tone}`}
                                >
                                    <div className="pos-batch-picker__item-top">
                                        <div className="pos-batch-picker__item-title">
                                            <span className="pos-batch-picker__lot-code">
                                                {resolveBatchCode(batch)}
                                            </span>
                                            <Badge
                                                className={`pos-batch-picker__status pos-batch-picker__status--${meta.tone}`}
                                            >
                                                {batch.status_label || meta.label}
                                            </Badge>
                                            {isPreferred ? (
                                                <Badge className="pos-batch-picker__priority-badge">
                                                    Recomendado
                                                </Badge>
                                            ) : null}
                                            {isLargestStock ? (
                                                <Badge className="pos-batch-picker__secondary-badge">
                                                    Mayor stock
                                                </Badge>
                                            ) : null}
                                            {isNewest ? (
                                                <Badge className="pos-batch-picker__secondary-badge pos-batch-picker__secondary-badge--new">
                                                    Más reciente
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="button"
                                            className="pos-batch-picker__select-btn"
                                            onClick={() => onSelectBatch(batch)}
                                            disabled={isDisabled}
                                        >
                                            {isExpired
                                                ? intl.formatMessage({
                                                      id: "pos.batch.modal.expired",
                                                      defaultMessage: "Vencido",
                                                  })
                                                : isWithoutStock
                                                ? "Sin stock"
                                                : intl.formatMessage({
                                                      id: "pos.batch.modal.select",
                                                      defaultMessage: "Usar lote",
                                                  })}
                                        </Button>
                                    </div>

                                    <div className="pos-batch-picker__meta-grid">
                                        <div className="pos-batch-picker__meta-card">
                                            <span>Stock lote</span>
                                            <strong>
                                                {roundBatchQuantity(
                                                    batch.available_quantity || 0
                                                )}
                                            </strong>
                                        </div>
                                        <div className="pos-batch-picker__meta-card">
                                            <span>Disponible aquí</span>
                                            <strong>
                                                {roundBatchQuantity(
                                                    batch.effective_available_quantity || 0
                                                )}
                                            </strong>
                                        </div>
                                        <div className="pos-batch-picker__meta-card">
                                            <span>Ingreso</span>
                                            <strong>
                                                {batch.received_at || "Sin fecha"}
                                            </strong>
                                        </div>
                                        <div className="pos-batch-picker__meta-card">
                                            <span>Vencimiento</span>
                                            <strong>
                                                {batch.expires_at || "Sin vencimiento"}
                                            </strong>
                                        </div>
                                        {batch.product_price !== null &&
                                        batch.product_price !== undefined &&
                                        Number.isFinite(Number(batch.product_price)) ? (
                                            <div className="pos-batch-picker__meta-card">
                                                <span>Precio</span>
                                                <strong>{Number(batch.product_price).toFixed(2)}</strong>
                                            </div>
                                        ) : null}
                                        <div className="pos-batch-picker__meta-card">
                                            <span>Fabricante</span>
                                            <strong>
                                                {batch.lote_fabricante || "No definido"}
                                            </strong>
                                        </div>
                                    </div>

                                    {hasReservedQty ? (
                                        <div className="pos-batch-picker__notice">
                                            Reservado en esta cotización:{" "}
                                            {roundBatchQuantity(
                                                batch.reserved_quantity || 0
                                            )}
                                        </div>
                                    ) : null}
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="pos-batch-picker__footer">
                <Button variant="light" onClick={onHide}>
                    {intl.formatMessage({
                        id: "globally.cancel.button",
                        defaultMessage: "Cancelar",
                    })}
                </Button>
                {preferredBatch ? (
                    <Button
                        type="button"
                        className="pos-batch-picker__fifo-btn"
                        onClick={() => onUseFifo(product, preferredBatch)}
                    >
                        Usar recomendado
                    </Button>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
};

export default ProductBatchSelectionModal;
