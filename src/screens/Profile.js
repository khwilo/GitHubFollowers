/* eslint-disable import/no-extraneous-dependencies */
import { Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as userActions from '../redux/actions/userActions';
import ProfileCardDetails from '../components/Profile/CardDetails';

const openUrl = (url) => {
  return Linking.openURL(url).catch(() => {
    Alert.alert('Sorry, something went wrong.', 'Please try again later');
  });
};

const Profile = ({ actions, navigation, favorites, user }) => {
  // TODO: CREATE REUSABLE COMPONENTS
  const { userLogin: username } = useContext(FollowersContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    actions.loadUser(username).catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const result = favorites.some((favorite) => favorite.id === user.id);
    setIsFavorite(result);
  }, [favorites, user]);

  const handleManipulateFavorites = () => {
    if (isFavorite) {
      actions.removeFromFavorites(user);
      Alert.alert(
        'Success',
        'You have successfully removed this user from your favorites.',
      );
    } else {
      actions.addToFavorites(user);
      Alert.alert(
        'Success',
        'You have successfully added this user to your favorites 🎉',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* PROFILE */}
        <View style={styles.profile}>
          <Image
            source={{ uri: `${user.avatar_url}` }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileLogin}>{user.login}</Text>
            <Text style={styles.profileText}>{user.name}</Text>
            <View style={styles.profileLocation}>
              <Entypo name="location-pin" size={24} color={colors.gray} />
              <Text style={styles.profileText}>{user.location}</Text>
            </View>
          </View>
        </View>

        {/* BIO */}
        <View style={styles.bio}>
          <Text style={styles.bioDetails}>
            {user.bio ? user.bio.trim() : ''}
          </Text>
        </View>

        {/* Repos and Gists */}
        <View style={styles.card}>
          <View style={styles.cardWrapper}>
            {/* Repos */}
            <View style={styles.cardContent}>
              <View style={styles.cardContentIcon}>
                <SimpleLineIcons
                  name="folder-alt"
                  size={18}
                  color={colors.black}
                />
              </View>
              <ProfileCardDetails
                title="Public Repos"
                count={user.public_repos}
              />
            </View>

            {/* Gists */}
            <View style={styles.cardContent}>
              <View style={[styles.cardContentIcon, styles.iconBars]}>
                <Feather name="bar-chart-2" size={18} color={colors.black} />
              </View>
              <ProfileCardDetails
                title="Public Gists"
                count={user.public_gists}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btn, styles.btnProfile]}
            onPress={() => openUrl(`https://github.com/${user.login}`)}
          >
            <Text style={styles.btnText}>GitHub Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Following and Followers  */}
        <View style={styles.card}>
          {/* Following */}
          <View style={styles.cardWrapper}>
            <View style={styles.cardContent}>
              <View style={styles.cardContentIcon}>
                <Ionicons
                  name="ios-heart-empty"
                  size={18}
                  color={colors.black}
                />
              </View>
              <ProfileCardDetails title="Following" count={user.following} />
            </View>

            {/* Followers */}
            <View style={styles.cardContent}>
              <View style={styles.cardContentIcon}>
                <SimpleLineIcons name="people" size={18} color={colors.black} />
              </View>
              <ProfileCardDetails title="Followers" count={user.followers} />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.btn, styles.btnFollowers]}
            onPress={
              () =>
                navigation.navigate('Followers list', {
                  username,
                })
              // eslint-disable-next-line react/jsx-curly-newline
            }
          >
            <Text style={styles.btnText}>Get Followers</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.favoritesWrapper}>
          <TouchableOpacity onPress={handleManipulateFavorites}>
            <Entypo
              name="heart"
              size={24}
              color={`${isFavorite ? colors.darkRed : colors.gray}`}
            />
          </TouchableOpacity>
          <Text style={styles.favoriteLabel}>
            {`${isFavorite ? 'Remove from favorites' : 'Add to Favorites'}`}
          </Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {`GitHub since ${
              user.created_at &&
              format(new Date(user.created_at.split('T')[0]), 'MMM do, yyyy')
            }`}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadUser: bindActionCreators(userActions.loadUser, dispatch),
      addToFavorites: bindActionCreators(
        favoriteActions.addToFavorites,
        dispatch,
      ),
      removeFromFavorites: bindActionCreators(
        favoriteActions.removeFromFavorites,
        dispatch,
      ),
    },
  };
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  profile: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.green,
  },
  profileDetails: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  profileLogin: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 24,
    flexWrap: 'wrap',
  },
  profileText: {
    color: colors.gray,
    fontSize: 18,
  },
  profileLocation: {
    flexDirection: 'row',
  },
  bio: {
    paddingVertical: 5,
    marginBottom: 10,
  },
  bioDetails: {
    color: colors.black,
    fontSize: 16,
  },
  card: {
    backgroundColor: colors.blueGrey,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
  },
  cardContentIcon: {
    marginRight: 8,
  },
  iconBars: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    top: 0,
    left: -25,
  },
  btn: {
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnProfile: {
    backgroundColor: colors.lightPurple,
  },
  btnFollowers: {
    backgroundColor: colors.green,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  favoritesWrapper: {
    alignItems: 'center',
    padding: 5,
  },
  favoriteLabel: {
    fontWeight: '700',
  },
  footer: {
    marginTop: 5,
  },
  footerText: {
    color: colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
