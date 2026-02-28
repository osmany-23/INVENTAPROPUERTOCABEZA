import { setLoading } from "./loadingAction";
import { apiBaseURL, productQuantityReportActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import { setTotalRecord } from "./totalRecordAction";
import requestParam from "../../shared/requestParam";
import { can } from "../../shared/can";

export const productQuantityReportAction =
    (id, filter = {}, isLoading = true, setTotalRecords) =>
    async (dispatch) => {
        if (!can("view_stock_alerts", { strict: true })) {
            dispatch({
                type: productQuantityReportActionType.QUANTITY_REPORT,
                payload: [],
            });
            dispatch(setTotalRecord(0));
            if (typeof setTotalRecords === "function") {
                setTotalRecords(0);
            }
            return;
        }

        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url =
            apiBaseURL.PRODUCT_STOCK_REPORT + `${id !== null ? "/" + id : ""}`;
        if (!_.isEmpty(filter) && (filter.page || filter.pageSize)) {
            url += requestParam(filter, false, false, true, url);
        }
        await apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: productQuantityReportActionType.QUANTITY_REPORT,
                    payload: response.data[0].data,
                });
                dispatch(
                    setTotalRecord(
                        response.data[0].total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                // dispatch(addToast(
                //     {text: response.data.message, type: toastType.ERROR}));
            });
    };
