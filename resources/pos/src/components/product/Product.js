import React, {
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Image } from "react-bootstrap-v5";
import { OverlayTrigger, Popover } from "react-bootstrap";
import MasterLayout from "../MasterLayout";
import { fetchAllMainProducts } from "../../store/action/productAction";
import ReactDataTable from "../../shared/table/ReactDataTable";
import DeleteMainProduct from "./DeleteMainProduct";
import TabTitle from "../../shared/tab-title/TabTitle";
import ProductImageLightBox from "./ProductImageLightBox";
import user from "../../assets/images/brand_logo.png";
import {
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ImportProductModel from "./ImportProductModel";
import { productExcelAction } from "../../store/action/productExcelAction";

const PRODUCT_NOTE_PREVIEW_LIMIT = 50;
const PRODUCT_NOTE_PREVIEW_STYLE = {
    maxWidth: 280,
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
const PRODUCT_NOTE_POPOVER_STYLE = {
    "--bs-popover-max-width": "400px",
    "--bs-popover-border-color": "rgba(101, 113, 255, 0.28)",
    "--bs-popover-bg": "#ffffff",
    "--bs-popover-body-color": "#4f566b",
    borderRadius: "12px",
    boxShadow:
        "0 12px 28px rgba(101, 113, 255, 0.16), 0 2px 8px rgba(15, 23, 42, 0.08)",
    transition: "opacity 160ms ease, transform 160ms ease",
};
const PRODUCT_NOTE_POPOVER_BODY_STYLE = {
    padding: "12px 14px",
    color: "#495057",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
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
        <div style={PRODUCT_IMAGE_CELL_CONTENT_STYLE}>
            <div style={PRODUCT_IMAGE_WRAPPER_STYLE}>
                <button
                    type="button"
                    className="d-inline-flex align-items-center justify-content-center"
                    style={PRODUCT_IMAGE_BUTTON_STYLE}
                    onClick={handlePreview}
                >
                    <Image
                        src={imageUrl || user}
                        height={50}
                        width={50}
                        alt={productName || "Product Image"}
                        className="cursor-pointer"
                        style={PRODUCT_IMAGE_STYLE}
                        loading="lazy"
                        decoding="async"
                    />
                </button>
            </div>
        </div>
    );
});

const ProductDescriptionCell = memo(function ProductDescriptionCell({
    rowId,
    description,
}) {
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

    const descriptionPreview = (
        <span style={PRODUCT_NOTE_PREVIEW_STYLE}>{displayDescription}</span>
    );

    if (!isTruncated) {
        return descriptionPreview;
    }

    return (
        <OverlayTrigger
            trigger={["hover", "focus"]}
            placement="auto"
            delay={{ show: 180, hide: 100 }}
            popperConfig={{
                modifiers: [
                    { name: "offset", options: { offset: [0, 10] } },
                    {
                        name: "preventOverflow",
                        options: { boundary: "viewport", padding: 8 },
                    },
                ],
            }}
            overlay={
                <Popover
                    id={`product-note-popover-${rowId}`}
                    style={PRODUCT_NOTE_POPOVER_STYLE}
                >
                    <Popover.Body style={PRODUCT_NOTE_POPOVER_BODY_STYLE}>
                        {fullDescription}
                    </Popover.Body>
                </Popover>
            }
        >
            {descriptionPreview}
        </OverlayTrigger>
    );
});

const ProductActionCell = memo(function ProductActionCell({
    row,
    onView,
    onEdit,
    onDelete,
}) {
    return (
        <ActionButton
            isViewIcon={true}
            goToDetailScreen={onView}
            item={row}
            goToEditProduct={onEdit}
            isEditMode={true}
            onClickDeleteModel={onDelete}
        />
    );
});

const Product = (props) => {
    const {
        fetchAllMainProducts,
        products,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        productExcelAction,
        productUnitId,
        allConfigData,
    } = props;

    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [lightBoxImage, setLightBoxImage] = useState([]);
    const [importProduct, setImportProduct] = useState(false);
    const [isWarehouseValue, setIsWarehouseValue] = useState(false);

    const activeRequestRef = useRef(null);

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
        fetchFrontSetting();

        return () => {
            cancelActiveRequest();
        };
    }, [fetchFrontSetting, cancelActiveRequest]);

    const onClickDeleteModel = useCallback((item = null) => {
        setDeleteModel((previous) => !previous);
        setIsDelete(item);
    }, []);

    const onChange = useCallback(
        (filter) => {
            cancelActiveRequest();
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
        if (!Array.isArray(images) || images.length === 0) {
            return;
        }
        // Log para depuración
        if (images.length > 1) {
            console.log('Imágenes enviadas al lightbox:', images);
        }
        setLightBoxImage(images);
        setIsOpen(true);
    }, []);

    const currencySymbol = frontSetting?.value?.currency_symbol;

    const formattedPrice = useCallback(
        (productPrice) => {
            const numericPrice = Number(productPrice);
            if (!Number.isFinite(numericPrice)) {
                return "";
            }

            const formattedNumber = new Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(numericPrice);

            return currencySymbol
                ? `${formattedNumber} ${currencySymbol}`
                : formattedNumber;
        },
        [currencySymbol]
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
                    : "";

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
                cell: (row) => <div style={PRODUCT_NAME_TEXT_STYLE}>{row.name}</div>,
            },
            {
                name: getFormattedMessage("product.input.code.label"),
                selector: (row) => (
                    <span className="badge bg-light-danger">
                        <span>{row.code}</span>
                    </span>
                ),
                sortField: "code",
                sortable: true,
            },
            {
                name: getFormattedMessage("product.input.brand.label"),
                selector: (row) => row.brand_name,
                sortField: "brand_name",
                sortable: false,
            },
            {
                name: getFormattedMessage("product.table.price.column.label"),
                selector: (row) => row.product_price,
            },
            {
                name: getFormattedMessage("product.input.product-unit.label"),
                sortField: "product_unit",
                sortable: true,
                cell: (row) => {
                    return (
                        row.product_unit && (
                            <span className="badge bg-light-success">
                                <span>{row.product_unit}</span>
                            </span>
                        )
                    );
                },
            },
            {
                name: getFormattedMessage("product.product-in-stock.label"),
                selector: (row) => row.in_stock,
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
                    />
                ),
            },
        ],
        [goToEditProduct, goToProductDetailPage, onClickDeleteModel, onPreviewImage]
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

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("products.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                customStyles={productTableStyles}
                defaultLimit={20}
                paginationRowsPerPageOptions={[20, 50]}
                ButtonValue={getFormattedMessage("product.create.title")}
                totalRows={totalRecord}
                to="#/app/products/create"
                isShowFilterField
                isModernFilterModal
                isUnitFilter
                title={getFormattedMessage("product.input.product-unit.label")}
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
    fetchFrontSetting,
    productExcelAction,
})(Product);
