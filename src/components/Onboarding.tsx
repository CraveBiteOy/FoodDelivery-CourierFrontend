import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

type OnboardingProps = {
    header: string;
    text: string;
    buttonLabel: string;
    onPress: () => void;
    onPress2?: () => void;
    buttonLabel2?: string;
};

const Onboarding = ({ header, text, buttonLabel, onPress, onPress2, buttonLabel2 }: OnboardingProps) => {


    return (

        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/logo_courier.png')} />
            </View>
            <Text style={styles.header}>{header}</Text>
            <Text style={styles.text}>{text}</Text>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonLabel}>{buttonLabel}</Text>
            </TouchableOpacity>
            {onPress2 && buttonLabel2 && (
                <TouchableOpacity style={styles.button2} onPress={onPress2}>
                    <Text style={styles.buttonLabel}>{buttonLabel2}</Text>
            </TouchableOpacity>
            )}
        </View>

        
    )

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 100,
    },
    logo: {
        width: 180,
        height: 115,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 20,
        marginBottom: 40,
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: '#f7691a',
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
    },
    button2: {
        backgroundColor: '#f7691a',
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 110,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    
});

export default Onboarding;