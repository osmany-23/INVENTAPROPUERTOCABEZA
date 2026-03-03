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
import { Button, Image } from "react-bootstrap-v5";
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
        <div className="d-flex align-items-center">
            <Button
                type="button"
                className="btn-transparent me-2 d-flex align-items-center justify-content-center"
                onClick={handlePreview}
            >
                <Image
                    src={imageUrl || user}
                    height="50"
                    width="50"
                    alt={productName || "Product Image"}
                    className="image image-circle image-mini cursor-pointer"
                    loading="lazy"
                    decoding="async"
                />
            </Button>
        </div>
    );
});

const ProductDescriptionCell = memo(function ProductDescriptionCell({ row }) {
    const fullDescription = row.fullDescription || "";
    const displayDescription = row.description || "-";

    return (
        <div
            title={fullDescription || "-"}
            style={{
                maxWidth: 220,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            {displayDescription}
        </div>
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
            const fullDescription =
                attributes.full_description || firstVariation.notes || "";
            const description =
                attributes.description ||
                (fullDescription.length > 140
                    ? `${fullDescription.slice(0, 140)}...`
                    : fullDescription);

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
                fullDescription,
                description,
                imageUrl: imageUrls[0] || null,
                imageUrls,
            };
        });
    }, [allConfigData, formattedPrice, products]);

    const columns = useMemo(
        () => [
            {
                name: getFormattedMessage("product.title"),
                sortField: "name",
                sortable: false,
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
                selector: (row) => row.name,
                className: "product-name",
                sortField: "name",
                sortable: true,
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
                cell: (row) => <ProductDescriptionCell row={row} />,
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
