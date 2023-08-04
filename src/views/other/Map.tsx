
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { getLocation } from '../../utils/location';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { OrderStatus } from '../../model/OrderModel';
// import {sampleData} from '../../data/smapleData';
import CountdownTimer from '../../components/CountdownTimer';


const OULU_LATITUDE = 65.014167;
const OULU_LONGITUDE = 25.471944;

const Map = () => {
  const { courier } = useSelector((state: RootState) => state.COURIERS);
  const { activeOrder } = useSelector((state: RootState) => state.ORDERS);

  const [region, setRegion] = useState({
    latitude: OULU_LATITUDE,
    longitude: OULU_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
      if (!courier?.user?.latitude || !courier?.user?.longitude) {
        const location = await getLocation();
        if (location) {
          const { latitude, longitude } = location;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } else {
        setRegion({
          latitude: courier.user.latitude,
          longitude: courier.user.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    };
    getCurrentLocation();
  }, [courier]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Courier Location"
          description="This is the courier's current location">
          <Image
            source={require('../../assets/bike_orange.png')}
            style={{ width: 35, height: 35 }}
          />
        </Marker>
        {activeOrder.status === OrderStatus.ACCEPTED && activeOrder.restaurant && (
            <Marker
              coordinate={{
                latitude: activeOrder?.restaurant?.latitude,
                longitude: activeOrder?.restaurant?.longitude,
              }}
              title="Restaurant Location"
              description={activeOrder?.restaurant?.name}
              style={styles.orangeMarker}
            >
          <View style={styles.markerView}>
            <Text style={styles.markerText}>Pick up </Text>
            <CountdownTimer duration={activeOrder?.pickedupTime * 60} timeFormat='minutes' />
          </View>
          <Image
            source={require('../../assets/orange_marker.png')}
            style={{ width: 30, height: 49 }}
          />
        </Marker>
        )}
         {activeOrder.status === OrderStatus.PICKED_UP && activeOrder.customer && (
        <Marker
          coordinate={{
            latitude: activeOrder?.customer?.user?.latitude,
            longitude: activeOrder?.customer?.user?.longitude,
          }}
          title="Customer Location"
          description={activeOrder?.customer?.user?.firstname}
          style={styles.orangeMarker}
        >
          <View style={styles.markerView}>
          <Text style={styles.markerText}>Drop off </Text>
          <CountdownTimer duration={activeOrder?.dropOffTime * 60} timeFormat='minutes' />
        </View>
        <Image
          source={require('../../assets/orange_marker.png')}
          style={{ width: 30, height: 49 }}
        />
      </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  markerText: {
    color: 'black',
    fontWeight: 'bold',
     borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'orange',
    backgroundColor: 'white',
    padding: 5,
     marginBottom: 1,
  },
  orangeMarker: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
