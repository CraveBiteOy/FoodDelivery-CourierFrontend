
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { getLocation } from '../../utils/location';
import { Order, OrderStatus } from '../../model/OrderModel';
import CountdownTimer from '../../components/CountdownTimer';
import { Courier } from '../../model/CourierModel';
import { ThemeType, darkTheme, useTheme } from '../../styles/theme';
import {darkMapStyle} from '../../constants/darkMapStyle';


const OULU_LATITUDE = 65.014167;
const OULU_LONGITUDE = 25.471944;


type MapProps = {
  activeOrder: Order;
  courier: Courier;

}
const Map = ({ activeOrder, courier }: MapProps) => {

  const [region, setRegion] = useState({
    latitude: OULU_LATITUDE,
    longitude: OULU_LONGITUDE,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const { theme } = useTheme();
  const styles = getStyles(theme);

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

  console.log('activeOrder', activeOrder.status);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        customMapStyle={theme === darkTheme ? darkMapStyle : []}>
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
        {activeOrder.status ===  OrderStatus.READY  && activeOrder.restaurant && (
            <Marker
              key="restaurantMarker"
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
              <CountdownTimer
                key={activeOrder.id}
                duration={activeOrder?.pickedupTime * 60}
                timeFormat='minutes' />
          </View>
          <Image
            source={require('../../assets/restaurant.png')}
            style={{ width: 35, height: 49 }}
          />
        </Marker>
        )}
         {activeOrder.status === OrderStatus.PICKED_UP && activeOrder.customer && (
        <Marker
          key="customerMarker"
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
              <CountdownTimer
                key={activeOrder.id}
                duration={activeOrder?.pickedupTime * 60}
                timeFormat='minutes' />
        </View>
        <Image
          source={require('../../assets/customer.png')}
          style={{ width: 35, height: 49 }}
        />
      </Marker>
        )}
      </MapView>
    </View>
  );
};
  

  const getStyles = (theme: ThemeType) => StyleSheet.create({
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
    color:theme.color,
    fontWeight: 'bold',
     borderRadius: 10,
    borderWidth: 1.5,
    borderColor: 'orange',
    backgroundColor: theme.primary,
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

// export default Map;
export default React.memo(Map);
