
import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';

type HamburgerMenuProps = {
  onClose: () => void;
  onProfilePress: () => void;
  onTransportationPress: () => void;
  onAboutPress: () => void;
  onLogoutPress: () => void;
  isMenuVisible: boolean;
};

const HamburgerMenu = ({
  onClose,
  onProfilePress,
  onTransportationPress,
  onAboutPress,
  onLogoutPress,
  isMenuVisible,
}: HamburgerMenuProps) => {
  const overlayWidth = 0.6 * Dimensions.get('window').width; 
  const overlayPosition = useRef(new Animated.Value(-overlayWidth)).current;

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
      <TouchableOpacity style={styles.item} onPress={onProfilePress}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onTransportationPress}>
        <Text style={styles.itemText}>Delivery Vehicle</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onAboutPress}>
        <Text style={styles.itemText}>Update Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onLogoutPress}>
        <Text style={styles.itemText}>Logout</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '60%',
    backgroundColor: '#D3D3D3',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  item: {
    paddingVertical: 10,
  },
  itemText: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#f7691a',
  },
});

export default HamburgerMenu;
