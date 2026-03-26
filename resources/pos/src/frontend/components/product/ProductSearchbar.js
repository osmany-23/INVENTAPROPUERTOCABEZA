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
import { getFormattedMessage, placeholderText } from "../../../shared/sharedMethod";

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

    const suggestionItems = useMemo(() => {
        const term = normalize(searchString);
        if (!term) {
            return [];
        }

        return posAllProducts
            .filter((item) => Number(item?.attributes?.stock?.quantity || 0) > 0)
            .filter((item) => {
                const name = normalize(item?.attributes?.name);
                const code = normalize(item?.attributes?.code);
                const productCode = normalize(item?.attributes?.product_code);

                return (
                    name.includes(term) ||
                    code.includes(term) ||
                    productCode.includes(term)
                );
            })
            .slice(0, MAX_SUGGESTIONS)
            .map((item) => ({
                id: item.id,
                code: item?.attributes?.code || "",
                product_code: item?.attributes?.product_code || "",
                name: item?.attributes?.name || "",
                product: item,
            }));
    }, [posAllProducts, searchString]);

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

        return (
            posAllProducts.find((item) => {
                const hasStock = Number(item?.attributes?.stock?.quantity || 0) > 0;
                if (!hasStock) {
                    return false;
                }

                const code = normalize(item?.attributes?.code);
                const productCode = normalize(item?.attributes?.product_code);

                return code === term || productCode === term;
            }) || null
        );
    }, [posAllProducts, searchString]);

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
                {isOpen && suggestionItems.length > 0 && (
                    <div>
                        <ul>
                            {suggestionItems.map((item, index) => (
                                <li
                                    key={item.id}
                                    className={index === activeIndex ? "selected" : ""}
                                    onMouseDown={() => handleSelectSuggestion(item)}
                                >
                                    <span className="ellipsis search-result-row">
                                        <span className="search-result-code">{item.code}</span>
                                        <span className="search-result-separator"> - </span>
                                        <span className="search-result-name">{item.name}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {isOpen && searchString && suggestionItems.length === 0 && (
                    <div>
                        <ul>
                            <li data-test="no-results-message">
                                <span className="ellipsis">
                                    {getFormattedMessage("sale.product.table.no-data.label")}
                                </span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <i className="bi bi-search fs-2 react-search-icon position-absolute" />
        </Col>
    );
};

export default memo(ProductSearchbar);
