import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FollowerProfile = ({ navigation }) => (
  <SafeAreaView>
    <Text>Follower Profile</Text>
    <Button title="Go back" onPress={() => navigation.pop()} />
  </SafeAreaView>
);

export default FollowerProfile;
