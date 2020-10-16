import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const FORM_CONTROL_WIDTH = width * 0.6;

const globalStyles = StyleSheet.create({
  logoText: {
    fontSize: 48,
    fontWeight: '700',
  },
  titleText: {
    fontSize: 24,
  },
  bodyText: {
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  formControl: {
    paddingHorizontal: 20,
    width: FORM_CONTROL_WIDTH,
    textAlign: 'center',
  },
});

export default globalStyles;
