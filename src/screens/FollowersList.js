/* eslint-disable import/no-extraneous-dependencies */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFollowers, getLastPage } from '../api';
import NoFollowers from '../components/NoFollowers';
import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import * as followerActions from '../redux/actions/followerActions';
import { followersUtil, formatGridData, truncateText } from '../util';

const NUM_OF_COLUMNS = 3;
const ITEM_HEIGHT = Dimensions.get('window').width / NUM_OF_COLUMNS;

const Item = ({ login, avatarUrl, navigation, clearSearch }) => {
  const { setUserLogin } = useContext(FollowersContext);

  return (
    <TouchableOpacity
      onPress={() => {
        setUserLogin(login);
        clearSearch();
        navigation.navigate('Profile');
      }}
    >
      <View style={styles.item}>
        <Image style={styles.image} source={{ uri: avatarUrl }} />
        <Text style={styles.textContent}>
          {login ? truncateText(login) : ''}
        </Text>
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
  const [searchInput, setSearchInput] = useState('');
  const [followersList, setFollowersList] = useState(followers);
  const [filterList, setFilterList] = useState([]);
  const [isTextInFocus, setTextInFocus] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { username } = route.params;
      setProfileUserName(username);
    }
  }, [route]);

  useEffect(() => {
    if (profileUserName.length > 0) {
      setIsNewFollowersLoading(true);
      setIsLoading(false);
      setIsListEnd(false);
      setPage(2);
      actions
        .loadFollowers(profileUserName)
        .then(() => setIsNewFollowersLoading(false))
        .catch((error) => {
          setIsNewFollowersLoading(false);
          console.log(error);
        });
    }
  }, [profileUserName, actions]);

  useEffect(() => {
    const username =
      profileUserName.length > 0 ? profileUserName : appUser.username;
    getLastPage(username).then((lastPage) => {
      followersUtil.getAll(username, lastPage).then((data) => {
        const allFollowers = [].concat(...data);
        setFilterList(allFollowers);
      });
    });
  }, [appUser, profileUserName]);

  useEffect(() => {
    if (searchInput.length > 0) {
      const newList = followersUtil.filter(filterList, searchInput);
      setFollowersList(newList);
    } else {
      setFollowersList(followers);
    }
  }, [followers, searchInput, filterList]);

  const clearSearchInput = () => {
    setSearchInput('');
  };

  const renderItem = ({ item }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.emptyView]} />;
    }

    return (
      <Item
        login={item.login}
        avatarUrl={item.avatar_url}
        clearSearch={clearSearchInput}
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
        const newFollowers =
          profileUserName.length > 0
            ? await fetchFollowers(profileUserName, page)
            : await fetchFollowers(appUser.username, page);

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
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <Text style={styles.appUserName}>
                    {profileUserName.length > 0
                      ? profileUserName
                      : appUser.username}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.searchInputWrapper}>
                <Ionicons name="ios-search" size={24} color={colors.darkGray} />
                <TextInput
                  style={styles.searchInput}
                  value={searchInput}
                  onChangeText={(value) => setSearchInput(value)}
                  onFocus={() => setTextInFocus(true)}
                  onBlur={() => setTextInFocus(false)}
                  placeholder="Search for a username"
                  placeholderTextColor={colors.darkGray}
                />
                {isTextInFocus ? (
                  <TouchableOpacity onPress={clearSearchInput}>
                    <MaterialIcons
                      name="cancel"
                      size={24}
                      color={colors.darkGray}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <FlatList
                data={formatGridData(followersList, NUM_OF_COLUMNS)}
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
    backgroundColor: colors.white,
  },
  searchInputWrapper: {
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: colors.black,
    fontSize: 16,
  },
  appUserName: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 28,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 5,
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
