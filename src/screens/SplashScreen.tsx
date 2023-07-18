import React, { useEffect } from 'react'; 
import { RootStackParamList } from '../navigators/MyStack'
import { View, StyleSheet, Animated } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
 
const SplashScreen = () => { 


  const logoOpacity = new Animated.Value(0); 
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

 

  useEffect(() => { 

    startAnimation(); 

    setTimeout(() => { 

      navigation.navigate('Onboarding1')

    }, 3000); 

  }, []); 

 

  const startAnimation = () => { 

    Animated.timing(logoOpacity, { 

      toValue: 1, 

      duration: 1000, 

      useNativeDriver: true, 

    }).start(); 

  }; 

 

  return ( 

    <View style={styles.container}> 

      <Animated.Image source={require('../assets/logo_courier.png')}
        style={[styles.logo, { opacity: logoOpacity }]} /> 

    </View> 

  ); 

}; 

 

const styles = StyleSheet.create({ 

  container: { 

    flex: 1, 

    alignItems: 'center', 

    justifyContent: 'center', 

    backgroundColor: '#fff', 

  }, 

  logo: { 

    width: 180, 

    height: 115, 

  }, 

}); 

 

export default SplashScreen; 