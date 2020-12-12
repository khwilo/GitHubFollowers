import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import colors from '../../constants/colors';

const CardDetails = ({ title, count }) => (
  <View style={styles.cardDetails}>
    <Text style={styles.cardText}>{title || ''}</Text>
    <Text style={styles.cardText}>{count || ''}</Text>
  </View>
);

const styles = StyleSheet.create({
  cardDetails: {
    alignItems: 'center',
  },
  cardText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
});

export default CardDetails;
