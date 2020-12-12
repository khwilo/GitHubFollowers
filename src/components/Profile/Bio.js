import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';

const Bio = ({ details }) => (
  <View style={styles.bio}>
    <Text style={styles.bioDetails}>
      {details ? details.replace(/\s+/g, ' ').trim() : ''}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  bio: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  bioDetails: {
    color: colors.black,
    fontSize: 16,
  },
});

export default Bio;
