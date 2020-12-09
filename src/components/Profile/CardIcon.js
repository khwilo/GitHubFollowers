import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardIcon = ({ children, isIconBar }) => {
  const cardIconStyle = !isIconBar
    ? styles.cardIcon
    : [styles.cardIcon, styles.iconBars];

  return <View style={cardIconStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  cardIcon: {
    marginRight: 8,
  },
  iconBars: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: 0,
    left: -25,
  },
});

export default CardIcon;
