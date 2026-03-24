export const DEFAULT_CURRENCY_SYMBOL = "C$";

let cachedCurrencySymbol = DEFAULT_CURRENCY_SYMBOL;

const normalizeCurrencyValue = (value) => {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value).trim();
};

const extractCurrencySymbol = (source) => {
    if (source === null || source === undefined) {
        return null;
    }

    if (typeof source !== "object") {
        const normalizedValue = normalizeCurrencyValue(source);
        return normalizedValue || null;
    }

    const candidates = [
        source.currency_symbol,
        source.symbol,
        source?.value?.currency_symbol,
        source?.value?.symbol,
        source?.attributes?.currency_symbol,
        source?.attributes?.symbol,
        source?.settings?.attributes?.currency_symbol,
        source?.settings?.attributes?.symbol,
    ];

    for (const candidate of candidates) {
        const normalizedValue = normalizeCurrencyValue(candidate);
        if (normalizedValue) {
            return normalizedValue;
        }
    }

    return null;
};

export const getCurrencySymbol = (...sources) => {
    for (const source of sources) {
        const currencySymbol = extractCurrencySymbol(source);
        if (currencySymbol) {
            cachedCurrencySymbol = currencySymbol;
            return currencySymbol;
        }
    }

    return cachedCurrencySymbol || DEFAULT_CURRENCY_SYMBOL;
};

export const normalizeCurrencyConfig = (source = {}) => {
    const value =
        source && typeof source.value === "object" && source.value !== null
            ? source.value
            : {};

    return {
        ...source,
        value: {
            ...value,
            currency_symbol: getCurrencySymbol(source, value),
        },
    };
};

export const normalizeSettingConfig = (source = {}) => {
    const attributes =
        source &&
        typeof source.attributes === "object" &&
        source.attributes !== null
            ? source.attributes
            : {};

    return {
        ...source,
        attributes: {
            ...attributes,
            currency_symbol: getCurrencySymbol(source, attributes),
        },
    };
};
