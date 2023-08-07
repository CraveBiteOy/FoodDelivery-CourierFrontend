
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { completeOrder } from '../../store/actions/OrderAction';
import { Courier } from '../../model/CourierModel';
import { Order } from '../../model/OrderModel';
import {ThemeType, useTheme} from "../../styles/theme"

type DropOffViewProps = {
    activeOrder: Order;
    courier: Courier;
};


const DropOffView = ({ activeOrder, courier }: DropOffViewProps) => {

    const dispatch = useDispatch();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const DropOffOrder = () => {
        console.log("Dropped off");
        console.log("courier object " + JSON.stringify(activeOrder?.courier) );
        console.log("location of couier from order res " + activeOrder?.courier?.user?.latitude + " AND  " + activeOrder?.courier?.user?.longitude);
        console.log("location of couier from courier res " + courier?.user?.latitude + " AND  " + courier?.user?.longitude)
        console.log(courier)

        dispatch(completeOrder(activeOrder.id) as any);
    }

    return (
        <View style={styles.container}>
            <View style={styles.tite_container}>
                <Text style={styles.main_title}>Drop off to</Text>
                <Text style={styles.location_title}>{activeOrder?.customer?.user?.firstname}</Text>
            </View>
            <View>
                <Text style={styles.sub_header}>Address details</Text>
                <View style={styles.address}>
                     <Icon name="map-marker" size={24} color="black" />
                    <View style={styles.b_container}>
                        <Text style={styles.mini_header}>{activeOrder?.address}</Text>
                    </View>
                </View>
                <View style={styles.table}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Entrance</DataTable.Title>
                            <DataTable.Title numeric>Floor</DataTable.Title>
                            <DataTable.Title numeric>check</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            <DataTable.Cell>A</DataTable.Cell>
                            <DataTable.Cell numeric>1</DataTable.Cell>
                            <DataTable.Cell numeric>5</DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
                <View style={styles.a_container}>
                     <Icon name="info-circle" size={24} color="black" />
                    <View style={styles.b_container}>
                        <Text style={styles.mini_header}>gatecode</Text>
                        <Text>771</Text>
                    </View>
                </View>
                <View style={styles.a_container}>
                    <Icon name="info-circle" size={24} color="black" />
                    <View style={styles.b_container}>
                        <Text style={styles.mini_header}>note</Text>
                        <Text>{activeOrder?.note}</Text>
                    </View>
                </View>
                <View style={styles.button_box}>
                    <TouchableOpacity  style={styles.button} onPress={DropOffOrder}>
                        <Text style={styles.button_text}>Confirm dropoff</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        backgroundColor: theme.backgroundColor,
        paddingHorizontal: 16,
    },
    tite_container: {
        marginVertical: 20,
    },
    main_title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: theme.primary,
    },
    sub_header: {
        color: theme.color,
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10,
    },
    mini_header: {
        color: theme.color,
        fontWeight: 'bold',
        fontSize: 13,
    },
    location_title: {
        color: theme.color,
        fontWeight: 'bold',
        fontSize: 18,
    },
    address: {
        color: theme.color,
        flexDirection: 'row',
    },
    table: {
        paddingHorizontal: 16,
    },
    a_container: {
        flexDirection: 'row',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: 'grey',
    },
    b_container: {
        flexDirection: 'column',
        marginHorizontal: 10,
    
    },
     button_box: {
        paddingHorizontal: 16,
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
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

export default DropOffView;


