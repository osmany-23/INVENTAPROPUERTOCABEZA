import { purchaseActionType } from '../../constants';

const initialState = {
    purchases: [],
    purchase: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case purchaseActionType.FETCH_PURCHASES:
            return {
                ...state,
                purchases: action.payload,
            };

        case purchaseActionType.FETCH_PURCHASE:
            return {
                ...state,
                purchase: action.payload,
            };

        case purchaseActionType.ADD_PURCHASE:
            return {
                ...state,
                purchases: [...state.purchases, action.payload],
            };

        case purchaseActionType.EDIT_PURCHASE:
            return {
                ...state,
                purchases: state.purchases.map((item) =>
                    item.id === +action.payload.id ? action.payload : item
                ),
            };

        case purchaseActionType.DELETE_PURCHASE:
            return {
                ...state,
                purchases: state.purchases.filter(
                    (item) => item.id !== action.payload
                ),
            };

        default:
            return state;
    }
};
