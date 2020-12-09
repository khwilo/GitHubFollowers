import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardIcon = ({ children, rotateRight }) => {
  const cardIconStyle = !rotateRight
    ? styles.cardIcon
    : [styles.cardIcon, styles.rotateIconRight];

  return <View style={cardIconStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  cardIcon: {
    marginRight: 8,
  },
  rotateIconRight: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: 0,
    left: -25,
  },
});

export default CardIcon;
