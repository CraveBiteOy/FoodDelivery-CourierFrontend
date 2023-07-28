import { Dispatch } from "react";
import { ACTION } from "../../model/UserModel";
import { HOST_URL } from "../store";
import axios from "axios";

export const acceptOrder = (orderId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/acceptByCourier`);
      dispatch(acceptOrderSuccess(response.data));
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/rejectByCourier`);
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/pickedUp`);
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
    const response = await axios.put(`${HOST_URL}/api/order/id/${orderId}/completed`);
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


export const updateCourierAndOrderLocation = (orderId: number, latitude: number, longitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const response = await axios.put(
      `${HOST_URL}/api/order${orderId}/longitude/${longitude}/latitude/${latitude}`
    );
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
  type: "UPDATE_ORDER",
  payload: order,
});