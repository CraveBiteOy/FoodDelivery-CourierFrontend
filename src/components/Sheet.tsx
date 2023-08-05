import React, { useCallback, useEffect, useState } from 'react';
import DefaultView from '../views/bottomsheet/DefaultView';
import NotificationView from '../views/bottomsheet/NotificationView';
import PickUpView from '../views/bottomsheet/PickUpView';
import DropOffView from '../views/bottomsheet/DropOffView';
import { Order, OrderItem, OrderStatus } from '../model/OrderModel';
import { useDispatch } from 'react-redux';
import { getAuthenticatedCourier } from '../store/actions/CourierAction';
import { rejectOrder } from '../store/actions/OrderAction';
import { Courier } from '../model/CourierModel';

export type SheetProps = {
  activeOrder: Order;
  courier: Courier;
  orderStatus: OrderStatus;
  orderItems: OrderItem[] | [];
  isCourierError: boolean;
};

const Sheet = ({ activeOrder, courier, orderStatus, orderItems, isCourierError }: SheetProps) => {
  
  
  const dispatch = useDispatch();


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
    content = <DefaultView isCourierError={isCourierError} courier={courier}/>;
  }
  else {
    switch (orderStatus) {
      case OrderStatus.SENT_TO_COUIER:
        content = <NotificationView activeOrder={activeOrder} onComplete={handleComplete}/>;
        break;
      case OrderStatus.ACCEPTED:
        content = <PickUpView activeOrder={activeOrder} orderItems={orderItems} />;
        break;
      case OrderStatus.READY:
        content = <PickUpView activeOrder={activeOrder} orderItems={orderItems} />;
        break;
      case OrderStatus.PICKED_UP:
        content = <DropOffView activeOrder={activeOrder} courier={courier}  />;
        break;
      default:
        content = <DefaultView isCourierError={isCourierError} courier={courier}/>;
    }
  }

  return <>{content}</>;
};

export default Sheet;
