import React, { useEffect, useRef, useState } from "react";
import { Col } from "react-bootstrap-v5";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { connect, useDispatch } from "react-redux";
import {
    getFormattedMessage,
    placeholderText,
} from "../../../shared/sharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";

const ProductSearchbar = (props) => {
    const {
        posAllProducts,
        customCart,
        setUpdateProducts,
        selectedOption,
        onSearchTermChange,
    } = props;
    const [searchString, setSearchString] = useState("");
    const dispatch = useDispatch();
    const lastAutoAddedCodeRef = useRef("");
    const filterProduct = posAllProducts
        .filter((qty) => Number(qty?.attributes?.stock?.quantity || 0) > 0)
        .map((item) => ({
            name: item.attributes.name,
            code: item.attributes.code,
            id: item.id,
        }));

    const formatResult = (item) => {
        return (
            <span style={{ display: "block", textAlign: "left" }}>
                {" "}
                {item.code} ({item.name})
            </span>
        );
    };

    const removeSearchClass = () => {
        const container = document.getElementsByClassName("search-bar")[0];
        if (!container?.firstChild?.firstChild?.lastChild) {
            return;
        }
        container.firstChild.firstChild.lastChild.style.display = "none";
    };

    const normalize = (value) => (value || "").toString().trim().toUpperCase();

    const onProductSearch = (searchValue) => {
        const query = normalize(searchValue?.code || searchValue?.name || searchValue);
        if (!query) {
            return;
        }

        const productEntity = posAllProducts.find((product) => {
            const code = normalize(product.attributes?.code);
            const productCode = normalize(product.attributes?.product_code);
            const name = normalize(product.attributes?.name);
            return code === query || productCode === query || name === query;
        });

        if (!productEntity) {
            return;
        }

        const availableStock = Number(productEntity.attributes?.stock?.quantity || 0);
        if (availableStock <= 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage("pos.this.product.out.of.stock.message"),
                    type: toastType.ERROR,
                })
            );
            return;
        }

        if (!selectedOption?.value) {
            dispatch(
                addToast({
                    text: getFormattedMessage("purchase.select.warehouse.validate.label"),
                    type: toastType.ERROR,
                })
            );
            return;
        }

        const cartTemplate = customCart.find((item) => Number(item.id) === Number(productEntity.id));
        if (!cartTemplate) {
            return;
        }

        setUpdateProducts((prevProducts) => {
            const existingProduct = prevProducts.find((item) => Number(item.id) === Number(productEntity.id));
            if (!existingProduct) {
                return [...prevProducts, { ...cartTemplate, warehouse_id: selectedOption.value }];
            }

            if (Number(existingProduct.quantity) >= availableStock) {
                dispatch(
                    addToast({
                        text: getFormattedMessage("pos.quantity.exceeds.quantity.available.in.stock.message"),
                        type: toastType.ERROR,
                    })
                );
                return prevProducts;
            }

            return prevProducts.map((item) =>
                Number(item.id) === Number(productEntity.id)
                    ? { ...item, quantity: Number(item.quantity) + 1 }
                    : item
            );
        });

        removeSearchClass();
        setSearchString("");
        onSearchTermChange?.("");
    };

    const handleOnSelect = (result) => {
        onProductSearch(result);
    };

    const handleOnSearch = (string) => {
        const normalizedInput = normalize(string);
        setSearchString(string);
        onSearchTermChange?.(string);

        if (!normalizedInput) {
            lastAutoAddedCodeRef.current = "";
            return;
        }

        if (lastAutoAddedCodeRef.current === normalizedInput) {
            return;
        }

        const exactMatch = posAllProducts.find((item) => {
            const code = normalize(item.attributes?.code);
            const productCode = normalize(item.attributes?.product_code);
            return code === normalizedInput || productCode === normalizedInput;
        });

        if (exactMatch) {
            lastAutoAddedCodeRef.current = normalizedInput;
            onProductSearch({
                name: exactMatch?.attributes?.name,
                code: exactMatch?.attributes?.code,
                id: exactMatch?.id,
            });
        }
    };

    const inputFocus = () => {
        let searchInput = document.querySelector(
            'input[data-test="search-input"]'
        );
        if (searchInput) {
            searchInput.focus();
        }
    };

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.altKey && event.code === "KeyQ") {
                event.preventDefault();
                inputFocus();
            }
        };

        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <Col className="position-relative my-3 search-bar col-xxl-8 col-lg-12 col-12">
            <ReactSearchAutocomplete
                placeholder={placeholderText("pos-globally.search.field.label")}
                items={filterProduct}
                onSearch={handleOnSearch}
                inputSearchString={searchString}
                fuseOptions={{ keys: ["name", "code"] }}
                resultStringKeyName="code"
                onSelect={(data) => {
                    handleOnSelect(data);
                }}
                formatResult={formatResult}
                showIcon={false}
                showClear={false}
                autoFocus={true}
            />
            <i className="bi bi-search fs-2 react-search-icon position-absolute top-0 bottom-0 d-flex align-items-center ms-2" />
        </Col>
    );
};

const mapStateToProps = (state) => {
    const { posAllProducts } = state;
    return { posAllProducts };
};

export default connect(mapStateToProps)(ProductSearchbar);
