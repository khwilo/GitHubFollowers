import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../constants/colors';

const NUM_OF_COLUMNS = 3;
const ITEM_HEIGHT = Dimensions.get('window').width / NUM_OF_COLUMNS;

const Item = ({ login, avatarUrl }) => {
  return (
    <View style={styles.item}>
      <Image style={styles.image} source={{ uri: avatarUrl }} />
      <Text style={styles.textContent}>{login}</Text>
    </View>
  );
};

const FollowersList = ({ navigation, route }) => {
  const { followers } = route.params;

  const renderItem = ({ item }) => (
    <Item login={item.login} avatarUrl={item.avatar_url} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        horizontal={false}
        numColumns={NUM_OF_COLUMNS}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    margin: 10,
    height: ITEM_HEIGHT,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  textContent: {
    color: colors.black,
    fontWeight: '700',
  },
});

export default FollowersList;
