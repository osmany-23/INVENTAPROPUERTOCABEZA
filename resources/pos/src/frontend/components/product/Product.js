import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Card } from "react-bootstrap-v5";
import productImage from "../../../assets/images/brand_logo.png";
import {
    currencySymbolHandling,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import Skelten from "../../../shared/components/loaders/Skelten";

const CLIENT_RENDER_STEP = 120;

const normalize = (value) => (value || "").toString().trim().toUpperCase();

const ProductCard = memo(
    ({ product, isActive, onAddProduct, allConfigData, currencySymbol }) => {
        const handleClick = useCallback(() => {
            onAddProduct(product.id);
        }, [onAddProduct, product.id]);

        const imageUrl = product?.attributes?.images?.imageUrls?.[0] || productImage;
        const stockQuantity = Number(product?.attributes?.stock?.quantity || 0);

        return (
            <div className="product-custom-card" key={product.id} onClick={handleClick}>
                <Card className={`position-relative h-100 ${isActive ? "product-active" : ""}`}>
                    <Card.Img variant="top" src={imageUrl} />
                    <Card.Body className="px-2 pt-2 pb-1 custom-card-body">
                        <h6 className="product-title mb-0 text-gray-900">
                            {product.attributes?.name}
                            {product.attributes?.code !== product.attributes?.product_code
                                ? ` (${product.attributes?.code}, ${product.attributes?.product_code})`
                                : null}
                        </h6>
                        <span className="fs-small text-gray-700">{product.attributes?.code}</span>
                        <p className="m-0 item-badges">
                            <Badge
                                bg="info"
                                text="white"
                                className="product-custom-card__card-badge"
                            >
                                {stockQuantity}{" "}
                                {product?.attributes?.product_unit_name?.name || ""}
                            </Badge>
                        </p>
                        <p className="m-0 item-badge">
                            <Badge
                                bg="primary"
                                text="white"
                                className="product-custom-card__card-badge"
                            >
                                {currencySymbolHandling(
                                    allConfigData,
                                    currencySymbol,
                                    product.attributes?.product_price || 0
                                )}
                            </Badge>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        );
    }
);

const Product = (props) => {
    const {
        posAllProducts = [],
        cartProducts = [],
        searchTerm = "",
        allConfigData,
        settings,
        isLoading,
        onAddProduct,
        onLoadMoreProducts,
        hasMoreProducts = false,
    } = props;
    const [renderLimit, setRenderLimit] = useState(CLIENT_RENDER_STEP);

    const activeCartIds = useMemo(() => {
        return new Set(cartProducts.map((item) => Number(item.id)));
    }, [cartProducts]);

    const normalizedSearchTerm = useMemo(() => normalize(searchTerm), [searchTerm]);

    const filteredProducts = useMemo(() => {
        return posAllProducts.filter((product) => {
            const stockQty = Number(product?.attributes?.stock?.quantity || 0);
            if (stockQty <= 0) {
                return false;
            }

            if (!normalizedSearchTerm) {
                return true;
            }

            const productName = normalize(product?.attributes?.name);
            const productCode = normalize(product?.attributes?.code);
            const internalCode = normalize(product?.attributes?.product_code);

            return (
                productName.includes(normalizedSearchTerm) ||
                productCode.includes(normalizedSearchTerm) ||
                internalCode.includes(normalizedSearchTerm)
            );
        });
    }, [posAllProducts, normalizedSearchTerm]);

    useEffect(() => {
        setRenderLimit(CLIENT_RENDER_STEP);
    }, [normalizedSearchTerm, posAllProducts.length]);

    const visibleProducts = useMemo(() => {
        return filteredProducts.slice(0, renderLimit);
    }, [filteredProducts, renderLimit]);

    const handleScroll = useCallback(
        (event) => {
            const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
            const nearBottom = scrollHeight - (scrollTop + clientHeight) < 220;

            if (!nearBottom) {
                return;
            }

            if (renderLimit < filteredProducts.length) {
                setRenderLimit((previous) => previous + CLIENT_RENDER_STEP);
                return;
            }

            if (hasMoreProducts && !isLoading) {
                onLoadMoreProducts?.();
            }
        },
        [renderLimit, filteredProducts.length, hasMoreProducts, isLoading, onLoadMoreProducts]
    );

    const currencySymbol = settings?.attributes?.currency_symbol;

    return (
        <div
            className={`${
                filteredProducts.length === 0 ? "d-flex align-items-center justify-content-center" : ""
            } product-list-block pt-1`}
            onScroll={handleScroll}
        >
            <div className="d-flex flex-wrap product-list-block__product-block w-100">
                {!isLoading && filteredProducts.length === 0 && (
                    <h4 className="m-auto">
                        {getFormattedMessage("pos-no-product-available.label")}
                    </h4>
                )}

                {visibleProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isActive={activeCartIds.has(Number(product.id))}
                        onAddProduct={onAddProduct}
                        allConfigData={allConfigData}
                        currencySymbol={currencySymbol}
                    />
                ))}

                {isLoading && <Skelten />}
            </div>
        </div>
    );
};

export default memo(Product);
