/* eslint-disable import/no-extraneous-dependencies */
import { Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CardButton from '../components/Profile/CardButton';
import CardDetails from '../components/Profile/CardDetails';
import CardIcon from '../components/Profile/CardIcon';
import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as userActions from '../redux/actions/userActions';
import { openUrl } from '../util';
import Card from '../components/Profile/Card';
import CardContentWrapper from '../components/Profile/CardContentWrapper';
import CardContent from '../components/Profile/CardContent';

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
        <Card>
          <CardContentWrapper>
            {/* Repos */}
            <CardContent>
              <CardIcon>
                <SimpleLineIcons
                  name="folder-alt"
                  size={18}
                  color={colors.black}
                />
              </CardIcon>
              <CardDetails title="Public Repos" count={user.public_repos} />
            </CardContent>

            {/* Gists */}
            <CardContent>
              <CardIcon rotateRight>
                <Feather name="bar-chart-2" size={18} color={colors.black} />
              </CardIcon>
              <CardDetails title="Public Gists" count={user.public_gists} />
            </CardContent>
          </CardContentWrapper>
          <CardButton
            title="GitHub Profile"
            color={colors.lightPurple}
            handleOnPress={() => {
              openUrl(`https://github.com/${user.login}`);
            }}
          />
        </Card>

        {/* Following and Followers  */}
        <Card>
          {/* Following */}
          <CardContentWrapper>
            <CardContent>
              <CardIcon>
                <Ionicons
                  name="ios-heart-empty"
                  size={18}
                  color={colors.black}
                />
              </CardIcon>
              <CardDetails title="Following" count={user.following} />
            </CardContent>

            {/* Followers */}
            <CardContent>
              <CardIcon>
                <SimpleLineIcons name="people" size={18} color={colors.black} />
              </CardIcon>
              <CardDetails title="Followers" count={user.followers} />
            </CardContent>
          </CardContentWrapper>
          <CardButton
            title="Get Followers"
            color={colors.green}
            handleOnPress={() => {
              navigation.navigate('Followers list', { username });
            }}
          />
        </Card>

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
