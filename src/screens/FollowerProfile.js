import React from 'react';
import { Text, View, Button } from 'react-native';

const FollowerProfile = ({ navigation }) => (
  <View>
    <Text>Follower Profile</Text>
    <Button title="Go back" onPress={() => navigation.pop()} />
  </View>
);

export default FollowerProfile;
