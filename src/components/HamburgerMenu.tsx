import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Switch, View } from 'react-native';
import {ThemeType, darkTheme} from "../styles/theme"

type HamburgerMenuProps = {
  onClose: () => void;
  onProfilePress: () => void;
  onTransportationPress: () => void;
  onAboutPress: () => void;
  onLogoutPress: () => void;
  isMenuVisible: boolean;
  theme: ThemeType;
  toggleTheme:  () => void;
};

const HamburgerMenu = ({
  onClose,
  onProfilePress,
  onTransportationPress,
  onAboutPress,
  onLogoutPress,
  isMenuVisible,
  theme,
  toggleTheme
}: HamburgerMenuProps) => {

  const overlayWidth = 0.6 * Dimensions.get('window').width; 
  const overlayPosition = useRef(new Animated.Value(-overlayWidth)).current;
  const styles = getStyles(theme);
  const isDark = theme === darkTheme;

  useEffect(() => {
    Animated.timing(overlayPosition, {
      toValue: isMenuVisible ? 0 : -overlayWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuVisible]);

return (
    <Animated.View
      style={[
        styles.overlay,
        { transform: [{ translateX: overlayPosition }], zIndex: 1 },
      ]}
    >
      <Text style={styles.name}>CraveBite</Text>
      <View style={styles.line} />
      <TouchableOpacity style={styles.item} onPress={onProfilePress}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onTransportationPress}>
        <Text style={styles.itemText}>Delivery Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onAboutPress}>
        <Text style={styles.itemText}>Update Location</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Stats</Text>
      </TouchableOpacity>
      <View style={{ flex:1 }} />
      <TouchableOpacity style={[styles.item, styles.logoutButton]} onPress={onLogoutPress}>
        <Text style={[styles.itemText, styles.logoutButtonText]}>Logout</Text>
      </TouchableOpacity>
      <Switch
        trackColor={{ false: "#767577", true: "#f7691a" }}
        thumbColor={isDark ? "orange" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isDark}
        style={{ marginBottom: 20 }}
      />
    </Animated.View>
);
};

const getStyles = (theme: ThemeType) =>
StyleSheet.create({
overlay: {
position: 'absolute',
top: 0,
bottom: 0,
left: 0,
width: '60%',
backgroundColor: theme.menuBackground,
paddingVertical: 20,
paddingHorizontal: 15,
},
name:{
fontSize:20,
fontWeight:'bold',
color:theme.color,
textAlign:'center',
marginBottom:10
},
line:{
height: 1,
backgroundColor: 'grey',
marginBottom:10
},
item:{
paddingVertical:10
},
itemText:{
color:theme.color,
fontWeight:'bold'
},
logoutButton:{
borderRadius:5,
borderWidth:1,
borderColor: theme.primary,
},
logoutButtonText:{
textAlign:'center'
}
});

export default HamburgerMenu;
