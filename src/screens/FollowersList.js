import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import colors from '../constants/colors';

const Item = ({ login }) => (
  <View style={styles.item}>
    <Text>{login}</Text>
  </View>
);

const FollowersList = ({ navigation, route }) => {
  const { followers } = route.params;

  const renderItem = ({ item }) => <Item login={item.login} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: colors.green,
    paddingVertical: 40,
    marginVertical: 2,
    marginHorizontal: 2,
    alignItems: 'center',
  },
});

export default FollowersList;
