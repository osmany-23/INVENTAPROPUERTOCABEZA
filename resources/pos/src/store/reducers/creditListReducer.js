import { creditListActionType } from "../../constants";

const initialState = {
    cacheByRequestKey: {},
    loadingByRequestKey: {},
    errorByRequestKey: {},
};

const creditListReducer = (state = initialState, action) => {
    switch (action.type) {
        case creditListActionType.REQUEST:
            return {
                ...state,
                loadingByRequestKey: {
                    ...state.loadingByRequestKey,
                    [action.payload.requestKey]: true,
                },
                errorByRequestKey: {
                    ...state.errorByRequestKey,
                    [action.payload.requestKey]: null,
                },
            };
        case creditListActionType.SUCCESS:
            return {
                ...state,
                cacheByRequestKey: {
                    ...state.cacheByRequestKey,
                    [action.payload.requestKey]: action.payload,
                },
                loadingByRequestKey: {
                    ...state.loadingByRequestKey,
                    [action.payload.requestKey]: false,
                },
                errorByRequestKey: {
                    ...state.errorByRequestKey,
                    [action.payload.requestKey]: null,
                },
            };
        case creditListActionType.FAILURE:
            return {
                ...state,
                loadingByRequestKey: {
                    ...state.loadingByRequestKey,
                    [action.payload.requestKey]: false,
                },
                errorByRequestKey: {
                    ...state.errorByRequestKey,
                    [action.payload.requestKey]: action.payload.error,
                },
            };
        case creditListActionType.CLEAR:
            return initialState;
        default:
            return state;
    }
};

export default creditListReducer;
