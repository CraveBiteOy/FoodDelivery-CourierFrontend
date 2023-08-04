
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/UserAction';
import { getLocation } from '../utils/location';



const Signup = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state : RootState) => state.USERS);

    const handleSignup = async (formData: Record<string, string>) => {
    const { Username, Surename, Email, Password } = formData;
    const location = await getLocation();
  
    if (location) {
      const { latitude, longitude } = location;
      dispatch(
        register({
          username: Username,
          firstname: Username,
          surename: Surename,
          password: Password,
          longitude,
          latitude
        },
            navigation
        ) as any
      );
    } else {
      console.log('error');
      }
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
