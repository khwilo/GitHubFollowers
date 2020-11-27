/* eslint-disable import/no-extraneous-dependencies */
import { Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import {
  Image,
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
import * as userActions from '../redux/actions/userActions';

const Profile = ({ actions, navigation, user }) => {
  const { userLogin: username } = useContext(FollowersContext);

  useEffect(() => {
    actions.loadUser(username).catch((err) => {
      console.log(err);
    });
  }, []);

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
          <Text style={styles.bioDetails}>{user.bio}</Text>
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
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>Public Repos</Text>
                <Text style={styles.cardText}>{user.public_repos}</Text>
              </View>
            </View>

            {/* Gists */}
            <View style={styles.cardContent}>
              <View style={[styles.cardContentIcon, styles.iconBars]}>
                <Feather name="bar-chart-2" size={18} color={colors.black} />
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>Public Gists</Text>
                <Text style={styles.cardText}>{user.public_gists}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={[styles.btn, styles.btnProfile]}>
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
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>Following</Text>
                <Text style={styles.cardText}>{user.following}</Text>
              </View>
            </View>

            {/* Followers */}
            <View style={styles.cardContent}>
              <View style={styles.cardContentIcon}>
                <SimpleLineIcons name="people" size={18} color={colors.black} />
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardText}>Followers</Text>
                <Text style={styles.cardText}>{user.followers}</Text>
              </View>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadUser: bindActionCreators(userActions.loadUser, dispatch),
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
    color: colors.gray,
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
  cardDetails: {
    alignItems: 'center',
  },
  cardText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
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
