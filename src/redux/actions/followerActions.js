import { fetchFollowers } from '../../util/api';
import types from './actionTypes';

export const loadFollowersSuccess = (followers) => {
  return { type: types.LOAD_FOLLOWERS_SUCCESS, payload: followers };
};

export const loadFollowers = (username) => {
  return async (dispatch) => {
    try {
      const followers = await fetchFollowers(username);
      dispatch(loadFollowersSuccess(followers));
    } catch (error) {
      console.log('API CALL ERROR: ', error);
      throw error;
    }
  };
};
