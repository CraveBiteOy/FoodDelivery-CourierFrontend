import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Map from '../views/other/Map';
import Sheet from '../components/Sheet';
import { BottomSheetBackgroundProps, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import HamburgerMenu from '../components/HamburgerMenu';
import { RootStackParamList } from '../navigators/MyStack';
import { logoutUtil } from '../utils/logout';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { OrderStatus } from '../model/OrderModel';
import ErrorModal from '../components/ErrorModal';
import { ThemeType, useTheme } from "../styles/theme";
import LoadingIndicator from '../components/LoadingIndicator';
import { resetOrderError } from '../store/actions/OrderAction';


const Home = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { activeOrder, orderItems, isOrderError, OrderErrorMessage, orderLoading } = useSelector((state: RootState) => state.ORDERS);
  const { courier, isCourierError, CourierErrorMessage } = useSelector((state: RootState) => state.COURIERS);
  const {loading} = useSelector((state: RootState) => state.USERS);
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [currentSnapPoint, setCurrentSnapPoint] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);
  
  const snapPoints = [100, 400, 600];


  const toggleMenu = useCallback(() => {
    setIsMenuVisible((prevState) => !prevState);
  }
  , [isMenuVisible]);

  const handleProfilePress = useCallback(() => {
  setIsMenuVisible(false);
  navigation.navigate('Profile');
  }, [navigation]);

  const handleTransportationPress = useCallback(() => {
    setIsMenuVisible(false);
    navigation.navigate('Transportation');
  }, [navigation]);

  const handleAboutPress = useCallback(() => {
    setIsMenuVisible(false);
    navigation.navigate('UpdateLocation');
  }
  , [navigation]);

  const handleLogoutPress = useCallback(() => {
    setIsMenuVisible(false);
    logoutUtil(dispatch, navigation);
  }
  , [navigation]);

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
  }, [activeOrder, loading, orderLoading]);


  useEffect(() => {
    if(isOrderError) {
      setErrorMsg(OrderErrorMessage);
      setIsErrorVisible(true);
      dispatch(resetOrderError());
    }
  }, [isOrderError]);
  console.log("the status of error of order is : "+ isOrderError)

  // show loading indicator while logging in, rendering order stages and fetching order items.
   if (loading || orderLoading) {
        return <LoadingIndicator />;
    }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        {isErrorVisible &&
          <> 
            <ErrorModal message={errorMsg} />
          </>
        }
        <Header onMenuPress={toggleMenu} title="Home" />
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
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          index={currentSnapPoint}
          enablePanDownToClose={false}
          backgroundComponent={CustomBackgroundComponent}
        >
          <Sheet
            activeOrder={activeOrder}
            courier={courier}
            orderStatus={activeOrder?.status}
            orderItems={orderItems}
            isCourierError={isCourierError}
            orderLoading={orderLoading}
              />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

  const getStyles = (theme: ThemeType) => StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  customBackground: {
    backgroundColor: theme.sheetBackground,
    borderRadius: 20,
  
  },
});

export default Home;


// custom component to stlye up bottom sheet background
const CustomBackgroundComponent = (props: BottomSheetBackgroundProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return <View style={[props.style, styles.customBackground]} />;
};

