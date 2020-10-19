import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FollowersContextProvider } from '../contexts/FollowersContext';

import FollowerProfileScreen from '../screens/FollowerProfile';
import FollowersDisplayScreen from '../screens/FollowersDisplay';
import HomeScreen from '../screens/Home';

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
  <SafeAreaProvider>
    <NavigationContainer>
      <FollowersContextProvider>
        <MainStackScreen />
      </FollowersContextProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default Navigation;
