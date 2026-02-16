import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap-v5";
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
    currencySymbolHandling,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ImportProductModel from "./ImportProductModel";
import { productExcelAction } from "../../store/action/productExcelAction";

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

    const [importProduct, setimportProduct] = useState(false);
    const handleClose = () => {
        setimportProduct(!importProduct);
    };

    const [isWarehouseValue, setIsWarehouseValue] = useState(false);
    useEffect(() => {
        if (isWarehouseValue === true) {
            productExcelAction(setIsWarehouseValue, true, productUnitId);
        }
    }, [isWarehouseValue]);

    const onExcelClick = () => {
        setIsWarehouseValue(true);
    };

    useEffect(() => {
        fetchFrontSetting();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchAllMainProducts(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        window.location.href = "#/app/products/edit/" + id;
    };

    const goToProductDetailPage = (ProductId) => {
        window.location.href = "#/app/products/detail/" + ProductId;
    };

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    const formattedPrice = (product_price) => {
    if (!product_price) return "";
    // Formatear número con coma como separador de miles y punto como decimal
    const formattedNumber = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(product_price);

    return `${formattedNumber} ${currencySymbol}`;
};

    const itemsValue =
        currencySymbol &&
        products.length >= 0 &&
        products.map((product) => {
            let product_price =
                product.attributes.min_price == product.attributes.max_price
                    ? formattedPrice(product.attributes.min_price)
                    : formattedPrice(product.attributes.min_price) +
                      " - " +
                      formattedPrice(product.attributes.max_price);
            return {
                name: product?.attributes.name,
                code: product?.attributes.code,
                date: getFormattedDate(
                    product?.attributes?.products && product?.attributes?.products[0]?.created_at,
                    allConfigData && allConfigData
                ),
                time: moment(product?.attributes?.products && product?.attributes?.products[0]?.created_at).format("LT"),
                brand_name:
                    product?.attributes.products &&
                    product?.attributes?.products[0]?.brand_name
                        ? product?.attributes?.products[0]?.brand_name
                        : "",
                product_price: product_price,
                product_unit: product?.attributes.product_unit?.name
                    ? product?.attributes.product_unit?.name
                    : "N/A",
                in_stock: product.attributes.products?.reduce(
                    (sum, product) =>
                        product?.in_stock
                            ? sum + product?.in_stock
                            : 0,
                    0
                ),
                fullDescription:
                    product?.attributes?.products &&
                    product?.attributes?.products[0] &&
                    product.attributes.products[0].notes
                        ? product.attributes.products[0].notes
                        : "",
                description:
                    product?.attributes?.products &&
                    product?.attributes?.products[0] &&
                    product.attributes.products[0].notes
                        ? (product.attributes.products[0].notes.length > 50
                              ? product.attributes.products[0].notes.slice(0, 50) + "..."
                              : product.attributes.products[0].notes)
                        : "",
                images: product?.attributes.images,
                id: product.id,
                currency: currencySymbol,
            };
        });

    const columns = [
        {
            name: getFormattedMessage("product.title"),
            sortField: "name",
            sortable: false,
            cell: (row) => {
                const imageUrl = row.images
                    ? row.images.imageUrls && row.images.imageUrls[0]
                    : null;
                return imageUrl ? (
                    <div className="d-flex align-items-center">
                        <Button
                            type="button"
                            className="btn-transparent me-2 d-flex align-items-center justify-content-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(!isOpen);
                                setLightBoxImage(row.images.imageUrls);
                            }}
                        >
                            <Image
                                src={imageUrl}
                                height="50"
                                width="50"
                                alt="Product Image"
                                className="image image-circle image-mini cursor-pointer"
                            />
                        </Button>
                    </div>
                ) : (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <Image
                                src={user}
                                height="50"
                                width="50"
                                alt="Product Image"
                                className="image image-circle image-mini"
                            />
                        </div>
                    </div>
                );
            },
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
            // name: "In stock",
            selector: (row) => row.in_stock,
            sortField: "in_stock",
            sortable: false,
        },
        {
            name: "Descripción",
            selector: (row) => (row.description ? row.description : ""),
            sortField: "description",
            sortable: false,
            cell: (row) => {
                const full = row.fullDescription || "";
                const display = row.description || "";
                const maxWidth = 220; // px, adjust column width
                return (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip
                                id={`tooltip-desc-${row.id}`}
                                style={{
                                    background: "rgba(0,0,0,0.45)",
                                    color: "#fff",
                                    maxWidth: "60vw",
                                    whiteSpace: "pre-wrap",
                                    borderRadius: 6,
                                    padding: "0.6rem",
                                }}
                            >
                                {full || "-"}
                            </Tooltip>
                        }
                    >
                        <div
                            style={{
                                maxWidth: maxWidth,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "normal",
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                                cursor: full ? "pointer" : "default",
                            }}
                        >
                            {display}
                        </div>
                    </OverlayTrigger>
                );
            },
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
                <ActionButton
                    isViewIcon={true}
                    goToDetailScreen={goToProductDetailPage}
                    item={row}
                    goToEditProduct={goToEditProduct}
                    isEditMode={true}
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("products.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
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
                <ImportProductModel
                    handleClose={handleClose}
                    show={importProduct}
                />
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
