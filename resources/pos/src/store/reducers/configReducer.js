import {configActionType} from '../../constants';
import { normalizePermissions } from "../../shared/permissionRoute";

export default (state = [], action) => {
    switch (action.type) {
        case configActionType.FETCH_CONFIG:
            return normalizePermissions(action.payload || []);
        default:
            return state;
    }
};
