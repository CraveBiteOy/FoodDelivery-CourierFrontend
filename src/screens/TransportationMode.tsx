
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateCourierMode } from '../store/actions/CourierAction';
import { NavigationMode } from '../model/CourierModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';
import {ThemeType, useTheme} from "../styles/theme"
import Header from '../components/Header';

const TransportationMode = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const handleSelectMode = (mode: NavigationMode) => {
    dispatch(updateCourierMode(mode) as any);
    navigation.navigate('Home');
  };

  return (
    <>
    <Header onBackPress={() => navigation.goBack()} title="" />
    <View style={styles.container}>
      <Text style={styles.header}>Choose Transportation Mode</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelectMode(NavigationMode.BICYCLE)}
        >
          <Text style={styles.optionText}>Bicycle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => handleSelectMode(NavigationMode.CAR)}
        >
          <Text style={styles.optionText}>Car</Text>
        </TouchableOpacity>
      </View>
      </View>
      </>
  );
};

const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: theme.color,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: theme.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth:1,
    marginHorizontal: 10,
  },
  optionText: {
    color: theme.buttonLabel,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TransportationMode;
