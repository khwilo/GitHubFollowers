import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';

const CardButton = ({ title, color, handleOnPress }) => (
  <TouchableOpacity
    style={{ ...styles.btn, backgroundColor: color }}
    onPress={() => handleOnPress()}
  >
    <Text style={styles.btnText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CardButton;
