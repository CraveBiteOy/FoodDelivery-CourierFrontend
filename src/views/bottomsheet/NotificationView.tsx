import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CountdownTimer from '../../components/CountdownTimer';
import { useDispatch, useSelector } from 'react-redux';
import { acceptOrder, getOrderItemsById, rejectOrder, removeOrder } from '../../store/actions/OrderAction';
import { Order } from '../../model/OrderModel';
import {ThemeType, useTheme} from "../../styles/theme"


type NotificationViewProps = {
  activeOrder: Order;
  onComplete: () => void;
};

const NotificationView = ({ activeOrder, onComplete }: NotificationViewProps) => {

    const dispatch = useDispatch();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    function handleComplete(): void {
        onComplete();
        console.log('completed');
        dispatch(rejectOrder(activeOrder.id) as any);
        dispatch(removeOrder() as any)
        

    }

    const acceptOrderClicked = () => {
        console.log("Accepted");
        dispatch(acceptOrder(activeOrder.id) as any);
        dispatch(getOrderItemsById(activeOrder?.id) as any);
    }

    const rejectOrderClicked = () => {
        console.log("Rejected");
        dispatch(rejectOrder(activeOrder.id) as any);
    }



    return (
        <View style={styles.container}>
            <View style={styles.first_row}>
                <Text style={styles.text}>New Order!</Text>
                <View style={styles.circle}>
                    <CountdownTimer duration={30} onComplete={handleComplete} timeFormat='seconds' />
                </View>
            </View>
            <View style={styles.second_row}>
                <View style={styles.first_column}>
                    <View style={styles.sub_container}>
                        <Text style={styles.icon}>📍</Text>
                        <View
                            style={styles.dottedLine}>
                        </View>
                        <Text style={styles.icon}>📍</Text>
                    </View>
                    <View style={styles.trip_info}>
                        <View>
                            <Text style={styles.from}>from</Text>
                            {/* <Text style={styles.address}>address</Text> */}
                            <Text style={styles.address}>{activeOrder?.restaurant?.address}</Text>
                        </View>
                        <View>
                            <Text style={styles.to}>to</Text>
                            <Text style={styles.address}>{activeOrder?.address}</Text>
                        </View>

                     </View>
                </View>
                <View style={styles.second_column}>
                        <View>
                            <Text style={styles.n_title}>price</Text>
                        <Text style={styles.price}>{activeOrder?.deliveryFee.toFixed(0)} €</Text>
                        </View>
                        <View>
                            <Text style={styles.n_title}>total km</Text>
                        <Text style={styles.distance}>{activeOrder?.d2Distance.toFixed(0)} km</Text>
                        </View>
                </View>
            </View>
            <View style={styles.third_row}>
                <TouchableOpacity style={styles.button} onPress= {acceptOrderClicked}>
                    <Text style={styles.button_text}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress= {rejectOrderClicked}>
                    <Text style={styles.button_text}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        // backgroundColor: theme.backgroundColor,
    },
    first_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    text: {
        color: theme.color,
        fontWeight: 'bold',
        fontSize: 20,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    second_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    first_column: {
        flex: 0.6,
        borderRightWidth: 1,
        borderRightColor: 'grey',
        flexDirection: 'row',
    },
    second_column: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    n_title: {
        color: theme.primary,
        fontWeight: 'bold',
    },
    sub_container: {
        flexDirection: 'column',
    },
    icon: {
        marginHorizontal: 10,
        paddingVertical: 16,
    },
     dottedLine: {

         width: 1,
         height: 100,
         flexDirection: 'column',
         borderWidth: 1,
         borderStyle: 'dashed',
         marginHorizontal: 16,
         borderColor: 'grey',
    },
    trip_info: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    from: {
        color: theme.primary,
        fontWeight: 'bold',
        marginTop: 10,
       
    },
    to: {
        color: theme.primary,
        fontWeight: 'bold',
    },
    address: {
        color: theme.color,
        fontWeight: 'bold',
         maxWidth: 150
    },
    price: {
        color: theme.color,
        fontWeight: 'bold',
    },
    distance: {
         color: theme.color,
        fontWeight: 'bold',
    },
    third_row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 40,
    },
    button: {
        width: 100,
        height: 40,
        borderRadius: 25,
        backgroundColor: theme.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_text: {
        color: theme.buttonLabel,
        fontWeight: 'bold',
    },
});

export default NotificationView;

