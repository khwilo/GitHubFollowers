import React from 'react';
import { Text, View, Button } from 'react-native';

const FollowersDisplay = ({ navigation }) => (
  <View>
    <Text>Followers screen!</Text>
    <Button
      title="View profile"
      onPress={() => navigation.navigate('Follower profile')}
    />
  </View>
);

export default FollowersDisplay;
