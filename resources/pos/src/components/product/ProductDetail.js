import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Button, Image, Table } from "react-bootstrap-v5";
import { Link, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import MasterLayout from "../MasterLayout";
import TabTitle from "../../shared/tab-title/TabTitle";
import HeaderTitle from "../header/HeaderTitle";
import { fetchMainProduct } from "../../store/action/productAction";
import user from "../../assets/images/brand_logo.png";
import {
    currencySymbolHandling,
    formatQuantityAuto,
    getFormattedMessage,
} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import WareHouseDetailsModal from "./WareHouseDetailsModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faChevronLeft,
    faChevronRight,
    faEdit,
    faEye,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import EditSubProductModal from "./EditSubProductModal";
import DeleteProduct from "./DeleteProduct";
import CreateSubProductModal from "./CreateSubProductModal";
import { can } from "../../shared/can";

const ProductDetail = (props) => {
    const { products, fetchMainProduct, isLoading, frontSetting, allConfigData } =
        props;
    const intl = useIntl();
    const canCreateProduct = can("products.create", { strict: true });
    const canUpdateProduct = can("products.update", { strict: true });
    const canDeleteProduct = can("products.delete", { strict: true });
    const canManageBatches =
        can("ver_lotes", { strict: true }) ||
        can("products.view", { strict: true }) ||
        can("pos.view", { strict: true });
    const { id } = useParams();
    const product = useMemo(() => {
        const groupedProducts =
            products &&
            products.reduce((obj, cur) => ({ ...obj, [cur.type]: cur }), {});

        return groupedProducts?.products;
    }, [products]);

    const [showWarehouseModal, setShowWarehouseModal] = useState(false);
    const [showEditSubProductModal, setShowEditSubProductModal] = useState(false);
    const [showCreateSubProductModal, setShowCreateSubProductModal] =
        useState(false);
    const [productData, setProductData] = useState({});
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeMobileProductId, setActiveMobileProductId] = useState(null);

    const productTitleLabel = intl.formatMessage({
        id: "product.title",
        defaultMessage: "Producto",
    });
    const productDetailsTitle = intl.formatMessage({
        id: "product.product-details.title",
    });
    const galleryTitle = intl.formatMessage({
        id: "product.gallery.title",
        defaultMessage: "Galeria",
    });
    const summaryTitleLabel = intl.formatMessage({
        id: "product.summary.title",
        defaultMessage: "Resumen del producto",
    });
    const priceStockTitle = intl.formatMessage({
        id: "product.price-and-stock.title",
        defaultMessage: "Precios y stock",
    });
    const notePanelTitle = intl.formatMessage({
        id: "globally.input.note.label",
        defaultMessage: "Nota",
    });
    const quickActionsTitle = intl.formatMessage({
        id: "product.quick-actions.title",
        defaultMessage: "Acciones rapidas",
    });
    const variantsTitle = intl.formatMessage({
        id: "variations.title",
        defaultMessage: "Variantes",
    });
    const variantsSubtitle = intl.formatMessage({
        id: "product.variants.selector.title",
        defaultMessage: "Selecciona la version activa",
    });
    const activeVariantLabel = intl.formatMessage({
        id: "product.active-variant.label",
        defaultMessage: "Version activa",
    });
    const backButtonLabel = intl.formatMessage({
        id: "globally.back-btn",
        defaultMessage: "Atras",
    });
    const codeLabel = intl.formatMessage({
        id: "product.product-details.code-product.label",
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
    const categoryLabel = intl.formatMessage({
        id: "product.product-details.category.label",
        defaultMessage: "Categoria",
    });
    const unitLabel = intl.formatMessage({
        id: "product.product-details.unit.label",
        defaultMessage: "Unidad",
    });
    const salePriceLabel = intl.formatMessage({
        id: "product.table.price.column.label",
        defaultMessage: "Precio venta",
    });
    const costPriceLabel = intl.formatMessage({
        id: "product.product-details.cost.label",
        defaultMessage: "Precio compra",
    });
    const taxLabel = intl.formatMessage({
        id: "product.product-details.tax.label",
        defaultMessage: "Impuesto",
    });
    const stockAlertLabel = intl.formatMessage({
        id: "product.input.stock-alert.label",
        defaultMessage: "Alerta",
    });
    const createVariationLabel = intl.formatMessage({
        id: "product.create.title",
        defaultMessage: "Crear",
    });
    const viewTooltipLabel = intl.formatMessage({
        id: "globally.view.tooltip.label",
    });
    const editTooltipLabel = intl.formatMessage({
        id: "globally.edit.tooltip.label",
    });
    const deleteTooltipLabel = intl.formatMessage({
        id: "globally.delete.tooltip.label",
    });
    const emptyNoteLabel = intl.formatMessage({
        id: "product.note.empty.label",
        defaultMessage: "Sin nota disponible",
    });
    const mobileViewStockLabel = intl.formatMessage({
        id: "product.action.view-stock.label",
        defaultMessage: "Ver stock",
    });
    const mobileManageBatchesLabel = intl.formatMessage({
        id: "product.action.manage-batches.label",
        defaultMessage: "Lotes",
    });

    const productTypeLabel =
        product && product.attributes
            ? Number(product.attributes.product_type) === 1
                ? getFormattedMessage("products.type.single-type.label")
                : Number(product.attributes.product_type) === 2
                ? getFormattedMessage("variation.title")
                : intl.formatMessage({
                      id: "product.type.batch.label",
                      defaultMessage: "Por lote",
                  })
            : "";

    const allProducts = useMemo(
        () => product?.attributes?.products?.map((item) => item) || [],
        [product]
    );
    const primaryProduct = allProducts[0] || null;
    const productName = product?.attributes?.name || "--";
    const isVariationProduct = Number(product?.attributes?.product_type) === 2;
    const hasProductRows = allProducts.length > 0;
    const hasMultipleVariants = isVariationProduct && allProducts.length > 1;
    const galleryImages = useMemo(() => {
        const imageUrls =
            product?.attributes?.images?.imageUrls?.filter(Boolean) || [];

        return imageUrls.length > 0 ? imageUrls : [user];
    }, [product]);

    const getVariationLabel = useCallback((item) => {
        const variationName = item?.variation_product?.variation_name || "";
        const variationTypeName =
            item?.variation_product?.variation_type_name || "";

        return `${variationName}${
            variationName && variationTypeName ? " " : ""
        }${variationTypeName}`.trim();
    }, []);

    const activeMobileProduct = useMemo(() => {
        if (!hasProductRows) {
            return null;
        }

        return (
            allProducts.find(
                (item) => String(item?.id) === String(activeMobileProductId)
            ) || primaryProduct
        );
    }, [activeMobileProductId, allProducts, hasProductRows, primaryProduct]);

    const selectedProduct = activeMobileProduct || primaryProduct || null;
    const selectedVariationLabel = getVariationLabel(selectedProduct);
    const summaryProductName = selectedVariationLabel || productName;
    const summarySubtitle = selectedVariationLabel
        ? activeVariantLabel
        : productTypeLabel;
    const selectedProductCode =
        selectedProduct?.code || product?.attributes?.code || "--";
    const selectedBrandName =
        selectedProduct?.brand_name || primaryProduct?.brand_name || "--";
    const selectedCategoryName =
        selectedProduct?.product_category_name ||
        primaryProduct?.product_category_name ||
        "--";
    const selectedUnitName =
        selectedProduct?.product_unit_name?.name ||
        primaryProduct?.product_unit_name?.name ||
        "--";
    const selectedStockValue = formatQuantityAuto(
        selectedProduct?.in_stock ?? selectedProduct?.stock?.quantity ?? 0
    );
    const selectedTaxValue = `${selectedProduct?.order_tax || 0}%`;
    const selectedAlertValue =
        selectedProduct?.stock_alert && selectedProduct?.stock_alert !== "null"
            ? formatQuantityAuto(selectedProduct.stock_alert)
            : formatQuantityAuto(0);
    const selectedSalePrice = currencySymbolHandling(
        allConfigData,
        frontSetting.value && frontSetting.value.currency_symbol,
        selectedProduct?.product_price || 0
    );
    const selectedCostPrice = currencySymbolHandling(
        allConfigData,
        frontSetting.value && frontSetting.value.currency_symbol,
        selectedProduct?.product_cost || 0
    );
    const productNote =
        selectedProduct?.notes || primaryProduct?.notes || emptyNoteLabel;
    const desktopProductCode = product?.attributes?.code || "--";
    const desktopCategoryName = primaryProduct?.product_category_name || "--";
    const desktopBrandName = primaryProduct?.brand_name || "--";
    const desktopUnitName = primaryProduct?.product_unit_name?.name || "--";
    const desktopNote = primaryProduct?.notes || emptyNoteLabel;

    const priceStockFields = useMemo(
        () => [
            {
                key: "sale-price",
                label: salePriceLabel,
                value: selectedSalePrice,
                variant: "highlight",
            },
            { key: "cost-price", label: costPriceLabel, value: selectedCostPrice },
            { key: "tax", label: taxLabel, value: selectedTaxValue, variant: "muted" },
            {
                key: "alert",
                label: stockAlertLabel,
                value: selectedAlertValue,
                variant: "muted",
            },
            {
                key: "unit",
                label: unitLabel,
                value: selectedUnitName,
                variant: "badge",
                fullWidth: true,
            },
        ],
        [
            costPriceLabel,
            salePriceLabel,
            selectedAlertValue,
            selectedCostPrice,
            selectedSalePrice,
            selectedTaxValue,
            selectedUnitName,
            stockAlertLabel,
            taxLabel,
            unitLabel,
        ]
    );

    const productBaseData = primaryProduct || {};
    const availableVariationTypes =
        product?.attributes?.variation?.variation_types?.filter(
            (variationType) =>
                !product?.attributes?.variation_types?.some(
                    (productVariationType) =>
                        variationType.id === productVariationType.id &&
                        variationType.name === productVariationType.name
                )
        ) || [];
    const canCreateVariation =
        canCreateProduct &&
        isVariationProduct &&
        availableVariationTypes.length !== 0;
    const canDeleteVariant = canDeleteProduct && hasMultipleVariants;

    useEffect(() => {
        fetchMainProduct(id);
    }, [fetchMainProduct, id]);

    useEffect(() => {
        setActiveImageIndex(0);
    }, [galleryImages.length, product?.id]);

    useEffect(() => {
        if (!hasProductRows) {
            setActiveMobileProductId(null);
            return;
        }

        const hasActiveProduct = allProducts.some(
            (item) => String(item?.id) === String(activeMobileProductId)
        );

        if (!hasActiveProduct) {
            setActiveMobileProductId(allProducts[0]?.id || null);
        }
    }, [activeMobileProductId, allProducts, hasProductRows]);

    const commonDataForNewProduct = {
        name: productBaseData.name,
        product_code: productBaseData.product_code,
        product_type: product?.attributes?.product_type,
        barcode_symbol: productBaseData.barcode_symbol,
        product_category_id: productBaseData.product_category_id,
        brand_id: productBaseData.brand_id,
        product_unit: productBaseData.product_unit,
        sale_unit: productBaseData.sale_unit,
        purchase_unit: productBaseData.purchase_unit,
        quantity_limit: productBaseData.quantity_limit,
        notes: productBaseData.notes,
        main_product_id: product && product.id,
        variation: product && product?.attributes?.variation,
        variationTypes: availableVariationTypes,
    };

    const openWareHouseDetailModal = (data) => {
        setShowWarehouseModal(true);
        setProductData(data);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const openEditSubProductModal = (data) => {
        setProductData(data);
        setShowEditSubProductModal(true);
    };

    const openCreateSubProductModal = () => {
        setProductData(commonDataForNewProduct);
        setShowCreateSubProductModal(true);
    };

    const goToBatchManager = (productId) => {
        window.location.href = `#/app/products/batches/${productId}`;
    };

    const goToNextImage = useCallback(() => {
        if (!galleryImages.length) {
            return;
        }

        setActiveImageIndex(
            (currentImageIndex) => (currentImageIndex + 1) % galleryImages.length
        );
    }, [galleryImages.length]);

    const goToPreviousImage = useCallback(() => {
        if (!galleryImages.length) {
            return;
        }

        setActiveImageIndex((currentImageIndex) =>
            currentImageIndex === 0
                ? galleryImages.length - 1
                : currentImageIndex - 1
        );
    }, [galleryImages.length]);

    const selectImage = useCallback((imageIndex) => {
        setActiveImageIndex(imageIndex);
    }, []);

    const selectMobileProduct = useCallback((productId) => {
        setActiveMobileProductId(productId);
    }, []);

    const renderLoadingSkeleton = () => (
        <div className="product-detail-skeleton">
            <div className="product-detail-skeleton-card product-detail-skeleton-card--header" />
            <div className="product-detail-skeleton-card product-detail-skeleton-card--gallery">
                <div className="product-detail-skeleton-block product-detail-skeleton-block--title" />
                <div className="product-detail-skeleton-block product-detail-skeleton-block--image" />
                <div className="product-detail-skeleton-dots">
                    <span className="product-detail-skeleton-dot" />
                    <span className="product-detail-skeleton-dot" />
                    <span className="product-detail-skeleton-dot" />
                </div>
            </div>
            <div className="product-detail-skeleton-card">
                <div className="product-detail-skeleton-block product-detail-skeleton-block--title" />
                <div className="product-detail-skeleton-grid">
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--field" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--field" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--field" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--field" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--field product-detail-skeleton-block--field-wide" />
                </div>
                <div className="product-detail-skeleton-block product-detail-skeleton-block--note" />
                <div className="product-detail-skeleton-grid product-detail-skeleton-grid--actions">
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--button" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--button" />
                    <div className="product-detail-skeleton-block product-detail-skeleton-block--button product-detail-skeleton-block--field-wide" />
                </div>
            </div>
        </div>
    );

    const renderGallery = () => (
        <section className="product-detail-gallery-card">
            <div className="product-detail-section-head product-detail-section-head--compact">
                <div>
                    <p className="product-detail-section-head__eyebrow">
                        {productDetailsTitle}
                    </p>
                    <h2 className="product-detail-section-head__title">
                        {galleryTitle}
                    </h2>
                </div>
                {galleryImages.length > 1 && (
                    <span className="product-detail-gallery-card__counter">
                        {activeImageIndex + 1}/{galleryImages.length}
                    </span>
                )}
            </div>
            <div className="product-detail-gallery-shell">
                <button
                    type="button"
                    className="product-detail-gallery-nav product-detail-gallery-nav--prev"
                    onClick={goToPreviousImage}
                    aria-label="Imagen anterior"
                    disabled={galleryImages.length <= 1}
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="product-detail-gallery-stage">
                    <Image
                        key={`gallery-image-${activeImageIndex}`}
                        src={galleryImages[activeImageIndex]}
                        alt={summaryProductName || productTitleLabel}
                        className="product-detail-gallery-image"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <button
                    type="button"
                    className="product-detail-gallery-nav product-detail-gallery-nav--next"
                    onClick={goToNextImage}
                    aria-label="Imagen siguiente"
                    disabled={galleryImages.length <= 1}
                >
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div
                className="product-detail-gallery-dots"
                aria-label="Indicadores de imagen"
            >
                {galleryImages.map((imageSrc, imageIndex) => (
                    <button
                        key={`${imageSrc}-${imageIndex}`}
                        type="button"
                        className={`product-detail-gallery-dot ${
                            imageIndex === activeImageIndex
                                ? "product-detail-gallery-dot--active"
                                : ""
                        }`}
                        aria-label={`Ver imagen ${imageIndex + 1}`}
                        aria-current={imageIndex === activeImageIndex}
                        onClick={() => selectImage(imageIndex)}
                    />
                ))}
            </div>
        </section>
    );

    const renderDesktopGallery = () => (
        <div className="product-detail-desktop-media">
            <div className="product-detail-desktop-gallery-shell">
                {galleryImages.length > 1 && (
                    <button
                        type="button"
                        className="product-detail-gallery-nav product-detail-gallery-nav--prev"
                        onClick={goToPreviousImage}
                        aria-label="Imagen anterior"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
                <div className="product-detail-desktop-gallery-stage">
                    <Image
                        key={`desktop-gallery-image-${activeImageIndex}`}
                        src={galleryImages[activeImageIndex]}
                        alt={productName || productTitleLabel}
                        className="product-detail-desktop-gallery-image"
                        loading="eager"
                        decoding="sync"
                    />
                </div>
                {galleryImages.length > 1 && (
                    <button
                        type="button"
                        className="product-detail-gallery-nav product-detail-gallery-nav--next"
                        onClick={goToNextImage}
                        aria-label="Imagen siguiente"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>
        </div>
    );

    const renderLegacyDesktopActions = (data) => (
        <div className="text-center">
            <button
                type="button"
                title={viewTooltipLabel}
                className="btn text-success px-2 fs-3 ps-0 border-0 shadow-none"
                onClick={(e) => {
                    e.stopPropagation();
                    openWareHouseDetailModal(data);
                }}
            >
                <FontAwesomeIcon icon={faEye} />
            </button>
            {canUpdateProduct && (
                <button
                    type="button"
                    title={editTooltipLabel}
                    className="btn text-primary px-2 fs-3 ps-0 border-0 shadow-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        openEditSubProductModal(data);
                    }}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            )}
            {canManageBatches && (
                <button
                    type="button"
                    title={mobileManageBatchesLabel}
                    className="btn px-2 fs-3 ps-0 border-0 shadow-none"
                    style={{ color: "#6571FF" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        goToBatchManager(data.id);
                    }}
                >
                    <FontAwesomeIcon icon={faBoxOpen} />
                </button>
            )}
            {canDeleteVariant && (
                <button
                    type="button"
                    title={deleteTooltipLabel}
                    className="btn text-danger px-2 fs-3 ps-0 border-0 shadow-none"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClickDeleteModel(data);
                    }}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            )}
        </div>
    );

    const renderQuickActions = (data) => (
        <section className="product-detail-actions-card">
            <div className="product-detail-section-head product-detail-section-head--compact">
                <div>
                    <p className="product-detail-section-head__eyebrow">
                        {productDetailsTitle}
                    </p>
                    <h3 className="product-detail-section-head__title">
                        {quickActionsTitle}
                    </h3>
                </div>
            </div>
            <div className="product-detail-actions-grid">
                <button
                    type="button"
                    className="btn product-detail-action-button product-detail-action-button--success"
                    onClick={() => openWareHouseDetailModal(data)}
                >
                    <FontAwesomeIcon icon={faEye} />
                    <span>{mobileViewStockLabel}</span>
                </button>
                {canUpdateProduct && (
                    <button
                        type="button"
                        className="btn product-detail-action-button product-detail-action-button--primary"
                        onClick={() => openEditSubProductModal(data)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                        <span>{editTooltipLabel}</span>
                    </button>
                )}
                {canManageBatches && (
                    <button
                        type="button"
                        className="btn product-detail-action-button product-detail-action-button--indigo product-detail-action-button--span-full"
                        onClick={() => goToBatchManager(data.id)}
                    >
                        <FontAwesomeIcon icon={faBoxOpen} />
                        <span>{mobileManageBatchesLabel}</span>
                    </button>
                )}
                {canDeleteVariant && (
                    <button
                        type="button"
                        className="btn product-detail-action-button product-detail-action-button--danger product-detail-action-button--span-full"
                        onClick={() => onClickDeleteModel(data)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>{deleteTooltipLabel}</span>
                    </button>
                )}
            </div>
        </section>
    );

    const renderVariantSelector = () => {
        if (!isVariationProduct || (!hasMultipleVariants && !canCreateVariation)) {
            return null;
        }

        return (
            <section className="product-detail-variant-card d-md-none">
                <div className="product-detail-section-head product-detail-section-head--compact">
                    <div>
                        <p className="product-detail-section-head__eyebrow">
                            {variantsTitle}
                        </p>
                        <h3 className="product-detail-section-head__title">
                            {variantsSubtitle}
                        </h3>
                    </div>
                    {hasMultipleVariants && (
                        <span className="product-detail-variant-card__count">
                            {allProducts.length}
                        </span>
                    )}
                </div>
                {hasMultipleVariants && (
                    <div className="product-detail-variant-list">
                        {allProducts.map((data, index) => {
                            const isActiveProduct =
                                String(data?.id) === String(selectedProduct?.id);
                            const variantLabel =
                                getVariationLabel(data) || productName;
                            const variantPrice = currencySymbolHandling(
                                allConfigData,
                                frontSetting.value &&
                                    frontSetting.value.currency_symbol,
                                data?.product_price || 0
                            );
                            const variantStock = formatQuantityAuto(
                                data?.in_stock ?? data?.stock?.quantity ?? 0
                            );

                            return (
                                <button
                                    key={data?.id || index}
                                    type="button"
                                    className={`product-detail-variant-item ${
                                        isActiveProduct
                                            ? "product-detail-variant-item--active"
                                            : ""
                                    }`}
                                    onClick={() => selectMobileProduct(data?.id)}
                                >
                                    <div className="product-detail-variant-item__copy">
                                        <strong>{variantLabel}</strong>
                                        <span>{variantPrice}</span>
                                    </div>
                                    <span className="product-detail-variant-item__stock">
                                        {stockLabel}: {variantStock}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
                {canCreateVariation && (
                    <Button
                        type="button"
                        variant="primary"
                        onClick={openCreateSubProductModal}
                        className="product-detail-create-button"
                    >
                        {createVariationLabel}
                    </Button>
                )}
            </section>
        );
    };

    return (
        <MasterLayout>
            <div className="product-detail-page">
                <TopProgressBar />
                <div className="d-none d-md-block product-detail-desktop-header">
                    <HeaderTitle
                        title={getFormattedMessage("product.product-details.title")}
                        to="/app/products"
                    />
                </div>
                <TabTitle title={productDetailsTitle} />
                <div className="product-detail-topbar d-md-none">
                    <div className="product-detail-topbar__copy">
                        <p className="product-detail-topbar__eyebrow">
                            {productTitleLabel}
                        </p>
                        <h1 className="product-detail-topbar__title">
                            {productDetailsTitle}
                        </h1>
                        {!isLoading && (
                            <p className="product-detail-topbar__subtitle">
                                {productName}
                            </p>
                        )}
                    </div>
                    <Link
                        to="/app/products"
                        className="product-detail-back-button"
                        aria-label={backButtonLabel}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <span>{backButtonLabel}</span>
                    </Link>
                </div>

                {isLoading ? (
                    renderLoadingSkeleton()
                ) : (
                    <>
                        <div className="d-md-none">
                            <div className="product-detail-overview-grid">
                                <div>{renderGallery()}</div>
                                <div className="product-detail-overview-stack">
                                <section className="product-detail-summary-card">
                                    <div className="product-detail-section-head product-detail-section-head--compact">
                                        <div>
                                            <p className="product-detail-section-head__eyebrow">
                                                {summaryTitleLabel}
                                            </p>
                                            <h2 className="product-detail-section-head__title">
                                                {summaryProductName}
                                            </h2>
                                            {summarySubtitle && (
                                                <p className="product-detail-section-head__description">
                                                    {summarySubtitle}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="product-detail-summary-card__meta">
                                        <div className="product-detail-meta-chip">
                                            <span className="product-detail-meta-chip__label">
                                                {codeLabel}
                                            </span>
                                            <strong>{selectedProductCode}</strong>
                                        </div>
                                        <div className="product-detail-meta-chip">
                                            <span className="product-detail-meta-chip__label">
                                                {brandLabel}
                                            </span>
                                            <strong>{selectedBrandName}</strong>
                                        </div>
                                        <div className="product-detail-stock-badge">
                                            <span className="product-detail-stock-badge__label">
                                                {stockLabel}
                                            </span>
                                            <strong>{selectedStockValue}</strong>
                                        </div>
                                    </div>

                                    <div className="product-detail-summary-card__tags">
                                        {selectedCategoryName !== "--" && (
                                            <span className="product-detail-tag">
                                                <span className="product-detail-tag__label">
                                                    {categoryLabel}
                                                </span>
                                                {selectedCategoryName}
                                            </span>
                                        )}
                                        {productTypeLabel && (
                                            <span className="product-detail-tag product-detail-tag--muted">
                                                {productTypeLabel}
                                            </span>
                                        )}
                                    </div>
                                </section>

                                {renderVariantSelector()}

                                <section className="product-detail-metrics-card">
                                    <div className="product-detail-section-head product-detail-section-head--compact">
                                        <div>
                                            <p className="product-detail-section-head__eyebrow">
                                                {priceStockTitle}
                                            </p>
                                            <h3 className="product-detail-section-head__title">
                                                {priceStockTitle}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="product-detail-metric-grid">
                                        {priceStockFields.map((field) => (
                                            <div
                                                key={field.key}
                                                className={`product-detail-metric-card ${
                                                    field.variant === "highlight"
                                                        ? "product-detail-metric-card--highlight"
                                                        : ""
                                                } ${
                                                    field.variant === "muted"
                                                        ? "product-detail-metric-card--muted"
                                                        : ""
                                                } ${
                                                    field.fullWidth
                                                        ? "product-detail-metric-card--full"
                                                        : ""
                                                }`}
                                            >
                                                <span className="product-detail-metric-card__label">
                                                    {field.label}
                                                </span>
                                                {field.variant === "badge" ? (
                                                    <span className="product-detail-unit-badge">
                                                        {field.value}
                                                    </span>
                                                ) : (
                                                    <strong className="product-detail-metric-card__value">
                                                        {field.value}
                                                    </strong>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="product-detail-note-card">
                                    <div className="product-detail-section-head product-detail-section-head--compact">
                                        <div>
                                            <p className="product-detail-section-head__eyebrow">
                                                {productDetailsTitle}
                                            </p>
                                            <h3 className="product-detail-section-head__title">
                                                {notePanelTitle}
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="product-detail-note-copy">
                                        {productNote}
                                    </div>
                                </section>

                                    {selectedProduct &&
                                        renderQuickActions(selectedProduct)}
                                </div>
                            </div>
                        </div>

                        <div className="d-none d-md-block">
                            <div className="card card-body product-detail-desktop-card">
                                <div className="row">
                                    <div className="col-xxl-7">
                                        <table className="table gy-7 main-product-details product-detail-desktop-main-table mb-0">
                                            <tbody>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {codeLabel}
                                                    </th>
                                                    <td className="py-4">
                                                        {desktopProductCode}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {productTitleLabel}
                                                    </th>
                                                    <td className="py-4">{productName}</td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {getFormattedMessage(
                                                            "product.type.label"
                                                        )}
                                                    </th>
                                                    <td className="py-4">
                                                        {productTypeLabel || "--"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {categoryLabel}
                                                    </th>
                                                    <td className="py-4">
                                                        {desktopCategoryName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {brandLabel}
                                                    </th>
                                                    <td className="py-4">
                                                        {desktopBrandName}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {unitLabel}
                                                    </th>
                                                    <td className="py-4">
                                                        {desktopUnitName !== "--" ? (
                                                            <span className="badge bg-light-success">
                                                                <span>{desktopUnitName}</span>
                                                            </span>
                                                        ) : (
                                                            desktopUnitName
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th className="py-4" scope="row">
                                                        {notePanelTitle}
                                                    </th>
                                                    <td className="py-4">
                                                        {desktopNote}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-xxl-5 d-flex justify-content-center m-auto">
                                        {renderDesktopGallery()}
                                    </div>
                                </div>
                            </div>

                            {hasProductRows && (
                                <div className="card card-body mt-2 product-detail-desktop-table-card">
                                    {canCreateVariation && (
                                        <div className="text-end mb-2">
                                            <Button
                                                type="button"
                                                variant="primary"
                                                onClick={openCreateSubProductModal}
                                                className="btn-light-primary"
                                            >
                                                {createVariationLabel}
                                            </Button>
                                        </div>
                                    )}
                                    <Table
                                        responsive="md"
                                        className="product-detail-desktop-table"
                                    >
                                        <thead>
                                            <tr>
                                                {isVariationProduct && (
                                                    <th>{variantsTitle}</th>
                                                )}
                                                <th>{costPriceLabel}</th>
                                                <th>{salePriceLabel}</th>
                                                <th>{taxLabel}</th>
                                                <th>{stockAlertLabel}</th>
                                                <th className="text-center">
                                                    {getFormattedMessage(
                                                        "react-data-table.action.column.label"
                                                    )}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allProducts.map((data, index) => {
                                                const variantLabel =
                                                    getVariationLabel(data) ||
                                                    productName;

                                                return (
                                                    <tr key={data?.id || index}>
                                                        {isVariationProduct && (
                                                            <td className="py-4">
                                                                {variantLabel}
                                                            </td>
                                                        )}
                                                        <td className="py-4">
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                data?.product_cost ||
                                                                    0
                                                            )}
                                                        </td>
                                                        <td className="py-4">
                                                            {currencySymbolHandling(
                                                                allConfigData,
                                                                frontSetting.value &&
                                                                    frontSetting
                                                                        .value
                                                                        .currency_symbol,
                                                                data?.product_price ||
                                                                    0
                                                            )}
                                                        </td>
                                                        <td className="py-4">
                                                            {data?.order_tax || 0}%
                                                        </td>
                                                        <td className="py-4">
                                                            {data?.stock_alert &&
                                                            data?.stock_alert !==
                                                                "null"
                                                                ? data.stock_alert
                                                                : 0}
                                                        </td>
                                                        <td className="py-4">
                                                            {renderLegacyDesktopActions(
                                                                data
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </div>

                        <DeleteProduct
                            onClickDeleteModel={onClickDeleteModel}
                            deleteModel={deleteModel}
                            onDelete={isDelete}
                        />
                        <CreateSubProductModal
                            show={showCreateSubProductModal}
                            setShow={setShowCreateSubProductModal}
                            commonData={commonDataForNewProduct}
                        />
                        <EditSubProductModal
                            show={showEditSubProductModal}
                            setShow={setShowEditSubProductModal}
                            productData={productData}
                        />
                        <WareHouseDetailsModal
                            show={showWarehouseModal}
                            productData={productData}
                            setShow={setShowWarehouseModal}
                        />
                    </>
                )}
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { products, isLoading, frontSetting, allConfigData } = state;
    return { products, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, { fetchMainProduct })(ProductDetail);
