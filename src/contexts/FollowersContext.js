import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

import fetchFollowers from '../util/api';

export const FollowersContext = createContext();

export const FollowersContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const getFollowers = async () => {
    setIsLoading(true);

    if (username.length === 0) {
      Alert.alert(
        'Empty Username',
        'Please enter a username. We need to know who to look for 😀.',
      );
      setIsLoading(false);
      setIsFetched(false);
    } else {
      try {
        const data = await fetchFollowers(username);
        if (Array.isArray(data)) {
          setFollowers(data);
          setIsFetched(true);
          setIsLoading(false);
          setUsername('');
        } else {
          setIsFetched(false);
          setIsLoading(false);
          setUsername('');
          Alert.alert('User not found', 'Try searching for another user 😔.');
        }
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
    userId,
    setUserId,
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
