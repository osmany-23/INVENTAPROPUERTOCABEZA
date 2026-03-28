import React, { useCallback, useEffect, useMemo, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faPencil,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
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
    parseNumber,
} from "../../sharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

const createBatchDraft = (product = {}) => ({
    lote_fabricante: product?.lote_fabricante || "",
    codigo_barra_lote: product?.codigo_barra_lote || product?.lot_barcode || "",
    quantity:
        product?.quantity === undefined || product?.quantity === null
            ? ""
            : String(product.quantity),
    ubicacion: product?.ubicacion || "",
    product_cost:
        product?.product_cost === undefined || product?.product_cost === null
            ? ""
            : String(product.product_cost),
    product_price:
        product?.product_price === undefined || product?.product_price === null
            ? ""
            : String(product.product_price),
    fecha_fabricacion: product?.fecha_fabricacion || "",
    fecha_vencimiento: product?.fecha_vencimiento || "",
    impuesto_tipo: product?.impuesto_tipo || "EXCLUSIVO",
    impuesto_valor:
        product?.impuesto_valor === undefined || product?.impuesto_valor === null
            ? ""
            : String(product.impuesto_valor),
    descripcion: product?.descripcion || "",
});

const createBatchErrors = () => ({
    lote_fabricante: "",
    quantity: "",
    product_cost: "",
    product_price: "",
    fecha_vencimiento: "",
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
    const currencySymbol = frontSetting.value && frontSetting.value.currency_symbol;

    const [updateData, setUpdateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);
    const [quantityDraft, setQuantityDraft] = useState(
        singleProduct?.quantity === undefined || singleProduct?.quantity === null
            ? ""
            : String(singleProduct.quantity)
    );
    const [batchDraft, setBatchDraft] = useState(() =>
        createBatchDraft(singleProduct)
    );
    const [batchErrors, setBatchErrors] = useState(() => createBatchErrors());
    const [isBatchExpanded, setIsBatchExpanded] = useState(
        () => isBatchRow && !Boolean(singleProduct?.batch_form_collapsed)
    );

    useEffect(() => {
        if (singleProduct.newItem !== "") {
            productUnitDropdown(singleProduct.product_unit);
        }
    }, [
        updateData,
        singleProduct.purchase_unit,
        singleProduct.newItem,
        singleProduct.product_unit,
        productUnitDropdown,
    ]);

    useEffect(() => {
        setQuantityDraft(
            singleProduct?.quantity === undefined || singleProduct?.quantity === null
                ? ""
                : String(singleProduct.quantity)
        );
    }, [singleProduct.quantity]);

    useEffect(() => {
        if (!isBatchRow) {
            return;
        }

        setBatchDraft(createBatchDraft(singleProduct));
        setBatchErrors(createBatchErrors());
        setIsBatchExpanded(!Boolean(singleProduct?.batch_form_collapsed));
    }, [
        isBatchRow,
        singleProduct?.row_id,
        singleProduct?.id,
        singleProduct?.batch_form_collapsed,
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

    const maxQty = Number(singleProduct.max_return_quantity);
    const hasMaxLimit = Number.isFinite(maxQty) && maxQty > 0;
    const qtyMessage = getFormattedMessage(
        "globally.product-quantity.validate.message"
    );
    const qtyMessageText =
        typeof qtyMessage === "string"
            ? qtyMessage
            : "No se puede devolver mas de lo comprado";

    const clampQty = (qty) =>
        hasMaxLimit ? Math.max(0, Math.min(qty, maxQty)) : Math.max(0, qty);

    const notifyQtyLimit = () => {
        if (!hasMaxLimit) {
            return;
        }

        dispatch(
            addToast({
                text: `${qtyMessageText} (max ${maxQty})`,
                type: toastType.ERROR,
            })
        );
    };

    const isSameRow = useCallback(
        (item) => {
            if (item?.row_id && singleProduct?.row_id) {
                return String(item.row_id) === String(singleProduct.row_id);
            }

            if (
                item?.id !== undefined &&
                item?.id !== null &&
                singleProduct?.id !== undefined &&
                singleProduct?.id !== null
            ) {
                return String(item.id) === String(singleProduct.id);
            }

            if (
                item?.purchase_return_item_id !== undefined &&
                item?.purchase_return_item_id !== null &&
                singleProduct?.purchase_return_item_id !== undefined &&
                singleProduct?.purchase_return_item_id !== null
            ) {
                return (
                    String(item.purchase_return_item_id) ===
                    String(singleProduct.purchase_return_item_id)
                );
            }

            return Number(item?.product_id) === Number(singleProduct?.product_id);
        },
        [singleProduct]
    );

    const updateBatchRowState = useCallback(
        (changes) => {
            setUpdateProducts((prev) =>
                prev.map((item) =>
                    isSameRow(item) ? { ...item, ...changes } : item
                )
            );
        },
        [isSameRow, setUpdateProducts]
    );

    const commitQuantity = useCallback(
        (rawValue, showLimitToast = true) => {
            if (isLockedBatchRow) {
                return;
            }

            if (rawValue === "") {
                setUpdateProducts((prev) =>
                    prev.map((item) =>
                        isSameRow(item) ? { ...item, quantity: 0 } : item
                    )
                );
                setQuantityDraft("0");
                return;
            }

            const parsedQty = Number(rawValue);

            if (Number.isNaN(parsedQty)) {
                setQuantityDraft(
                    singleProduct?.quantity === undefined ||
                        singleProduct?.quantity === null
                        ? "0"
                        : String(singleProduct.quantity)
                );
                return;
            }

            const normalizedQty = clampQty(parsedQty);

            if (hasMaxLimit && parsedQty > maxQty && showLimitToast) {
                notifyQtyLimit();
            }

            setUpdateProducts((prev) =>
                prev.map((item) =>
                    isSameRow(item)
                        ? { ...item, quantity: normalizedQty }
                        : item
                )
            );
            setQuantityDraft(String(normalizedQty));
        },
        [
            clampQty,
            hasMaxLimit,
            isLockedBatchRow,
            isSameRow,
            maxQty,
            notifyQtyLimit,
            setUpdateProducts,
            singleProduct,
        ]
    );

    const handleClose = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen((prev) => !prev);
        productUnitDropdown(singleProduct.product_unit);
        setModalId(singleProduct.id);
    };

    const onProductUpdateInCart = (item) => {
        setUpdateData(item);
        setUpdateProducts((prev) =>
            prev.map((row) => (isSameRow(row) ? { ...row, ...item } : row))
        );
    };

    const handleChange = (event) => {
        event.preventDefault();
        const { value } = event.target;

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

    const updateBatchDraftField = useCallback((field, value) => {
        setBatchDraft((prev) => ({ ...prev, [field]: value }));
        setBatchErrors((prev) =>
            prev[field]
                ? {
                      ...prev,
                      [field]: "",
                  }
                : prev
        );
    }, []);

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

    const markBatchAsEditing = useCallback(() => {
        if (isLockedBatchRow) {
            return;
        }

        setBatchErrors(createBatchErrors());
        setIsBatchExpanded(true);
        updateBatchRowState({
            batch_form_confirmed: false,
            batch_form_collapsed: false,
        });
    }, [isLockedBatchRow, updateBatchRowState]);

    const validateBatchDraft = useCallback(() => {
        const nextErrors = createBatchErrors();
        const quantityValue = parseNumber(batchDraft.quantity, 0);
        const costValue = parseNumber(batchDraft.product_cost, 0);
        const salePriceValue = parseNumber(batchDraft.product_price, 0);

        if (!String(batchDraft.lote_fabricante || "").trim()) {
            nextErrors.lote_fabricante = "Completa el lote fabricante.";
        }

        if (quantityValue <= 0) {
            nextErrors.quantity = "La cantidad debe ser mayor a cero.";
        }

        if (costValue <= 0) {
            nextErrors.product_cost = "El precio compra debe ser mayor a cero.";
        }

        if (salePriceValue <= 0) {
            nextErrors.product_price = "El precio venta debe ser mayor a cero.";
        } else if (salePriceValue <= costValue) {
            nextErrors.product_price =
                "El precio venta debe ser mayor al precio compra.";
        }

        if (
            batchDraft.fecha_fabricacion &&
            batchDraft.fecha_vencimiento &&
            moment(batchDraft.fecha_vencimiento).isBefore(
                moment(batchDraft.fecha_fabricacion)
            )
        ) {
            nextErrors.fecha_vencimiento =
                "La fecha de vencimiento no puede ser menor a la de fabricacion.";
        }

        setBatchErrors(nextErrors);
        return !Object.values(nextErrors).some(Boolean);
    }, [batchDraft]);

    const handleAcceptBatch = useCallback(() => {
        if (isLockedBatchRow) {
            setIsBatchExpanded(false);
            return;
        }

        if (!validateBatchDraft()) {
            dispatch(
                addToast({
                    text: "Completa y valida los datos del lote antes de aceptarlo.",
                    type: toastType.ERROR,
                })
            );
            return;
        }

        updateBatchRowState({
            lote_fabricante: String(batchDraft.lote_fabricante || "").trim(),
            codigo_barra_lote: String(batchDraft.codigo_barra_lote || "").trim(),
            lot_barcode: String(batchDraft.codigo_barra_lote || "").trim(),
            quantity: parseNumber(batchDraft.quantity, 0),
            ubicacion: String(batchDraft.ubicacion || "").trim(),
            product_cost: parseNumber(batchDraft.product_cost, 0),
            product_price: parseNumber(batchDraft.product_price, 0),
            net_unit_cost: parseNumber(batchDraft.product_cost, 0),
            fix_net_unit: parseNumber(batchDraft.product_cost, 0),
            fecha_fabricacion: batchDraft.fecha_fabricacion || "",
            fecha_vencimiento: batchDraft.fecha_vencimiento || "",
            impuesto_tipo: batchDraft.impuesto_tipo || "EXCLUSIVO",
            impuesto_valor: parseNumber(batchDraft.impuesto_valor, 0),
            tax_type:
                (batchDraft.impuesto_tipo || "EXCLUSIVO") === "INCLUSIVO"
                    ? 2
                    : 1,
            tax_value: parseNumber(batchDraft.impuesto_valor, 0),
            descripcion: batchDraft.descripcion || "",
            batch_form_confirmed: true,
            batch_form_collapsed: true,
        });

        setBatchErrors(createBatchErrors());
        setIsBatchExpanded(false);
    }, [
        batchDraft,
        dispatch,
        isLockedBatchRow,
        updateBatchRowState,
        validateBatchDraft,
    ]);

    const batchCompactSummaryItems = useMemo(
        () => [
            {
                key: "fabricante",
                label: "Fabricante",
                value:
                    singleProduct?.lote_fabricante ||
                    batchDraft.lote_fabricante ||
                    "Sin definir",
            },
            {
                key: "cantidad",
                label: "Cantidad",
                value: formatQuantityAuto(singleProduct?.quantity || 0),
            },
            {
                key: "compra",
                label: "Compra",
                value: currencySymbolHandling(
                    allConfigData,
                    currencySymbol,
                    singleProduct?.product_cost || 0
                ),
            },
            {
                key: "venta",
                label: "Venta",
                value: currencySymbolHandling(
                    allConfigData,
                    currencySymbol,
                    singleProduct?.product_price || 0
                ),
            },
            {
                key: "vence",
                label: "Vence",
                value:
                    singleProduct?.fecha_vencimiento ||
                    batchDraft.fecha_vencimiento ||
                    "Sin fecha",
            },
        ],
        [allConfigData, batchDraft, currencySymbol, singleProduct]
    );

    const onDeleteCartItem = () => {
        if (isLockedBatchRow) {
            return;
        }

        setUpdateProducts((prev) => prev.filter((item) => !isSameRow(item)));
    };

    const renderBatchError = (message) =>
        message ? (
            <span className="purchase-batch-editor__error">{message}</span>
        ) : null;

    return (
        <>
            <tr key={index} className="align-middle text-nowrap">
                <td className="ps-3">
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success">
                            <span>{singleProduct.code}</span>
                        </span>
                        {!isBatchRow && (
                            <span className="badge bg-light-primary p-1 ms-1">
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    onClick={(event) => handleClose(event)}
                                    style={{ cursor: "pointer" }}
                                />
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
                        {singleProduct.variation_type_name ? (
                            <span className="badge bg-light-info">
                                {singleProduct.variation_type_name}
                            </span>
                        ) : null}
                        {isLockedBatchRow ? (
                            <span className="badge bg-light-warning">
                                Lote registrado
                            </span>
                        ) : isBatchRow ? (
                            <span
                                className={`badge ${
                                    singleProduct?.batch_form_confirmed
                                        ? "bg-light-success"
                                        : "bg-light-primary"
                                }`}
                            >
                                {singleProduct?.batch_form_confirmed
                                    ? "Lote temporal aceptado"
                                    : "Nuevo lote"}
                            </span>
                        ) : null}
                    </div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        currencySymbol,
                        amountBeforeTax(singleProduct)
                    )}
                </td>
                <td>
                    {singleProduct.isEdit ? (
                        singleProduct.stocks.length >= 1 &&
                        singleProduct.stocks.map((item) => (
                            <span
                                className="badge bg-light-warning"
                                key={`${singleProduct.id}-${item.id ?? item.warehouse_id}`}
                            >
                                <span>
                                    {formatQuantityAuto(item.quantity)}
                                    &nbsp;
                                    {singleProduct.short_name}
                                </span>
                            </span>
                        ))
                    ) : singleProduct.stock > 0 ? (
                        <span className="badge bg-light-warning">
                            <span>
                                {formatQuantityAuto(singleProduct.stock)}
                                &nbsp;
                                {singleProduct.short_name}
                            </span>
                        </span>
                    ) : (
                        <span className="badge bg-light-warning">
                            <span>
                                {formatQuantityAuto(0)} &nbsp;
                                {singleProduct.short_name}
                            </span>
                        </span>
                    )}
                </td>
                <td>
                    {isBatchRow ? (
                        <span className="badge bg-light-warning">
                            <span>
                                {formatQuantityAuto(singleProduct?.quantity || 0)}
                                &nbsp;
                                {singleProduct.short_name}
                            </span>
                        </span>
                    ) : (
                        <div className="custom-qty">
                            <InputGroup className="flex-nowrap">
                                <InputGroup.Text
                                    className="btn btn-primary btn-sm px-4 pt-2"
                                    onClick={() =>
                                        commitQuantity(
                                            Math.max(
                                                0,
                                                Number(singleProduct.quantity || 0) - 1
                                            ),
                                            false
                                        )
                                    }
                                >
                                    -
                                </InputGroup.Text>
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
                                    onChange={(event) => handleChange(event)}
                                    onBlur={() => commitQuantity(quantityDraft, true)}
                                />
                                <InputGroup.Text
                                    className="btn btn-primary btn-sm px-4 pt-2"
                                    onClick={() =>
                                        commitQuantity(
                                            Number(singleProduct.quantity || 0) + 1,
                                            true
                                        )
                                    }
                                >
                                    +
                                </InputGroup.Text>
                            </InputGroup>
                        </div>
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        currencySymbol,
                        discountAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        currencySymbol,
                        taxAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        currencySymbol,
                        subTotalCount(singleProduct)
                    )}
                </td>
                <td className="text-start">
                    <button
                        className="btn px-2 text-danger fs-3"
                        disabled={isLockedBatchRow}
                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => onDeleteCartItem()}
                        />
                    </button>
                </td>
            </tr>

            {isBatchRow && (
                <tr>
                    <td colSpan={8} className="bg-light">
                        {isBatchExpanded ? (
                            <div className="purchase-batch-editor">
                                <div className="purchase-batch-editor__header">
                                    <div>
                                        <span className="purchase-batch-editor__eyebrow">
                                            Producto por lote
                                        </span>
                                        <h6 className="purchase-batch-editor__title">
                                            Captura temporal del lote
                                        </h6>
                                        <p className="purchase-batch-editor__subtitle">
                                            Completa los datos del lote y confirma con
                                            "Aceptar lote". La compra se guarda
                                            definitivamente solo al usar "Guardar compra".
                                        </p>
                                    </div>
                                    <span className="purchase-batch-editor__status">
                                        {isLockedBatchRow
                                            ? "Lote registrado"
                                            : "Pendiente por aceptar"}
                                    </span>
                                </div>

                                <div className="purchase-batch-editor__grid">
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Lote fabricante
                                        </label>
                                        <Form.Control
                                            type="text"
                                            value={batchDraft.lote_fabricante}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "lote_fabricante",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                        {renderBatchError(batchErrors.lote_fabricante)}
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Codigo barra lote
                                        </label>
                                        <Form.Control
                                            type="text"
                                            value={batchDraft.codigo_barra_lote}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "codigo_barra_lote",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Cantidad
                                        </label>
                                        <Form.Control
                                            type="text"
                                            value={batchDraft.quantity}
                                            onKeyPress={(event) =>
                                                decimalValidate(event)
                                            }
                                            onChange={handleBatchNumberChange(
                                                "quantity"
                                            )}
                                            readOnly={isLockedBatchRow}
                                        />
                                        {renderBatchError(batchErrors.quantity)}
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Ubicacion
                                        </label>
                                        <Form.Control
                                            type="text"
                                            value={batchDraft.ubicacion}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "ubicacion",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Precio compra
                                        </label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                value={batchDraft.product_cost}
                                                onKeyPress={(event) =>
                                                    decimalValidate(event)
                                                }
                                                onChange={handleBatchNumberChange(
                                                    "product_cost"
                                                )}
                                                readOnly={isLockedBatchRow}
                                            />
                                            <InputGroup.Text>
                                                {currencySymbol}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        {renderBatchError(batchErrors.product_cost)}
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Precio venta
                                        </label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                value={batchDraft.product_price}
                                                onKeyPress={(event) =>
                                                    decimalValidate(event)
                                                }
                                                onChange={handleBatchNumberChange(
                                                    "product_price"
                                                )}
                                                readOnly={isLockedBatchRow}
                                            />
                                            <InputGroup.Text>
                                                {currencySymbol}
                                            </InputGroup.Text>
                                        </InputGroup>
                                        {renderBatchError(batchErrors.product_price)}
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Fecha fabricacion
                                        </label>
                                        <Form.Control
                                            type="date"
                                            value={batchDraft.fecha_fabricacion}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "fecha_fabricacion",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Fecha vencimiento
                                        </label>
                                        <Form.Control
                                            type="date"
                                            value={batchDraft.fecha_vencimiento}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "fecha_vencimiento",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                        {renderBatchError(
                                            batchErrors.fecha_vencimiento
                                        )}
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Tipo impuesto
                                        </label>
                                        <Form.Select
                                            value={batchDraft.impuesto_tipo}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "impuesto_tipo",
                                                    event.target.value
                                                )
                                            }
                                            disabled={isLockedBatchRow}
                                        >
                                            <option value="EXCLUSIVO">
                                                EXCLUSIVO
                                            </option>
                                            <option value="INCLUSIVO">
                                                INCLUSIVO
                                            </option>
                                        </Form.Select>
                                    </div>
                                    <div className="purchase-batch-editor__field">
                                        <label className="form-label mb-1">
                                            Impuesto %
                                        </label>
                                        <InputGroup>
                                            <Form.Control
                                                type="text"
                                                value={batchDraft.impuesto_valor}
                                                onKeyPress={(event) =>
                                                    decimalValidate(event)
                                                }
                                                onChange={handleBatchNumberChange(
                                                    "impuesto_valor"
                                                )}
                                                readOnly={isLockedBatchRow}
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                        </InputGroup>
                                    </div>
                                    <div className="purchase-batch-editor__field purchase-batch-editor__field--wide">
                                        <label className="form-label mb-1">
                                            Descripcion
                                        </label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={batchDraft.descripcion}
                                            onChange={(event) =>
                                                updateBatchDraftField(
                                                    "descripcion",
                                                    event.target.value
                                                )
                                            }
                                            readOnly={isLockedBatchRow}
                                        />
                                    </div>
                                </div>

                                <div className="purchase-batch-editor__footer">
                                    <span className="purchase-batch-editor__footer-text">
                                        Aceptar lote solo guarda estos datos en la
                                        compra temporal. No se envia a base de datos
                                        hasta guardar la compra final.
                                    </span>
                                    {!isLockedBatchRow ? (
                                        <button
                                            type="button"
                                            className="btn purchase-batch-editor__accept-btn"
                                            onClick={handleAcceptBatch}
                                        >
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="me-2"
                                            />
                                            Aceptar lote
                                        </button>
                                    ) : null}
                                </div>
                            </div>
                        ) : (
                            <div className="purchase-batch-editor__compact">
                                <div className="purchase-batch-editor__compact-list">
                                    <span className="purchase-batch-editor__compact-label">
                                        LOTE:
                                    </span>
                                    {batchCompactSummaryItems.map((item) => (
                                        <span
                                            key={item.key}
                                            className="purchase-batch-editor__compact-pill"
                                        >
                                            {item.label}: {item.value}
                                        </span>
                                    ))}
                                </div>
                                {!isLockedBatchRow ? (
                                    <button
                                        type="button"
                                        className="btn btn-link purchase-batch-editor__edit-btn"
                                        onClick={markBatchAsEditing}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="me-2"
                                        />
                                        Editar lote
                                    </button>
                                ) : null}
                            </div>
                        )}
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

export default connect(mapStateToProps, { productUnitDropdown })(
    React.memo(PurchaseTable)
);
