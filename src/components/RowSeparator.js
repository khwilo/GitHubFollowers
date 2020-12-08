import React from 'react';
import { StyleSheet, View } from 'react-native';

import colors from '../constants/colors';

const RowSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: colors.rowSeparatorBorder,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
  },
});

export default RowSeparator;
