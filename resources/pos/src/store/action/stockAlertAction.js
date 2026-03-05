import apiConfig from '../../config/apiConfig';
import {apiBaseURL, toastType, topCustomersActionType} from '../../constants';
import {addToast} from './toastAction';
import {setLoading} from "./loadingAction";

export const fetchStockAlert = (isLoading = true) => async (dispatch) => {
    if (isLoading) {
        dispatch(setLoading(true));
    }

    apiConfig.get(apiBaseURL.STOCK_ALERT)
        .then((response) => {
            dispatch({type: topCustomersActionType.FETCH_STOCK_ALERT, payload: response.data.data})
            if (isLoading) {
                dispatch(setLoading(false));
            }
        })
        .catch(({response}) => {
            dispatch(addToast(
                {text: response.data.message, type: toastType.ERROR}));
            if (isLoading) {
                dispatch(setLoading(false));
            }
        });
}
