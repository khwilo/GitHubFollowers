import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';

import colors from '../constants/colors';
import globalStyles from '../styles/global';

const screen = Dimensions.get('window');

const Home = () => {
  const [username] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <AntDesign name="github" size={100} />
              </View>
              <Text style={globalStyles.logoText}>GitHub</Text>
              <Text style={globalStyles.titleText}>Followers</Text>
            </View>
            <KeyboardAvoidingView style={styles.formInput}>
              <TextInput
                style={styles.textInput}
                onChange={(value) => console.log('username: ', value)}
                value={username}
                placeholder="Enter Username"
                placeholderTextColor={colors.white}
              />
              <TouchableHighlight style={styles.submitBtn}>
                <Text style={[globalStyles.buttonText, styles.submitBtnText]}>
                  Get Followers
                </Text>
              </TouchableHighlight>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: screen.height * 0.2,
  },
  formInput: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    backgroundColor: colors.gray,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 60,
    marginVertical: 20,
  },
  submitBtn: {
    backgroundColor: colors.green,
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  submitBtnText: {
    color: colors.white,
  },
});

export default Home;
