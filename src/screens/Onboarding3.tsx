import React from "react";
import Onboarding from "../components/Onboarding";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/MyStack";

const Onboarding3 = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    
    //prevent the user from going back to the previous screen
    React.useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
    }, [navigation]);

    return (
        <Onboarding
            header="Ready?"
            text="Ready to kickstart your courier journey?
                  Sign up or log in now to get the fun started."
            buttonLabel="Sign up"
            buttonLabel2="Log In"
            // onPress={() => navigation.navigate('Signup')}
            // onPress2={() => navigation.navigate('Login')}
            onPress={() => navigation.navigate('Home')}
            onPress2={() => navigation.navigate('Home')}
        />
    );

}

export default Onboarding3;