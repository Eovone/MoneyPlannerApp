import { SET_AUTH_STATUS, UPDATE_USERNAME } from "./actionTypes";

export const updateUsername = (newName: string) => ({
    type: UPDATE_USERNAME,
    payload: newName,
});

export const setAuthStatus = (status: boolean) => ({
    type: SET_AUTH_STATUS,
    payload: status,
});