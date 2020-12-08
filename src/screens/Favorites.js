/* eslint-disable import/no-extraneous-dependencies */
import { AntDesign } from '@expo/vector-icons';
import React, { useContext } from 'react';
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
import { FollowersContext } from '../contexts/FollowersContext';

const Favorites = ({ favorites, navigation }) => {
  const { setUserLogin } = useContext(FollowersContext);
  const noFavoritesText = 'You have not added a favorite follower 😟.';

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
          <TouchableOpacity
            onPress={() => {
              setUserLogin(item.login);
              navigation.navigate('Profile');
            }}
          >
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.noFavoritesWrapper}>
          <Text style={styles.noFavoritesText}>{noFavoritesText}</Text>
          <TouchableOpacity
            style={styles.searchIconWrapper}
            onPress={() => navigation.navigate('Search')}
          >
            <AntDesign name="search1" size={30} color={colors.green} />
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={() => <RowSeparator />}
        />
      )}
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
  noFavoritesWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    color: colors.gray,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchIconWrapper: {
    marginVertical: 20,
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
