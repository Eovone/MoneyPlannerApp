import { configureStore } from '@reduxjs/toolkit';
import { HIDE_ALERT, SET_AUTH_STATUS, SET_USER_ID, SHOW_ALERT, UPDATE_USERNAME } from './actionTypes';

export interface AppState {
  userName: string;
  isAuthorized: boolean;
  userId: number;
  alertInfo: {
    showAlert: boolean;
    success: boolean;
    message: string;
  };
};

const initialState: AppState = {
  userName: localStorage.getItem('username') || '',
  isAuthorized: localStorage.getItem('isAuthorized') === 'true' || false,
  userId: parseInt(localStorage.getItem('userId') || '0', 10),
  alertInfo: { showAlert: false, success: false, message: ""},
};

const userNameReducer = (state = initialState.userName, action: any) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return action.payload; 
    default:
      return state;
  }
};

const authReducer = (state = initialState.isAuthorized, action: any) => {
    switch (action.type) {
      case SET_AUTH_STATUS:
        return action.payload;
      default:
        return state;
  }
};

const userIdReducer = (state = initialState.userId, action: any) => {
  switch (action.type) {
    case SET_USER_ID:
      return action.payload;
    default:
      return state;
  }
};

const alertReducer = (state = initialState.alertInfo, action: any) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        showAlert: true,
        success: action.payload.success,
        message: action.payload.message,
      };
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        success: false,
        message: "",
      };
    default:
      return state;
  }
};

const rootReducer = (state = initialState, action: any) => {
  if (action.type === 'RESET_STATE') {
    state = initialState;
  }

  return {
    userName: userNameReducer(state.userName, action),
    isAuthorized: authReducer(state.isAuthorized, action),
    userId: userIdReducer(state.userId, action),
    alertInfo: alertReducer(state.alertInfo, action),
  };
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;