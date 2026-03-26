import React from "react";
import { useIntl } from "react-intl";
import { Alert, InputGroup } from "react-bootstrap-v5";

const ProductBatchDraftSection = ({
    batchDrafts,
    errors,
    frontSetting,
    onAddBatch,
    onBatchChange,
    onRemoveBatch,
    batchFieldErrorKey,
    decimalValidate,
}) => {
    const intl = useIntl();

    return (
        <div className="product-batch-draft mt-3">
            <div className="product-batch-draft__header">
                <div>
                    <span className="product-batch-draft__eyebrow">
                        {intl.formatMessage({
                            id: "product.batch.section.eyebrow",
                            defaultMessage: "Producto por lote",
                        })}
                    </span>
                    <h3 className="product-batch-draft__title">
                        {intl.formatMessage({
                            id: "product.batch.section.title",
                            defaultMessage: "Lotes iniciales",
                        })}
                    </h3>
                    <p className="product-batch-draft__subtitle">
                        {intl.formatMessage({
                            id: "product.batch.section.subtitle",
                            defaultMessage:
                                "Organiza los lotes con precios, fabricacion y vencimiento desde el alta del producto.",
                        })}
                    </p>
                </div>
                <button
                    type="button"
                    className="product-batch-draft__add-btn"
                    onClick={onAddBatch}
                >
                    +{" "}
                    {intl.formatMessage({
                        id: "product.batch.section.add",
                        defaultMessage: "Agregar lote",
                    })}
                </button>
            </div>

            {errors["batch_data"] ? (
                <span className="text-danger d-block fw-400 fs-small mb-3">
                    {errors["batch_data"]}
                </span>
            ) : null}

            <Alert variant="info" className="mb-3">
                {intl.formatMessage({
                    id: "product.batch.section.auto_purchase_notice",
                    defaultMessage:
                        "Este lote generara automaticamente una compra en el sistema",
                })}
            </Alert>

            <div className="product-batch-draft__list">
                {batchDrafts.map((batch) => (
                    <div className="product-batch-draft__card" key={batch.id}>
                        <div className="product-batch-draft__card-head">
                            <div className="product-batch-draft__card-meta">
                                <span className="product-batch-draft__code-badge">
                                    [{batch.codigo_lote_sistema || batch.codigo_lote_sistema_preview}]
                                </span>
                                <span className="product-batch-draft__chip">
                                    {intl.formatMessage({
                                        id: "product.batch.card.auto",
                                        defaultMessage: "Auto",
                                    })}
                                </span>
                            </div>
                            <div className="product-batch-draft__actions">
                                <button
                                    type="button"
                                    className="product-batch-draft__remove-btn"
                                    onClick={() => onRemoveBatch(batch.id)}
                                    disabled={batchDrafts.length === 1}
                                >
                                    {intl.formatMessage({
                                        id: "globally.remove.button",
                                        defaultMessage: "Quitar",
                                    })}
                                </button>
                            </div>
                        </div>

                        {errors[batchFieldErrorKey(batch.id, "lote_fabricante")] ? (
                            <span className="text-danger d-block fw-400 fs-small mb-3">
                                {errors[batchFieldErrorKey(batch.id, "lote_fabricante")]}
                            </span>
                        ) : null}

                        <div className="row g-3">
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.codigo_lote_sistema",
                                        defaultMessage: "Lote sistema",
                                    })}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        batch.codigo_lote_sistema ||
                                        batch.codigo_lote_sistema_preview ||
                                        "Autogenerado al guardar"
                                    }
                                    readOnly
                                />
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.lote_fabricante",
                                        defaultMessage: "Lote fabricante",
                                    })}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={batch.lote_fabricante}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "lote_fabricante",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "lote_fabricante")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.lot_barcode",
                                        defaultMessage: "Codigo de barras",
                                    })}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={batch.lot_barcode}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "lot_barcode",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "lot_barcode")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.ubicacion",
                                        defaultMessage: "Ubicacion",
                                    })}
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={batch.ubicacion}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "ubicacion",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "ubicacion")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.quantity",
                                        defaultMessage: "Cantidad",
                                    })}
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    step="0.01"
                                    className="form-control"
                                    value={batch.quantity}
                                    onKeyPress={decimalValidate}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "quantity")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.product_cost",
                                        defaultMessage: "Precio compra",
                                    })}
                                </label>
                                <InputGroup>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={batch.product_cost}
                                        onKeyPress={decimalValidate}
                                        onChange={(e) =>
                                            onBatchChange(
                                                batch.id,
                                                "product_cost",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputGroup.Text>
                                        {frontSetting.value &&
                                            frontSetting.value.currency_symbol}
                                    </InputGroup.Text>
                                </InputGroup>
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "product_cost")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.product_price",
                                        defaultMessage: "Precio venta",
                                    })}
                                </label>
                                <InputGroup>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={batch.product_price}
                                        onKeyPress={decimalValidate}
                                        onChange={(e) =>
                                            onBatchChange(
                                                batch.id,
                                                "product_price",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputGroup.Text>
                                        {frontSetting.value &&
                                            frontSetting.value.currency_symbol}
                                    </InputGroup.Text>
                                </InputGroup>
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "product_price")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.impuesto_tipo",
                                        defaultMessage: "Tipo impuesto",
                                    })}
                                </label>
                                <select
                                    className="form-select"
                                    value={batch.impuesto_tipo}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "impuesto_tipo",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="EXCLUSIVO">EXCLUSIVO</option>
                                    <option value="INCLUSIVO">INCLUSIVO</option>
                                </select>
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "impuesto_tipo")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.impuesto_valor",
                                        defaultMessage: "Impuesto %",
                                    })}
                                </label>
                                <InputGroup>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className="form-control"
                                        value={batch.impuesto_valor}
                                        onKeyPress={decimalValidate}
                                        onChange={(e) =>
                                            onBatchChange(
                                                batch.id,
                                                "impuesto_valor",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputGroup.Text>%</InputGroup.Text>
                                </InputGroup>
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "impuesto_valor")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.fecha_fabricacion",
                                        defaultMessage: "Fecha fabricacion",
                                    })}
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={batch.fecha_fabricacion}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "fecha_fabricacion",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "fecha_fabricacion")]}
                                </span>
                            </div>
                            <div className="col-xl-4 col-md-6">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.fecha_vencimiento",
                                        defaultMessage: "Fecha vencimiento",
                                    })}
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={batch.fecha_vencimiento}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "fecha_vencimiento",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "fecha_vencimiento")]}
                                </span>
                            </div>
                            <div className="col-12">
                                <label className="form-label">
                                    {intl.formatMessage({
                                        id: "product.batch.field.descripcion",
                                        defaultMessage: "Descripcion",
                                    })}
                                </label>
                                <textarea
                                    className="form-control"
                                    rows={3}
                                    value={batch.descripcion}
                                    onChange={(e) =>
                                        onBatchChange(
                                            batch.id,
                                            "descripcion",
                                            e.target.value
                                        )
                                    }
                                />
                                <span className="text-danger d-block fw-400 fs-small mt-2">
                                    {errors[batchFieldErrorKey(batch.id, "descripcion")]}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductBatchDraftSection;
