import React from "react";
import { FormattedMessage } from "react-intl";
import { Navigate } from "react-router-dom";
import { Tokens } from "../constants";
import { getFiles } from "../locales";
import moment from "moment";
import { DEFAULT_CURRENCY_SYMBOL, getCurrencySymbol } from "./currency";
import { getAuthToken, hasLocalSessionExpired } from "./authSession";

const NUMBER_FORMAT_LOCALE = "en-US";
const LOCALE_FALLBACK = "en";
const localeFiles = getFiles();
const isLocaleObject = (value) =>
    Boolean(value && typeof value === "object" && !Array.isArray(value));
let currentTranslationMessages = isLocaleObject(localeFiles?.[LOCALE_FALLBACK])
    ? localeFiles[LOCALE_FALLBACK]
    : {};

const getFallbackMessages = () => {
    if (
        isLocaleObject(currentTranslationMessages) &&
        Object.keys(currentTranslationMessages).length > 0
    ) {
        return currentTranslationMessages;
    }

    const activeLocale =
        typeof window !== "undefined"
            ? localStorage.getItem(Tokens.UPDATED_LANGUAGE)
            : null;

    if (activeLocale && isLocaleObject(localeFiles?.[activeLocale])) {
        return localeFiles[activeLocale];
    }

    if (isLocaleObject(localeFiles?.[LOCALE_FALLBACK])) {
        return localeFiles[LOCALE_FALLBACK];
    }

    return {};
};

export const syncTranslationMessages = (messages) => {
    currentTranslationMessages = isLocaleObject(messages)
        ? messages
        : getFallbackMessages();
};

export const translateMessage = (id, defaultMessage = id) => {
    const messageId = String(id || "").trim();
    if (!messageId) {
        return String(defaultMessage || "");
    }

    const translatedValue = getFallbackMessages()?.[messageId];
    return translatedValue || defaultMessage || messageId;
};

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
    const copyOptions = _.cloneDeep(Array.isArray(options) ? options : []);
    copyOptions.forEach((option) => {
        option.name = translateMessage(option?.name, option?.name);
    });

    return copyOptions;
};

export const placeholderText = (label) => {
    return translateMessage(label, label);
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
    const token = hasLocalSessionExpired() ? null : getAuthToken();
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
    return formatCurrency(isRightside, currency, value, is_forment);
};

// Enforce consistent NIO-style formatting (thousands comma, decimal point)
export const formatCurrency = (isRightside, currency, value, is_forment) => {
    const safeNum = parseNumber(value, 0);
    const formattedNumber = formatMoney(safeNum);
    const safeCurrency = getCurrencySymbol(currency, isRightside);
    if (isRightside?.is_currency_right === "true") {
        if (is_forment) {
            return formatAmount(safeNum) + " " + safeCurrency;
        } else {
            return formattedNumber + " " + safeCurrency;
        }
    } else {
        if (is_forment) {
            return safeCurrency + " " + formatAmount(safeNum);
        } else {
            return safeCurrency + " " + formattedNumber;
        }
    }
};

export { DEFAULT_CURRENCY_SYMBOL, getCurrencySymbol };

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
