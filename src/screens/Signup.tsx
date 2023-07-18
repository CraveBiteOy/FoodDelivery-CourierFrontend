
import React from 'react';
import AuthForm from '../components/AuthForm';


const Signup = () => {

    const handleSignup = () => {
        //EMPTY NOW
    };

    const handleLoginPrompt = () => {
        //EMPTY NOW
    };



    const signupFields = [
        { label: 'Username', fieldName: 'Username' },
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