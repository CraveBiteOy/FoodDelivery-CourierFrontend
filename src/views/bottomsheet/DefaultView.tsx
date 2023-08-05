import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {getAuthenticatedCourier, updateCourierStatus } from '../../store/actions/CourierAction';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigators/MyStack';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { closeSocket, setupSocket } from '../../utils/setupSocket';
import { Courier, CourierStatus } from '../../model/CourierModel';

type DefaultViewProps = {
  courier: Courier;
  isCourierError: boolean;
};
  const DefaultView = ({ courier, isCourierError }: DefaultViewProps) => {
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  //function to load the authenticated courier
  const loadAuthCourier = useCallback(async () => {
    dispatch(getAuthenticatedCourier() as any);
  }, []);

  useEffect(() => {
    loadAuthCourier();
  }, []);
  
  //check if the courier is new to the system or not
  useEffect(() => {
    if (isCourierError) {
        console.log(isCourierError);
        navigation.navigate('Transportation');
      }
  }
  , []);

  const handleOnPress = async () => {
     if (courier !== null) {
      if (isOnline) {
        await dispatch(updateCourierStatus(CourierStatus.OFFLINE) as any);
        closeSocket();
      } else {
        await dispatch(updateCourierStatus(CourierStatus.ONLINE) as any);
        await setupSocket(courier.id, dispatch);
      }
       setIsOnline(!isOnline);
       
     }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isOnline ? 'You are online!' : 'You are offline!'}</Text>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>{isOnline ? 'Stop' : 'Go'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontWeight: 'bold',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DefaultView;
