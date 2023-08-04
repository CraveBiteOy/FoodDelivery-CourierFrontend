
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateCourierMode } from '../store/actions/CourierAction';
import { NavigationMode } from '../model/CourierModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigators/MyStack';


const TransportationMode = () => {
  const [selectedMode, setSelectedMode] = useState<NavigationMode | null>(null);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectMode = (mode: NavigationMode) => {
    setSelectedMode(mode);
    dispatch(updateCourierMode(mode) as any);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Transportation Mode</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            selectedMode === NavigationMode.BICYCLE ? styles.selectedOption : undefined,
          ]}
          onPress={() => handleSelectMode(NavigationMode.BICYCLE)}
        >
          <Text style={styles.optionText}>Bicycle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            selectedMode === NavigationMode.CAR ? styles.selectedOption : undefined,
          ]}
          onPress={() => handleSelectMode(NavigationMode.CAR)}
        >
          <Text style={styles.optionText}>Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: '#fafafa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedOption: {
    backgroundColor: '#f7691a',
  },
});

export default TransportationMode;
