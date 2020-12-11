import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../constants/colors';
import globalStyles from '../styles/global';
import CustomAlert from './CustomAlert';

const FormInput = ({ actions, navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertButtonText, setAlertButtonText] = useState('');

  const handleOnCancelAlert = () => {
    setIsAlertVisible(false);
  };

  const getFollowers = async () => {
    setIsLoading(true);

    if (username.length === 0) {
      setIsAlertVisible(true);
      setAlertTitle('Empty Username');
      setAlertMessage(
        'Please enter a username. We need to know who to look for 😀.',
      );
      setAlertButtonText('Ok');
      setIsLoading(false);
      setIsDataFetched(false);
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
          setIsAlertVisible(true);
          setAlertTitle('User not found');
          setAlertMessage('Try searching for another user 😔.');
          setAlertButtonText('Ok');
        }
      } catch (error) {
        setIsDataFetched(false);
        setIsLoading(false);
        setUsername('');
        setIsAlertVisible(true);
        setAlertTitle('Loading followers failed');
        setAlertMessage(error);
        setAlertButtonText('Ok');
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
        title={alertTitle}
        message={alertMessage}
        buttonText={alertButtonText}
        isVisible={isAlertVisible}
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
