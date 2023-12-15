import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { SET_AUTH_STATUS, UPDATE_USERNAME } from './actionTypes';

export interface AppState {
  userName: string;
  isAuthorized: boolean;
}

const initialState: AppState = {
  userName: '',
  isAuthorized: false,
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

const rootReducer = combineReducers({
  userName: userNameReducer,
  isAuthorized: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;