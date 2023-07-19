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
            header="Deliver and Earn Big"
            text="Unlock lucrative oppurtunities.
                  Join now and start earning money
                  with our rewarding app.
                  Don't miss out!"
            buttonLabel="Next"
            onPress={() => navigation.navigate('Onboarding2')}
        />
    );

}

export default Onboarding1;