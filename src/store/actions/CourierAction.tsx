import { Dispatch } from "react";
import { ACTION } from "../../model/UserModel";
import { HOST_URL } from "../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourierStatus, NavigationMode } from "../../model/CourierModel";


// Update Couirer Status
export const updateCourierStatus = (status: CourierStatus) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/couriers/courier/authenticated/status/${status}`, {}, {
      headers: { Authorization: token }
    });
    dispatch(updateCourierStatusSuccess(response.data));
  } catch (error : any) {
    dispatch(updateCourierStatusFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
}

export const updateCourierStatusSuccess = (data: any) => ({
  type: "UPDATE_COURIER_STATUS",
  payload: data,
});

const updateCourierStatusFailure = (error: unknown) => ({
  type: "COURIER_ERROR",
  payload: error,
});

// Update Couirer navigation mode
export const updateCourierMode = (mode: NavigationMode) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  
  try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.put(
        `${HOST_URL}/api/couriers/courier/authenticated/mode/${mode}`, {}, {
      headers: { Authorization: token }
    });
      dispatch(updateCourierModeSuccess(response.data));
     
    } catch (error : any) {
      dispatch(updateCourierModeFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
    }
}
  
const updateCourierModeSuccess = (data: any) => ({
    type: "UPDATE_COURIER_MODE",
    payload: data,
});

const updateCourierModeFailure = (error: unknown) => ({
    type: "COURIER_ERROR",
    payload: error,
});

//get authentificated courier
export const getAuthenticatedCourier = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
  try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${HOST_URL}/api/couriers/courier/authenticated` ,{
          headers: { Authorization: token },
        });
      console.log(response.data);
      dispatch(getAuthenticatedCourierSuccess(response.data));
    } catch (error : any) {
        dispatch(getAuthenticatedCourierFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
    }
}
    
const getAuthenticatedCourierSuccess = (data: any) => ({
    type: "GET_AUTHENTICATED_COURIER",
    payload: data,
});

const getAuthenticatedCourierFailure = (error: unknown) => ({
    type: "COURIER_ERROR",
    payload: error,
});



// Action for updating the courier longitude and latitude before the order is picked up
export const updateCourierLocationBeforePickup = (longitude: number, latitude: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.put(
      `${HOST_URL}/api/couriers/courier/authenticated/longitude/${longitude}/latitude/${latitude}`, {}, {
      headers: { Authorization: token }
    });
    dispatch(updateCourierLocationBeforePickupSuccess(response.data));
  } catch (error : any) {
    console.log(error.response.data.messages.toString())
    dispatch(updateCourierLocationBeforePickupFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
}

const updateCourierLocationBeforePickupSuccess = (data: any) => ({
  type: "UPDATE_COURIER_LOCATION_BEFORE_PICKUP",
  payload: data,
});

const updateCourierLocationBeforePickupFailure = (error: unknown) => ({
  type: "COURIER_ERROR",
  payload: error,
});


// Action to check wether authenticated courier is new to the system or not; if yes, we will redirect them to choose their transportation mode
export const checkIsNewCourier = () => async (dispatch: Dispatch<ACTION>, getState: any) => {

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      `${HOST_URL}/api/couriers/courier/authenticated/isNewCourier`, {
      headers: { Authorization: token }
    });
    dispatch(checkIsNewCourierSuccess(response.data));
  } catch (error : any) {
    dispatch(checkIsNewCourierFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
  }
}

const checkIsNewCourierSuccess = (data: any) => ({
  type: "CHECK_IS_NEW_COURIER",
  payload: data,
});

const checkIsNewCourierFailure = (error: unknown) => ({
  type: "COURIER_ERROR",
  payload: error,
});


// Action for updating courier from websocket
export const updateCourierFromWebsocket = (courier: any) => {
  return {
    type: "UPDATE_COURIER_FROM_WEBSOCKET",
    payload: courier,
  };
}