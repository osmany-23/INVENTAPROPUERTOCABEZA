import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import { posAllProduct } from "../../../store/action/pos/posAllProductAction";
import productImage from "../../../assets/images/brand_logo.png";
import { addToast } from "../../../store/action/toastAction";
import {
    currencySymbolHandling,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { toastType } from "../../../constants";
import Skelten from "../../../shared/components/loaders/Skelten";

const Product = (props) => {
    const {
        posAllProducts,
        cartProducts,
        updateCart,
        customCart,
        cartProductIds,
        setCartProductIds,
        settings,
        productMsg,
        newCost,
        selectedOption,
        searchTerm,
        allConfigData,
        isLoading,
    } = props;
    const [updateProducts, setUpdateProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // update cart while cart is updated
        cartProducts && setUpdateProducts(cartProducts);
        const ids = updateProducts.map((item) => {
            return item.id;
        });
        setCartProductIds(ids);
    }, [updateProducts, cartProducts]);

    const addToCart = (product) => {
        // posFetchProduct(product.id);
        addProductToCart(product);
    };

    const addProductToCart = (product) => {
        const newId = posAllProducts
            .filter((item) => item.id === product.id)
            .map((item) => item.id);
        const finalIdArrays = customCart.map((id) => id.product_id);
        const finalId = finalIdArrays.filter(
            (finalIdArray) => finalIdArray === newId[0]
        );
        const pushArray = [...customCart];
        const newProduct = pushArray.find(
            (element) => element.id === finalId[0]
        );
        const filterQty = updateProducts
            .filter((item) => item.id === product.id)
            .map((qty) => qty.quantity)[0];
        if (
            updateProducts.filter((item) => item.id === product.id).length > 0
        ) {
            if (filterQty >= product.attributes.stock.quantity) {
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "pos.quantity.exceeds.quantity.available.in.stock.message"
                        ),
                        type: toastType.ERROR,
                    })
                );
            } else {
                setUpdateProducts((updateProducts) =>
                    updateProducts.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantity:
                                      product.attributes.stock.quantity >
                                      item.quantity
                                          ? item.quantity++ + 1
                                          : null,
                              }
                            : { ...item, id: item.id }
                    )
                );
                updateCart(updateProducts, {...product,warehouse_id: selectedOption.value});
            }
        } else {
            setUpdateProducts((prevSelected) => [...prevSelected, {...product,warehouse_id: selectedOption.value}]);
            updateCart((prevSelected) => [...prevSelected, {...newProduct,warehouse_id: selectedOption.value}]);
        }
    };

    const isProductExistInCart = (productId) => {
        return cartProductIds.includes(productId);
    };

    const normalize = (value) => (value || "").toString().trim().toUpperCase();
    const normalizedSearchTerm = normalize(searchTerm);

    const posFilterProduct =
        posAllProducts &&
        posAllProducts.filter((product) => {
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
    //Cart Item Array
    const loadAllProduct = (product) => {
        return product.attributes.stock.quantity > 0 ? (
            <div
                className="product-custom-card"
                key={product.id}
                onClick={() => addToCart(product)}
            >
                <Card
                    className={`position-relative h-100 ${
                        isProductExistInCart(product.id) ? "product-active" : ""
                    }`}
                >
                    <Card.Img
                        variant="top"
                        src={
                            product.attributes.images.imageUrls
                                ? product.attributes.images.imageUrls[0]
                                : productImage
                        }
                    />
                    <Card.Body className="px-2 pt-2 pb-1 custom-card-body">
                        <h6 className="product-title mb-0 text-gray-900">
                            {product.attributes?.name}
                            {product.attributes?.code !==
                            product.attributes?.product_code
                                ? ` (${product.attributes?.code}, ${product.attributes?.product_code})`
                                : null}
                        </h6>
                        <span className="fs-small text-gray-700">
                            {product.attributes.code}
                        </span>
                        <p className="m-0 item-badges">
                            <Badge
                                bg="info"
                                text="white"
                                className="product-custom-card__card-badge"
                            >
                                {product.attributes.stock &&
                                    product.attributes.stock.quantity}{" "}
                                {product?.attributes?.product_unit_name?.name}
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
                                    settings.attributes &&
                                        settings.attributes.currency_symbol,
                                    newCost
                                        ? newCost
                                        : product.attributes.product_price
                                )}
                            </Badge>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        ) : (
            ""
        );
    };

    return (
        <div
            className={`${
                posFilterProduct && posFilterProduct.length === 0
                    ? "d-flex align-items-center justify-content-center"
                    : ""
            } product-list-block pt-1`}
        >
            <div className="d-flex flex-wrap product-list-block__product-block w-100">
                {posFilterProduct && posFilterProduct.length === 0 ? (
                    isLoading ? (
                        <Skelten />
                    ) : (
                        <h4 className="m-auto">
                            {getFormattedMessage(
                                "pos-no-product-available.label"
                            )}
                        </h4>
                    )
                ) : (
                    ""
                )}
                {productMsg && productMsg === 1 ? (
                    <h4 className="m-auto">
                        {getFormattedMessage("pos-no-product-available.label")}
                    </h4>
                ) : (
                    posFilterProduct &&
                    posFilterProduct.map((product) => {
                        return loadAllProduct(product);
                    })
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { posAllProducts, allConfigData, isLoading } = state;
    return { posAllProducts, allConfigData, isLoading };
};

export default connect(mapStateToProps, { posAllProduct })(
    Product
);
