import {frontSettingActionType} from '../../constants';
import { normalizeCurrencyConfig } from '../../shared/currency';

const initialState = normalizeCurrencyConfig();

export default (state = initialState, action) => {
    switch (action.type) {
        case frontSettingActionType.FETCH_FRONT_SETTING:
            return normalizeCurrencyConfig(action.payload);
        default:
            return state;
    }
};
