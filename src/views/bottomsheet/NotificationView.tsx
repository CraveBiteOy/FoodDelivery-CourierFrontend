import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotificationView = () => {

    return (
        <View>
            <View style={styles.first_row}>
                <Text style={styles.text}>New Order!</Text>
                <View style={styles.circle}>
                    <Text>40s</Text>
                </View>
            </View>
            <View style={styles.second_row}>
                <View style={styles.first_column}>
                    <View style={styles.container}>
                        <Text style={styles.icon}>📍</Text>
                        <View
                            style={styles.dottedLine}>
                        </View>
                        <Text style={styles.icon}>📍</Text>
                    </View>
                    <View style={styles.trip_info}>
                        <View>
                            <Text style={styles.from}>from</Text>
                            <Text style={styles.address}>address</Text>
                        </View>
                        <View>
                            <Text>to</Text>
                            <Text style={styles.address}>address</Text>
                        </View>

                     </View>
                </View>
                <View style={styles.second_column}>
                        <View>
                            <Text>price</Text>
                        <Text style={styles.price}>5$</Text>
                        </View>
                        <View>
                            <Text>total km</Text>
                            <Text style={styles.distance}>2km</Text>
                        </View>
                </View>
            </View>
            <View style={styles.third_row}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    first_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    second_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    first_column: {
        flex: 0.5,
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
    container: {
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
        alignItems: 'center',
    },
    from: {
        marginTop: 10,
       
    },
    address: {
        fontWeight: 'bold',
    },
    price: {
        fontWeight: 'bold',
    },
    distance: {
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
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button_text: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default NotificationView;

