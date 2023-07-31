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
    console.log("accepted bt hajri");
       // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error) {
    dispatch(acceptOrderFailure(error));
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/rejectByCourier`, {}, {
      headers: { Authorization: token }
    });
      dispatch(rejectOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error) {
    dispatch(rejectOrderFailure(error));
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/pickedUp` ,{}, {
      headers: { Authorization: token }
    });
      dispatch(pickUpOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error) {
    dispatch(pickUpOrderFailure(error));
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/completed`,{}, {
      headers: { Authorization: token }
    });
      dispatch(completeOrderSuccess(response.data));
        // update the state of the order
      dispatch(updateOrder(response.data));
  } catch (error) {
    dispatch(completeOrderFailure(error));
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

 
/** This function is used to update the location of the courier and the order. 
 * therefore, it is called when the courier accepts an order and completes an order
**/
export const updateCourierAndOrderLocation = (orderId: number, latitude: number, longitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/order${orderId}/longitude/${longitude}/latitude/${latitude}`,{}, {
      headers: { Authorization: token }
    });
    dispatch(updateCourierAndOrderLocationSuccess(response.data));
  } catch (error) {
    dispatch(updateCourierAndOrderLocationFailure(error));
  }
}

const updateCourierAndOrderLocationSuccess = (data: any) => ({
  type: "UPDATE_COURIER_AND_ORDER_LOCATION",
  payload: data,
});

const updateCourierAndOrderLocationFailure = (error: unknown) => ({
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
  } catch (error) {
    dispatch(getOrderItemsByIdFailure(error));
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
