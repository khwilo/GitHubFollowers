import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../constants/colors';
import { FollowersContext } from '../contexts/FollowersContext';
import globalStyles from '../styles/global';

const FormInput = ({ navigation }) => {
  const {
    username,
    setUsername,
    getFollowers,
    isLoading,
    followers,
    isFetched,
  } = useContext(FollowersContext);

  useEffect(() => {
    if (isFetched && !isLoading) {
      navigation.navigate('Followers list', { followers });
    }
  }, [isFetched, isLoading, followers, navigation]);

  return (
    <KeyboardAvoidingView style={styles.formInput}>
      <TextInput
        style={[globalStyles.formControl, styles.textInput]}
        onChangeText={(value) => setUsername(value)}
        value={username}
        placeholder="Enter Username"
        placeholderTextColor={colors.white}
        autoCorrect={false}
      />
      {isLoading ? (
        <ActivityIndicator color={colors.green} size="large" />
      ) : (
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => getFollowers()}
        >
          <Text
            style={[
              globalStyles.buttonText,
              globalStyles.formControl,
              styles.submitBtnText,
            ]}
          >
            Get Followers
          </Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formInput: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  textInput: {
    height: 40,
    color: colors.white,
    backgroundColor: colors.gray,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
  },
  submitBtn: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  submitBtnText: {
    color: colors.white,
  },
});

export default FormInput;
