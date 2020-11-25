import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './config/Navigation';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
