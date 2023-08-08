
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ThemeType, useTheme} from "../styles/theme"

type HeaderProps = {
  onMenuPress?: () => void;  
  onBackPress?: () => void;  
  title?: string;
};

const Header = ({ onMenuPress, onBackPress, title = "Home" }: HeaderProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.header_container}>
      {onMenuPress && (
        <TouchableOpacity onPress={onMenuPress}>
          <Icon name="navicon" size={24} color={theme.color}/>
        </TouchableOpacity>
      )}
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Icon name="chevron-left" size={24} color={theme.color} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
};


  const getStyles = (theme: ThemeType) => StyleSheet.create({
  header_container: {
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