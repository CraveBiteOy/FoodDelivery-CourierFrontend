
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';
import { ThemeType, useTheme } from "../styles/theme";



const Profile = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <>
        <Header onBackPress={() => navigation.goBack()} title="" />
        <View style={styles.container}>
            <Text>Test</Text>
            </View>
        </>
    );
}


const getStyles = (theme: ThemeType) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
    }
});

export default Profile;