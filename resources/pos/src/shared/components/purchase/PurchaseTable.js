import React, { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import ProductModal from "./ProductModal";
import Form from "react-bootstrap/Form";
import {
    taxAmountMultiply,
    discountAmountMultiply,
    subTotalCount,
    amountBeforeTax,
} from "../../calculation/calculation";
import { productUnitDropdown } from "../../../store/action/productUnitAction";
import { currencySymbolHandling, decimalValidate, getFormattedMessage } from "../../sharedMethod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

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
    const [updateData, setUpdateData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [modalId, setModalId] = useState(null);

    useEffect(() => {
        if (singleProduct.newItem !== "") {
            productUnitDropdown(singleProduct.product_unit);
        }
    }, [updateData, singleProduct.purchase_unit, singleProduct.newItem, singleProduct.product_unit, productUnitDropdown]);

    const maxQty = Number(singleProduct.max_return_quantity);
    const hasMaxLimit = Number.isFinite(maxQty) && maxQty > 0;
    const qtyMessage = getFormattedMessage("globally.product-quantity.validate.message");
    const qtyMessageText =
        typeof qtyMessage === "string" ? qtyMessage : "No se puede devolver mas de lo comprado";

    const clampQty = (qty) => {
        if (!hasMaxLimit) {
            return Math.max(0, qty);
        }
        return Math.max(0, Math.min(qty, maxQty));
    };

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

    const onDeleteCartItem = (id) => {
        const newProduct = updateProducts.filter((item) => item.id !== id);
        setUpdateProducts(newProduct);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        e.stopPropagation();
        productUnitDropdown(singleProduct.product_unit);
        setModalId(singleProduct.id);
    };

    const onProductUpdateInCart = (item) => {
        setUpdateData(item);
        setUpdateProducts((prev) =>
            prev.map((row) => (row.id === item.id ? { ...item } : row))
        );
    };

    const handleIncrement = () => {
        const nextQty = Number(singleProduct.quantity || 0) + 1;
        const normalized = clampQty(nextQty);
        if (hasMaxLimit && nextQty > maxQty) {
            notifyQtyLimit();
        }
        setUpdateProducts((prev) =>
            prev.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: normalized }
                    : item
            )
        );
    };

    const handleDecrement = () => {
        setUpdateProducts((prev) =>
            prev.map((item) =>
                item.id === singleProduct.id
                    ? { ...item, quantity: Math.max(0, Number(item.quantity || 0) - 1) }
                    : item
            )
        );
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }
        const nextQty = Number(value || 0);
        const normalized = clampQty(nextQty);
        if (hasMaxLimit && nextQty > maxQty) {
            notifyQtyLimit();
        }
        setUpdateProducts((prev) =>
            prev.map((item) =>
                item.id === singleProduct.id ? { ...item, quantity: normalized } : item
            )
        );
    };

    return (
        <>
            <tr key={index} className="align-middle text-nowrap">
                <td className="ps-3">
                    <div className="d-flex align-items-center">
                        <span className="badge bg-light-success">
                            <span>{singleProduct.code}</span>
                        </span>
                        <span className="badge bg-light-primary p-1 ms-1">
                            <FontAwesomeIcon
                                icon={faPencil}
                                onClick={(e) => handleClose(e)}
                                style={{ cursor: "pointer" }}
                            />
                        </span>
                    </div>
                    <div className="mt-2">{singleProduct.name}</div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value && frontSetting.value.currency_symbol,
                        amountBeforeTax(singleProduct)
                    )}
                </td>
                <td>
                    {singleProduct.isEdit ? (
                        singleProduct.stocks.length >= 1 &&
                        singleProduct.stocks.map((item) => (
                            <span className="badge bg-light-warning" key={`${singleProduct.id}-${item.id ?? item.warehouse_id}`}>
                                <span>
                                    {item.quantity}&nbsp;
                                    {singleProduct.short_name}
                                </span>
                            </span>
                        ))
                    ) : singleProduct.stock > 0 ? (
                        <span className="badge bg-light-warning">
                            <span>
                                {singleProduct.stock}&nbsp;
                                {singleProduct.short_name}
                            </span>
                        </span>
                    ) : (
                        <span className="badge bg-light-warning">
                            <span>0 &nbsp;{singleProduct.short_name}</span>
                        </span>
                    )}
                </td>
                <td>
                    <div className="custom-qty">
                        <InputGroup className="flex-nowrap">
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 pt-2"
                                onClick={() => handleDecrement()}
                            >
                                -
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Product Quantity"
                                onKeyPress={(event) => decimalValidate(event)}
                                className="text-center px-0 py-2 rounded-0 hide-arrow"
                                value={singleProduct.quantity}
                                type="number"
                                step={0.01}
                                min={0.0}
                                max={hasMaxLimit ? maxQty : undefined}
                                onChange={(e) => handleChange(e)}
                            />
                            <InputGroup.Text
                                className="btn btn-primary btn-sm px-4 pt-2"
                                onClick={() => handleIncrement()}
                            >
                                +
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value && frontSetting.value.currency_symbol,
                        discountAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value && frontSetting.value.currency_symbol,
                        taxAmountMultiply(singleProduct)
                    )}
                </td>
                <td>
                    {currencySymbolHandling(
                        allConfigData,
                        frontSetting.value && frontSetting.value.currency_symbol,
                        subTotalCount(singleProduct)
                    )}
                </td>
                <td className="text-start">
                    <button className="btn px-2 text-danger fs-3">
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => onDeleteCartItem(singleProduct.id)}
                        />
                    </button>
                </td>
            </tr>
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
        </>
    );
};

const mapStateToProps = (state) => {
    const { productUnits, frontSetting, allConfigData } = state;
    return { productUnits, frontSetting, allConfigData };
};

export default connect(mapStateToProps, { productUnitDropdown })(PurchaseTable);
