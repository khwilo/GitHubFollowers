import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

import fetchFollowers from '../util/api';

export const FollowersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const getFollowers = async () => {
    setIsLoading(true);

    if (username.length === 0) {
      Alert.alert('Sorry something is wrong', 'no username');
      setIsLoading(false);
      setIsFetched(false);
    } else {
      try {
        const data = await fetchFollowers(username);
        setFollowers(data);
        setIsFetched(true);
        setIsLoading(false);
        setUsername('');
      } catch (err) {
        setIsFetched(false);
        setIsLoading(false);
        setUsername('');
      }
    }
  };

  const contextValues = {
    username,
    setUsername,
    followers,
    setFollowers,
    getFollowers,
    isLoading,
    isFetched,
  };

  return (
    <FollowersContext.Provider value={contextValues}>
      {children}
    </FollowersContext.Provider>
  );
};
