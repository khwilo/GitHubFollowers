import * as types from '../actions/actionTypes';
import initialState from './initialState';

const favoriteReducer = (state = initialState.favorites, action = {}) => {
  switch (action.type) {
    case types.ADD_USER_TO_FAVORITES_SUCCESS:
      return [...state, action.payload];
    case types.RESET:
      return [];
    default:
      return state;
  }
};

export default favoriteReducer;
