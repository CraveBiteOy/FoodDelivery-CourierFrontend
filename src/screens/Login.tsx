
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';


const Login = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handleLogin = () => {
        //EMPTY NOW
    };

    const handleSignupPrompt = () => {
        navigation.navigate('Signup');     

    };

    const loginFields = [
        { label: 'Email', fieldName: 'Email' },
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