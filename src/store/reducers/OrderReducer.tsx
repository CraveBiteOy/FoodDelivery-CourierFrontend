import { ACTION } from "../../model/UserModel";
import { OrderState } from "../../model/OrderModel";

const initialState: OrderState = {
  activeOrder: {},
  message: null,
  orderItems: [],
};

export default (state = initialState, action: ACTION) => {
  switch (action.type) {
    case "ACCEPT_ORDER":
      return {
        ...state,
      };
    case "REJECT_ORDER":
      return {
          ...state,   
      };
    case "PICK_UP_ORDER":
      return {
        ...state,
      };
    case "COMPLETE_ORDER":
      return {
        ...state,
          };
      case "UPDATE_COURIER_AND_ORDER_LOCATION":
          return {
            ...state,
          };
      case "UPDATE_ORDER_FROM_WEBSOCKET":
          return {
              ...state,
                activeOrder: action.payload,
      };
    case "GET_ORDER_ITEMS_BY_ID":
      return {
        ...state,
        orderItems: action.payload,
      };
    default:
      return state;
  }
};

