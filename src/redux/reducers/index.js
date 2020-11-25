import { combineReducers } from 'redux';

import followers from './followerReducer';

const rootReducer = combineReducers({
  followers,
});

export default rootReducer;
