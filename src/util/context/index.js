import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

import fetchFollowers from '../api';

export const FollowersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFollowers = () => {
    setIsLoading(true);

    return fetchFollowers(username)
      .then((data) => {
        setUsername('');
        if (Array.isArray(data)) {
          setFollowers(data);
        } else {
          Alert.alert('Sorry, something went wrong', data.message);
        }
      })
      .catch((error) => {
        Alert.alert('Sorry, something went wrong', error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const contextValues = {
    username,
    setUsername,
    followers,
    setFollowers,
    getFollowers,
    isLoading,
  };

  return (
    <FollowersContext.Provider value={contextValues}>
      {children}
    </FollowersContext.Provider>
  );
};
