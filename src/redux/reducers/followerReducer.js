import * as types from '../actions/actionTypes';
import initialState from './initialState';

const followerReducer = (state = initialState.followers, action = {}) => {
  if (action.type === types.LOAD_FOLLOWERS_SUCCESS) {
    return action.payload;
  }
  return state;
};

export default followerReducer;
