// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import HamburgerMenu from '../components/HamburgerMenu';
// import { RootStackParamList } from '../navigators/MyStack';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// const Home = () => {
//   const [isMenuVisible, setIsMenuVisible] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

//   const toggleMenu = () => {
//     setIsMenuVisible((prevState) => !prevState);
//   };

//   const handleProfilePress = () => {
//     setIsMenuVisible(false);
//     navigation.navigate('Profile');
//   };

//   const handleTransportationPress = () => {
//     setIsMenuVisible(false);
//     navigation.navigate('Transportation');
//   };

//   const handleAboutPress = () => {
//     setIsMenuVisible(false);
//     navigation.navigate('About');
//   };

//   const handleLogoutPress = () => {

//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity activeOpacity={1} onPress={toggleMenu} style={styles.openButton}>
//         <Text>Open Hamburger Menu</Text>
//       </TouchableOpacity>

//       {isMenuVisible && (
//         <TouchableOpacity
//           activeOpacity={1}
//           onPress={toggleMenu}
//           style={styles.overlay}
//         />
//       )}

//       <HamburgerMenu
//         onClose={toggleMenu}
//         onProfilePress={handleProfilePress}
//         onTransportationPress={handleTransportationPress}
//         onAboutPress={handleAboutPress}
//         onLogoutPress={handleLogoutPress}
//         isMenuVisible={isMenuVisible}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     overlay: {
//           position: 'absolute',
//             top: 0,
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         },
//   openButton: {
//     padding: 16,
//   },
// });

// export default Home;

/// screens/Home.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import MapView from '../components/MapView';
import Sheet from '../components/Sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import HamburgerMenu from '../components/HamburgerMenu';
import { RootStackParamList } from '../navigators/MyStack';

const Home = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleMenu = () => {
    setIsMenuVisible((prevState) => !prevState);
  };

  const handleProfilePress = () => {
    setIsMenuVisible(false);
    navigation.navigate('Profile');
  };

  const handleTransportationPress = () => {
    setIsMenuVisible(false);
    navigation.navigate('Transportation');
  };

  const handleAboutPress = () => {
    setIsMenuVisible(false);
    navigation.navigate('About');
  };

  const handleLogoutPress = () => {
    // TODO: implement logout
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onMenuPress={toggleMenu} />
      <MapView />
      {isMenuVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleMenu}
          style={styles.overlay}
        />
      )}
      <HamburgerMenu
        onClose={toggleMenu}
        onProfilePress={handleProfilePress}
        onTransportationPress={handleTransportationPress}
        onAboutPress={handleAboutPress}
        onLogoutPress={handleLogoutPress}
        isMenuVisible={isMenuVisible}
      />
      <BottomSheet snapPoints={[100, '100%']} index={0}>
        <Sheet />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Home;
