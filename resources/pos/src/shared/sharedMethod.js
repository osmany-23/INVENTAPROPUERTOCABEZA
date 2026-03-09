import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Navigate } from "react-router-dom";
import { Tokens } from "../constants";
import moment from "moment";

const NUMBER_FORMAT_LOCALE = "en-US";

export const normalizeNumericValue = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    if (typeof value === "number") {
        return Number.isFinite(value) ? String(value) : "";
    }

    return String(value)
        .trim()
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "");
};

export const parseNumber = (value, fallback = 0) => {
    const numericValue = Number(normalizeNumericValue(value));
    return Number.isFinite(numericValue) ? numericValue : fallback;
};

export const formatNumber = (value, decimals = 2) => {
    const numericValue = parseNumber(value, NaN);
    const safeValue = Number.isFinite(numericValue) ? numericValue : 0;
    return safeValue.toLocaleString(NUMBER_FORMAT_LOCALE, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const formatMoney = (value) => {
    return formatNumber(value, 2);
};

export const formatQuantity = (value, decimals = 0) => {
    return formatNumber(value, decimals);
};

export const formatQuantityAuto = (value) => {
    const numericValue = parseNumber(value, 0);
    const decimals = Number.isInteger(numericValue) ? 0 : 2;
    return formatNumber(numericValue, decimals);
};

export const formatNumericInputOnBlur = (value, decimals = 2) => {
    const normalizedValue = normalizeNumericValue(value);
    if (normalizedValue === "") {
        return formatNumber(0, decimals);
    }

    return formatNumber(normalizedValue, decimals);
};

export const getAvatarName = (name) => {
    if (name) {
        return name
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase())
            .join("");
    }
};

export const numValidate = (event) => {
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
};

export const numWithSpaceValidate = (event) => {
        if (!/[0-9]/.test(event.key) && event.key !== ' ') {
            event.preventDefault();
        }
};


export const numFloatValidate = (event) => {
    const key = event.key;
    const value = event.target.value;
    if (/[0-9]/.test(key)) {
        return;
    }
    if (key === '.' && !value.includes('.')) {
        return;
    }
    event.preventDefault();
};


export const getFormattedMessage = (id) => {
    return <FormattedMessage id={id} defaultMessgae={id} />;
};

export const getFormattedOptions = (options) => {
    const intl = useIntl();
    const copyOptions = _.cloneDeep(options);
    copyOptions.map(
        (option) =>
            (option.name = intl.formatMessage({
                id: option.name,
                defaultMessage: option.name,
            }))
    );
    return copyOptions;
};

export const placeholderText = (label) => {
    const intl = useIntl();
    const placeholderLabel = intl.formatMessage({ id: label });
    return placeholderLabel;
};

export const decimalValidate = (event) => {
    if (!/^\d*\.?\d*$/.test(event.key)) {
        event.preventDefault();
    }
};

export const addRTLSupport = (rtlLang) => {
    const html = document.getElementsByTagName("html")[0];
    const att = document.createAttribute("dir");
    att.value = "rtl";
    if (rtlLang === "ar") {
        html.setAttributeNode(att);
    } else {
        html.removeAttribute("dir");
    }
};

export const onFocusInput = (el) => {
    const normalizedValue = normalizeNumericValue(el.target.value);
    if (normalizedValue === "0.00" || normalizedValue === "0") {
        el.target.value = "";
        return;
    }

    el.target.value = normalizedValue;
};

export const ProtectedRoute = (props) => {
    const { children, allConfigData, route } = props;
    const token = localStorage.getItem(Tokens.ADMIN);
    if (!token || token === null) {
        return <Navigate to="/login" replace={true} />;
    } else {
        // if (allConfigData?.open_register) {
        //     if (route === "pos") {
        //         return <Navigate to="/app/dashboard" replace={true} />;
        //     } else {
        //         return children;
        //     }
        // } else {
        //     return children;
        // }
        return children;
    }
};

export const formatAmount = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num;
};

export const currencySymbolHandling = (
    isRightside,
    currency,
    value,
    is_forment
) => {
    const safeNum = parseNumber(value, 0);
    const formattedNumber = formatMoney(safeNum);
    if (isRightside?.is_currency_right === "true") {
        if (is_forment) {
            return formatAmount(safeNum) + " " + currency;
        } else {
            return formattedNumber + " " + currency;
        }
    } else {
        if (is_forment) {
            return currency + " " + formatAmount(safeNum);
        } else {
            return currency + " " + formattedNumber;
        }
    }
};

// Enforce consistent NIO-style formatting (thousands comma, decimal point)
export const formatCurrency = (isRightside, currency, value, is_forment) => {
    const safeNum = parseNumber(value, 0);
    const formattedNumber = formatMoney(safeNum);
    if (isRightside?.is_currency_right === "true") {
        if (is_forment) {
            return formatAmount(safeNum) + " " + currency;
        } else {
            return formattedNumber + " " + currency;
        }
    } else {
        if (is_forment) {
            return currency + " " + formatAmount(safeNum);
        } else {
            return currency + " " + formattedNumber;
        }
    }
};

export const getFormattedDate = (date, config) => {
    const format = config && config.date_format;
    if (format === "d-m-y") {
        return moment(date).format("DD-MM-YYYY");
    } else if (format === "m-d-y") {
        return moment(date).format("MM-DD-YYYY");
    } else if (format === "y-m-d") {
        return moment(date).format("YYYY-MM-DD");
    } else if (format === "m/d/y") {
        return moment(date).format("MM/DD/YYYY");
    } else if (format === "d/m/y") {
        return moment(date).format("DD/MM/YYYY");
    } else if (format === "y/m/d") {
        return moment(date).format("YYYY/MM/DD");
    } else if (format === "m.d.y") {
        return moment(date).format("MM.DD.YYYY");
    } else if (format === "d.m.y") {
        return moment(date).format("DD.MM.YYYY");
    } else if (format === "y.m.d") {
        return moment(date).format("YYYY.MM.DD");
    } else moment(date).format("YYYY-MM-DD");
};
