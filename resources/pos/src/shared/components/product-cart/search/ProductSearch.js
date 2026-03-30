import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../../../config/apiConfig";
import { addToast } from "../../../../store/action/toastAction";
import { apiBaseURL, toastType } from "../../../../constants";
import { searchPurchaseProduct } from "../../../../store/action/purchaseProductAction";
import { getFormattedMessage, placeholderText } from "../../../sharedMethod";
import {
    createPurchaseRowId,
    decoratePurchaseRow,
    PURCHASE_PRODUCT_KIND,
} from "../../../purchaseLineHelpers";

const DEFAULT_FAST_SEARCH_LIMIT = 25;
const DEFAULT_FAST_SEARCH_MIN_CHARS = 2;
const DEFAULT_FAST_SEARCH_DEBOUNCE_MS = 250;
const DEFAULT_RESULT_DISPLAY_MODE = "default";
const FAST_SEARCH_LOADING_TEXT = "Buscando...";
const FAST_SEARCH_NO_RESULTS_TEXT = "No results";

const normalizeText = (value) =>
    typeof value === "string" ? value.trim() : "";

const normalizeKey = (value) => normalizeText(value).toLowerCase();

const resolveWarehouseId = (values) =>
    values?.warehouse_id?.value ?? values?.warehouse_id ?? null;

const toLookupItem = (product) => ({
    name: product?.attributes?.name || "",
    code: product?.attributes?.code || "",
    product_code: product?.attributes?.product_code || "",
    id: product?.id,
    product,
});

const buildFastSearchCartItem = (product) => {
    const attributes = product?.attributes || {};
    const numericPrice = Number(attributes?.product_price || 0);
    const saleUnitValue =
        attributes?.purchase_unit?.id ??
        attributes?.purchase_unit ??
        attributes?.sale_unit?.id ??
        attributes?.sale_unit ??
        null;

    return {
        name: attributes?.name || "",
        code: attributes?.code || "",
        barcode_url: attributes?.barcode_url || "",
        stock: Number(attributes?.stock?.quantity || 0),
        short_name:
            attributes?.purchase_unit_name?.short_name ||
            attributes?.sale_unit_name?.short_name ||
            attributes?.product_unit_name?.short_name ||
            attributes?.product_unit_name?.name ||
            "",
        product_unit: attributes?.product_unit,
        product_id: product?.id,
        product_price: numericPrice,
        net_unit_price: numericPrice,
        fix_net_unit: numericPrice,
        tax_type: attributes?.tax_type ? attributes.tax_type : 1,
        tax_value: attributes?.order_tax ? attributes.order_tax : 0,
        tax_amount: 0,
        discount_type: "2",
        discount_value: 0,
        discount_amount: 0,
        sale_unit:
            saleUnitValue !== null &&
            saleUnitValue !== undefined &&
            !Number.isNaN(Number(saleUnitValue))
                ? Number(saleUnitValue)
                : saleUnitValue,
        quantity: 1,
        sub_total: 0,
        id: product?.id,
        sale_item_id: "",
        sale_return_item_id: "",
        adjustMethod: 1,
        adjustment_item_id: "",
        quotation_item_id: null,
        quantity_limit: attributes?.quantity_limit,
        warehouse_id: attributes?.stock?.warehouse_id,
        batch_enabled: Boolean(attributes?.batch_enabled),
        is_batch_product: Boolean(attributes?.is_batch_product),
        is_variant_product: Boolean(attributes?.is_variant_product),
        product_type: attributes?.product_type ?? attributes?.main_product_type,
        main_product_type:
            attributes?.main_product_type ?? attributes?.product_type,
        variation_product: attributes?.variation_product || null,
        variation_type_name:
            attributes?.variation_product?.variation_type_name || "",
    };
};

