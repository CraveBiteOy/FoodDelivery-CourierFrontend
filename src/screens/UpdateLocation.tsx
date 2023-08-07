import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { OrderStatus } from '../model/OrderModel';
import { updateCourierLocationBeforePickup } from '../store/actions/CourierAction';
import { updateCourierAndOrderLocationAfterPickup } from '../store/actions/OrderAction';
import { ThemeType, useTheme } from "../styles/theme";
 


const UpdateLocation = () => {
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { activeOrder } = useSelector((state: RootState) => state.ORDERS);
    const { theme } = useTheme();
    const styles = getStyles(theme);
    let orderId = activeOrder?.id;
    let orderStatus = activeOrder?.status;

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (orderStatus === OrderStatus.PICKED_UP) {
            console.log("location form submitted!");
            console.log("after pickup");
            dispatch(updateCourierAndOrderLocationAfterPickup(orderId, Number(longitude), Number(latitude)) as any);
        }
        else {
             console.log("before pickup");
            dispatch(updateCourierLocationBeforePickup( Number(longitude), Number(latitude)) as any);
        }

        navigation.navigate('Home')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Do you want to update your location?</Text>
            <Text style={styles.text}>
                Update your location to be able to pick up or complete the order. This screen is done for testing purposes.
            </Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Latitude:</Text>
                <TextInput
                    style={styles.input}
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Longitude:</Text>
                <TextInput
                    style={styles.input}
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="numeric"
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonLabel}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

    const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    header: {
        color: theme.color,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    text: {
        color: theme.color,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 40,
        marginHorizontal: 20,
    },
    inputContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    label: {
        color: theme.color,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    input: {
        marginLeft: 10,
        paddingVertical: 5,
        borderRadius: 5,
        height: 40,
        borderWidth: 1,
        borderColor: theme.color,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor:theme.primary,
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',
    },
    buttonLabel: {
        color: theme.buttonLabel,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdateLocation;
