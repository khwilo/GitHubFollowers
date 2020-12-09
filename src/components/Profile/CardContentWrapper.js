import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardContentWrapper = ({ children }) => (
  <View style={styles.wrapper}>{children}</View>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CardContentWrapper;
