import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = ({ navigation }) => (
  <SafeAreaView>
    <Text>Follower Profile</Text>
    <Button title="Go back" onPress={() => navigation.goBack()} />
  </SafeAreaView>
);

export default Profile;
