import { HIDE_ALERT, RESET_STATE, SET_AUTH_STATUS, SET_JWT, SET_USER_ID, SHOW_ALERT, UPDATE_USERNAME } from "./actionTypes";

export const updateUsername = (newName: string) => {
    localStorage.setItem('username', newName);
    return {
        type: UPDATE_USERNAME,
        payload: newName,
    };
};

export const setAuthStatus = (status: boolean) => {
    localStorage.setItem('isAuthorized', status.toString());
    return {
        type: SET_AUTH_STATUS,
        payload: status,
    };
};

export const setUserId = (userId: number) => {
    localStorage.setItem('userId', userId.toString());
    return {
        type: SET_USER_ID,
        payload: userId,
    };
};

export const showAlert = (alertInfo: { success: boolean; message: string; }) => ({
    type: SHOW_ALERT,
    payload: alertInfo,
});

export const hideAlert = () => ({
    type: HIDE_ALERT,
});

export const resetState = () => ({
    type: RESET_STATE,
});

export const setJWT = (token: string) => {
    localStorage.setItem('jwtToken', token);
    return {
        type: SET_JWT,
        payload: token,
    };
};