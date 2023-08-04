import { ACTION } from "../../model/UserModel";
import { CourierState} from "../../model/CourierModel";

const initialState: CourierState = {
    courier: {},
    CourierErrorMessage: null,
    isNewCourier: false,
    isCourierError: false
};


export default (state = initialState, action: ACTION) => {
  switch (action.type) {
    case "UPDATE_COURIER_STATUS":
          return {
            ...state,
            courier:  action.payload,
          };
    case "UPDATE_COURIER_MODE":
          return {
            ...state,
            courier: action.payload,
          };
      case "GET_AUTHENTICATED_COURIER":
          return {
            ...state,
            courier: action.payload,
      };
    case "COURIER_ERROR":
      return {
        ...state,
        CourierErrorMessage: action.payload,
        isCourierError: true,
      };
    case "UPDATE_COURIER_LOCATION_BEFORE_PICKUP":
      return {
        ...state,
        courier: action.payload,
      };
    case "CHECK_IS_NEW_COURIER":
      return {
        ...state,
        isNewCourier: action.payload,
      
      };
    case "UPDATE_COURIER_FROM_WEBSOCKET":
      return {
        ...state,
        courier: action.payload,
      };
    default:
      return state;
  }
};

