/* eslint-disable import/no-extraneous-dependencies */
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';

const Header = ({ user }) => (
  <View style={styles.profile}>
    <Image source={{ uri: `${user.avatar_url}` }} style={styles.profileImage} />
    <View style={styles.profileDetails}>
      <Text style={styles.profileLogin}>{user.login || ''}</Text>
      <Text style={styles.profileText}>{user.name || ''}</Text>
      <View style={styles.profileLocation}>
        <Entypo name="location-pin" size={24} color={colors.gray} />
        <Text style={styles.profileText}>{user.location || ''}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profile: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  profileDetails: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  profileLogin: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 24,
    flexWrap: 'wrap',
  },
  profileText: {
    color: colors.gray,
    fontSize: 18,
  },
  profileLocation: {
    flexDirection: 'row',
  },
});

export default Header;
