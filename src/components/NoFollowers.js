/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

const NoFollowers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textContent}>
        This user does not have any followers 😔.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContent: {
    color: colors.gray,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 90,
  },
});

export default NoFollowers;
