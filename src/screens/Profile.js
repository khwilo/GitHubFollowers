import React, { useContext, useEffect, useState } from 'react';
import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const { userId, followers } = useContext(FollowersContext);

  useEffect(() => {
    const found = followers.find((follower) => follower.id === userId);
    setUser(found);
  }, [followers, userId]);

  return (
    <SafeAreaView>
      <Text>Follower Profile</Text>
      <Text>{user.login}</Text>
      <Button
        title="Go back"
        color={colors.green}
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

export default Profile;
