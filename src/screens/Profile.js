/* eslint-disable import/no-extraneous-dependencies */
import { Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Bio from '../components/Profile/Bio';
import Card from '../components/Profile/Card';
import CardButton from '../components/Profile/CardButton';
import CardContent from '../components/Profile/CardContent';
import CardContentWrapper from '../components/Profile/CardContentWrapper';
import CardDetails from '../components/Profile/CardDetails';
import CardIcon from '../components/Profile/CardIcon';
import ProfileHeader from '../components/Profile/Header';
import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as userActions from '../redux/actions/userActions';
import { openUrl } from '../util';

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
        <ProfileHeader user={user} />

        <Bio details={user.bio} />

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
