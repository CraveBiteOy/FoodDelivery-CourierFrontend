import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Map from '../views/other/Map';
import Sheet from '../components/Sheet';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import HamburgerMenu from '../components/HamburgerMenu';
import { RootStackParamList } from '../navigators/MyStack';
import { logoutUtil } from '../utils/logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { OrderStatus } from '../model/CourierModel';


const Home = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activeOrder } = useSelector((state: RootState) => state.ORDERS);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const snapPoints = [100, 400, 600];

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
    setIsMenuVisible(false);
    logoutUtil(dispatch, navigation);
  };

  useEffect(() => {
  bottomSheetModalRef.current?.present();
   }, []);


  const handleOrderStageChange = (orderStatus: OrderStatus) =>
  {
    if (orderStatus === OrderStatus.SENT_TO_COUIER) {
      setCurrentSnapPoint(1);
    } else if (orderStatus === OrderStatus.ACCEPTED || orderStatus === OrderStatus.PICKED_UP) {
      setCurrentSnapPoint(2);
    } else {
      setCurrentSnapPoint(0);
    }
    //create a visual effect to refresh the bottom sheet
    bottomSheetModalRef.current?.dismiss();
    setTimeout(() => {
      bottomSheetModalRef.current?.present();
    }, 500);
 };

   useEffect(() => {
  if (activeOrder) {
    handleOrderStageChange(activeOrder.status);
  }
  }, [activeOrder]);


  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <Header onMenuPress={toggleMenu} />
        <Map />
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
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={currentSnapPoint}
        >
          <Sheet
            orderStatus={activeOrder.status}
            activeOrder={activeOrder}
            onOrderStageChange={handleOrderStageChange}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
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
