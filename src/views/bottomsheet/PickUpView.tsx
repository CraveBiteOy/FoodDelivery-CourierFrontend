

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Checkbox, DataTable} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { pickUpOrder } from '../../store/actions/OrderAction';
import { Order, OrderItem } from '../../model/OrderModel';
import { OrderStatus } from '../../model/OrderModel';
import {ThemeType, useTheme} from "../../styles/theme"

type PickUpViewProps = {
    activeOrder: Order;
    orderItems: OrderItem[] | []
}

const PickUpView = ({ activeOrder, orderItems }: PickUpViewProps) => {

    const dispatch = useDispatch();
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const { theme } = useTheme();
    const styles = getStyles(theme);

    const PickUpOrder = () => {
        console.log("Picked up");
        console.log(activeOrder?.status);
        if (activeOrder && activeOrder.status === OrderStatus.READY) {
            dispatch(pickUpOrder(activeOrder.id) as any);
        }
        else {
            //alerts
            console.log("Order is not marked as ready by the restaurant yet");
        }
    }

    // function to handle the check box
    const handleCheckItem = (itemId: number) => {
        setCheckedItems((prev) => ({
            ...prev, [itemId]: !prev[itemId],
        }));
    };

    // boolean to check if all items are checked
    const allItemsChecked = orderItems.every((item: OrderItem) => checkedItems[item.id])

    return (
        <View style={styles.container}>
            {activeOrder?.status === OrderStatus.READY && (
                <Text style={styles.ready}>Ready</Text>
            )}
            <View style={styles.restaurant_info}>
                <Text style={styles.header}>Restaurant</Text>
                <Text style={styles.value}>{activeOrder?.restaurant?.name}</Text>
                <Text style={styles.restaurant_address}>{activeOrder?.restaurant?.address}</Text>
            </View>
            <View style={styles.customer_container}>
                <Text style={styles.header}>Customer details</Text>
                <View style={styles.customer_details}>
                    <View style={styles.customer_n}>
                        <Text style={styles.customer_header}>Name</Text>
                        <Text style={styles.value}>{activeOrder?.customer?.user?.firstname}</Text>
                    </View>
                    <View style={styles.line}>
                    </View>
                    <View style={styles.customer_n}>
                        <Text style={styles.customer_header}>Order No.</Text>
                        <Text style={styles.value}>#{activeOrder?.id}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.order_info}>
                <Text style={styles.header}>Order Details</Text>
                <DataTable>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title numeric>Qty.</DataTable.Title>
                        <DataTable.Title numeric>check</DataTable.Title>
                    </DataTable.Header>
                    {orderItems.map((item: OrderItem) => (
                        <DataTable.Row key={item.id} style={styles.tableRow}>
                            <DataTable.Cell >{item?.dish?.name}</DataTable.Cell>
                            <DataTable.Cell numeric>{item?.quantity}</DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Checkbox
                                    status={checkedItems[item.id] ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckItem(item.id)}
                                />
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
            </View>
            <View style={styles.button_box}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={PickUpOrder}
                    disabled={!allItemsChecked}
                >
                <Text style={styles.button_text}>Confirm pickup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        // backgroundColor: theme.backgroundColor,
    },
    restaurant_info: {  
        paddingHorizontal: 16,
        marginBottom: 25,
    },
    ready: {
        color: theme.buttonLabel,
        backgroundColor: theme.primary,
        textAlign: 'center',
        paddingVertical: 5,
        marginHorizontal: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        width: 70,
        height: 30,
        borderRadius: 25,
    },
    header: {
        color: theme.color,
        fontWeight: 'bold',
        paddingVertical: 10,
        fontSize: 18,
    },
    value: {
         color: theme.color,
        fontWeight: 'bold',
        fontSize: 15,
        paddingVertical: 5,
    },
    restaurant_address: {
         color: theme.color,
        fontWeight: 'bold',
        fontSize: 14,
        paddingVertical: 5,
    },
    customer_container: {
        paddingHorizontal: 16,
        flexDirection: 'column',
        marginBottom: 30,
    },
    customer_details: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    customer_header: {
        color: theme.color,
        fontWeight: 'bold',
        fontSize: 14,
    },
    customer_n: {
        flexDirection: 'column',
        padding: 10,
        marginRight: 100,
    },
    line: {
        borderRightWidth: 1,
        borderRightColor: 'grey',
        height: '100%'
        
    },
    order_info: {
        paddingHorizontal: 16,
    },
    table: {
        borderWidth: 1,
        borderColor: 'grey',
    },
    tableHeader: {
        backgroundColor: 'lightgrey',
    },
    tableRow: {
        // backgroundColor: theme.backgroundColor,
        backgroundColor: 'darkgrey',
    
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

export default PickUpView;