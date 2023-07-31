import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuthenticatedCourier, updateCourierStatus } from '../../store/actions/CourierAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../store/store';
import { setupSocket } from '../../utils/setupSocket';
import { CourierStatus } from '../../model/CourierModel';

const DefaultView = () => {
  const [isOnline, setIsOnline] = useState(false);
  const dispatch = useDispatch();
  const { courier } = useSelector((state: RootState) => state.COURIERS);

  //function to load the authenticated courier
  const loadAuthCourier = useCallback(async () => {
    dispatch(getAuthenticatedCourier() as any);
  }, []);

  useEffect(() => {
    loadAuthCourier();
  }, []);

  const handleOnPress = async () => {
     if (courier !== null) {
      if (isOnline) {
        await dispatch(updateCourierStatus(CourierStatus.OFFLINE) as any);
      } else {
        await dispatch(updateCourierStatus(CourierStatus.ONLINE) as any);
        setupSocket(courier.id, dispatch);
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
