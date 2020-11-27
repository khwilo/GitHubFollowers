import React, { createContext, useState } from 'react';

export const FollowersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState('');

  const contextValues = {
    userLogin,
    setUserLogin,
  };

  return (
    <FollowersContext.Provider value={contextValues}>
      {children}
    </FollowersContext.Provider>
  );
};
