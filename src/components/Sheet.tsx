import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../views/bottomsheet/DefaultView';
import NotificationView from '../views/bottomsheet/NotificationView';
import PickUpView from '../views/bottomsheet/PickUpView';
import DropOffView from '../views/bottomsheet/DropOffView';
import { OrderStatus } from '../model/CourierModel';
// import { Order } from '../model/OrderModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthenticatedCourier } from '../store/actions/CourierAction';
import { RootState } from '../store/store';
import { rejectOrder } from '../store/actions/OrderAction';

export type sheetProps = {
  orderStatus: OrderStatus;
};

const Sheet = ({ orderStatus }: sheetProps) => {
  
  
  const dispatch = useDispatch();
  const { activeOrder } = useSelector((state: RootState) => state.ORDERS);


  //function to load the authenticated courier
  const loadAuthCourier = useCallback(async () => {
    dispatch(getAuthenticatedCourier() as any);
  }, []);

  useEffect(() => {
    loadAuthCourier();
  }, []);

  
  /*function to handle the completion of count down timer; 
   *it is understood as the courier has rejected the order
  */
  const handleComplete = async () => {
  if (activeOrder) {
    dispatch(rejectOrder(activeOrder.id) as any);
  }
};

  let content;
  if (!activeOrder) {
    content = <DefaultView />;
  }
  else {
    switch (orderStatus) {
      case OrderStatus.SENT_TO_COUIER:
        content = <NotificationView onComplete={handleComplete} />;
        break;
      case OrderStatus.ACCEPTED:
        content = <PickUpView />;
        break;
      case OrderStatus.READY:
        content = <PickUpView />;
        break;
      case OrderStatus.PICKED_UP:
        content = <DropOffView />;
        break;
      default:
        content = <DefaultView />;
    }
  }

  return <>{content}</>;
};

export default Sheet;
