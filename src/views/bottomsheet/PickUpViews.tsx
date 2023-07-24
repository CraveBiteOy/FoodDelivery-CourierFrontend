

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Checkbox, DataTable} from 'react-native-paper';


const PickUpView = () => {

    return (
        <View>
            <View style={styles.restaurant_info}>
                <Text style={styles.header}>Restaurant</Text>
                <Text style={styles.value}>Restaurant Name</Text>
                <Text style={styles.value}>Restaurant Address</Text>
            </View>
            <View style={styles.customer_container}>
                <Text style={styles.header}>Customer details</Text>
                <View style={styles.customer_details}>
                    <View style={styles.customer_n}>
                        <Text style={styles.customer_header}>Name</Text>
                        <Text style={styles.value}>Hajri</Text>
                    </View>
                    <View style={styles.line}>
                    </View>
                    <View style={styles.customer_n}>
                        <Text style={styles.customer_header}>Order No.</Text>
                        <Text style={styles.value}>#122</Text>
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
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Cell>Item 1</DataTable.Cell>
                        <DataTable.Cell numeric>2</DataTable.Cell>
                        <DataTable.Cell numeric>
                              <Checkbox status="unchecked" />
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={styles.tableRow}>
                        <DataTable.Cell>Item 2</DataTable.Cell>
                        <DataTable.Cell numeric>1</DataTable.Cell>
                        <DataTable.Cell numeric>
                                <Checkbox status="checked" />
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </View>
            <View style={styles.button_box}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>Confirm pickup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    restaurant_info: {  
        paddingHorizontal: 16,
        marginBottom: 25,
    },
    header: {
        fontWeight: 'bold',
        paddingVertical: 10,
        fontSize: 15,
    },
    value: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingVertical: 5,
    },
    restaurant_address: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingVertical: 5,
        color: 'grey',
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
        fontWeight: 'bold',
        fontSize: 14,
        color: 'grey',
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
        backgroundColor: 'white',
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
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PickUpView;