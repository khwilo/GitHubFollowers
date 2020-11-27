import { fetchFollowers } from '../../util/api';
import * as types from './actionTypes';

export const loadFollowersSuccess = (followers) => {
  return { type: types.LOAD_FOLLOWERS_SUCCESS, payload: followers };
};

export const updateFollowers = (followers) => {
  return { type: types.UPDATE_FOLLOWERS_SUCCESS, payload: followers };
};

export const loadFollowers = (username) => {
  return async (dispatch) => {
    try {
      const followers = await fetchFollowers(username);
      dispatch(loadFollowersSuccess(followers));
      return followers;
    } catch (error) {
      console.log('API CALL ERROR: ', error);
      throw error;
    }
  };
};
