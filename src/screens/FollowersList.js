import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFollowers } from '../api';
import NoFollowers from '../components/NoFollowers';
import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as followerActions from '../redux/actions/followerActions';
import formatGridData from '../util/formatGridData';
import truncateText from '../util/truncateText';

const NUM_OF_COLUMNS = 3;
const ITEM_HEIGHT = Dimensions.get('window').width / NUM_OF_COLUMNS;

const Item = ({ login, avatarUrl, navigation }) => {
  const { setUserLogin } = useContext(FollowersContext);

  return (
    <TouchableOpacity
      onPress={() => {
        setUserLogin(login);
        navigation.navigate('Profile');
      }}
    >
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: avatarUrl }} />
        <Text style={styles.textContent}>{truncateText(login)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const FollowersList = ({ actions, appUser, followers, navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListEnd, setIsListEnd] = useState(false);
  const [page, setPage] = useState(2);
  const [profileUserName, setProfileUserName] = useState('');
  const [isNewFollowersLoading, setIsNewFollowersLoading] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { username } = route.params;
      setProfileUserName(username);
    }
  }, [route]);

  useEffect(() => {
    if (profileUserName.length > 0) {
      setIsNewFollowersLoading(true);
      actions
        .loadFollowers(profileUserName)
        .then(() => setIsNewFollowersLoading(false))
        .catch((error) => {
          setIsNewFollowersLoading(false);
          console.log(error);
        });
    }
  }, [profileUserName, actions]);

  const renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.emptyView]} />;
    }

    return (
      <Item
        login={item.login}
        avatarUrl={item.avatar_url}
        navigation={navigation}
      />
    );
  };

  const renderListFooter = () => (
    <View style={styles.listFooter}>
      {isLoading ? (
        <ActivityIndicator
          color={colors.green}
          style={styles.listFooterSpinner}
        />
      ) : null}
    </View>
  );

  const loadMoreResults = async () => {
    if (!isLoading && !isListEnd) {
      setIsLoading(true);

      try {
        const newFollowers = await fetchFollowers(appUser.username, page);

        if (newFollowers.length === 0) {
          /*
           * You have reached the end of the list / there newFollowers' list is empty,
           * therefore set isListEnd and isLoading values to true to prevent further request
           */
          setIsListEnd(true);
          setIsLoading(false);
        } else {
          // process newly fetched followers data
          setPage(page + 1);
          // Update the Redux store
          actions.updateFollowers(newFollowers);
          // loading is now complete
          setIsLoading(false);
        }
      } catch (error) {
        console.log('LOADING ERROR: ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {followers.length === 0 ? (
        <NoFollowers />
      ) : (
        <>
          {isNewFollowersLoading ? (
            <View style={styles.screenSpinnerContainer}>
              <ActivityIndicator color={colors.green} size="large" />
            </View>
          ) : (
            <>
              <Text style={styles.appUserName}>
                {profileUserName.length > 0
                  ? profileUserName
                  : appUser.username}
              </Text>
              <FlatList
                data={formatGridData(followers, NUM_OF_COLUMNS)}
                renderItem={renderItem}
                ListFooterComponent={renderListFooter}
                keyExtractor={(item) => String(item.id)}
                horizontal={false}
                numColumns={NUM_OF_COLUMNS}
                onEndReachedThreshold={0.5}
                onEndReached={loadMoreResults}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    appUser: state.appUser,
    followers: state.followers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadFollowers: bindActionCreators(
        followerActions.loadFollowers,
        dispatch,
      ),
      updateFollowers: bindActionCreators(
        followerActions.updateFollowers,
        dispatch,
      ),
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appUserName: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 28,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 12,
  },
  emptyView: {
    backgroundColor: colors.transparent,
  },
  listFooter: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterSpinner: {
    margin: 5,
  },
  screenSpinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowersList);
