
import React from 'react';
import AuthForm from '../components/AuthForm';


const Login = () => {

    const handleLogin = () => {
        //EMPTY NOW
    };

    const handleSignupPrompt = () => {
        //EMPTY NOW
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