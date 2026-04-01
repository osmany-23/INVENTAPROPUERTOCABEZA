import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Col } from "react-bootstrap-v5";
import apiConfig from "../../../config/apiConfig";
import { apiBaseURL } from "../../../constants";
import { placeholderText } from "../../../shared/sharedMethod";

const SEARCH_DEBOUNCE_MS = 250;
const MAX_SUGGESTIONS = 15;
const AUTO_ADD_EXACT_CODE_DELAY_MS = 120;

const normalize = (value) => (value || "").toString().trim().toUpperCase();

const withBatchSelectionMode = (product, mode, batch = null) => {
    if (!product?.attributes?.batch_enabled) {
        return product;
    }

    return {
        ...product,
        attributes: {
            ...product.attributes,
            ...(batch
                ? {
                      batch_context: {
                          ...(product.attributes?.batch_context || {}),
                          id: Number(batch.id),
                          lot_code: batch.lot_code,
                          lot_barcode: batch.lot_barcode,
                          expires_at: batch.expires_at,
                          available_quantity: Number(batch.available_quantity || 0),
                      },
                      batch_status: batch.status || product.attributes?.batch_status || null,
                  }
                : {}),
            batch_selection_mode: mode,
        },
    };
};

const ProductSearchbar = ({
    posAllProducts = [],
    onAddProduct,
    onSearchTermChange,
    warehouseId,
    onScanFeedback,
}) => {
    const [searchString, setSearchString] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const scanRequestRef = useRef(0);

    const searchableProducts = useMemo(() => {
        return posAllProducts.reduce((items, product) => {
            const stockQuantity = Number(product?.attributes?.stock?.quantity || 0);
            if (stockQuantity <= 0) {
                return items;
            }

            items.push({
                id: product.id,
                code: product?.attributes?.code || "",
                product_code: product?.attributes?.product_code || "",
                name: product?.attributes?.name || "",
                normalizedCode: normalize(product?.attributes?.code),
                normalizedProductCode: normalize(product?.attributes?.product_code),
                normalizedName: normalize(product?.attributes?.name),
                product,
            });

            return items;
        }, []);
    }, [posAllProducts]);

    const exactMatchLookup = useMemo(() => {
        const lookup = new Map();

        searchableProducts.forEach((item) => {
            if (item.normalizedCode && !lookup.has(item.normalizedCode)) {
                lookup.set(item.normalizedCode, item.product);
            }

            if (
                item.normalizedProductCode &&
                !lookup.has(item.normalizedProductCode)
            ) {
                lookup.set(item.normalizedProductCode, item.product);
            }
        });

        return lookup;
    }, [searchableProducts]);

    const suggestionItems = useMemo(() => {
        const term = normalize(searchString);
        if (!term) {
            return [];
        }

        const nextSuggestions = [];

        for (const item of searchableProducts) {
            if (
                item.normalizedName.includes(term) ||
                item.normalizedCode.includes(term) ||
                item.normalizedProductCode.includes(term)
            ) {
                nextSuggestions.push({
                    id: item.id,
                    code: item.code,
                    product_code: item.product_code,
                    name: item.name,
                    product: item.product,
                });
            }

            if (nextSuggestions.length >= MAX_SUGGESTIONS) {
                break;
            }
        }

        return nextSuggestions;
    }, [searchString, searchableProducts]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onSearchTermChange?.(searchString);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(debounceTimer);
    }, [searchString, onSearchTermChange]);

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.altKey && event.code === "KeyQ") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setIsOpen(false);
                setActiveIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        return () => {
            scanRequestRef.current += 1;
        };
    }, []);

    const addProductAndResetInput = useCallback(
        (product) => {
            void Promise.resolve(onAddProduct?.(product));
            setSearchString("");
            onSearchTermChange?.("");
            setIsOpen(false);
            setActiveIndex(-1);
            inputRef.current?.focus();
        },
        [onAddProduct, onSearchTermChange]
    );

    const findLocalExactMatch = useCallback(() => {
        const term = normalize(searchString);
        if (!term) {
            return null;
        }

        return exactMatchLookup.get(term) || null;
    }, [exactMatchLookup, searchString]);

    const resolveScanOrExactMatch = useCallback(async () => {
        const term = normalize(searchString);
        if (!term) {
            return false;
        }

        const exactMatch = findLocalExactMatch();
        const shouldTryBatchLookup =
            Number(warehouseId) > 0 &&
            (Boolean(exactMatch) || term.includes("-") || suggestionItems.length === 0);

        if (shouldTryBatchLookup) {
            const requestId = ++scanRequestRef.current;

            try {
                const response = await apiConfig.get(apiBaseURL.PRODUCT_BATCH_SCAN, {
                    params: {
                        warehouse_id: warehouseId,
                        code: term,
                    },
                });
                const payload = response?.data?.data || {};

                if (requestId !== scanRequestRef.current) {
                    return false;
                }

                if (payload?.matched && payload.matched !== "none" && payload.product) {
                    if (payload.warning) {
                        onScanFeedback?.(payload.warning);
                    }

                    addProductAndResetInput(
                        withBatchSelectionMode(
                            payload.product,
                            payload.matched === "batch" ? "specific" : "fefo",
                            payload.batch
                        )
                    );
                    return true;
                }
            } catch (error) {
                if (requestId !== scanRequestRef.current) {
                    return false;
                }

                const message = error?.response?.data?.message;
                if (message) {
                    onScanFeedback?.(message, "error");
                }

                return false;
            }
        }

        if (!exactMatch) {
            return false;
        }

        addProductAndResetInput(withBatchSelectionMode(exactMatch, "fefo"));
        return true;
    }, [
        addProductAndResetInput,
        findLocalExactMatch,
        onScanFeedback,
        searchString,
        suggestionItems.length,
        warehouseId,
    ]);

    useEffect(() => {
        const term = normalize(searchString);
        if (!term) {
            return;
        }

        const timer = setTimeout(() => {
            void resolveScanOrExactMatch();
        }, AUTO_ADD_EXACT_CODE_DELAY_MS);

        return () => {
            clearTimeout(timer);
        };
    }, [searchString, resolveScanOrExactMatch]);

    const handleInputChange = useCallback((event) => {
        setSearchString(event.target.value);
        setIsOpen(true);
        setActiveIndex(-1);
    }, []);

    const handleSelectSuggestion = useCallback(
        (item) => {
            addProductAndResetInput(
                withBatchSelectionMode(item.product || item.id, "fefo")
            );
        },
        [addProductAndResetInput]
    );

    const handleInputKeyDown = useCallback(
        async (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
                setActiveIndex((prev) =>
                    Math.min(prev + 1, suggestionItems.length - 1)
                );
                return;
            }

            if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((prev) => Math.max(prev - 1, 0));
                return;
            }

            if (event.key === "Escape") {
                setIsOpen(false);
                setActiveIndex(-1);
                return;
            }

            if (event.key !== "Enter") {
                return;
            }

            event.preventDefault();

            if (activeIndex >= 0 && suggestionItems[activeIndex]) {
                handleSelectSuggestion(suggestionItems[activeIndex]);
                return;
            }

            if (await resolveScanOrExactMatch()) {
                return;
            }

            if (suggestionItems[0]) {
                handleSelectSuggestion(suggestionItems[0]);
            }
        },
        [
            activeIndex,
            handleSelectSuggestion,
            resolveScanOrExactMatch,
            suggestionItems,
        ]
    );

    return (
        <Col
            className="position-relative my-3 search-bar col-xxl-8 col-lg-12 col-12"
            ref={containerRef}
        >
            <div className="wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchString}
                    onChange={handleInputChange}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleInputKeyDown}
                    placeholder={placeholderText("pos-globally.search.field.label")}
                    autoFocus
                />
            </div>
            <i className="bi bi-search fs-2 react-search-icon position-absolute" />
        </Col>
    );
};

export default memo(ProductSearchbar);
