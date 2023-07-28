import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";
import { ACTION } from "../model/UserModel";
import { HOST_URL } from "../store/store";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { updateOrder } from "../store/actions/OrderAction";



export const setupSocket = async (courierId: number, dispatch: Dispatch<ACTION>) => {

  const token = await AsyncStorage.getItem("token");
  var socket = new SockJS(HOST_URL + '/socket');
  const stompClient = over(socket);
  stompClient.connect({
    Authorization: token,
  }, function (frame: any) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/order/courier/' + courierId, function (message : any) {
        const orderResponse = JSON.parse(message.body);
        console.log("RECIEVED ORDER FROM WEBSOCKET");
        console.log(orderResponse);
      dispatch(updateOrder(orderResponse));
    });
  });
};
