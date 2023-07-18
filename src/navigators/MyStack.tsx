
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import HomeTest from '../screens/HomeTest';
import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import React from 'react';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding1: undefined;
    Onboarding2: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeTest} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack;