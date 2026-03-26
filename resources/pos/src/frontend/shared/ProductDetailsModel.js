import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap-v5";
import Select from "react-select";
import { connect } from "react-redux";
import {
    decimalValidate,
    formatNumericInputOnBlur,
    getFormattedMessage,
    normalizeNumericValue,
    parseNumber,
    placeholderText,
    getFormattedOptions,
} from "../../shared/sharedMethod";
import { productUnitDropdown } from "../../store/action/productUnitAction";
import ReactSelect from "../../shared/select/reactSelect";
import { calculateProductCost } from "./SharedMethod";
import { taxMethodOptions, discountMethodOptions } from "../../constants";
import { getCartRowId } from "../../shared/batchHelpers";

const keepTwoDecimals = (value) => {
    if (value === "") {
        return "";
    }

    return formatNumericInputOnBlur(value, 2);
};

const ProductDetailsModel = (props) => {
    const {
        openProductDetailModal,
        isOpenCartItemUpdateModel,
        cartProduct,
        onProductUpdateInCart,
        productModelId,
        updateCost,
        canEditPosSalePrice = true,
        productUnitDropdown,
        productUnits,
        frontSetting,
    } = props;

    const [product, setProduct] = useState(cartProduct);
    const [unitPrice, setUnitPrice] = useState("0.00");
    const [saleUnitType, setSaleUnitType] = useState(null);
    const [discount, setDiscount] = useState("0.00");
    const [orderTax, setOrderTax] = useState("0.00");
    const [taxType, setTaxType] = useState({
        value: 1,
        label: getFormattedMessage("tax-type.filter.exclusive.label"),
    });
    const [discountType, setDiscountType] = useState({
        value: 1,
        label: getFormattedMessage("discount-type.filter.percentage.label"),
    });
    const [errors, setErrors] = useState({
        product_cost: "",
        discount: "",
        orderTax: "",
    });

    const taxTypeFilterOptions = getFormattedOptions(taxMethodOptions);
    const discountTypeFilterOptions = getFormattedOptions(
        discountMethodOptions
    );

    const saleUnitsOption = useMemo(() => {
        if (!Array.isArray(productUnits)) {
            return [];
        }

        return productUnits.map((productUnit) => ({
            value: productUnit.id,
            label: productUnit.attributes.name,
        }));
    }, [productUnits]);

    const getSaleUnitOption = (saleUnitValue) => {
        if (saleUnitValue === null || saleUnitValue === undefined) {
            return null;
        }

        return (
            saleUnitsOption.find(
                (option) => Number(option.value) === Number(saleUnitValue)
            ) || null
        );
    };

    useEffect(() => {
        if (!cartProduct) {
            return;
        }

        setProduct(cartProduct);
        setUnitPrice(
            keepTwoDecimals(
                cartProduct.product_price ?? cartProduct.net_unit_cost ?? 0
            )
        );
        setDiscount(keepTwoDecimals(cartProduct.discount_value ?? 0));
        setOrderTax(keepTwoDecimals(cartProduct.tax_value ?? 0));
        setTaxType(
            Number(cartProduct.tax_type) === 2
                ? {
                      value: 2,
                      label: getFormattedMessage(
                          "tax-type.filter.inclusive.label"
                      ),
                  }
                : {
                      value: 1,
                      label: getFormattedMessage(
                          "tax-type.filter.exclusive.label"
                      ),
                  }
        );
        setDiscountType(
            Number(cartProduct.discount_type) === 2
                ? {
                      value: 2,
                      label: getFormattedMessage(
                          "discount-type.filter.fixed.label"
                      ),
                  }
                : {
                      value: 1,
                      label: getFormattedMessage(
                          "discount-type.filter.percentage.label"
                      ),
                  }
        );
        setErrors({
            product_cost: "",
            discount: "",
            orderTax: "",
        });
    }, [cartProduct]);

    useEffect(() => {
        if (!cartProduct) {
            return;
        }

        const selectedSaleUnit =
            cartProduct.sale_unit?.value ?? cartProduct.sale_unit;
        setSaleUnitType(getSaleUnitOption(selectedSaleUnit));
    }, [cartProduct, saleUnitsOption]);

    useEffect(() => {
        if (cartProduct?.product_unit) {
            productUnitDropdown(cartProduct.product_unit);
        }
    }, [cartProduct?.product_unit, productUnitDropdown]);

    if (!cartProduct) {
        return null;
    }

    if (!canEditPosSalePrice) {
        return null;
    }

    const handleValidation = () => {
        const validationErrors = {};
        const numericUnitPrice = parseNumber(unitPrice, NaN);
        const numericDiscount = parseNumber(discount, 0);
        const numericTax = parseNumber(orderTax, 0);

        let isValid = false;

        if (!Number.isFinite(numericUnitPrice) || numericUnitPrice < 0) {
            validationErrors.product_cost = "Please enter price";
        } else if (
            Number(discountType.value) === 1 &&
            (numericDiscount < 0 || numericDiscount > 100)
        ) {
            validationErrors.discount =
                "The Discount must not be greater than 100";
        } else if (
            Number(discountType.value) === 2 &&
            (numericDiscount < 0 || numericDiscount > numericUnitPrice)
        ) {
            validationErrors.discount =
                "The Discount must not be greater than product price";
        } else if (numericTax < 0 || numericTax > 100) {
            validationErrors.orderTax = "The Tax must not be greater than 100";
        } else {
            isValid = true;
        }

        setErrors(validationErrors);
        return isValid;
    };

    const onNumericInputChange = (setter) => (event) => {
        const value = normalizeNumericValue(event.target.value);
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }

        setter(value);
    };

    const calculateDiscountAmount = (basePrice, discountValue, type) => {
        const numericDiscountValue = parseNumber(discountValue, 0);
        const numericBasePrice = parseNumber(basePrice, 0);

        if (numericDiscountValue <= 0) {
            return 0;
        }

        if (Number(type) === 2) {
            return numericDiscountValue;
        }

        return (numericBasePrice * numericDiscountValue) / 100;
    };

    const calculateTaxAmount = (basePriceAfterDiscount, taxValue, type) => {
        const numericTaxValue = parseNumber(taxValue, 0);
        const numericBasePrice = parseNumber(basePriceAfterDiscount, 0);

        if (numericTaxValue <= 0 || Number(type) !== 1) {
            return 0;
        }

        return (numericBasePrice * numericTaxValue) / 100;
    };

    const onSaveDetailModal = () => {
        const isValid = handleValidation();
        if (!isValid) {
            return;
        }

        if (String(productModelId) !== getCartRowId(product)) {
            return;
        }

        const nextUnitPrice = parseNumber(unitPrice, 0);
        const nextDiscountValue = parseNumber(discount, 0);
        const nextTaxValue = parseNumber(orderTax, 0);
        const nextDiscountType = Number(discountType.value);
        const nextTaxType = Number(taxType.value);

        const discountAmount = calculateDiscountAmount(
            nextUnitPrice,
            nextDiscountValue,
            nextDiscountType
        );
        const basePriceAfterDiscount = Math.max(0, nextUnitPrice - discountAmount);
        const taxAmount = calculateTaxAmount(
            basePriceAfterDiscount,
            nextTaxValue,
            nextTaxType
        );

        const updatedProduct = {
            ...product,
            net_unit_cost: nextUnitPrice,
            product_price: nextUnitPrice,
            discount_value: nextDiscountValue,
            discount_type: nextDiscountType,
            discount_amount: discountAmount,
            tax_value: nextTaxValue,
            tax_type: nextTaxType,
            tax_amount: taxAmount,
            sale_unit: saleUnitType?.value ?? product.sale_unit,
        };

        updatedProduct.sub_total =
            calculateProductCost(updatedProduct) *
            parseNumber(updatedProduct.quantity, 0);

        onProductUpdateInCart(updatedProduct);

        if (typeof updateCost === "function") {
            updateCost(updatedProduct.net_unit_cost);
        }

        openProductDetailModal(false);
    };

    return (
        <Modal
            show={isOpenCartItemUpdateModel}
            onHide={() => openProductDetailModal(false)}
            className="pos-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="text-capitalize">{product.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="col-12">
                        <Form.Group
                            className="col-md-12 mb-3"
                            controlId="formBasicProductCost"
                        >
                            <Form.Label>
                                {getFormattedMessage("product.input.product-price.label")}:
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="product_cost"
                                    min="0"
                                    step=".01"
                                    placeholder="0.00"
                                    onKeyPress={(event) => decimalValidate(event)}
                                    className="form-control-solid"
                                    value={unitPrice}
                                    onChange={onNumericInputChange(setUnitPrice)}
                                    onBlur={() =>
                                        setUnitPrice((previous) =>
                                            formatNumericInputOnBlur(previous, 2)
                                        )
                                    }
                                />
                                <InputGroup.Text>
                                    {frontSetting.value &&
                                        frontSetting.value.currency_symbol}
                                </InputGroup.Text>
                            </InputGroup>
                            <span className="text-danger">
                                {errors.product_cost || null}
                            </span>
                        </Form.Group>
                        <div className="col-md-12 mb-3">
                            <ReactSelect
                                title={getFormattedMessage("product.input.tax-type.label")}
                                multiLanguageOption={taxTypeFilterOptions}
                                onChange={setTaxType}
                                errors=""
                                value={taxType}
                                placeholder={placeholderText(
                                    "product.input.tax-type.placeholder.label"
                                )}
                            />
                        </div>
                        <Form.Group
                            className="col-md-12 mb-3"
                            controlId="formBasicOrderTax"
                        >
                            <Form.Label>
                                {getFormattedMessage("product.product-details.tax.label")}:
                            </Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="orderTax"
                                    className="form-control-solid"
                                    onKeyPress={(event) => decimalValidate(event)}
                                    onChange={onNumericInputChange(setOrderTax)}
                                    value={orderTax}
                                    onBlur={() =>
                                        setOrderTax((previous) =>
                                            formatNumericInputOnBlur(previous, 2)
                                        )
                                    }
                                />
                                <InputGroup.Text>%</InputGroup.Text>
                            </InputGroup>
                            <span className="text-danger">
                                {errors.orderTax || null}
                            </span>
                        </Form.Group>
                        <div className="col-md-12 mb-3">
                            <ReactSelect
                                title={getFormattedMessage(
                                    "purchase.product-modal.select.discount-type.label"
                                )}
                                multiLanguageOption={discountTypeFilterOptions}
                                onChange={setDiscountType}
                                errors=""
                                value={discountType}
                                placeholder={placeholderText(
                                    "pos-sale.select.discount-type.placeholder"
                                )}
                            />
                        </div>
                        <Form.Group
                            className="col-md-12 mb-3"
                            controlId="formBasicDiscount"
                        >
                            <Form.Label>
                                {getFormattedMessage("globally.detail.discount")}:
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="discount"
                                min="0"
                                onKeyPress={(event) => decimalValidate(event)}
                                className="form-control-solid"
                                max="100"
                                onChange={onNumericInputChange(setDiscount)}
                                value={discount}
                                onBlur={() =>
                                    setDiscount((previous) =>
                                        formatNumericInputOnBlur(previous, 2)
                                    )
                                }
                            />
                            <span className="text-danger">{errors.discount || null}</span>
                        </Form.Group>
                        <Form.Group className="col-md-12" controlId="formBasicUnit">
                            <Form.Label>
                                {getFormattedMessage("product.input.sale-unit.label")}:
                            </Form.Label>
                            <Select
                                name="sale_unit"
                                placeholder={placeholderText(
                                    "pos-sale.select.sale-unit-type.placeholder"
                                )}
                                value={saleUnitType}
                                onChange={setSaleUnitType}
                                options={saleUnitsOption}
                                noOptionsMessage={() =>
                                    getFormattedMessage("no-option.label")
                                }
                            />
                        </Form.Group>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className="pt-0">
                <Button variant="primary" onClick={onSaveDetailModal}>
                    {getFormattedMessage("globally.save-btn")}
                </Button>
                <Button
                    variant="secondary"
                    className="me-0"
                    onClick={() => openProductDetailModal(false)}
                >
                    {getFormattedMessage("globally.cancel-btn")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const { productUnits } = state;
    return { productUnits };
};

export default connect(mapStateToProps, { productUnitDropdown })(
    ProductDetailsModel
);
