// LoadingComponent.js

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import {ThemeType, useTheme} from "../styles/theme"

const LoadingIndicator = () => {
    const { theme } = useTheme();
    const styles = getStyles(theme);
    
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#f7691a" />
        </View>
    );
};

 const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.backgroundColor, 
    },
});

export default LoadingIndicator;
