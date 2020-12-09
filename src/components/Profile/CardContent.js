import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardContent = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
});

export default CardContent;
