import { combineReducers } from 'redux';

import appUser from './appUserReducer';
import followers from './followerReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  appUser,
  followers,
  user,
});

export default rootReducer;
