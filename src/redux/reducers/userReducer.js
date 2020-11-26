import initialState from './initialState';
import * as types from '../actions/actionTypes';

const userReducer = (state = initialState.userProfile, action = {}) => {
  if (action.type === types.LOAD_USER_SUCCESS) {
    return action.payload;
  }

  return state;
};

export default userReducer;
