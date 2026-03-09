import { parseNumber } from "../sharedMethod";

const toNumber = (value, fallback = 0) => parseNumber(value, fallback);

export const subTotalCount = (cartItem) => {
    const totalAmount = toNumber(taxAmount(cartItem)) + toNumber(amountBeforeTax(cartItem));
    return Number(totalAmount * toNumber(cartItem.quantity)).toFixed(2);
}

export const discountAmount = (cartItem) => {
    if (cartItem.discount_type === '1' || cartItem.discount_type === 1) {
        return ((toNumber(cartItem.fix_net_unit) / 100) * toNumber(cartItem.discount_value));
    } else if (cartItem.discount_type === '2' || cartItem.discount_type === 2) {
        return toNumber(cartItem.discount_value);
    }
    return Number(toNumber(cartItem.discount_amount).toFixed(2));
};

export const discountAmountMultiply = (cartItem) => {
    let discountMultiply = discountAmount(cartItem);
    return (toNumber(discountMultiply) * toNumber(cartItem.quantity)).toFixed(2);
}

export const taxAmount = (cartItem) => {
    if (cartItem.tax_type === '2' || cartItem.tax_type === 2) {
        return ((toNumber(cartItem.fix_net_unit) - discountAmount(cartItem)) * toNumber(cartItem.tax_value)) / (100 + toNumber(cartItem.tax_value));
    } else if (cartItem.tax_type === '1' || cartItem.tax_type === 1) {
        return ((toNumber(cartItem.fix_net_unit) - discountAmount(cartItem)) * toNumber(cartItem.tax_value)) / 100;
    }

    return Number(toNumber(cartItem.tax_amount).toFixed(2));
}

export const taxAmountMultiply = (cartItem) => {
    let taxMultiply = taxAmount(cartItem);
    return (toNumber(taxMultiply) * toNumber(cartItem.quantity)).toFixed(2);
}

export const amountBeforeTax = (cartItem) => {
    let price = toNumber(cartItem.fix_net_unit);
    const unitCost = price - discountAmount(cartItem);
    const inclusiveTax = unitCost - taxAmount(cartItem);
    let finalCalPrice = cartItem.tax_type === '1' || cartItem.tax_type === 1 ? unitCost : inclusiveTax;
    return Number(finalCalPrice.toFixed(2));
}

//Grand Total Calculation
export const calculateCartTotalTaxAmount = (carts, inputValue) => {
    let taxValue = inputValue && toNumber(inputValue.tax_rate);
    const discountValue = inputValue ? toNumber(inputValue.discount) : 0;
    let totalTax = 0;
    let price = 0;

    carts.forEach(cartItem => {
        if (taxValue > 0) {
            price = price + toNumber(cartItem.sub_total);
            totalTax = (((price - discountValue) / 100) * taxValue) * toNumber(cartItem.quantity);
        }
    })

    return Number(totalTax).toFixed(2);
}

export const calculateSubTotal = (carts) => {
    let subTotalAmount = 0;
    carts.forEach(cartItem => {
        subTotalAmount = subTotalAmount + toNumber(subTotalCount(cartItem))
    })
    return subTotalAmount;
}

export const calculateCartTotalAmount = (carts, inputValue) => {
    let finalTotalAmount
    const value = inputValue && inputValue;
    const discountValue = value ? toNumber(value.discount) : 0;
    const taxRateValue = value ? toNumber(value.tax_rate) : 0;
    const shippingValue = value ? toNumber(value.shipping) : 0;
    let totalAmountAfterDiscount = calculateSubTotal(carts) - discountValue;
    let taxCal = (totalAmountAfterDiscount * taxRateValue / 100).toFixed(2)
    finalTotalAmount = toNumber(totalAmountAfterDiscount) + toNumber(taxCal) + shippingValue;
    return Number(finalTotalAmount).toFixed(2)
}
