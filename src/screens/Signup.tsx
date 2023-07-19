
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';


const Signup = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const handleSignup = () => {
        //EMPTY NOW
    };

    const handleLoginPrompt = () => {
        navigation.navigate('Login');
    };



    const signupFields = [
        { label: 'Username', fieldName: 'Username' },
        { label: 'Surename', fieldName: 'Surename' },
        { label: 'Email', fieldName: 'Email' },
        { label: 'Password', fieldName: 'Password' },
        { label: 'Confirm Password', fieldName: 'Confirm Password' }

    ]

    return (
        <AuthForm
            onSubmit={handleSignup}
            buttonText="Sign up"
            promptText="Already have an account?"
            PromptActionText="Log In"
            onPromptActionPress={handleLoginPrompt}
            fields={signupFields}
        />
    )

  
}

export default Signup;