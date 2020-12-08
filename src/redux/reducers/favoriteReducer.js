import * as types from '../actions/actionTypes';
import initialState from './initialState';

const favoriteReducer = (state = initialState.favorites, action = {}) => {
  switch (action.type) {
    case types.ADD_TO_FAVORITES_SUCCESS:
      return [...state, action.payload];
    case types.REMOVE_FROM_FAVORITES_SUCCESS:
      return state.filter((favorite) => favorite.id !== action.payload.id);
    case types.RESET:
      return [];
    default:
      return state;
  }
};

export default favoriteReducer;
