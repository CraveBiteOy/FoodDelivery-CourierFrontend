import { ACTION } from "../../model/UserModel";
import { OrderState } from "../../model/OrderModel";

const initialState: OrderState = {
  activeOrder: {},
  OrderErrorMessage: null,
  orderItems: [],
  isOrderError: false,
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
    case "REMOVE_ORDER":
      return {
        ...state,
        activeOrder: {},
      };
    case "GET_ORDER_ITEMS_BY_ID":
      return {
        ...state,
        orderItems: action.payload,
      };
    case "ORDER_ERROR":
      return {
        ...state,
        OrderErrorMessage: action.payload,
        isOrderError: true,
      };
    //TEST
    case "REST_ORDER_ERROR":
      return {
        ...state,
        OrderErrorMessage: null,
        isOrderError: false,
      };

    default:
      return state;
  }
};

