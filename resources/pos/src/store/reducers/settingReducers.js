import {settingActionType} from '../../constants';
import { normalizeSettingConfig } from '../../shared/currency';

const initialState = normalizeSettingConfig();

export default (state = initialState, action) => {
    switch (action.type) {
        case settingActionType.FETCH_SETTING:
            return normalizeSettingConfig(action.payload);
        case settingActionType.EDIT_SETTINGS:
            return normalizeSettingConfig(action.payload);
        case settingActionType.FETCH_CACHE_CLEAR:
            return action.payload;
        default:
            return state;
    }
};
