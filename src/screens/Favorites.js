import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import resetFavorites from '../redux/actions/resetAction';

const FavoriteView = ({ favorite }) => {
  return (
    <View style={styles.favoriteViewContainer}>
      <Image
        source={{ uri: `${favorite.avatar_url}` }}
        style={styles.followerImage}
      />
      <Text style={styles.followerLogin}>{favorite.login}</Text>
    </View>
  );
};

const Favorites = ({ actions, favorites }) => {
  return (
    <View>
      <Button onPress={() => actions.reset()} title="reset" />
      {favorites.map((favorite) => (
        <FavoriteView key={favorite.id} favorite={favorite} />
      ))}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      reset: bindActionCreators(resetFavorites, dispatch),
    },
  };
};

const styles = StyleSheet.create({
  favoriteViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  followerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  followerLogin: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
