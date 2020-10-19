import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FollowersContextProvider } from '../contexts/FollowersContext';

import FavoritesScreen from '../screens/Favorites';
import FollowerProfileScreen from '../screens/FollowerProfile';
import FollowersDisplayScreen from '../screens/FollowersDisplay';
import HomeScreen from '../screens/Home';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Search" component={HomeScreen} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} />
  </Tab.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator headerMode="none">
    <MainStack.Screen name="Home" component={HomeTabs} />
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
