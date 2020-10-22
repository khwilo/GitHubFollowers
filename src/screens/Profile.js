import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';

const Profile = ({ navigation }) => (
  <SafeAreaView>
    <Text>Follower Profile</Text>
    <Button
      title="Go back"
      color={colors.green}
      onPress={() => navigation.goBack()}
    />
  </SafeAreaView>
);

export default Profile;
