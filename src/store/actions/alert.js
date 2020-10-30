import * as actionTypes from './actionTypes';

export const success = (message) => {
    return {
        type: actionTypes.ALERT_SUCCESS,
        message: message
    };
}

export const error = (message) => {
    return {
        type: actionTypes.ALERT_ERROR,
        message: message
    };
}

export const clear = () => {
    return {
        type: actionTypes.ALERT_CLEAR,
    };
}