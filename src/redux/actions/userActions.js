/*
 * GitHub user actions
 */
import { fetchUser } from '../../api';
import * as types from './actionTypes';

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
