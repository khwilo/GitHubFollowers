module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'react-native', 'react-hooks'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
    'react-native/react-native': true,
  },
  rules: {
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ],
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    'react-native/no-single-element-style-arrays': 2,
  },
  globals: {
    fetch: false,
  },
};
