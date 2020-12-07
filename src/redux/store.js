import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';

// Redux persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['favorites'], // Reducers to save
  blackList: ['appUser', 'user', 'followers'], // Reducers to omit from saving
};

// Redux persist persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };
