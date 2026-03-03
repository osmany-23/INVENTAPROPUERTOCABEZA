import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap-v5";
import { useDispatch } from "react-redux";
import {
    currencySymbolHandling,
    decimalValidate,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { calculateProductCost } from "../../shared/SharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

const QUANTITY_DEBOUNCE_MS = 120;

const ProductCartList = ({
    singleProduct,
    onClickUpdateItemInCart,
    onDeleteCartItem,
    frontSetting,
    setUpdateProducts,
    allConfigData,
    canEditPosSalePrice,
    availableStock = 0,
}) => {
    const dispatch = useDispatch();
    const [quantityDraft, setQuantityDraft] = useState(singleProduct.quantity);
    const debounceRef = useRef(null);

    useEffect(() => {
        setQuantityDraft(singleProduct.quantity);
    }, [singleProduct.quantity]);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const updateQuantity = useCallback(
        (quantity, showErrorIfExceeded = true) => {
            const finalQuantity = Math.max(0, Number(quantity));
            const cappedQuantity = Math.min(finalQuantity, Number(availableStock));

            if (showErrorIfExceeded && finalQuantity > Number(availableStock)) {
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "pos.product-quantity-error.message"
                        ),
                        type: toastType.ERROR,
                    })
                );
            }

            setUpdateProducts((updateProducts) =>
                updateProducts.map((item) => {
                    if (item.id !== singleProduct.id) {
                        return item;
                    }

                    return { ...item, quantity: cappedQuantity };
                })
            );
        },
        [availableStock, dispatch, setUpdateProducts, singleProduct.id]
    );

    const handleIncrement = useCallback(() => {
        const nextQuantity = Number(singleProduct.quantity) + 1;
        setQuantityDraft(nextQuantity);
        updateQuantity(nextQuantity);
    }, [singleProduct.quantity, updateQuantity]);

    const handleDecrement = useCallback(() => {
        const nextQuantity = Number(singleProduct.quantity) - 1;
        if (nextQuantity <= 0) {
            return;
        }

        setQuantityDraft(nextQuantity);
        updateQuantity(nextQuantity, false);
    }, [singleProduct.quantity, updateQuantity]);

    const handleChange = useCallback(
        (event) => {
            event.preventDefault();
            const { value } = event.target;

            if (value.match(/\./g)) {
                const [, decimal] = value.split(".");
                if (decimal?.length > 2) {
                    return;
                }
            }

            if (value === "") {
                setQuantityDraft("");
                return;
            }

            const nextQuantity = Number(value);
            if (Number.isNaN(nextQuantity)) {
                return;
            }

            setQuantityDraft(nextQuantity);

            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                updateQuantity(nextQuantity);
            }, QUANTITY_DEBOUNCE_MS);
        },
        [updateQuantity]
    );

    const handleBlur = useCallback(() => {
        if (quantityDraft === "" || Number(quantityDraft) <= 0) {
            setQuantityDraft(singleProduct.quantity);
            return;
        }

        updateQuantity(quantityDraft);
    }, [quantityDraft, singleProduct.quantity, updateQuantity]);

    const handleEditClick = useCallback(() => {
        onClickUpdateItemInCart(singleProduct);
    }, [onClickUpdateItemInCart, singleProduct]);

    const handleDeleteClick = useCallback(() => {
        onDeleteCartItem(singleProduct.id);
    }, [onDeleteCartItem, singleProduct.id]);

    const unitCost = calculateProductCost(singleProduct);
    const rowTotal = unitCost * Number(singleProduct.quantity || 0);

    return (
        <tr className="align-middle">
            <td className="text-nowrap ps-0">
                <h4 className="product-name text-gray-900 mb-1 text-capitalize text-truncate">
                    {singleProduct.name}
                </h4>
                <span className="product-sku">
                    <span className="badge bg-light-info sku-badge">
                        {singleProduct.code}
                    </span>
                    {canEditPosSalePrice && (
                        <i
                            className="bi bi-pencil-fill text-gray-600 ms-2 cursor-pointer fs-small"
                            onClick={handleEditClick}
                        />
                    )}
                </span>
            </td>
            <td>
                <div className="counter d-flex align-items-center pos-custom-qty">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleDecrement}
                        className="counter__down d-flex align-items-center justify-content-center"
                    >
                        -
                    </Button>
                    <input
                        type="number"
                        value={quantityDraft}
                        className="hide-arrow"
                        onKeyPress={decimalValidate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <Button
                        type="button"
                        variant="primary"
                        onClick={handleIncrement}
                        className="counter__up d-flex align-items-center justify-content-center"
                    >
                        +
                    </Button>
                </div>
            </td>
            <td className="text-nowrap">
                {currencySymbolHandling(
                    allConfigData,
                    frontSetting.value && frontSetting.value.currency_symbol,
                    unitCost
                )}
            </td>
            <td className="text-nowrap">
                {currencySymbolHandling(
                    allConfigData,
                    frontSetting.value && frontSetting.value.currency_symbol,
                    rowTotal
                )}
            </td>
            <td className="text-end remove-button pe-0">
                <Button
                    className="p-0 bg-transparent border-0"
                    onClick={handleDeleteClick}
                >
                    <i className="bi bi-trash3 text-danger" />
                </Button>
            </td>
        </tr>
    );
};

export default memo(ProductCartList);
