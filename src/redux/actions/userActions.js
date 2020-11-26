/*
 * GitHub user actions
 */
import * as types from './actionTypes';
import { fetchUser } from '../../util/api';

export const loadUserSuccess = (user) => {
  return { type: types.LOAD_USER_SUCCESS, payload: user };
};

export const loadUser = (username) => {
  return async (dispatch) => {
    try {
      const user = await fetchUser(username);
      dispatch(loadUserSuccess(user));
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
