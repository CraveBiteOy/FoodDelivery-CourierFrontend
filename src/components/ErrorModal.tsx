import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ErrorProps = {
  message: string;

};

const ErrorModal = ({ message }: ErrorProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [modalY] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.timing(modalY, {
      toValue: modalVisible ? 20 : -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // setTimeout(() => setModalVisible(false), 10000);
    if (modalVisible) {
      setTimeout(() => setModalVisible(false), 3000); 
    }
  }, [modalVisible]);

  return (
    <Animated.View style={[styles.modalContainer, { transform: [{ translateY: modalY }] }]}>
      <View style={styles.modalContent}>
        <Icon name="times-circle-o" size={24} color="#ff6347" />
        <Text style={styles.modalText} numberOfLines={2} ellipsizeMode="tail">{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    width: "90%",
    backgroundColor: '#ffb6c1',
    paddingVertical: 20,
    marginHorizontal: 20,
    zIndex: 999,
    borderRadius: 10,
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalText: {
    marginLeft: 10,
    fontSize: 12,
    color: 'black',
  },
});


export default ErrorModal;
