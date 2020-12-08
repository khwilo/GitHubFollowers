/* eslint-disable import/no-extraneous-dependencies */
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import RowSeparator from '../components/RowSeparator';
import colors from '../constants/colors';

const Favorites = ({ favorites }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.favoriteViewWrapper}>
        <View style={styles.imageLoginView}>
          <Image
            source={{ uri: `${item.avatar_url}` }}
            style={styles.followerImage}
          />
          <Text style={styles.followerLogin}>{item.login}</Text>
        </View>
        <View style={styles.rightIconWrapper}>
          <TouchableOpacity>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <RowSeparator />}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  favoriteViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  imageLoginView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  followerLogin: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
  rightIconWrapper: {
    color: colors.green,
  },
});

export default connect(mapStateToProps)(Favorites);
