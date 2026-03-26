import React, { useEffect, useMemo, useState } from "react";
import { Badge, Button, Modal, Spinner } from "react-bootstrap-v5";
import { useIntl } from "react-intl";
import apiConfig from "../../../config/apiConfig";
import {
    getBatchStatusMeta,
    getCartProductId,
    sortBatchesByFefo,
} from "../../../shared/batchHelpers";

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
                            defaultMessage: "No se pudieron cargar los lotes del producto.",
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

            const batchId = Number(cartItem?.batch_id || 0);
            if (!batchId) {
                return carry;
            }

            return {
                ...carry,
                [batchId]: Number(carry[batchId] || 0) + Number(cartItem?.quantity || 0),
            };
        }, {});

        return sortBatchesByFefo(
            batches
                .filter(
                    (batch) =>
                        Number(batch.warehouse_id) === Number(warehouseId) &&
                        batch.status !== "expired"
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
                        effective_available_quantity: effectiveAvailableQuantity,
                    };
                })
                .filter((batch) => Number(batch.effective_available_quantity || 0) > 0)
        );
    }, [cartProducts, dashboard, product?.id, warehouseId]);

    const fifoAvailable = warehouseBatches.length > 0;
    const preferredBatchId = Number(warehouseBatches[0]?.id || 0) || null;

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
                            const isPreferred = Number(batch.id) === preferredBatchId;

                            return (
                                <div
                                    key={batch.id}
                                    className={`pos-batch-picker__item pos-batch-picker__item--${meta.tone}`}
                                >
                                    <div className="pos-batch-picker__item-top">
                                        <div className="pos-batch-picker__item-title">
                                            <span className="pos-batch-picker__lot-code">
                                                {batch.lot_code}
                                            </span>
                                            <Badge
                                                className={`pos-batch-picker__status pos-batch-picker__status--${meta.tone}`}
                                            >
                                                {meta.label}
                                            </Badge>
                                            {isPreferred ? (
                                                <Badge className="pos-batch-picker__priority-badge">
                                                    FEFO
                                                </Badge>
                                            ) : null}
                                        </div>
                                        <Button
                                            type="button"
                                            className="pos-batch-picker__select-btn"
                                            onClick={() => onSelectBatch(batch)}
                                            disabled={isExpired}
                                        >
                                            {isExpired
                                                ? intl.formatMessage({
                                                      id: "pos.batch.modal.expired",
                                                      defaultMessage: "Vencido",
                                                  })
                                                : intl.formatMessage({
                                                      id: "pos.batch.modal.select",
                                                      defaultMessage: "Usar lote",
                                                  })}
                                        </Button>
                                    </div>
                                    <div className="pos-batch-picker__meta">
                                        <span>
                                            {intl.formatMessage({
                                                id: "pos-qty.title",
                                                defaultMessage: "Cantidad",
                                            })}
                                            : {Number(
                                                batch.effective_available_quantity || 0
                                            ).toFixed(2)}
                                        </span>
                                        <span>
                                            {batch.expires_at
                                                ? `Vence: ${batch.expires_at}`
                                                : intl.formatMessage({
                                                      id: "pos.batch.modal.no_expiry",
                                                      defaultMessage: "Sin vencimiento",
                                                  })}
                                        </span>
                                    </div>
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
                {fifoAvailable ? (
                    <Button
                        type="button"
                        className="pos-batch-picker__fifo-btn"
                        onClick={() => onUseFifo(product)}
                    >
                        {intl.formatMessage({
                            id: "pos.batch.modal.fifo",
                            defaultMessage: "Usar FEFO",
                        })}
                    </Button>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
};

export default ProductBatchSelectionModal;
