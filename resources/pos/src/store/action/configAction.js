import { apiBaseURL, configActionType, toastType, Tokens } from '../../constants';
import apiConfig from '../../config/apiConfig';
import { addToast } from './toastAction';

export const fetchConfig = (navigate) => async (dispatch) => {
    apiConfig.get(apiBaseURL.CONFIG)
        .then((response) => {
            const permissions = response?.data?.data?.permissions || [];
            localStorage.setItem(Tokens.GET_PERMISSIONS, permissions);
            dispatch({ type: configActionType.FETCH_CONFIG, payload: response.data.data.permissions });
            dispatch({ type: configActionType.FETCH_ALL_CONFIG, payload: response.data.data });
            navigate && navigate("/app/pos")
        })
        .catch((response) => {
            dispatch(addToast(
                { text: response.response?.data?.message, type: toastType.ERROR }));
        });
};
