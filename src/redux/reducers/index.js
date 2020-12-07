import { combineReducers } from 'redux';

import appUser from './appUserReducer';
import favorites from './favoriteReducer';
import followers from './followerReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  appUser,
  favorites,
  followers,
  user,
});

export default rootReducer;
