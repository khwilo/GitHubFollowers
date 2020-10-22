import React from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';

const FollowersList = ({ navigation }) => (
  <SafeAreaView>
    <Text>Followers screen!</Text>
    <Button
      title="View profile"
      color={colors.green}
      onPress={() => navigation.navigate('Profile')}
    />
  </SafeAreaView>
);

export default FollowersList;
