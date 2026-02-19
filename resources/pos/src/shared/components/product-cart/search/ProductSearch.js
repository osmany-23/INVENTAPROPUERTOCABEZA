import React, {useMemo, useState} from 'react';
import {connect, useDispatch} from 'react-redux';
import {ReactSearchAutocomplete} from 'react-search-autocomplete';
import {addToast} from '../../../../store/action/toastAction';
import {toastType} from '../../../../constants';
import {searchPurchaseProduct} from '../../../../store/action/purchaseProductAction';
import {getFormattedMessage, placeholderText} from '../../../sharedMethod';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const ProductSearch = (props) => {
    const {
        values,
        products,
        updateProducts,
        setUpdateProducts,
        customProducts,
        searchPurchaseProduct,
        handleValidation,
        isAllProducts,
        incrementOnDuplicate = false
    } = props;
    const [searchString, setSearchString] = useState("");
    const dispatch = useDispatch();
    const filterProducts = useMemo(() => {
        if (!values.warehouse_id || !Array.isArray(products)) {
            return [];
        }

        if (isAllProducts) {
            return products.map((item) => ({
                name: item?.attributes?.name,
                code: item?.attributes?.code,
                id: item?.id
            }));
        }

        return products
            .filter((qty) => qty?.attributes?.stock?.quantity > 0)
            .map((item) => ({
                name: item?.attributes?.name,
                code: item?.attributes?.code,
                id: item?.id
            }));
    }, [isAllProducts, products, values.warehouse_id]);

    const onProductSearch = (code) => {
        if (!values.warehouse_id) {
            handleValidation();
        } else {
            const scannedCode = typeof code === "string" ? code : code?.code;
            if (!scannedCode) {
                return;
            }

            setSearchString(scannedCode);
            const newId = products
                .filter((item) => item?.attributes?.code === scannedCode)
                .map((item) => item.id);
            const finalIdArrays = customProducts.map((id) => id.product_id);
            const finalId = finalIdArrays.filter((finalIdArray) => finalIdArray === newId[0]);
            if (finalId[0] !== undefined) {
                searchPurchaseProduct(newId[0]);
                setUpdateProducts((prev) => {
                    const existingProduct = prev.find((item) => item.product_id === finalId[0]);
                    if (existingProduct) {
                        if (incrementOnDuplicate) {
                            return prev.map((item) =>
                                item.product_id === finalId[0]
                                    ? { ...item, quantity: Number(item.quantity || 0) + 1 }
                                    : item
                            );
                        }
                        dispatch(addToast({
                            text: getFormattedMessage('globally.product-already-added.validate.message'),
                            type: toastType.ERROR
                        }));
                        return prev;
                    }

                    const newProduct = customProducts.find((element) => element.product_id === finalId[0]);
                    if (!newProduct) {
                        return prev;
                    }
                    return [...prev, newProduct];
                });
                removeSearchClass();
                setSearchString("");
            }
        }
    }

    const handleOnSearch = (string) => {
        setSearchString(string);
        const exactMatch = filterProducts.find((item) => item.code === string || item.name === string);
        if (exactMatch) {
            onProductSearch(exactMatch);
        }
    }

    const handleOnSelect = (result) => {
        onProductSearch(result);
    }

    const formatResult = (item) => {
        return (
            <span onClick={(e) => e.stopPropagation()}>{item.code} ({item.name})</span>
        )
    }

    const removeSearchClass = () => {
        const html = document.getElementsByClassName(`custom-search`)[0].firstChild.firstChild.lastChild;
        html.style.display = 'none'
    }

    return (
        <div className='position-relative custom-search'>
            <ReactSearchAutocomplete
                items={filterProducts}
                onSearch={handleOnSearch}
                inputSearchString={searchString}
                fuseOptions={{keys: ['code', 'name']}}
                resultStringKeyName='code'
                placeholder={placeholderText('globally.search.field.label')}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                showIcon={false}
                showClear={false}
            />
            <FontAwesomeIcon icon={faSearch}
                             className='d-flex align-items-center top-0 bottom-0 react-search-icon my-auto text-gray-600 position-absolute'/>
        </div>
    );
}

export default connect(null, {searchPurchaseProduct})(ProductSearch);
