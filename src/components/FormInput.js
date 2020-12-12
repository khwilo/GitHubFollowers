import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { getRemainingRateLimit } from '../api';
import colors from '../constants/colors';
import useCustomAlert from '../hooks/useCustomAlert';
import globalStyles from '../styles/global';
import CustomAlert from './CustomAlert';

const FormInput = ({ actions, navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [alertStore, dispatchAlert] = useCustomAlert();

  const { alert } = alertStore;

  const handleOnCancelAlert = () => {
    dispatchAlert({ type: 'HIDE_ALERT' });
  };

  const getFollowers = async () => {
    setIsLoading(true);

    if (username.length === 0) {
      setIsLoading(false);
      setIsDataFetched(false);
      dispatchAlert({
        type: 'SHOW_ALERT',
        payload: {
          title: 'Empty Username',
          message:
            'Please enter a username. We need to know who to look for 😀.',
          buttonText: 'Ok',
        },
      });
    } else {
      try {
        const data = await actions.loadFollowers(username);
        if (Array.isArray(data)) {
          actions.createAppUser({ username });
          setIsDataFetched(true);
          setIsLoading(false);
          setUsername('');
        } else {
          setIsDataFetched(false);
          setIsLoading(false);
          setUsername('');
          const rate = await getRemainingRateLimit();

          if (rate.remaining > 0) {
            dispatchAlert({
              type: 'SHOW_ALERT',
              payload: {
                title: 'User not found',
                message: 'Try searching for another user 😔.',
                buttonText: 'Ok',
              },
            });
          } else {
            dispatchAlert({
              type: 'SHOW_ALERT',
              payload: {
                title: 'API Call',
                message:
                  'API rate limit exceeded. Please wait for at least an hour to make another call.',
                buttonText: 'Ok',
              },
            });
          }
        }
      } catch (error) {
        setIsDataFetched(false);
        setIsLoading(false);
        setUsername('');
        dispatchAlert({
          type: 'SHOW_ALERT',
          payload: {
            title: 'Loading followers failed',
            message: error,
            buttonText: 'Ok',
          },
        });
      }
    }
  };

  useEffect(() => {
    if (!isLoading && isDataFetched) {
      navigation.navigate('Followers list');
    }
  }, [isDataFetched, isLoading, navigation]);

  return (
    <KeyboardAvoidingView style={styles.formInput}>
      <CustomAlert
        title={alert.title}
        message={alert.message}
        buttonText={alert.buttonText}
        isVisible={alert.isVisible}
        onCancel={() => handleOnCancelAlert()}
      />
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
