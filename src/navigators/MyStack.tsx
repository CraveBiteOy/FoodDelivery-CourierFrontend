
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import Onboarding1 from '../screens/Onboarding1';
import Onboarding2 from '../screens/Onboarding2';
import Onboarding3 from '../screens/Onboarding3';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Profile from '../screens/Profile';
import About from '../screens/About';
import TransportationMode from '../screens/TransportationMode';

import React from 'react';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding1: undefined;
    Onboarding2: undefined;
    Onboarding3: undefined;
    Signup: undefined;
    Login: undefined;
    Home: undefined;
    Profile: undefined;
    About: undefined;
    Transportation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding1" component={Onboarding1} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding2" component={Onboarding2} options={{ headerShown: false }} />
                <Stack.Screen name="Onboarding3" component={Onboarding3} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="About" component={About} />
                <Stack.Screen name="Transportation" component={TransportationMode} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyStack;