import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductModal from "./ProductModal";
import {
    taxAmountMultiply,
    discountAmountMultiply,
    subTotalCount,
    amountBeforeTax,
} from "../../calculation/calculation";
import { productUnitDropdown } from "../../../store/action/productUnitAction";
import {
    currencySymbolHandling,
    decimalValidate,
    formatQuantityAuto,
    getFormattedMessage,
} from "../../sharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

const BATCH_FORM_DEBOUNCE_MS = 220;

const createBatchDraft = (product = {}) => ({
    lote_fabricante: product?.lote_fabricante || "",
    codigo_barra_lote: product?.codigo_barra_lote || product?.lot_barcode || "",
    quantity: product?.quantity === undefined || product?.quantity === null ? "" : String(product.quantity),
    ubicacion: product?.ubicacion || "",
    product_cost:
        product?.product_cost === undefined || product?.product_cost === null ? "" : String(product.product_cost),
    product_price:
        product?.product_price === undefined || product?.product_price === null ? "" : String(product.product_price),
    fecha_fabricacion: product?.fecha_fabricacion || "",
    fecha_vencimiento: product?.fecha_vencimiento || "",
    impuesto_tipo: product?.impuesto_tipo || "EXCLUSIVO",
    impuesto_valor:
        product?.impuesto_valor === undefined || product?.impuesto_valor === null ? "" : String(product.impuesto_valor),
    descripcion: product?.descripcion || "",
});

const PurchaseTable = (props) => {
    const {
        singleProduct,
        index,
        updateCost,
        updateDiscount,
        updateProducts,
        setUpdateProducts,
        frontSetting,
        updateTax,
        updateSubTotal,
        productUnitDropdown,
        productUnits,
        updatePurchaseUnit,
        allConfigData,
        allowQuickPriceUpdate = false,
    } = props;
    const dispatch = useDispatch();
    const isBatchRow = Boolean(singleProduct?.is_batch_purchase_line);
    const isLockedBatchRow = Boolean(singleProduct?.is_batch_purchase_locked);
    const [updateData, setUpdateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [quantityDraft, setQuantityDraft] = useState(
        singleProduct?.quantity === undefined || singleProduct?.quantity === null ? "" : String(singleProduct.quantity)
    );
    const [batchDraft, setBatchDraft] = useState(() => createBatchDraft(singleProduct));
    const batchCommitTimeoutRef = useRef(null);
    const pendingBatchChangesRef = useRef({});

    useEffect(() => {
        if (singleProduct.newItem !== "") {
            productUnitDropdown(singleProduct.product_unit);
        }
    }, [updateData, singleProduct.purchase_unit, singleProduct.newItem, singleProduct.product_unit, productUnitDropdown]);

    useEffect(() => {
        setQuantityDraft(singleProduct?.quantity === undefined || singleProduct?.quantity === null ? "" : String(singleProduct.quantity));
    }, [singleProduct.quantity]);

    useEffect(() => {
        pendingBatchChangesRef.current = {};
        setBatchDraft(createBatchDraft(singleProduct));
    }, [
        singleProduct?.row_id,
        singleProduct?.id,
        singleProduct?.lote_fabricante,
        singleProduct?.codigo_barra_lote,
        singleProduct?.lot_barcode,
        singleProduct?.quantity,
        singleProduct?.ubicacion,
        singleProduct?.product_cost,
        singleProduct?.product_price,
        singleProduct?.fecha_fabricacion,
        singleProduct?.fecha_vencimiento,
        singleProduct?.impuesto_tipo,
        singleProduct?.impuesto_valor,
        singleProduct?.descripcion,
    ]);

    useEffect(() => () => {
        if (batchCommitTimeoutRef.current) {
            clearTimeout(batchCommitTimeoutRef.current);
        }
    }, []);

    const maxQty = Number(singleProduct.max_return_quantity);
    const hasMaxLimit = Number.isFinite(maxQty) && maxQty > 0;
    const qtyMessage = getFormattedMessage("globally.product-quantity.validate.message");
    const qtyMessageText = typeof qtyMessage === "string" ? qtyMessage : "No se puede devolver mas de lo comprado";

    const clampQty = (qty) => (hasMaxLimit ? Math.max(0, Math.min(qty, maxQty)) : Math.max(0, qty));

    const notifyQtyLimit = () => {
        if (!hasMaxLimit) {
            return;
        }
        dispatch(addToast({ text: `${qtyMessageText} (max ${maxQty})`, type: toastType.ERROR }));
    };

    const isSameRow = useCallback(
        (item) => {
            if (item?.row_id && singleProduct?.row_id) {
                return String(item.row_id) === String(singleProduct.row_id);
            }
            if (item?.id !== undefined && item?.id !== null && singleProduct?.id !== undefined && singleProduct?.id !== null) {
                return String(item.id) === String(singleProduct.id);
            }
            if (
                item?.purchase_return_item_id !== undefined &&
                item?.purchase_return_item_id !== null &&
                singleProduct?.purchase_return_item_id !== undefined &&
                singleProduct?.purchase_return_item_id !== null
            ) {
                return String(item.purchase_return_item_id) === String(singleProduct.purchase_return_item_id);
            }
            return Number(item?.product_id) === Number(singleProduct?.product_id);
        },
        [singleProduct]
    );

    const commitQuantity = useCallback(
        (rawValue, showLimitToast = true) => {
            if (isLockedBatchRow) {
                return;
            }
            if (rawValue === "") {
                setUpdateProducts((prev) => prev.map((item) => (isSameRow(item) ? { ...item, quantity: 0 } : item)));
                setQuantityDraft("0");
                return;
            }
            const parsedQty = Number(rawValue);
            if (Number.isNaN(parsedQty)) {
                setQuantityDraft(singleProduct?.quantity === undefined || singleProduct?.quantity === null ? "0" : String(singleProduct.quantity));
                return;
            }
            const normalizedQty = clampQty(parsedQty);
            if (hasMaxLimit && parsedQty > maxQty && showLimitToast) {
                notifyQtyLimit();
            }
            setUpdateProducts((prev) => prev.map((item) => (isSameRow(item) ? { ...item, quantity: normalizedQty } : item)));
            setQuantityDraft(String(normalizedQty));
        },
        [clampQty, hasMaxLimit, isLockedBatchRow, isSameRow, maxQty, notifyQtyLimit, setUpdateProducts, singleProduct]
    );

    const commitBatchChanges = useCallback(
        (changes) => {
            if (isLockedBatchRow || !changes || !Object.keys(changes).length) {
                return;
            }
            setUpdateProducts((prev) =>
                prev.map((item) => {
                    if (!isSameRow(item)) {
                        return item;
                    }
                    const nextItem = { ...item, ...changes };
                    if (Object.prototype.hasOwnProperty.call(changes, "codigo_barra_lote")) {
                        nextItem.lot_barcode = changes.codigo_barra_lote;
                    }
                    if (Object.prototype.hasOwnProperty.call(changes, "product_cost")) {
                        nextItem.net_unit_cost = changes.product_cost;
                        nextItem.fix_net_unit = changes.product_cost;
                    }
                    if (Object.prototype.hasOwnProperty.call(changes, "impuesto_tipo")) {
                        nextItem.tax_type = changes.impuesto_tipo === "INCLUSIVO" ? 2 : 1;
                    }
                    if (Object.prototype.hasOwnProperty.call(changes, "impuesto_valor")) {
                        nextItem.tax_value = changes.impuesto_valor;
                    }
                    return nextItem;
                })
            );
        },
        [isLockedBatchRow, isSameRow, setUpdateProducts]
    );

    const flushBatchChanges = useCallback(() => {
        if (batchCommitTimeoutRef.current) {
            clearTimeout(batchCommitTimeoutRef.current);
        }
        const pendingChanges = pendingBatchChangesRef.current;
        pendingBatchChangesRef.current = {};
        commitBatchChanges(pendingChanges);
    }, [commitBatchChanges]);

    const updateBatchDraftField = useCallback(
        (field, value, immediate = false) => {
            setBatchDraft((prev) => ({ ...prev, [field]: value }));
            if (isLockedBatchRow) {
                return;
            }
            pendingBatchChangesRef.current = { ...pendingBatchChangesRef.current, [field]: value };
            if (batchCommitTimeoutRef.current) {
                clearTimeout(batchCommitTimeoutRef.current);
            }
            if (immediate) {
                flushBatchChanges();
                return;
            }
            batchCommitTimeoutRef.current = setTimeout(() => {
                flushBatchChanges();
            }, BATCH_FORM_DEBOUNCE_MS);
        },
        [flushBatchChanges, isLockedBatchRow]
    );

    const handleClose = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        e.stopPropagation();
        productUnitDropdown(singleProduct.product_unit);
        setModalId(singleProduct.id);
    };

    const onProductUpdateInCart = (item) => {
        setUpdateData(item);
        setUpdateProducts((prev) => prev.map((row) => (isSameRow(row) ? { ...item } : row)));
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        if (value === "") {
            setQuantityDraft("");
            return;
        }
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }
        setQuantityDraft(value);
    };

    const handleBatchNumberChange = useCallback(
        (field) => (event) => {
            const { value } = event.target;
            if (value !== "") {
                if (!/^\d*\.?\d*$/.test(value)) {
                    return;
                }
                if (value.match(/\./g)) {
                    const [, decimal] = value.split(".");
                    if (decimal?.length > 2) {
                        return;
                    }
                }
            }
            updateBatchDraftField(field, value);
        },
        [updateBatchDraftField]
    );

    const purchaseRowPreview = useMemo(
        () =>
            isBatchRow
                ? {
                      ...singleProduct,
                      quantity: batchDraft.quantity === "" ? 0 : batchDraft.quantity,
                      product_cost: batchDraft.product_cost,
                      fix_net_unit: batchDraft.product_cost,
                      net_unit_cost: batchDraft.product_cost,
                      product_price: batchDraft.product_price,
                      tax_type: batchDraft.impuesto_tipo === "INCLUSIVO" ? 2 : 1,
                      tax_value: batchDraft.impuesto_valor,
                  }
                : singleProduct,
        [batchDraft, isBatchRow, singleProduct]
    );

    const batchSummaryItems = useMemo(
        () =>
            [
                batchDraft.lote_fabricante ? { key: "lote", label: "Lote fabricante", value: batchDraft.lote_fabricante } : null,
                batchDraft.codigo_barra_lote ? { key: "barcode", label: "Cod. barra", value: batchDraft.codigo_barra_lote } : null,
                batchDraft.ubicacion ? { key: "ubicacion", label: "Ubicacion", value: batchDraft.ubicacion } : null,
            ].filter(Boolean),
        [batchDraft]
    );

    const onDeleteCartItem = () => {
        if (isLockedBatchRow) {
            return;
        }
        setUpdateProducts(updateProducts.filter((item) => !isSameRow(item)));
    };

    return (
        <>
            <tr key={index} className="align-middle text-nowrap">
                <td className="ps-3">
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success"><span>{singleProduct.code}</span></span>
                        {!isBatchRow && (
                            <span className="badge bg-light-primary p-1 ms-1">
                                <FontAwesomeIcon icon={faPencil} onClick={(e) => handleClose(e)} style={{ cursor: "pointer" }} />
                            </span>
                        )}
                    </div>
                    <div className="mt-2">{singleProduct.name}</div>
                    <div className="d-flex flex-wrap gap-1 mt-2">
                        {singleProduct.product_kind === "BATCH" ? (
                            <span className="badge bg-light-danger">Lote</span>
                        ) : singleProduct.product_kind === "VARIANT" ? (
                            <span className="badge bg-light-info">Variante</span>
                        ) : (
                            <span className="badge bg-light-secondary">Normal</span>
                        )}
                        {singleProduct.variation_type_name ? <span className="badge bg-light-info">{singleProduct.variation_type_name}</span> : null}
                        {isLockedBatchRow ? (
                            <span className="badge bg-light-warning">Lote registrado</span>
                        ) : isBatchRow ? (
                            <span className="badge bg-light-primary">Nuevo lote</span>
                        ) : null}
                    </div>
                    {isBatchRow && batchSummaryItems.length ? (
                        <div className="purchase-batch-editor__meta mt-2">
                            {batchSummaryItems.map((item) => (
                                <span key={item.key} className="purchase-batch-editor__meta-pill"><strong>{item.label}:</strong> {item.value}</span>
                            ))}
                        </div>
                    ) : null}
                </td>
                <td>{currencySymbolHandling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, amountBeforeTax(purchaseRowPreview))}</td>
                <td>
                    {singleProduct.isEdit ? (
                        singleProduct.stocks.length >= 1 &&
                        singleProduct.stocks.map((item) => (
                            <span className="badge bg-light-warning" key={`${singleProduct.id}-${item.id ?? item.warehouse_id}`}>
                                <span>{formatQuantityAuto(item.quantity)}&nbsp;{singleProduct.short_name}</span>
                            </span>
                        ))
                    ) : singleProduct.stock > 0 ? (
                        <span className="badge bg-light-warning"><span>{formatQuantityAuto(singleProduct.stock)}&nbsp;{singleProduct.short_name}</span></span>
                    ) : (
                        <span className="badge bg-light-warning"><span>{formatQuantityAuto(0)} &nbsp;{singleProduct.short_name}</span></span>
                    )}
                </td>
                <td>
                    {isBatchRow ? (
                        <span className="badge bg-light-warning"><span>{formatQuantityAuto(purchaseRowPreview.quantity || 0)}&nbsp;{singleProduct.short_name}</span></span>
                    ) : (
                        <div className="custom-qty">
                            <InputGroup className="flex-nowrap">
                                <InputGroup.Text className="btn btn-primary btn-sm px-4 pt-2" onClick={() => commitQuantity(Math.max(0, Number(singleProduct.quantity || 0) - 1), false)}>-</InputGroup.Text>
                                <Form.Control
                                    aria-label="Product Quantity"
                                    onKeyPress={(event) => decimalValidate(event)}
                                    className="text-center px-0 py-2 rounded-0 hide-arrow"
                                    value={quantityDraft}
                                    type="text"
                                    inputMode="decimal"
                                    step={0.01}
                                    min={0.0}
                                    max={hasMaxLimit ? maxQty : undefined}
                                    onChange={(e) => handleChange(e)}
                                    onBlur={() => commitQuantity(quantityDraft, true)}
                                />
                                <InputGroup.Text className="btn btn-primary btn-sm px-4 pt-2" onClick={() => commitQuantity(Number(singleProduct.quantity || 0) + 1, true)}>+</InputGroup.Text>
                            </InputGroup>
                        </div>
                    )}
                </td>
                <td>{currencySymbolHandling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, discountAmountMultiply(purchaseRowPreview))}</td>
                <td>{currencySymbolHandling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, taxAmountMultiply(purchaseRowPreview))}</td>
                <td>{currencySymbolHandling(allConfigData, frontSetting.value && frontSetting.value.currency_symbol, subTotalCount(purchaseRowPreview))}</td>
                <td className="text-start">
                    <button className="btn px-2 text-danger fs-3" disabled={isLockedBatchRow}>
                        <FontAwesomeIcon icon={faTrash} onClick={() => onDeleteCartItem()} />
                    </button>
                </td>
            </tr>
            {isBatchRow && (
                <tr>
                    <td colSpan={8} className="bg-light">
                        <div className="purchase-batch-editor">
                            <div className="purchase-batch-editor__header">
                                <div>
                                    <span className="purchase-batch-editor__eyebrow">Producto por lote</span>
                                    <h6 className="purchase-batch-editor__title">Captura del lote para compra</h6>
                                    <p className="purchase-batch-editor__subtitle">Completa fabricante, cantidades, precios, fechas e impuestos. El codigo interno se genera en backend al guardar.</p>
                                </div>
                                <span className="purchase-batch-editor__status">{isLockedBatchRow ? "Lote registrado" : "Nuevo lote"}</span>
                            </div>
                            <div className="purchase-batch-editor__grid">
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Lote fabricante</label>
                                    <Form.Control type="text" value={batchDraft.lote_fabricante} onChange={(event) => updateBatchDraftField("lote_fabricante", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Codigo barra lote</label>
                                    <Form.Control type="text" value={batchDraft.codigo_barra_lote} onChange={(event) => updateBatchDraftField("codigo_barra_lote", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Cantidad</label>
                                    <Form.Control type="text" value={batchDraft.quantity} onKeyPress={(event) => decimalValidate(event)} onChange={handleBatchNumberChange("quantity")} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Ubicacion</label>
                                    <Form.Control type="text" value={batchDraft.ubicacion} onChange={(event) => updateBatchDraftField("ubicacion", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Precio compra</label>
                                    <InputGroup>
                                        <Form.Control type="text" value={batchDraft.product_cost} onKeyPress={(event) => decimalValidate(event)} onChange={handleBatchNumberChange("product_cost")} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                        <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Precio venta</label>
                                    <InputGroup>
                                        <Form.Control type="text" value={batchDraft.product_price} onKeyPress={(event) => decimalValidate(event)} onChange={handleBatchNumberChange("product_price")} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                        <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Fecha fabricacion</label>
                                    <Form.Control type="date" value={batchDraft.fecha_fabricacion} onChange={(event) => updateBatchDraftField("fecha_fabricacion", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Fecha vencimiento</label>
                                    <Form.Control type="date" value={batchDraft.fecha_vencimiento} onChange={(event) => updateBatchDraftField("fecha_vencimiento", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Tipo impuesto</label>
                                    <Form.Select value={batchDraft.impuesto_tipo} onChange={(event) => updateBatchDraftField("impuesto_tipo", event.target.value)} onBlur={flushBatchChanges} disabled={isLockedBatchRow}>
                                        <option value="EXCLUSIVO">EXCLUSIVO</option>
                                        <option value="INCLUSIVO">INCLUSIVO</option>
                                    </Form.Select>
                                </div>
                                <div className="purchase-batch-editor__field">
                                    <label className="form-label mb-1">Impuesto %</label>
                                    <InputGroup>
                                        <Form.Control type="text" value={batchDraft.impuesto_valor} onKeyPress={(event) => decimalValidate(event)} onChange={handleBatchNumberChange("impuesto_valor")} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                        <InputGroup.Text>%</InputGroup.Text>
                                    </InputGroup>
                                </div>
                                <div className="purchase-batch-editor__field purchase-batch-editor__field--wide">
                                    <label className="form-label mb-1">Descripcion</label>
                                    <Form.Control as="textarea" rows={3} value={batchDraft.descripcion} onChange={(event) => updateBatchDraftField("descripcion", event.target.value)} onBlur={flushBatchChanges} readOnly={isLockedBatchRow} />
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
            {!isBatchRow && (
                <ProductModal
                    handleClose={handleClose}
                    setIsOpen={setIsOpen}
                    show={isOpen}
                    modalId={modalId}
                    isOpen={isOpen}
                    frontSetting={frontSetting}
                    product={singleProduct}
                    id={singleProduct.id}
                    productUnits={productUnits}
                    updatePurchaseUnit={updatePurchaseUnit}
                    updateProducts={updateProducts}
                    title={singleProduct.name}
                    onProductUpdateInCart={onProductUpdateInCart}
                    updateSubTotal={updateSubTotal}
                    updateCost={updateCost}
                    updateDiscount={updateDiscount}
                    updateTax={updateTax}
                    allowQuickPriceUpdate={allowQuickPriceUpdate}
                />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    const { productUnits, frontSetting, allConfigData } = state;
    return { productUnits, frontSetting, allConfigData };
};

export default connect(mapStateToProps, { productUnitDropdown })(PurchaseTable);
