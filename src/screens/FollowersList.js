import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';

import NoFollowers from '../components/NoFollowers';
import colors from '../constants/colors';
import formatGridData from '../util/formatGridData';
import truncateText from '../util/truncateText';

const NUM_OF_COLUMNS = 3;
const ITEM_HEIGHT = Dimensions.get('window').width / NUM_OF_COLUMNS;

const Item = ({ login, avatarUrl, navigation }) => {
  // const { setUserLogin } = useContext(FollowersContext);

  return (
    <TouchableOpacity
      onPress={() => {
        // setUserLogin(login);
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

const FollowersList = ({ navigation, followers }) => {
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

  return (
    <View style={styles.container}>
      {followers.length === 0 ? (
        <NoFollowers />
      ) : (
        <FlatList
          data={formatGridData(followers, NUM_OF_COLUMNS)}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          horizontal={false}
          numColumns={NUM_OF_COLUMNS}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    followers: state.followers,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default connect(mapStateToProps)(FollowersList);
