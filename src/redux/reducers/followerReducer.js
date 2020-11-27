import * as types from '../actions/actionTypes';
import initialState from './initialState';

const followerReducer = (state = initialState.followers, action = {}) => {
  switch (action.type) {
    case types.LOAD_FOLLOWERS_SUCCESS:
      return action.payload;
    case types.UPDATE_FOLLOWERS_SUCCESS:
      return [].concat(state, action.payload);
    default:
      return state;
  }
};

export default followerReducer;
