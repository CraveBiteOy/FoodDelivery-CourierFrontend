
import React, { useEffect } from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../store/actions/UserAction';
import { Text } from 'react-native';


const Signup = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state : RootState) => state.USERS);
    
     useEffect(() => {
    if (authState.authSuccess) {
      navigation.navigate('Login');
    }
  }, [authState.authSuccess, navigation]);

  const handleSignup = (formData: Record<string, string>) => {
  const { Username, Surename, Email, Password } = formData;
  dispatch(
    Register({
      username: Email,
      firstname: Username,
      surename: Surename,
      password: Password,
    }) as any
  );
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
    <>
         {authState.authError && <Text>{authState.message}</Text>}
        <AuthForm
            onSubmit={handleSignup}
            buttonText="Sign up"
            promptText="Already have an account?"
            PromptActionText="Log In"
            onPromptActionPress={handleLoginPrompt}
            fields={signupFields}
            />
    </>
    )

  
}

export default Signup;