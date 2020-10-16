/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import globalStyles from '../styles/global';

const { height } = Dimensions.get('window');
const HEADER_TOP_PADDING = height * 0.2;

const Banner = () => (
  <View style={styles.header}>
    <View style={styles.iconContainer}>
      <AntDesign name="github" size={100} />
    </View>
    <Text style={globalStyles.logoText}>GitHub</Text>
    <Text style={globalStyles.titleText}>Followers</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: HEADER_TOP_PADDING,
  },
  iconContainer: {
    marginBottom: 10,
  },
});

export default Banner;
