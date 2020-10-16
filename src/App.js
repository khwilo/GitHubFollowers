import React from 'react';

import Home from './screens/Home';
import { FollowersContextProvider } from './util/context';

export default function App() {
  return (
    <FollowersContextProvider>
      <Home />
    </FollowersContextProvider>
  );
}
