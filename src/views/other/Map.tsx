import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { getLocation } from '../../utils/location';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CustomMarker from '../../components/CustomMarker';
import { OrderStatus } from '../../model/CourierModel';

const OULU_LATITUDE = 65.014167;
const OULU_LONGITUDE = 25.471944;

const Map = () => {

  const { activeOrder } = useSelector((state: RootState) => state.ORDERS);

  const [region, setRegion] = useState({
    latitude: OULU_LATITUDE,
    longitude: OULU_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getCurrentLocation = async () => {
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
    };
    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="My Location"
          description="This is my current location"
        />
        {activeOrder && (
          <>
            <Marker
              coordinate={{
                latitude: activeOrder?.restaurant?.latitude,
                longitude: activeOrder?.restaurant?.longitude,
              }}
              title="Restaurant Location"
              description={activeOrder?.restaurant?.name}
            />
            {activeOrder?.status === OrderStatus.ACCEPTED && (
              <CustomMarker time={activeOrder?.pickupTime} />
            )}
            <Marker
              coordinate={{
                latitude: activeOrder?.customer?.latitude,
                longitude: activeOrder?.customer?.longitude,
              }}
              title="Customer Location"
              description={activeOrder?.customer?.name}
            />
            {activeOrder?.status === OrderStatus.PICKED_UP && (
              <CustomMarker time={activeOrder?.dropoffTime} />
            )}
          </>
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
});

export default Map;
