import React from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Banner from '../components/Banner';
import FormInput from '../components/FormInput';
import colors from '../constants/colors';
import * as appUserActions from '../redux/actions/appUserActions';
import * as followerActions from '../redux/actions/followerActions';

const Home = ({ actions, navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Banner />
            <FormInput actions={actions} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadFollowers: bindActionCreators(
        followerActions.loadFollowers,
        dispatch,
      ),
      createAppUser: bindActionCreators(appUserActions.createAppUser, dispatch),
    },
  };
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default connect(null, mapDispatchToProps)(Home);
