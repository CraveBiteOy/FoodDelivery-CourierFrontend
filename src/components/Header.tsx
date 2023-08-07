// components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeType, useTheme} from "../styles/theme"

type HeaderProps = {
  onMenuPress: () => void;
};

const Header = ({ onMenuPress }: HeaderProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Icon name="navicon" size={24}/>
      </TouchableOpacity>
      <Text style={styles.title}>Home</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};

  const getStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
    title: {
    color: theme.color,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Header;
