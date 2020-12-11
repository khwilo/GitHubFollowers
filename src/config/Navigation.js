/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AntDesign, Ionicons } from '@expo/vector-icons';

import Done from '../components/Done';
import colors from '../constants/colors';
import { FollowersContextProvider } from '../contexts/FollowersContext';

import FavoritesScreen from '../screens/Favorites';
import FollowersListScreen from '../screens/FollowersList';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';

import globalStyles from '../styles/global';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Followers list"
      component={FollowersListScreen}
      options={({ navigation }) => ({
        title: 'Search',
        headerTintColor: colors.green,
        headerTitleContainerStyle: { left: 40 },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.navHorizontalPadding}
          >
            <AntDesign name="left" size={24} color={colors.green} />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={({ navigation }) => ({
        headerTintColor: colors.green,
        headerTitleContainerStyle: { left: 40 },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={globalStyles.navHorizontalPadding}
          >
            <AntDesign name="left" size={24} color={colors.green} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            style={globalStyles.navHorizontalPadding}
            onPress={() => navigation.navigate('Search')}
          >
            <AntDesign name="plus" size={24} color={colors.green} />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={({ navigation }) => ({
        headerTintColor: colors.green,
        headerLeft: null,
        headerTitle: null,
        headerRight: () => (
          <TouchableOpacity
            style={globalStyles.navHorizontalPadding}
            onPress={() => navigation.goBack()}
          >
            <Done />
          </TouchableOpacity>
        ),
      })}
    />
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
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Home" component={StackTabs} />
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
