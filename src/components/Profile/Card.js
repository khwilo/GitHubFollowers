import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/colors';

const Card = ({ children }) => <View style={styles.card}>{children}</View>;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.blueGrey,
    marginVertical: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
});

export default Card;
