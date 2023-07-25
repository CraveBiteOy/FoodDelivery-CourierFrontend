import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from 'react-native-geolocation-service';


export async function requestLocationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
}

export async function getLocation(): Promise<{latitude: number, longitude: number} | undefined> {
  const permissionGranted = await requestLocationPermission();
  if (!permissionGranted) {
    return undefined;
  }
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
        console.log(position);
      },
      error => {
        console.log(error.code, error.message);
        reject(error);
      },
    );
  });
}
