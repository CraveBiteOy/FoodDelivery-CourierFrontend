import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getAuthenticatedCourier, updateCourierStatus } from '../store/actions/CourierAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { setupSocket } from '../utils/setupSocket';
import { CourierStatus } from '../model/CourierModel';

const Sheet = () => {

  const dispatch = useDispatch();
  const { courier } = useSelector((state: RootState) => state.COURIERS);

  //function to load the authentificated courier
  const loadAuthCourier = useCallback(async () => {
    dispatch(getAuthenticatedCourier() as any);
      }, []);

  useEffect(() => {
    loadAuthCourier();
  
  }, []);
  
  const handleOnPress = async () => {
    console.log(courier);

    if (courier !== null) {
      await dispatch(updateCourierStatus(CourierStatus.ONLINE) as any)
      setupSocket(courier.id, dispatch);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You are offline</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleOnPress}>Go</Text>
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

export default Sheet;
