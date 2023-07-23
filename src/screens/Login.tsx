
import React from 'react';
import AuthForm from '../components/AuthForm';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/UserAction';
import { RootStackParamList } from '../navigators/MyStack';


const Login = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state: RootState) => state.USERS);
    

    React.useEffect(() => {
        if (authState.authSuccess) {
            navigation.navigate('Home');
        }
    }, [authState.authSuccess, navigation]);

    const handleLogin = (formData: Record<string, string>) => {
        const { Username, Password } = formData;
        dispatch(
            login({
                // username: Email,
                username: Username,
                password: Password,
                longitude: 0.32444,
                latitude: 0.314444
            }) as any
        );
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