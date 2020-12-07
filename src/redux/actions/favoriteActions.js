/*
 * Favorites users actions
 */
import * as types from './actionTypes';

const addUserToFavorites = (user) => {
  return { type: types.ADD_USER_TO_FAVORITES_SUCCESS, payload: user };
};

export default addUserToFavorites;
