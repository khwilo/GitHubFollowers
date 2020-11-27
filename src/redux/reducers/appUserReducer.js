import initialState from './initialState';
import * as types from '../actions/actionTypes';

const appUserReducer = (state = initialState.appUser, action = {}) => {
  if (action.type === types.CREATE_APP_USER) {
    return { ...state, ...action.payload };
  }

  return state;
};

export default appUserReducer;
