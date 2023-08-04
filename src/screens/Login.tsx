
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { login } from '../store/actions/UserAction';
import { RootStackParamList } from '../navigators/MyStack';
import { getLocation } from '../utils/location';

const Login = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogin = async (formData: Record<string, string>) => {
        const { Username, Password } = formData;
        const location = await getLocation();

        if (location) {
            const { latitude, longitude } = location;
            dispatch(
                login({
                    username: Username,
                    password: Password,
                    longitude,
                    latitude
                    // latitude: 65.0128871,
                    // longitude: 25.4666667,


                },
                    navigation
                ) as any
            );


        } else {
            console.log('error getting location');
        }
    };

    const handleSignupPrompt = () => {
        navigation.navigate('Signup');

    };

    const loginFields = [
        { label: 'Username', fieldName: 'Username' },
        { label: 'Password', fieldName: 'Password' },
    ]

    return (
        <AuthForm
            onSubmit={handleLogin}
            buttonText="Log In"
            promptText="Don't have an account?"
            PromptActionText="Sign Up"
            onPromptActionPress={handleSignupPrompt}
            fields={loginFields}
        />
    )


}

export default Login;