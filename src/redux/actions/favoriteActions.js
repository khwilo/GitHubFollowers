/*
 * Favorites users actions
 */
import * as types from './actionTypes';

export const addToFavorites = (user) => {
  return { type: types.ADD_TO_FAVORITES_SUCCESS, payload: user };
};

export const removeFromFavorites = (user) => {
  return { type: types.REMOVE_FROM_FAVORITES_SUCCESS, payload: user };
};
