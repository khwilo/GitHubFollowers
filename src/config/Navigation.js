/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import colors from '../constants/colors';
import { FollowersContextProvider } from '../contexts/FollowersContext';

import FavoritesScreen from '../screens/Favorites';
import FollowersListScreen from '../screens/FollowersList';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Followers list" component={FollowersListScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Follower profile" component={ProfileScreen} />
  </Stack.Navigator>
);

const StackTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Search') {
          iconName = 'ios-search';
        } else if (route.name === 'Favorites') {
          iconName = focused ? 'ios-star' : 'ios-star-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.gray,
    }}
  >
    <Tab.Screen name="Search" component={HomeStack} />
    <Tab.Screen name="Favorites" component={FavoritesStack} />
  </Tab.Navigator>
);

const RootStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home stack tabs"
      component={StackTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Profile" component={ProfileStack} />
  </Stack.Navigator>
);

const Navigation = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <FollowersContextProvider>
        <RootStackScreen />
      </FollowersContextProvider>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default Navigation;