const ProductSearch = (props) => {
    const {
        values,
        products,
        updateProducts,
        setUpdateProducts,
        customProducts,
        searchPurchaseProduct,
        handleValidation,
        isAllProducts,
        incrementOnDuplicate = false,
        enableWarehouseFastSearch = false,
        fastSearchLimit = DEFAULT_FAST_SEARCH_LIMIT,
        fastSearchMinChars = DEFAULT_FAST_SEARCH_MIN_CHARS,
        fastSearchDebounceMs = DEFAULT_FAST_SEARCH_DEBOUNCE_MS,
        fastSearchIncludeNoStock = false,
        resultDisplayMode = DEFAULT_RESULT_DISPLAY_MODE,
        enableBatchDrafts = false,
        blockBatchProductsWithoutDrafts = false,
        onResolveProductAdd = null,
    } = props;

    const warehouseId = resolveWarehouseId(values);
    const [searchString, setSearchString] = useState("");
    const [remoteItems, setRemoteItems] = useState([]);
    const [isFastSearching, setIsFastSearching] = useState(false);
    const [hasFastSearchResolved, setHasFastSearchResolved] = useState(false);
    const [isFastDropdownOpen, setIsFastDropdownOpen] = useState(false);
    const searchContainerRef = useRef(null);
    const fastQueryCacheRef = useRef(new Map());
    const exactCodeCacheRef = useRef(new Map());
    const fastSearchRequestSeqRef = useRef(0);
    const debounceTimeoutRef = useRef(null);
    const lastAutoAddedCodeRef = useRef("");
    const dispatch = useDispatch();

    const localProducts = useMemo(
        () => (Array.isArray(products) ? products : []),
        [products]
    );

    const clearPendingFastSearch = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }
    }, []);

    const resetFastSearchState = useCallback(() => {
        clearPendingFastSearch();
        fastSearchRequestSeqRef.current += 1;
        setRemoteItems([]);
        setIsFastSearching(false);
        setHasFastSearchResolved(false);
        setIsFastDropdownOpen(false);
    }, [clearPendingFastSearch]);

    useEffect(() => {
        return () => {
            clearPendingFastSearch();
        };
    }, [clearPendingFastSearch]);

    useEffect(() => {
        if (!enableWarehouseFastSearch) {
            return;
        }

        const handleOutsideClick = (event) => {
            const searchElement = searchContainerRef.current;
            if (!searchElement || searchElement.contains(event.target)) {
                return;
            }
            setIsFastDropdownOpen(false);
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [enableWarehouseFastSearch]);

    useEffect(() => {
        if (!enableWarehouseFastSearch) {
            return;
        }

        resetFastSearchState();
        lastAutoAddedCodeRef.current = "";
        fastQueryCacheRef.current.clear();
        exactCodeCacheRef.current.clear();
    }, [warehouseId, enableWarehouseFastSearch, resetFastSearchState]);

    const filterProducts = useMemo(() => {
        if (!warehouseId || enableWarehouseFastSearch || !Array.isArray(localProducts)) {
            return [];
        }

        if (isAllProducts) {
            return localProducts.map((item) => toLookupItem(item));
        }

        return localProducts
            .filter((qty) => qty?.attributes?.stock?.quantity > 0)
            .map((item) => toLookupItem(item));
    }, [enableWarehouseFastSearch, isAllProducts, localProducts, warehouseId]);

    const searchItems = useMemo(() => {
        return enableWarehouseFastSearch ? remoteItems : filterProducts;
    }, [enableWarehouseFastSearch, filterProducts, remoteItems]);

    const fetchFastProducts = useCallback(
        async (query, { exactCode = false } = {}) => {
            const normalizedQuery = normalizeText(query);
            if (!enableWarehouseFastSearch || !warehouseId || !normalizedQuery) {
                return [];
            }

            const cacheKey = `${warehouseId}|${
                exactCode ? "exact" : "search"
            }|${normalizeKey(normalizedQuery)}`;
            if (fastQueryCacheRef.current.has(cacheKey)) {
                return fastQueryCacheRef.current.get(cacheKey);
            }

            try {
                const response = await apiConfig.get(
                    `${apiBaseURL.PRODUCTS}/adjustment-fast-search`,
                    {
                        params: {
                            warehouse_id: warehouseId,
                            search: normalizedQuery,
                            exact_code: exactCode ? 1 : 0,
                            limit: fastSearchLimit,
                            include_no_stock: fastSearchIncludeNoStock ? 1 : 0,
                        },
                    }
                );

                const data = Array.isArray(response?.data?.data)
                    ? response.data.data
                    : [];

                fastQueryCacheRef.current.set(cacheKey, data);
                data.forEach((product) => {
                    const codeKey = normalizeKey(product?.attributes?.code);
                    const productCodeKey = normalizeKey(
                        product?.attributes?.product_code
                    );
                    if (codeKey) {
                        exactCodeCacheRef.current.set(
                            `${warehouseId}|${codeKey}`,
                            product
                        );
                    }
                    if (productCodeKey) {
                        exactCodeCacheRef.current.set(
                            `${warehouseId}|${productCodeKey}`,
                            product
                        );
                    }
                });

                return data;
            } catch (error) {
                return [];
            }
        },
        [
            enableWarehouseFastSearch,
            fastSearchIncludeNoStock,
            fastSearchLimit,
            warehouseId,
        ]
    );

    const queueFastSearch = useCallback(
        (query, onResolved = null) => {
            clearPendingFastSearch();
            const normalizedQuery = normalizeKey(query);
            if (!normalizedQuery) {
                setIsFastSearching(false);
                setHasFastSearchResolved(false);
                return;
            }

            setIsFastSearching(true);
            setHasFastSearchResolved(false);
            const requestId = fastSearchRequestSeqRef.current + 1;
            fastSearchRequestSeqRef.current = requestId;
            debounceTimeoutRef.current = setTimeout(async () => {
                const fastProducts = await fetchFastProducts(query);
                if (requestId !== fastSearchRequestSeqRef.current) {
                    return;
                }
                const nextItems = fastProducts.map((item) => toLookupItem(item));
                setRemoteItems(nextItems);
                setIsFastSearching(false);
                setHasFastSearchResolved(true);
                if (typeof onResolved === "function") {
                    onResolved(nextItems);
                }
            }, fastSearchDebounceMs);
        },
        [clearPendingFastSearch, fastSearchDebounceMs, fetchFastProducts]
    );

    const resolveProduct = useCallback(
        async (value) => {
            const selectedCode = normalizeText(
                typeof value === "string" ? value : value?.code
            );
            const normalizedCode = normalizeKey(selectedCode);
            const selectedId = Number(value?.id);

            if (value?.product?.id) {
                return value.product;
            }

            if (Number.isFinite(selectedId) && selectedId > 0) {
                const remoteById = remoteItems.find(
                    (item) => Number(item?.id) === selectedId
                );
                if (remoteById?.product) {
                    return remoteById.product;
                }

                if (!enableWarehouseFastSearch) {
                    const localById = localProducts.find(
                        (item) => Number(item?.id) === selectedId
                    );
                    if (localById) {
                        return localById;
                    }
                }
            }

            if (!normalizedCode) {
                return null;
            }

            if (!enableWarehouseFastSearch) {
                const localByCode = localProducts.find((item) => {
                    const productCode = normalizeKey(item?.attributes?.code);
                    const altCode = normalizeKey(item?.attributes?.product_code);
                    return (
                        productCode === normalizedCode ||
                        altCode === normalizedCode
                    );
                });
                return localByCode || null;
            }

            const cacheKey = `${warehouseId}|${normalizedCode}`;
            const cachedProduct = exactCodeCacheRef.current.get(cacheKey);
            if (cachedProduct) {
                return cachedProduct;
            }

            const fastProducts = await fetchFastProducts(selectedCode, {
                exactCode: true,
            });

            return (
                fastProducts.find((item) => {
                    const productCode = normalizeKey(item?.attributes?.code);
                    const altCode = normalizeKey(item?.attributes?.product_code);
                    return (
                        productCode === normalizedCode || altCode === normalizedCode
                    );
                }) || null
            );
        },
        [
            enableWarehouseFastSearch,
            fetchFastProducts,
            localProducts,
            remoteItems,
            warehouseId,
        ]
    );

    const getPreparedProduct = useCallback(
        (product) => {
            const productId = Number(product?.id);
            if (!Number.isFinite(productId) || productId <= 0) {
                return null;
            }

            if (enableWarehouseFastSearch) {
                return buildFastSearchCartItem(product);
            }

            const customProduct = Array.isArray(customProducts)
                ? customProducts.find(
                      (item) => Number(item?.product_id) === productId
                  )
                : null;

            if (customProduct) {
                return customProduct;
            }

            return null;
        },
        [customProducts, enableWarehouseFastSearch]
    );

    const onProductSearch = useCallback(
        async (value) => {
            if (!warehouseId) {
                if (typeof handleValidation === "function") {
                    handleValidation();
                }
                return;
            }

            if (enableWarehouseFastSearch) {
                clearPendingFastSearch();
                fastSearchRequestSeqRef.current += 1;
            }

            const scannedCode = normalizeText(
                typeof value === "string" ? value : value?.code
            );
            if (scannedCode) {
                setSearchString(scannedCode);
            }

            const product = await resolveProduct(value);
            if (!product) {
                return;
            }

            const productId = Number(product?.id);
            if (!Number.isFinite(productId) || productId <= 0) {
                return;
            }

            if (!enableWarehouseFastSearch) {
                searchPurchaseProduct(productId);
            }

            const newProduct = getPreparedProduct(product);
            if (!newProduct) {
                return;
            }

            const decoratedProduct = decoratePurchaseRow(
                {
                    ...newProduct,
                    id: newProduct.id ?? productId,
                    product_id: newProduct.product_id ?? productId,
                },
                product?.attributes || {},
                {
                    rowId: createPurchaseRowId(
                        newProduct.product_id ?? productId,
                        enableBatchDrafts &&
                            Boolean(
                                product?.attributes?.is_batch_product ||
                                    product?.attributes?.batch_enabled
                            )
                            ? "batch"
                            : "line"
                    ),
                }
            );
            const isBatchDraft =
                enableBatchDrafts &&
                decoratedProduct.product_kind === PURCHASE_PRODUCT_KIND.BATCH;

            if (
                !isBatchDraft &&
                blockBatchProductsWithoutDrafts &&
                decoratedProduct.product_kind === PURCHASE_PRODUCT_KIND.BATCH
            ) {
                dispatch(
                    addToast({
                        text: "Los productos por lote solo pueden agregarse en compras nuevas.",
                        type: toastType.ERROR,
                    })
                );
                return;
            }

            if (typeof onResolveProductAdd === "function") {
                const interceptResult = await onResolveProductAdd({
                    product,
                    preparedProduct: newProduct,
                    decoratedProduct,
                    currentProducts: Array.isArray(updateProducts)
                        ? updateProducts
                        : [],
                    warehouseId,
                    clearSearch: () => {
                        removeSearchClass();
                        setSearchString("");
                        resetFastSearchState();
                        lastAutoAddedCodeRef.current = "";
                    },
                });

                if (interceptResult?.handled) {
                    if (interceptResult.clearSearch !== false) {
                        removeSearchClass();
                        setSearchString("");
                        resetFastSearchState();
                        lastAutoAddedCodeRef.current = "";
                    }
                    return;
                }
            }

            setUpdateProducts((prev) => {
                const existingProduct = prev.find(
                    (item) =>
                        Number(item?.product_id ?? item?.id) === productId
                );

                if (!isBatchDraft && existingProduct) {
                    if (incrementOnDuplicate) {
                        return prev.map((item) =>
                            Number(item?.product_id ?? item?.id) === productId
                                ? {
                                      ...item,
                                      quantity: Number(item.quantity || 0) + 1,
                                  }
                                : item
                        );
                    }
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "globally.product-already-added.validate.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
                    return prev;
                }

                return [...prev, decoratedProduct];
            });

            removeSearchClass();
            setSearchString("");
            resetFastSearchState();
            lastAutoAddedCodeRef.current = "";
        },
        [
            clearPendingFastSearch,
            dispatch,
            enableWarehouseFastSearch,
            getPreparedProduct,
            handleValidation,
            incrementOnDuplicate,
            resetFastSearchState,
            resolveProduct,
            searchPurchaseProduct,
            setUpdateProducts,
            warehouseId,
            enableBatchDrafts,
            blockBatchProductsWithoutDrafts,
            onResolveProductAdd,
        ]
    );

    const handleOnSearch = useCallback(
        (inputValue) => {
            setSearchString(inputValue);
            const normalizedInput = normalizeKey(inputValue);

            if (!normalizedInput) {
                resetFastSearchState();
                lastAutoAddedCodeRef.current = "";
                return;
            }

            if (enableWarehouseFastSearch) {
                setIsFastDropdownOpen(true);
            }

            const exactMatch = filterProducts.find((item) => {
                const itemCode = normalizeKey(item?.code);
                const itemName = normalizeKey(item?.name);
                const itemProductCode = normalizeKey(item?.product_code);
                return (
                    itemCode === normalizedInput ||
                    itemName === normalizedInput ||
                    itemProductCode === normalizedInput
                );
            });

            if (exactMatch) {
                onProductSearch(exactMatch);
                return;
            }

            if (
                !enableWarehouseFastSearch ||
                normalizeText(inputValue).length < fastSearchMinChars
            ) {
                if (enableWarehouseFastSearch) {
                    resetFastSearchState();
                }
                return;
            }

            queueFastSearch(inputValue, (items) => {
                const exactRemoteCodeMatch = items.find((item) => {
                    const itemCode = normalizeKey(item?.code);
                    const itemProductCode = normalizeKey(
                        item?.product?.attributes?.product_code
                    );
                    return (
                        itemCode === normalizedInput ||
                        itemProductCode === normalizedInput
                    );
                });

                if (!exactRemoteCodeMatch) {
                    return;
                }

                const autoAddKey = `${warehouseId}|${normalizedInput}`;
                if (lastAutoAddedCodeRef.current === autoAddKey) {
                    return;
                }

                lastAutoAddedCodeRef.current = autoAddKey;
                onProductSearch(exactRemoteCodeMatch);
            });
        },
        [
            enableWarehouseFastSearch,
            fastSearchMinChars,
            filterProducts,
            onProductSearch,
            queueFastSearch,
            resetFastSearchState,
            warehouseId,
        ]
    );

    const handleOnSelect = useCallback(
        (result) => {
            onProductSearch(result);
        },
        [onProductSearch]
    );

    const formatResult = (item) => {
        const code = item?.code || item?.product_code || "";
        const name = item?.name || "";

        if (resultDisplayMode !== "code-name-dash") {
            return <span className="search-result-row">{code} ({name})</span>;
        }

        return (
            <span className="search-result-row">
                <span className="search-result-code">{code}</span>
                {name ? (
                    <>
                        <span className="search-result-separator"> - </span>
                        <span className="search-result-name">{name}</span>
                    </>
                ) : null}
            </span>
        );
    };

    const removeSearchClass = () => {
        if (enableWarehouseFastSearch) {
            setIsFastDropdownOpen(false);
            return;
        }
        const searchRoot = searchContainerRef.current;
        const dropdown = searchRoot?.querySelector(".wrapper > div:nth-child(2)");
        if (dropdown?.style) {
            dropdown.style.display = "none";
        }
    };

    const handleFastInputChange = useCallback(
        (event) => {
            handleOnSearch(event.target.value);
        },
        [handleOnSearch]
    );

    const handleFastInputFocus = useCallback(() => {
        if (!enableWarehouseFastSearch) {
            return;
        }
        const normalizedSearch = normalizeKey(searchString);
        setIsFastDropdownOpen(normalizedSearch.length >= fastSearchMinChars);
    }, [enableWarehouseFastSearch, fastSearchMinChars, searchString]);

    const handleFastInputKeyDown = useCallback(
        (event) => {
            if (event.key !== "Enter") {
                return;
            }
            const value = normalizeText(searchString);
            if (!value) {
                return;
            }
            event.preventDefault();
            onProductSearch(value);
        },
        [onProductSearch, searchString]
    );

    const normalizedFastSearchValue = normalizeKey(searchString);
    const shouldShowFastResultsPanel =
        enableWarehouseFastSearch &&
        isFastDropdownOpen &&
        normalizedFastSearchValue.length >= fastSearchMinChars;

    const shouldShowFastNoResults =
        shouldShowFastResultsPanel &&
        !isFastSearching &&
        hasFastSearchResolved &&
        remoteItems.length === 0;

    if (enableWarehouseFastSearch) {
        return (
            <div
                className="position-relative custom-search custom-search-fast"
                ref={searchContainerRef}
            >
                <div className="wrapper">
                    <input
                        type="text"
                        value={searchString}
                        placeholder={placeholderText("globally.search.field.label")}
                        onChange={handleFastInputChange}
                        onFocus={handleFastInputFocus}
                        onKeyDown={handleFastInputKeyDown}
                    />
                    {shouldShowFastResultsPanel ? (
                        <div className="custom-search-results-panel">
                            {isFastSearching ? (
                                <div className="custom-search-status">
                                    {FAST_SEARCH_LOADING_TEXT}
                                </div>
                            ) : remoteItems.length > 0 ? (
                                <ul>
                                    {remoteItems.map((item) => (
                                        <li
                                            key={item.id}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                                handleOnSelect(item);
                                            }}
                                        >
                                            {formatResult(item)}
                                        </li>
                                    ))}
                                </ul>
                            ) : shouldShowFastNoResults ? (
                                <div className="custom-search-status">
                                    {FAST_SEARCH_NO_RESULTS_TEXT}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                <FontAwesomeIcon
                    icon={faSearch}
                    className="react-search-icon text-gray-600 position-absolute"
                />
            </div>
        );
    }

    return (
        <div className="position-relative custom-search" ref={searchContainerRef}>
            <ReactSearchAutocomplete
                items={searchItems}
                onSearch={handleOnSearch}
                inputSearchString={searchString}
                fuseOptions={{ keys: ["code", "name", "product_code"] }}
                resultStringKeyName="code"
                placeholder={placeholderText("globally.search.field.label")}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                showNoResultsText={FAST_SEARCH_NO_RESULTS_TEXT}
                showIcon={false}
                showClear={false}
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="react-search-icon text-gray-600 position-absolute"
            />
        </div>
    );
};

export default connect(null, { searchPurchaseProduct })(ProductSearch);
