import React, { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../../constants/colors';
import { globalStyles } from '../../styles/global';

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
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
    paddingBottom: 40,
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
    borderRadius: 10,
  },
  submitBtnText: {
    color: colors.white,
  },
});

const Home = () => {
  const [username, setUsername] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <AntDesign name='github' size={100} />
              </View>
              <Text style={globalStyles.logoText}>GitHub</Text>
              <Text style={globalStyles.titleText}>Followers</Text>
            </View>
            <View style={styles.formInput}>
              <TextInput
                style={styles.textInput}
                onChange={(value) => console.log('username: ', value)}
                value={username}
                placeholder='Enter Username'
                placeholderTextColor={colors.white}
              />
              <TouchableHighlight style={styles.submitBtn}>
                <Text style={[globalStyles.buttonText, styles.submitBtnText]}>
                  Get Followers
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Home;
