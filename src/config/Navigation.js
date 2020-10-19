import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FollowersDisplayScreen from '../screens/FollowersDisplay';
import HomeScreen from '../screens/Home';

import { FollowersContextProvider } from '../util/context';

const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen
      name="Followers display"
      component={FollowersDisplayScreen}
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
