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
import { OrderStatus } from '../model/OrderModel';
import ErrorModal from '../components/ErrorModal';


const Home = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activeOrder, orderItems, isOrderError, OrderErrorMessage } = useSelector((state: RootState) => state.ORDERS);
  const {courier, isCourierError, CourierErrorMessage} = useSelector((state: RootState) => state.COURIERS);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  
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
    navigation.navigate('UpdateLocation');
  };

  const handleLogoutPress = () => {
    setIsMenuVisible(false);
    logoutUtil(dispatch, navigation);
  };

  const handleOrderStageChange = (orderStatus: OrderStatus) => {
    if (orderStatus === OrderStatus.SENT_TO_COUIER) {
      setCurrentSnapPoint(1);
    } else if (orderStatus === OrderStatus.ACCEPTED || orderStatus === OrderStatus.PICKED_UP || orderStatus === OrderStatus.READY) {
      setCurrentSnapPoint(2);
    } else {
      setCurrentSnapPoint(0);
    }
  };

  useEffect(() => {
    if (activeOrder) {
      handleOrderStageChange(activeOrder.status);
    }
     bottomSheetModalRef.current?.present();
  }, [activeOrder]);


  useEffect(() => {
    if(isOrderError || isCourierError) {
      setErrorMsg(OrderErrorMessage || CourierErrorMessage);
      setIsErrorVisible(true);
    }

    console.log('isErrorVisible: ', isErrorVisible);
    console.log('isOrderError: ', isOrderError);
    console.log('errorMsg: ', errorMsg);
  }, [isOrderError, isCourierError]);


  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        {isErrorVisible &&
          <> 
            <ErrorModal message={errorMsg} />
          </>
        }
        <Header onMenuPress={toggleMenu} />
        <Map
          activeOrder={activeOrder}
          courier={courier}
        />
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
          enablePanDownToClose={false}
        >
          <Sheet
            activeOrder={activeOrder}
            courier={courier}
            orderStatus={activeOrder?.status}
            orderItems={orderItems}
            isCourierError={isCourierError}
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
