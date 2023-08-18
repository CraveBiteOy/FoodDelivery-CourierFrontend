import { Courier } from "./CourierModel";

// Interface for representing an order
export interface Order {
  id: number;
  customer: Customer;
  restaurant: Restaurant;
  courier: Courier;
  status: OrderStatus;
  total: number;
  deliveryFee: number;
  finalPrice: number;
  quantity: number;
  note: string;
  d2Distance: number;
  totalTime: number;
  pickedupTime: number;
  dropOffTime: number;
  toLongitude: number;
  toLatitude: number;
  fromLongitude: number;
  fromLatitude: number;
  address: string;
  zipcode: string;
  city: string;
  createdDate: string;
  updatedDate: string;
}
// Interface for representing a customer
export interface Customer {
  id: number;
  user:User
}

// Interface for representing a user
export interface User {
  id: number;
  username: string;
  firstname: string;
  surename: string;
  roles: string[];
  longitude: number;
  latitude: number;
  imageurl: string | null;
}

// Interface for representing a restaurant
export interface Restaurant {
  id: number;
  name: string;
  address: string;
  owner: number
  zipcode: string;
  city: string;
  rating: number;
  longitude: number;
  latitude: number;
  imageurl: string;
  cookingTime: number;
  createdDate: string;
  updatedDate: string;
}



// Enum for representing the status of an order
export enum OrderStatus {
  SENT_TO_COUIER = "COOKING",
  READY = "READY_FOR_PICKUP",
  ACCEPTED = "COURIER_ACCEPTED",
  REJECTED = "COURIER_REJECTED",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
}

export interface OrderItem {
  id: number;
  quantity: number;
  dish: {
    id: number;
    name: string;
    imageurl: string | null;
    description: string;
    price: number;
    availability: boolean;
    restaurant: number;
  };
  order: number;
}


// Interface for representing the state of the application
export interface OrderState {
  activeOrder: Order | {};
  OrderErrorMessage: string | null;
  orderItems: OrderItem[];
  isOrderError: boolean;
  orderLoading: boolean;
}

// Interface for representing an action
export interface ACTION {
    type: string,
    payload?: any
}
