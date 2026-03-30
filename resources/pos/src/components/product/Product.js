import React, {
    Profiler,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap-v5";
import { useIntl } from "react-intl";
import MasterLayout from "../MasterLayout";
import { fetchAllMainProducts } from "../../store/action/productAction";
import ReactDataTable from "../../shared/table/ReactDataTable";
import DeleteMainProduct from "./DeleteMainProduct";
import TabTitle from "../../shared/tab-title/TabTitle";
import ProductImageLightBox from "./ProductImageLightBox";
import user from "../../assets/images/brand_logo.png";
import {
    formatCurrency,
    formatQuantity,
    getFormattedDate,
    getFormattedMessage,
    getCurrencySymbol,
    placeholderText,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ImportProductModel from "./ImportProductModel";
import { productExcelAction } from "../../store/action/productExcelAction";
import {
    createRenderProfiler,
    markNavigationReady,
    reportDetectedBottleneck,
} from "../../shared/performance/posPerformance";
import { canCrud } from "../../shared/can";

const PRODUCT_NOTE_PREVIEW_LIMIT = 50;
const PRODUCT_NOTE_TOOLTIP_WIDTH = 320;
const PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT = 220;
const PRODUCT_NOTE_TOOLTIP_OFFSET = 10;
const PRODUCT_NOTE_TOOLTIP_HIDE_DELAY = 100;
const PRODUCT_NOTE_TOOLTIP_UNMOUNT_DELAY = 160;
const PRODUCT_NOTE_PREVIEW_STYLE = {
    maxWidth: 300,
    lineHeight: "1.3rem",
    minHeight: "2.6rem",
    maxHeight: "2.6rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    whiteSpace: "normal",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
const PRODUCT_NOTE_PREVIEW_WRAPPER_STYLE = {
    display: "inline-flex",
    alignItems: "center",
    maxWidth: "100%",
    cursor: "pointer",
};
const PRODUCT_NOTE_TOOLTIP_STYLE = {
    position: "fixed",
    zIndex: 1100,
    backgroundColor: "#ffffff",
    color: "#495057",
    border: "1px solid rgba(101, 113, 255, 0.24)",
    borderRadius: "12px",
    padding: "10px 12px",
    lineHeight: "1.35rem",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    maxHeight: PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT,
    overflowY: "auto",
    scrollbarWidth: "thin",
    boxShadow:
        "0 10px 26px rgba(16, 24, 40, 0.12), 0 2px 8px rgba(16, 24, 40, 0.08)",
    transition: "opacity 160ms ease, transform 160ms ease",
    opacity: 0,
    transform: "translateY(4px)",
    pointerEvents: "auto",
};
const PRODUCT_NOTE_TOOLTIP_VISIBLE_STYLE = {
    opacity: 1,
    transform: "translateY(0)",
};
const PRODUCT_IMAGE_WRAPPER_STYLE = {
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
};
const PRODUCT_IMAGE_CELL_CONTENT_STYLE = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
const PRODUCT_IMAGE_HEADER_STYLE = {
    width: "100%",
    textAlign: "center",
};
const PRODUCT_IMAGE_BUTTON_STYLE = {
    width: "100%",
    height: "100%",
    padding: 0,
    border: "none",
    boxShadow: "none",
    outline: "none",
    background: "transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
};
const PRODUCT_IMAGE_STYLE = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    borderRadius: "50%",
};
const PRODUCT_IMAGE_COLUMN_CELL_STYLE = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0,
};
const PRODUCT_NAME_COLUMN_CELL_STYLE = {
    display: "flex",
    alignItems: "center",
    paddingLeft: "12px",
};
const PRODUCT_NAME_TEXT_STYLE = {
    display: "flex",
    alignItems: "center",
    width: "100%",
};
const PRODUCT_IMAGE_URL_PROTOCOL_REGEX = /^[a-z][a-z\d+\-.]*:\/\//i;
const PRODUCT_IMAGE_PATH_PREFIXES = ["//", "/", "data:", "blob:"];
const PRODUCT_ROUTE_PATH = "/app/products";
const PRODUCT_BOTTLENECK_LABEL =
    "shared/filterMenu/FilterDropdown.js -> fetchAllBaseUnits() + fetchAllBrands() + fetchAllProductCategories()";

const isProductImagePathLike = (value) => {
    const normalizedValue = String(value || "").trim().toLowerCase();
    if (!normalizedValue) {
        return false;
    }

    if (PRODUCT_IMAGE_URL_PROTOCOL_REGEX.test(normalizedValue)) {
        return true;
    }

    return PRODUCT_IMAGE_PATH_PREFIXES.some((prefix) =>
        normalizedValue.startsWith(prefix)
    );
};

const shouldSplitProductImageValue = (value) => {
    if (!value.includes(",")) {
        return false;
    }

    const parts = value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

    if (parts.length <= 1) {
        return false;
    }

    return parts.every(isProductImagePathLike);
};

const ProductImageCell = memo(function ProductImageCell({
    imageUrl,
    imageUrls,
    productName,
    onPreviewImage,
}) {
    const handlePreview = useCallback(
        (event) => {
            event.stopPropagation();
            if (Array.isArray(imageUrls) && imageUrls.length > 0) {
                onPreviewImage(imageUrls);
            }
        },
        [imageUrls, onPreviewImage]
    );

    return (
        <div
            className="product-table-card__image-cell"
            style={PRODUCT_IMAGE_CELL_CONTENT_STYLE}
        >
            <div
                className="product-table-card__image-wrapper"
                style={PRODUCT_IMAGE_WRAPPER_STYLE}
            >
                <button
                    type="button"
                    className="d-inline-flex align-items-center justify-content-center product-table-card__image-button"
                    style={PRODUCT_IMAGE_BUTTON_STYLE}
                    onClick={handlePreview}
                >
                    <Image
                        src={imageUrl || user}
                        height={50}
                        width={50}
                        alt={productName || "Product Image"}
                        className="cursor-pointer product-table-card__image"
                        style={PRODUCT_IMAGE_STYLE}
                        loading="lazy"
                        decoding="async"
                    />
                </button>
            </div>
        </div>
    );
});

const ProductNameCell = memo(function ProductNameCell({ name }) {
    return <div className="product-table-card__name">{name || "-"}</div>;
});

const ProductCodeCell = memo(function ProductCodeCell({ code, label }) {
    return (
        <div className="product-table-card__code">
            <span className="badge bg-light-danger product-table-card__badge product-table-card__badge--code">
                <span className="product-table-card__desktop-only">
                    {code || "-"}
                </span>
                <span className="product-table-card__mobile-only">
                    {label}: {code || "-"}
                </span>
            </span>
        </div>
    );
});

const ProductBrandCell = memo(function ProductBrandCell({ brandName, label }) {
    return (
        <div className="product-table-card__brand">
            <span className="product-table-card__label product-table-card__mobile-only">
                {label}:
            </span>{" "}
            <span className="product-table-card__value">{brandName || "-"}</span>
        </div>
    );
});

const ProductPriceCell = memo(function ProductPriceCell({ price }) {
    return <div className="product-table-card__price">{price}</div>;
});

const ProductUnitCell = memo(function ProductUnitCell({ unitName }) {
    return (
        <div className="product-table-card__unit">
            <span className="badge bg-light-success product-table-card__badge product-table-card__badge--unit">
                <span>{unitName || "N/A"}</span>
            </span>
        </div>
    );
});

const ProductStockCell = memo(function ProductStockCell({ stock, label }) {
    return (
        <div className="product-table-card__stock">
            <span className="product-table-card__desktop-only">{stock}</span>
            <span className="product-table-card__stock-badge product-table-card__mobile-only">
                {label}: {stock}
            </span>
        </div>
    );
});

const ProductDescriptionCell = memo(function ProductDescriptionCell({
    rowId,
    description,
}) {
    const triggerRef = useRef(null);
    const hideTimeoutRef = useRef(null);
    const unmountTimeoutRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [isTooltipMounted, setIsTooltipMounted] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({
        top: 0,
        left: 0,
        width: PRODUCT_NOTE_TOOLTIP_WIDTH,
    });

    const fullDescription = useMemo(() => {
        if (description === null || description === undefined) {
            return "";
        }

        return String(description).trim();
    }, [description]);

    const { displayDescription, isTruncated } = useMemo(() => {
        if (!fullDescription) {
            return { displayDescription: "-", isTruncated: false };
        }

        if (fullDescription.length <= PRODUCT_NOTE_PREVIEW_LIMIT) {
            return { displayDescription: fullDescription, isTruncated: false };
        }

        return {
            displayDescription: `${fullDescription.slice(
                0,
                PRODUCT_NOTE_PREVIEW_LIMIT
            )}...`,
            isTruncated: true,
        };
    }, [fullDescription]);

    const clearTooltipTimers = useCallback(() => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

        if (unmountTimeoutRef.current) {
            clearTimeout(unmountTimeoutRef.current);
            unmountTimeoutRef.current = null;
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
    }, []);

    const updateTooltipPosition = useCallback(() => {
        if (!triggerRef.current || typeof window === "undefined") {
            return;
        }

        const rect = triggerRef.current.getBoundingClientRect();
        const viewportPadding = 8;
        const tooltipWidth = Math.min(
            PRODUCT_NOTE_TOOLTIP_WIDTH,
            Math.max(220, window.innerWidth - viewportPadding * 2)
        );

        let left = rect.left;
        if (left + tooltipWidth > window.innerWidth - viewportPadding) {
            left = window.innerWidth - tooltipWidth - viewportPadding;
        }
        left = Math.max(viewportPadding, left);

        let top = rect.bottom + PRODUCT_NOTE_TOOLTIP_OFFSET;
        const estimatedHeight = PRODUCT_NOTE_TOOLTIP_MAX_HEIGHT + 24;
        if (top + estimatedHeight > window.innerHeight - viewportPadding) {
            top = Math.max(
                viewportPadding,
                rect.top - estimatedHeight - PRODUCT_NOTE_TOOLTIP_OFFSET
            );
        }

        setTooltipPosition((previousPosition) => {
            if (
                previousPosition.top === top &&
                previousPosition.left === left &&
                previousPosition.width === tooltipWidth
            ) {
                return previousPosition;
            }

            return { top, left, width: tooltipWidth };
        });
    }, []);

    const showTooltip = useCallback(() => {
        if (!isTruncated) {
            return;
        }

        clearTooltipTimers();
        updateTooltipPosition();
        setIsTooltipMounted(true);
        animationFrameRef.current = requestAnimationFrame(() => {
            setIsTooltipVisible(true);
        });
    }, [clearTooltipTimers, isTruncated, updateTooltipPosition]);

    const hideTooltip = useCallback(() => {
        clearTooltipTimers();
        hideTimeoutRef.current = setTimeout(() => {
            setIsTooltipVisible(false);
            unmountTimeoutRef.current = setTimeout(() => {
                setIsTooltipMounted(false);
            }, PRODUCT_NOTE_TOOLTIP_UNMOUNT_DELAY);
        }, PRODUCT_NOTE_TOOLTIP_HIDE_DELAY);
    }, [clearTooltipTimers]);

    useEffect(() => {
        if (!isTooltipMounted) {
            return undefined;
        }

        const handlePositionUpdate = () => {
            updateTooltipPosition();
        };

        window.addEventListener("scroll", handlePositionUpdate, true);
        window.addEventListener("resize", handlePositionUpdate);

        return () => {
            window.removeEventListener("scroll", handlePositionUpdate, true);
            window.removeEventListener("resize", handlePositionUpdate);
        };
    }, [isTooltipMounted, updateTooltipPosition]);

    useEffect(() => {
        return () => {
            clearTooltipTimers();
        };
    }, [clearTooltipTimers]);

    const descriptionPreview = (
        <span
            ref={triggerRef}
            className="product-table-card__description-trigger"
            style={PRODUCT_NOTE_PREVIEW_WRAPPER_STYLE}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            tabIndex={isTruncated ? 0 : -1}
        >
            <span
                className="product-table-card__description-text"
                style={PRODUCT_NOTE_PREVIEW_STYLE}
            >
                {displayDescription}
            </span>
        </span>
    );

    if (!isTruncated) {
        return descriptionPreview;
    }

    const tooltipPortal =
        isTooltipMounted && typeof document !== "undefined"
            ? createPortal(
                  <div
                      role="tooltip"
                      id={`product-note-popover-${rowId}`}
                      onMouseEnter={showTooltip}
                      onMouseLeave={hideTooltip}
                      style={{
                          ...PRODUCT_NOTE_TOOLTIP_STYLE,
                          ...(isTooltipVisible
                              ? PRODUCT_NOTE_TOOLTIP_VISIBLE_STYLE
                              : null),
                          top: tooltipPosition.top,
                          left: tooltipPosition.left,
                          width: tooltipPosition.width,
                      }}
                  >
                      {fullDescription}
                  </div>,
                  document.body
              )
            : null;

    return (
        <>
            {descriptionPreview}
            {tooltipPortal}
        </>
    );
});

const ProductActionCell = memo(function ProductActionCell({
    row,
    onView,
    onEdit,
    onDelete,
    viewLabel,
    editLabel,
    deleteLabel,
    canUpdateProduct,
    canDeleteProduct,
}) {
    return (
        <div className="product-table-card__actions">
            <div className="product-table-card__actions-desktop">
                <ActionButton
                    isViewIcon={true}
                    goToDetailScreen={onView}
                    item={row}
                    goToEditProduct={onEdit}
                    isEditMode={true}
                    onClickDeleteModel={onDelete}
                />
            </div>
            <div className="product-table-card__actions-mobile">
                <button
                    type="button"
                    className="product-table-card__mobile-action product-table-card__mobile-action--view"
                    onClick={(event) => {
                        event.stopPropagation();
                        onView(row.id);
                    }}
                >
                    <FontAwesomeIcon icon={faEye} fixedWidth />
                    <span>{viewLabel}</span>
                </button>
                {canUpdateProduct ? (
                    <button
                        type="button"
                        className="product-table-card__mobile-action product-table-card__mobile-action--edit"
                        onClick={(event) => {
                            event.stopPropagation();
                            onEdit(row);
                        }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                        <span>{editLabel}</span>
                    </button>
                ) : null}
                {canDeleteProduct ? (
                    <button
                        type="button"
                        className="product-table-card__mobile-action product-table-card__mobile-action--delete"
                        onClick={(event) => {
                            event.stopPropagation();
                            onDelete(row);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} fixedWidth />
                        <span>{deleteLabel}</span>
                    </button>
                ) : null}
            </div>
        </div>
    );
});

const Product = (props) => {
    const {
        fetchAllMainProducts,
        products,
        totalRecord,
        isLoading,
        frontSetting,
        productExcelAction,
        productUnitId,
        allConfigData,
    } = props;
    const intl = useIntl();

    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [lightBoxImage, setLightBoxImage] = useState([]);
    const [importProduct, setImportProduct] = useState(false);
    const [isWarehouseValue, setIsWarehouseValue] = useState(false);

    const activeRequestRef = useRef(null);
    const initialProductsRequestStartedRef = useRef(false);
    const navigationReadyLoggedRef = useRef(false);

    const handleClose = useCallback(() => {
        setImportProduct((previous) => !previous);
    }, []);

    useEffect(() => {
        if (isWarehouseValue === true) {
            productExcelAction(setIsWarehouseValue, true, productUnitId);
        }
    }, [isWarehouseValue, productExcelAction, productUnitId]);

    const onExcelClick = useCallback(() => {
        setIsWarehouseValue(true);
    }, []);

    const cancelActiveRequest = useCallback(() => {
        if (activeRequestRef.current) {
            activeRequestRef.current.abort();
            activeRequestRef.current = null;
        }
    }, []);

    useEffect(() => {
        reportDetectedBottleneck(
            PRODUCT_BOTTLENECK_LABEL,
            "cargas simultaneas de catalogos completos al montar Productos"
        );

        return () => {
            cancelActiveRequest();
        };
    }, [cancelActiveRequest]);

    useEffect(() => {
        if (
            !initialProductsRequestStartedRef.current ||
            isLoading ||
            navigationReadyLoggedRef.current
        ) {
            return;
        }

        markNavigationReady(
            `${PRODUCT_ROUTE_PATH}::data`,
            "components/product/Product"
        );
        navigationReadyLoggedRef.current = true;
    }, [isLoading]);

    const onClickDeleteModel = useCallback((item = null) => {
        setDeleteModel((previous) => !previous);
        setIsDelete(item);
    }, []);

    const onChange = useCallback(
        (filter) => {
            cancelActiveRequest();
            initialProductsRequestStartedRef.current = true;
            const controller = new AbortController();
            activeRequestRef.current = controller;
            fetchAllMainProducts(filter, true, controller.signal);
        },
        [cancelActiveRequest, fetchAllMainProducts]
    );

    const goToEditProduct = useCallback((item) => {
        const id = item.id;
        window.location.href = "#/app/products/edit/" + id;
    }, []);

    const goToProductDetailPage = useCallback((productId) => {
        window.location.href = "#/app/products/detail/" + productId;
    }, []);

    const onPreviewImage = useCallback((images) => {
        const normalizeImages = (value) => {
            if (Array.isArray(value)) {
                return value.flatMap(normalizeImages);
            }

            if (typeof value === "string") {
                const normalizedValue = value.trim();
                if (!normalizedValue) {
                    return [];
                }

                if (
                    normalizedValue.startsWith("[") &&
                    normalizedValue.endsWith("]")
                ) {
                    try {
                        return normalizeImages(JSON.parse(normalizedValue));
                    } catch (error) {
                        // If parsing fails, continue with plain string fallback.
                    }
                }

                if (shouldSplitProductImageValue(normalizedValue)) {
                    return normalizedValue
                        .split(",")
                        .map((image) => image.trim())
                        .filter(Boolean);
                }

                return [normalizedValue];
            }

            return [];
        };

        const normalizedImages = normalizeImages(images).filter(Boolean);
        if (normalizedImages.length === 0) {
            return;
        }

        setLightBoxImage(normalizedImages);
        setIsOpen(true);
    }, []);

    const currencySymbol = getCurrencySymbol(frontSetting);
    const codeLabel = intl.formatMessage({
        id: "product.input.code.label",
        defaultMessage: "Codigo",
    });
    const brandLabel = intl.formatMessage({
        id: "product.input.brand.label",
        defaultMessage: "Marca",
    });
    const stockLabel = intl.formatMessage({
        id: "product.product-in-stock.label",
        defaultMessage: "Stock",
    });
    const viewActionLabel = (() => {
        const translatedLabel = intl.formatMessage({
            id: "globally.view.tooltip.label",
            defaultMessage: "Ver",
        });
        return translatedLabel === "Vista" ? "Ver" : translatedLabel;
    })();
    const editActionLabel = intl.formatMessage({
        id: "globally.edit.tooltip.label",
        defaultMessage: "Editar",
    });
    const deleteActionLabel = (() => {
        const translatedLabel = intl.formatMessage({
            id: "globally.delete.tooltip.label",
            defaultMessage: "Eliminar",
        });
        return translatedLabel === "Borrar" ? "Eliminar" : translatedLabel;
    })();
    const canUpdateProduct = useMemo(() => canCrud("update"), []);
    const canDeleteProduct = useMemo(() => canCrud("delete"), []);

    const formattedPrice = useCallback(
        (productPrice) => {
            return formatCurrency(allConfigData, currencySymbol, productPrice);
        },
        [allConfigData, currencySymbol]
    );

    const itemsValue = useMemo(() => {
        if (!Array.isArray(products) || products.length === 0) {
            return [];
        }

        return products.map((product) => {
            const attributes = product?.attributes || {};
            const firstVariation = attributes?.products?.[0] || {};

            const minPrice = Number(
                attributes.min_price ?? firstVariation.product_price
            );
            const maxPrice = Number(
                attributes.max_price ?? firstVariation.product_price
            );

            const productPrice =
                Number.isFinite(minPrice) && Number.isFinite(maxPrice)
                    ? minPrice === maxPrice
                        ? formattedPrice(minPrice)
                        : `${formattedPrice(minPrice)} - ${formattedPrice(maxPrice)}`
                    : formattedPrice(0);

            const createdAt = attributes.created_at || firstVariation.created_at;
            const description =
                attributes.full_description ||
                attributes.description ||
                firstVariation.notes ||
                "";

            const imageUrls = attributes?.images?.imageUrls || [];
            const inStockFromVariations = Array.isArray(attributes.products)
                ? attributes.products.reduce(
                      (sum, rowProduct) =>
                          sum + Number(rowProduct?.in_stock || 0),
                      0
                  )
                : 0;

            return {
                id: product.id,
                name: attributes.name,
                code: attributes.code,
                date: createdAt
                    ? getFormattedDate(createdAt, allConfigData && allConfigData)
                    : "",
                time: createdAt ? moment(createdAt).format("LT") : "",
                brand_name: attributes.brand_name || firstVariation.brand_name || "",
                product_price: productPrice,
                product_unit: attributes?.product_unit?.name || "N/A",
                in_stock: Number(attributes.in_stock ?? inStockFromVariations),
                description,
                imageUrl: imageUrls[0] || null,
                imageUrls,
            };
        });
    }, [allConfigData, formattedPrice, products]);

    const columns = useMemo(
        () => [
            {
                name: (
                    <div style={PRODUCT_IMAGE_HEADER_STYLE}>
                        {getFormattedMessage("product.title")}
                    </div>
                ),
                sortField: "name",
                sortable: false,
                center: true,
                style: PRODUCT_IMAGE_COLUMN_CELL_STYLE,
                width: "132px",
                minWidth: "132px",
                maxWidth: "132px",
                grow: 0,
                cell: (row) => (
                    <ProductImageCell
                        imageUrl={row.imageUrl}
                        imageUrls={row.imageUrls}
                        productName={row.name}
                        onPreviewImage={onPreviewImage}
                    />
                ),
            },
            {
                name: getFormattedMessage("supplier.table.name.column.title"),
                sortField: "name",
                sortable: true,
                style: PRODUCT_NAME_COLUMN_CELL_STYLE,
                grow: 1.4,
                minWidth: "220px",
                cell: (row) => <ProductNameCell name={row.name} />,
            },
            {
                name: getFormattedMessage("product.input.code.label"),
                cell: (row) => (
                    <ProductCodeCell
                        code={row.code}
                        label={codeLabel}
                    />
                ),
                sortField: "code",
                sortable: true,
            },
            {
                name: getFormattedMessage("product.input.brand.label"),
                cell: (row) => (
                    <ProductBrandCell
                        brandName={row.brand_name}
                        label={brandLabel}
                    />
                ),
                sortField: "brand_name",
                sortable: false,
            },
            {
                name: getFormattedMessage("product.table.price.column.label"),
                cell: (row) => <ProductPriceCell price={row.product_price} />,
            },
            {
                name: getFormattedMessage("product.input.product-unit.label"),
                sortField: "product_unit",
                sortable: true,
                cell: (row) => <ProductUnitCell unitName={row.product_unit} />,
            },
            {
                name: getFormattedMessage("product.product-in-stock.label"),
                cell: (row) => (
                    <ProductStockCell
                        stock={formatQuantity(row.in_stock, 0)}
                        label={stockLabel}
                    />
                ),
                sortField: "in_stock",
                sortable: false,
            },
            {
                name: "Descripcion",
                selector: (row) => (row.description ? row.description : ""),
                sortField: "description",
                sortable: false,
                minWidth: "200px",
                cell: (row) => (
                    <ProductDescriptionCell
                        rowId={row.id}
                        description={row.description}
                    />
                ),
            },
            {
                name: getFormattedMessage(
                    "globally.react-table.column.created-date.label"
                ),
                selector: (row) => row.date,
                sortField: "created_at",
                sortable: true,
                cell: (row) => {
                    return (
                        <span className="badge bg-light-info">
                            <div className="mb-1">{row.time}</div>
                            {row.date}
                        </span>
                    );
                },
            },
            {
                name: getFormattedMessage("react-data-table.action.column.label"),
                right: true,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                width: "120px",
                cell: (row) => (
                    <ProductActionCell
                        row={row}
                        onView={goToProductDetailPage}
                        onEdit={goToEditProduct}
                        onDelete={onClickDeleteModel}
                        viewLabel={viewActionLabel}
                        editLabel={editActionLabel}
                        deleteLabel={deleteActionLabel}
                        canUpdateProduct={canUpdateProduct}
                        canDeleteProduct={canDeleteProduct}
                    />
                ),
            },
        ],
        [
            brandLabel,
            canDeleteProduct,
            canUpdateProduct,
            codeLabel,
            deleteActionLabel,
            editActionLabel,
            goToEditProduct,
            goToProductDetailPage,
            onClickDeleteModel,
            onPreviewImage,
            stockLabel,
            viewActionLabel,
        ]
    );

    const productTableStyles = useMemo(
        () => ({
            rows: {
                style: {
                    minHeight: "74px",
                    height: "74px",
                    maxHeight: "74px",
                },
            },
            cells: {
                style: {
                    alignItems: "center",
                    "&:first-of-type": {
                        paddingLeft: "0 !important",
                        paddingRight: "0 !important",
                        justifyContent: "center",
                    },
                },
            },
            headCells: {
                style: {
                    "&:first-of-type": {
                        paddingLeft: "0 !important",
                        justifyContent: "center",
                    },
                },
            },
        }),
        []
    );
    const productRenderProfiler = useMemo(
        () => createRenderProfiler("components/product/Product", 24),
        []
    );

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("products.title")} />
            <Profiler
                id="ProductTable"
                onRender={productRenderProfiler}
            >
                <div className="product-listing-table">
                    <ReactDataTable
                        columns={columns}
                        items={itemsValue}
                        onChange={onChange}
                        isLoading={isLoading}
                        customStyles={productTableStyles}
                        defaultLimit={10}
                        paginationRowsPerPageOptions={[10, 20, 50, 100]}
                        ButtonValue={getFormattedMessage("product.create.title")}
                        totalRows={totalRecord}
                        to="#/app/products/create"
                        isShowFilterField
                        isModernFilterModal
                        isUnitFilter
                        title={getFormattedMessage(
                            "product.input.product-unit.label"
                        )}
                        goToImport={handleClose}
                        isExportDropdown={true}
                        isImportDropdown={true}
                        onExcelClick={onExcelClick}
                        isProductCategoryFilter
                        isBrandFilter
                        brandFilterTitle={getFormattedMessage(
                            "product.input.brand.label"
                        )}
                        productCategoryFilterTitle={getFormattedMessage(
                            "product.input.product-category.label"
                        )}
                    />
                </div>
            </Profiler>
            <DeleteMainProduct
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
            {isOpen && lightBoxImage.length !== 0 && (
                <ProductImageLightBox
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    lightBoxImage={lightBoxImage}
                />
            )}
            {importProduct && (
                <ImportProductModel handleClose={handleClose} show={importProduct} />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        products,
        totalRecord,
        isLoading,
        frontSetting,
        productUnitId,
        allConfigData,
    } = state;
    return {
        products,
        totalRecord,
        isLoading,
        frontSetting,
        productUnitId,
        allConfigData,
    };
};

export default connect(mapStateToProps, {
    fetchAllMainProducts,
    productExcelAction,
})(Product);

