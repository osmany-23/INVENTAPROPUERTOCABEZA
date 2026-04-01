import {toastType} from '../../constants';

export default (state = [], action) => {
    const { type } = action;
    switch (type) {
        case toastType.ADD_TOAST:
        case toastType.REMOVE_TOAST:
            return state;
        default:
            return state;
    }
};
