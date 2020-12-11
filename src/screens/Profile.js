/* eslint-disable import/no-extraneous-dependencies */
import { Entypo } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CustomAlert from '../components/CustomAlert';
import {
  Bio,
  ProfileHeader,
  ReposGistsView,
  UserNetworkView,
} from '../components/Profile';
import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as favoriteActions from '../redux/actions/favoriteActions';
import * as userActions from '../redux/actions/userActions';

const Profile = ({ actions, navigation, favorites, user }) => {
  const { userLogin: username } = useContext(FollowersContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtonText, setAlertButtonText] = useState('');

  const handleOnCancelAlert = () => {
    setIsAlertVisible(false);
  };

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
      setIsAlertVisible(true);
      setAlertTitle('Success');
      setAlertMessage('You have removed this user from your favorites.');
      setAlertButtonText('Ok');
    } else {
      actions.addToFavorites(user);
      setIsAlertVisible(true);
      setAlertTitle('Success');
      setAlertMessage(
        'You have successfully added this user to your favorites 🎉',
      );
      setAlertButtonText('Hooray');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <CustomAlert
          title={alertTitle}
          message={alertMessage}
          buttonText={alertButtonText}
          isVisible={isAlertVisible}
          onCancel={() => handleOnCancelAlert()}
        />

        {/* PROFILE */}
        <ProfileHeader user={user} />

        {/* BIO */}
        <Bio details={user.bio} />

        {/* Repos and Gists View */}
        <ReposGistsView user={user} />

        {/* Following and Followers  */}
        <UserNetworkView
          user={user}
          username={user.login || username}
          navigation={navigation}
        />

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
