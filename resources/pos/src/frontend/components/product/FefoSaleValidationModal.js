import React from "react";
import { Badge, Button, Modal } from "react-bootstrap-v5";

const FefoSaleValidationModal = ({
    show,
    productName,
    selectedBatches = [],
    recommendedBatches = [],
    onCancel,
    onConfirm,
}) => {
    return (
        <Modal
            show={show}
            onHide={onCancel}
            centered
            className="pos-fefo-guard"
        >
            <Modal.Header closeButton>
                <div className="pos-fefo-guard__header">
                    <span className="pos-fefo-guard__eyebrow">Validacion FEFO</span>
                    <Modal.Title>{productName || "Producto con lotes"}</Modal.Title>
                </div>
            </Modal.Header>
            <Modal.Body className="pos-fefo-guard__body">
                <div className="pos-fefo-guard__alert">
                    Este no es el lote recomendado por prioridad FEFO. Desea continuar?
                </div>

                <div className="pos-fefo-guard__grid">
                    <div className="pos-fefo-guard__panel">
                        <strong className="pos-fefo-guard__panel-title">
                            Lote seleccionado
                        </strong>
                        <div className="pos-fefo-guard__list">
                            {selectedBatches.map((batch) => (
                                <div
                                    key={`selected-${batch.batch_id || batch.id || batch.lot_code}`}
                                    className="pos-fefo-guard__item"
                                >
                                    <Badge className="pos-fefo-guard__badge pos-fefo-guard__badge--selected">
                                        {batch.lot_code || "Sin lote"}
                                    </Badge>
                                    <span>Cantidad: {Number(batch.quantity || 0).toFixed(2)}</span>
                                    <span>
                                        {batch.expires_at
                                            ? `Vence: ${batch.expires_at}`
                                            : "Sin vencimiento"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pos-fefo-guard__panel">
                        <strong className="pos-fefo-guard__panel-title">
                            Orden recomendado FEFO
                        </strong>
                        <div className="pos-fefo-guard__list">
                            {recommendedBatches.map((batch) => (
                                <div
                                    key={`recommended-${batch.batch_id || batch.id || batch.lot_code}`}
                                    className="pos-fefo-guard__item"
                                >
                                    <Badge className="pos-fefo-guard__badge pos-fefo-guard__badge--recommended">
                                        {batch.lot_code || "Sin lote"}
                                    </Badge>
                                    <span>Cantidad: {Number(batch.quantity || 0).toFixed(2)}</span>
                                    <span>
                                        {batch.expires_at
                                            ? `Vence: ${batch.expires_at}`
                                            : "Sin vencimiento"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="pos-fefo-guard__footer">
                <Button variant="light" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button className="pos-fefo-guard__confirm-btn" onClick={onConfirm}>
                    Continuar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FefoSaleValidationModal;
