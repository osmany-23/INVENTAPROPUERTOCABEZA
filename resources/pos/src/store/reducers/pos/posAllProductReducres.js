import {posProductActionType, productActionType} from '../../../constants'

const mergeProductsById = (currentProducts, newProducts) => {
    const productMap = new Map(currentProducts.map((product) => [Number(product.id), product]));
    newProducts.forEach((product) => {
        productMap.set(Number(product.id), product);
    });

    return Array.from(productMap.values());
};

export default (state = [], action) => {
    switch (action.type) {
        case posProductActionType.POS_ALL_PRODUCT:
            return action.append ? mergeProductsById(state, action.payload) : action.payload;
        case posProductActionType.POS_ALL_PRODUCTS:
            return action.append ? mergeProductsById(state, action.payload) : action.payload;
        case productActionType.FETCH_BRAND_CLICKABLE:
            return action.append ? mergeProductsById(state, action.payload) : action.payload;
        default:
            return state;
    }
};
