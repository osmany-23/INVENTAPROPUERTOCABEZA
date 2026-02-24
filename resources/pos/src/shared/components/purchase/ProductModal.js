import React, { useEffect, useMemo, useState } from "react";
import { Form, InputGroup, Modal, Row } from "react-bootstrap-v5";
import {
    subTotalCount,
    discountAmountMultiply,
    taxAmountMultiply,
    amountBeforeTax,
} from "../../calculation/calculation";
import {
    decimalValidate,
    getFormattedMessage,
    placeholderText,
    getFormattedOptions,
} from "../../sharedMethod";
import ReactSelect from "../../select/reactSelect";
import { taxMethodOptions, discountMethodOptions } from "../../../constants";
import { useDispatch } from "react-redux";
import { addToast } from "../../../store/action/toastAction";

const ProductModal = (props) => {
    const {
        title,
        product,
        id,
        modalId,
        isOpen,
        handleClose,
        onProductUpdateInCart,
        updateCost,
        updateDiscount,
        updateTax,
        updateSubTotal,
        productUnits,
        updatePurchaseUnit,
        setIsOpen,
        frontSetting,
        allowQuickPriceUpdate = false,
    } = props;

    const dispatch = useDispatch();
    const [netUnitCost, setNetUnitCost] = useState("0.00");
    const [salePrice, setSalePrice] = useState("0.00");
    const [taxValue, setTaxValue] = useState("0.00");
    const [discountValue, setDiscountValue] = useState("0.00");
    const [purchaseUnit, setPurchaseUnit] = useState("0");
    const [selectedPurchaseUnit, setSelectedPurchaseUnit] = useState(null);
    const [errors, setErrors] = useState({
        taxValue: "",
        discountValue: "",
        netUnitCost: "",
        salePrice: "",
    });

    const taxTypeFilterOptions = getFormattedOptions(taxMethodOptions);
    const discountTypeFilterOptions = getFormattedOptions(discountMethodOptions);
    const [taxType, setTaxType] = useState({ value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label") });
    const [discountType, setDiscountType] = useState({ value: 1, label: getFormattedMessage("discount-type.filter.percentage.label") });

    const normalizedPurchaseUnit = useMemo(
        () => (product.purchase_unit?.value ? product.purchase_unit.value : product.purchase_unit),
        [product.purchase_unit]
    );

    useEffect(() => {
        const units = Array.isArray(productUnits) ? productUnits : [];
        const selected = units
            .filter((item) => Number(item.id) === Number(normalizedPurchaseUnit))
            .map((item) => ({ label: item.attributes.name, value: item.id }));
        setSelectedPurchaseUnit(selected);
        setPurchaseUnit(normalizedPurchaseUnit);
    }, [productUnits, normalizedPurchaseUnit]);

    useEffect(() => {
        setNetUnitCost(Number(product.product_cost ?? product.net_unit_cost ?? 0).toFixed(2));
        setSalePrice(Number(product.product_price ?? 0).toFixed(2));
        setTaxValue(Number(product.tax_value ?? 0).toFixed(2));
        setDiscountValue(Number(product.discount_value ?? 0).toFixed(2));
        setTaxType(
            Number(product.tax_type) === 1
                ? { value: 1, label: getFormattedMessage("tax-type.filter.exclusive.label") }
                : { value: 2, label: getFormattedMessage("tax-type.filter.inclusive.label") }
        );
        setDiscountType(
            Number(product.discount_type) === 1
                ? { value: 1, label: getFormattedMessage("discount-type.filter.percentage.label") }
                : { value: 2, label: getFormattedMessage("discount-type.filter.fixed.label") }
        );
    }, [product]);

    const handleValidation = () => {
        const errorss = {};
        let isValid = false;
        const numericCost = Number(netUnitCost || 0);
        const numericSalePrice = Number(salePrice || 0);
        const numericTax = Number(taxValue || 0);
        const numericDiscount = Number(discountValue || 0);

        if (!Number.isFinite(numericCost) || numericCost < 0) {
            errorss.netUnitCost = getFormattedMessage("product.input.product-cost.validate.label") || "Costo invalido";
        } else if (
            allowQuickPriceUpdate &&
            (!Number.isFinite(numericSalePrice) || numericSalePrice <= numericCost)
        ) {
            errorss.salePrice = "El precio de venta debe ser mayor al costo de compra";
        } else if (numericTax > 100 || numericTax < 0) {
            errorss.taxValue = getFormattedMessage("globally.tax-length.validate.label");
        } else if (discountType.value === 1 && (numericDiscount > 100 || numericDiscount < 0)) {
            errorss.discountValue = getFormattedMessage("globally.discount-length.validate.label");
        } else if (discountType.value === 2 && (numericDiscount > numericCost || numericDiscount < 0)) {
            errorss.discountValue = getFormattedMessage("globally.discount-cost-length.validate.label");
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    const onNumericChange = (setter) => (e) => {
        const { value } = e.target;
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }
        setter(value);
    };

    const onPurchaseUnitChange = (newlySelectedUnit) => {
        setPurchaseUnit(newlySelectedUnit);
        setSelectedPurchaseUnit(newlySelectedUnit);
    };

    const onSaveDetailModal = (e) => {
        e.preventDefault();
        const valid = handleValidation();
        if (!valid || id !== modalId) {
            return;
        }

        const updatedProduct = {
            ...product,
            product_cost: Number(netUnitCost),
            product_price: Number(salePrice),
            fix_net_unit: Number(netUnitCost),
            tax_type: taxType.value.toString(),
            tax_value: Number(taxValue),
            discount_type: discountType.value.toString(),
            discount_value: Number(discountValue),
            purchase_unit: purchaseUnit.value ? purchaseUnit.value : purchaseUnit,
        };
        updatedProduct.net_unit_cost = amountBeforeTax(updatedProduct);
        updatedProduct.tax_amount = taxAmountMultiply(updatedProduct);
        updatedProduct.discount_amount = discountAmountMultiply(updatedProduct);
        updatedProduct.sub_total = subTotalCount(updatedProduct);

        onProductUpdateInCart(updatedProduct);
        updateCost(updatedProduct.net_unit_cost);
        updateTax(updatedProduct.tax_value);
        updateDiscount(updatedProduct.discount_value);
        updatePurchaseUnit(updatedProduct.purchase_unit);
        updateSubTotal(updatedProduct.sub_total);

        dispatch(
            addToast({
                text: "Cambios guardados temporalmente. Se aplicaran al confirmar la compra.",
            })
        );
        handleClose(e);
    };

    const clearField = () => {
        setIsOpen(!isOpen);
        setErrors({});
    };

    return (
        <Modal show={isOpen} onHide={clearField} keyboard={true}>
            <Form
                onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        onSaveDetailModal(e);
                    }
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="pb-2">
                    <Row>
                        <div className="col-md-12 mb-5">
                            <label className="form-label">
                                {getFormattedMessage("product.input.product-cost.label")}:
                            </label>
                            <span className="required" />
                            <InputGroup>
                                <input
                                    type="text"
                                    name="product_cost"
                                    className="form-control"
                                    onKeyPress={(event) => decimalValidate(event)}
                                    value={netUnitCost}
                                    onChange={onNumericChange(setNetUnitCost)}
                                />
                                <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                            </InputGroup>
                            <span className="text-danger d-block fw-400 fs-small mt-2">{errors.netUnitCost || null}</span>
                        </div>
                        {allowQuickPriceUpdate && (
                            <div className="col-md-12 mb-5">
                                <label className="form-label">
                                    {getFormattedMessage("product.input.product-price.label") || "Precio de venta"}:
                                </label>
                                <span className="required" />
                                <InputGroup>
                                    <input
                                        type="text"
                                        name="product_price"
                                        className="form-control"
                                        onKeyPress={(event) => decimalValidate(event)}
                                        value={salePrice}
                                        onChange={onNumericChange(setSalePrice)}
                                    />
                                    <InputGroup.Text>{frontSetting.value && frontSetting.value.currency_symbol}</InputGroup.Text>
                                </InputGroup>
                                <span className="text-danger d-block fw-400 fs-small mt-2">{errors.salePrice || null}</span>
                            </div>
                        )}
                        <div className="col-md-12 mb-5">
                            <ReactSelect
                                title={getFormattedMessage("product.input.tax-type.label")}
                                multiLanguageOption={taxTypeFilterOptions}
                                onChange={setTaxType}
                                errors=""
                                defaultValue={taxType}
                                placeholder={placeholderText("product.input.tax-type.placeholder.label")}
                            />
                        </div>
                        <div className="col-md-12 mb-5">
                            <label className="form-label">
                                {getFormattedMessage("purchase.input.order-tax.label")}:
                            </label>
                            <InputGroup>
                                <input
                                    name="taxValue"
                                    type="text"
                                    value={taxValue}
                                    className="form-control"
                                    onKeyPress={(event) => decimalValidate(event)}
                                    onChange={onNumericChange(setTaxValue)}
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                            <span className="text-danger d-block fw-400 fs-small mt-2">{errors.taxValue || null}</span>
                        </div>
                        <div className="col-md-12 mb-5">
                            <ReactSelect
                                title={getFormattedMessage("purchase.product-modal.select.discount-type.label")}
                                multiLanguageOption={discountTypeFilterOptions}
                                onChange={setDiscountType}
                                errors=""
                                defaultValue={discountType}
                                placeholder={placeholderText("pos-sale.select.discount-type.placeholder")}
                            />
                        </div>
                        <div className="col-md-12 mb-5">
                            <label className="form-label">
                                {getFormattedMessage("purchase.order-item.table.discount.column.label")}:
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="discountValue"
                                className="form-control"
                                onChange={onNumericChange(setDiscountValue)}
                                value={discountValue}
                                onKeyPress={(event) => decimalValidate(event)}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">{errors.discountValue || null}</span>
                        </div>
                        {product.newItem !== "" && (
                            <div className="col-md-12">
                                <ReactSelect
                                    title={getFormattedMessage("product.input.purchase-unit.label")}
                                    defaultValue={selectedPurchaseUnit}
                                    value={selectedPurchaseUnit}
                                    data={productUnits}
                                    onChange={onPurchaseUnitChange}
                                    errors=""
                                    placeholder={placeholderText("product.input.purchase-unit.placeholder.label")}
                                />
                            </div>
                        )}
                    </Row>
                </Modal.Body>
                <Modal.Footer children="justify-content-start" className="pt-0">
                    <div className="d-flex">
                        <input
                            className="btn btn-primary me-5"
                            type="submit"
                            value={placeholderText("globally.save-btn")}
                            onClick={(e) => onSaveDetailModal(e)}
                        />
                        <button
                            type="reset"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClose(e);
                                setErrors({});
                            }}
                            className="btn btn-secondary"
                        >
                            {getFormattedMessage("globally.cancel-btn")}
                        </button>
                    </div>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProductModal;
