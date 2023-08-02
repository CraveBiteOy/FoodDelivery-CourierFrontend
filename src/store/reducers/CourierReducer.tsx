import { ACTION } from "../../model/UserModel";
import { CourierState} from "../../model/CourierModel";

const initialState: CourierState = {
    courier: {},
    message: null,
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
        message: action.payload,
      };
    case "UPDATE_COURIER_LOCATION_BEFORE_PICKUP":
      return {
        ...state,
        courier: action.payload,
      };
    default:
      return state;
  }
};

