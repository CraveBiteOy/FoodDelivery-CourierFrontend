import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import axios from "axios";
import { HOST_URL } from "../store"
import { ACTION, LoginForm, UserRegisterForm } from "../../model/UserModel";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigators/MyStack";


export const login = (loginForm: LoginForm, navigation: NativeStackNavigationProp<RootStackParamList>) => async (dispatch: Dispatch<ACTION>, getState: any) => {
  const { username, password, longitude, latitude } = loginForm;
  try {
    const response = await axios.put(`${HOST_URL}/api/users/signIn`, {
      username,
      password,
      longitude,
      latitude,
    });
    const token = response.headers.authorization || "";
    await AsyncStorage.setItem("token", token);
    navigation.navigate('Home');
    console.log(response.data)
    dispatch(loginSuccess(response.data));
  } catch (error: any) {
    dispatch(loginFailure(error?.response?.data?.messages.toString()));
    // console.log(error)
    console.log(error.response.data.messages.toString())
  }
}

const loginSuccess = (data: any) => ({
  type: "LOG_IN",
  payload: data,
});

const loginFailure = (error: any) => ({
  type: "USER_ERROR",
  payload: error,
});

export const register = (registerForm: UserRegisterForm,  navigation: NativeStackNavigationProp<RootStackParamList>) => async (dispatch: Dispatch<ACTION>, getState: any) => {

    try {
      const response = await axios.post(`${HOST_URL}/api/users/signup`, registerForm);
      const token = response.headers.authorization || "";
      //TESTING
       const data = await response.data
        console.log(data)
      await AsyncStorage.setItem("token", token);
      navigation.navigate('Login');
      console.log(token)
      dispatch(registerSuccess(response.data));
    } catch (error: any) {
      dispatch(registerFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
    }
  };

const registerSuccess = (data: any) => ({
  type: "REGISTER",
  payload: data,
});

const registerFailure = (error: unknown) => ({
  type: "USER_ERROR",
  payload: error,
});

 export const getAuthUserAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        dispatch(userError("token is null"));
      } else {
        const response = await axios.get(`${HOST_URL}/api/users/authUser/getAuthUser`, {
          headers: { Authorization: token },
        });
        dispatch(getAuthUserSuccess(response.data));
      }
    } catch (error: any) {
      dispatch(getAuthUserFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
    }
  };

const getAuthUserSuccess = (data: any) => ({
  type: "get_authUser",
  payload: data,
});

const getAuthUserFailure = (error : any) => ({
  type: "USER_ERROR",
  payload: error,
});

const userError = (message: string) => ({
  type: "USER_ERROR",
  payload: message,
});

export const logout = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
      await AsyncStorage.removeItem("token");
      dispatch(logoutSuccess());
  } catch (error: any) {
      dispatch(logoutFailure(error?.response?.data?.messages.toString() || 'An unknown error occurred'));
    }
}

const logoutSuccess = () => ({
  type: "LOG_OUT",
});

const logoutFailure = (error : any) => ({
  type: "USER_ERROR",
  payload: error,
});


