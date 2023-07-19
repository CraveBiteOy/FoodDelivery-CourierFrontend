import React from "react";
import Onboarding from "../components/Onboarding";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigators/MyStack";

const Onboarding1 = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    
    //prevent the user from going back to the previous screen
    React.useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
        });
    }, [navigation]);

    return (
        <Onboarding
            header="Take the Lead"
            text="Embrace the freedom of being your own boss.
                  With our courier app, enjoy flxible hours and 
                  control your earnings."
            buttonLabel= "Get Started"
            onPress={() => navigation.navigate('Onboarding3')}
        />
    );

}

export default Onboarding1;