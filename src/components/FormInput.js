import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '../constants/colors';
import globalStyles from '../styles/global';

const FormInput = ({ actions, navigation }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const getFollowers = async () => {
    setIsLoading(true);

    if (username.length === 0) {
      Alert.alert(
        'Empty Username',
        'Please enter a username. We need to know who to look for 😀.',
      );
      setIsLoading(false);
      setIsDataFetched(false);
    } else {
      try {
        const data = await actions.loadFollowers(username);
        if (Array.isArray(data)) {
          setIsDataFetched(true);
          setIsLoading(false);
          setUsername('');
        } else {
          setIsDataFetched(false);
          setIsLoading(false);
          setUsername('');
          Alert.alert('User not found', 'Try searching for another user 😔.');
        }
      } catch (error) {
        setIsDataFetched(false);
        setIsLoading(false);
        setUsername('');
        Alert.alert('Loading followers failed', error);
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
