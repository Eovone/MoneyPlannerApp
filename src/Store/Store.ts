import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { SET_AUTH_STATUS, SET_USER_ID, UPDATE_USERNAME } from './actionTypes';

export interface AppState {
  userName: string;
  isAuthorized: boolean;
  userId: number;
}

const initialState: AppState = {
  userName: '',
  isAuthorized: false,
  userId: 0,
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

const rootReducer = combineReducers({
  userName: userNameReducer,
  isAuthorized: authReducer,
  userId: userIdReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;