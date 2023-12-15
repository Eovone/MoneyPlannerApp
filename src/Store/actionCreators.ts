import { HIDE_ALERT, SET_AUTH_STATUS, SET_USER_ID, SHOW_ALERT, UPDATE_USERNAME } from "./actionTypes";

export const updateUsername = (newName: string) => ({
    type: UPDATE_USERNAME,
    payload: newName,
});

export const setAuthStatus = (status: boolean) => ({
    type: SET_AUTH_STATUS,
    payload: status,
});

export const setUserId = (userId: number) => ({
    type: SET_USER_ID,
    payload: userId,
});

export const showAlert = (alertInfo: { success: boolean; message: string; }) => ({
    type: SHOW_ALERT,
    payload: alertInfo,
});

export const hideAlert = () => ({
    type: HIDE_ALERT,
});