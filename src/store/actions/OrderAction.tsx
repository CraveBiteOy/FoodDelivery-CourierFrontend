import { Dispatch } from "react";
import { ACTION } from "../../model/UserModel";
import { HOST_URL } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const acceptOrder = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(`${HOST_URL}/api/orders/order/id/${orderId}/acceptByCourier`, {}, {
      headers: { Authorization: token }
    });
    dispatch(acceptOrderSuccess(response.data));
    console.log(response.data);
    console.log("accepted by hajri so the order is: " + response.data.status);
      // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error : any) {
    dispatch(acceptOrderFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
};

const acceptOrderSuccess = (data: any) => ({
  type: "ACCEPT_ORDER",
  payload: data,
});

const acceptOrderFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});

// Reject an order
export const rejectOrder = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(`${HOST_URL}/api/orders/order/id/${orderId}/rejectByCourier`, {}, {
      headers: { Authorization: token }
    });
      console.log("reject response : "+ response.data);
      dispatch(rejectOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error : any) {
    console.log("reject error : "+ error?.response?.data?.messages.toString());
    dispatch(rejectOrderFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
};

const rejectOrderSuccess = (data: any) => ({
  type: "REJECT_ORDER",
  payload: data,
});

const rejectOrderFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});

// Mark an order as picked up
export const pickUpOrder = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(`${HOST_URL}/api/orders/order/id/${orderId}/pickedUp` ,{}, {
      headers: { Authorization: token }
    });
     console.log("Hajri picked up so status is : "+ response.data.status);
      dispatch(pickUpOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error : any) {
    console.log(error?.response?.data?.messages.toString());
    dispatch(pickUpOrderFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
};

const pickUpOrderSuccess = (data: any) => ({
  type: "PICK_UP_ORDER",
  payload: data,
});

const pickUpOrderFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});

// Mark an order as completed
export const completeOrder = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(`${HOST_URL}/api/orders/order/id/${orderId}/completed`,{}, {
      headers: { Authorization: token }
    });
      console.log("Hajri completed so status is : "+ response.data.status);
      dispatch(completeOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error : any) {
    console.log(error?.response?.data?.messages.toString());
    dispatch(completeOrderFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
};

const completeOrderSuccess = (data: any) => ({
  type: "COMPLETE_ORDER",
  payload: data,
});

const completeOrderFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});

 

// Action for updating the state of an order
export const updateOrder = (order: any) => ({
  type: "UPDATE_ORDER_FROM_WEBSOCKET",
  payload: order,
});


// Action for getting single order items by id 
export const getOrderItemsById = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${HOST_URL}/api/orderdishes/order/${orderId}`, {
      headers: { Authorization: token }
    });
    dispatch(getOrderItemsByIdSuccess(response.data));
  } catch (error : any) {
    console.log(error);
    dispatch(getOrderItemsByIdFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
}

const getOrderItemsByIdSuccess = (data: any) => ({
  type: "GET_ORDER_ITEMS_BY_ID",
  payload: data,
});

const getOrderItemsByIdFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});

// Action for updating the order longitude and latitude after the order is picked up
export const updateCourierAndOrderLocationAfterPickup = (orderId: number, longitude: number, latitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/orders/order/id/${orderId}/longitude/${longitude}/latitude/${latitude}`, {}, {
      headers: { Authorization: token }
    });
    console.log("current status is " + response.data.status);
    dispatch(updateCourierAndOrderLocationAfterPickupSuccess(response.data));
    dispatch(updateOrder(response.data));
  } catch (error : any) {
    console.log("error is " + error?.response?.data?.messages.toString());
    dispatch(updateCourierAndOrderLocationAfterPickupFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
}

const updateCourierAndOrderLocationAfterPickupSuccess = (data: any) => ({
  type: "UPDATE_COURIER_AND_ORDER_LOCATION",
  payload: data,
});

const updateCourierAndOrderLocationAfterPickupFailure = (error: unknown) => ({
  type: "ORDER_ERROR",
  payload: error,
});


//TEST
// rest order error 
export const restOrderError = () => ({
  type: "REST_ORDER_ERROR",
});

// Action for removing the order when the courier rejects it
export const removeOrder = () => ({
  type: "REMOVE_ORDER",
});