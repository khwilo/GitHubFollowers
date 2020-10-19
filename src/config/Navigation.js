import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FollowersDisplayScreen from '../screens/FollowersDisplay';
import HomeScreen from '../screens/Home';
import FollowerProfileScreen from '../screens/FollowerProfile';

import { FollowersContextProvider } from '../contexts/FollowersContext';

const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator headerMode="none">
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen
      name="Followers display"
      component={FollowersDisplayScreen}
    />
    <MainStack.Screen
      name="Follower profile"
      component={FollowerProfileScreen}
    />
  </MainStack.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <FollowersContextProvider>
      <MainStackScreen />
    </FollowersContextProvider>
  </NavigationContainer>
);

export default Navigation;
