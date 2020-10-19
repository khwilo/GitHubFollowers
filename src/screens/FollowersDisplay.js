import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FollowersDisplay = ({ navigation }) => (
  <SafeAreaView>
    <Text>Followers screen!</Text>
    <Button
      title="View profile"
      onPress={() => navigation.navigate('Follower profile')}
    />
  </SafeAreaView>
);

export default FollowersDisplay;
