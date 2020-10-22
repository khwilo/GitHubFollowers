import React from 'react';
import { StyleSheet, Text } from 'react-native';

import colors from '../constants/colors';

const Done = () => <Text style={styles.textContent}>Done</Text>;

const styles = StyleSheet.create({
  textContent: {
    color: colors.green,
    fontWeight: '700',
    fontSize: 18,
  },
});

export default Done;
