import React, { useEffect, useState } from 'react';
import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import colors from '../constants/colors';

const CustomAlert = ({ title, message, buttonText, isVisible, onCancel }) => {
  const [statusBgColor, setStatusBgColor] = useState(colors.white);

  useEffect(() => {
    if (isVisible) {
      setStatusBgColor(colors.modalBgColor);
    } else {
      setStatusBgColor(colors.white);
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={statusBgColor} barStyle="dark-content" />
      <Modal animationType="fade" transparent visible={isVisible}>
        <View style={{ ...styles.container, ...styles.modalContainer }}>
          <View style={styles.modalView}>
            <Text style={styles.alertTitle}>{title}</Text>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.alertBtnWrapper}>
              <TouchableOpacity
                style={styles.alertBtn}
                onPress={() => onCancel()}
              >
                <Text style={styles.alertBtnText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.modalBgColor,
  },
  modalView: {
    width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  alertTitle: {
    color: colors.black,
    fontSize: 22,
    fontWeight: '700',
  },
  alertMessage: {
    color: colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },
  alertBtnWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  alertBtn: {
    backgroundColor: colors.default600Red,
    borderRadius: 8,
    width: '100%',
    paddingVertical: 10,
    elevation: 2,
  },
  alertBtnText: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
