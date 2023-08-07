import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {ThemeType, useTheme} from "../styles/theme"

type OnboardingProps = {
    header: string;
    text: string;
    buttonLabel: string;
    onPress: () => void;
    onPress2?: () => void;
    buttonLabel2?: string;
};

const Onboarding = ({ header, text, buttonLabel, onPress, onPress2, buttonLabel2 }: OnboardingProps) => {
    const { theme } = useTheme();
    const styles = getStyles(theme);


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

const getStyles = (theme: ThemeType) => StyleSheet.create({

    container: {
        backgroundColor: theme.backgroundColor,
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
    button: {
        backgroundColor: theme.primary,
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50,
    },
    button2: {
        backgroundColor: theme.primary,
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 15,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 110,
    },
    buttonLabel: {
        color: theme.buttonLabel,
        fontSize: 18,
        fontWeight: 'bold',
    },

    
});

export default Onboarding;