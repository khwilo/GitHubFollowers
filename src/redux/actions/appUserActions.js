/*
 * App user actions
 */
import * as types from './actionTypes';

export const createAppUser = (user) => {
  return { type: types.CREATE_APP_USER, payload: user };
};

export default { createAppUser };
