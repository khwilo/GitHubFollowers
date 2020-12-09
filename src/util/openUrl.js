import { Alert, Linking } from 'react-native';

const openUrl = async (url) => {
  try {
    return Linking.openURL(url);
  } catch (e) {
    Alert.alert('Sorry, something went wrong.', 'Please try again later');
  }
  return null;
};

export default openUrl;
