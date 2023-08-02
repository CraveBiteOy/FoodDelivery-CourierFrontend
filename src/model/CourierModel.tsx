// Interface for representing a courier
export interface Courier {
  id: number;
  user: User;
  status: CourierStatus;
  available: boolean;
  mode: NavigationMode;
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

// Enum for representing the status of a courier
export enum CourierStatus {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
}

// Enum for representing the navigation mode of a courier
export enum NavigationMode {
  BICYCLE = "BICYCLE",
  CAR = "CAR",
}

export enum OrderStatus {
  SENT_TO_COUIER = "COOKING",
  READY = "READY_FOR_PICKUP",
  ACCEPTED = "COURIER_ACCEPTED",
  REJECTED = "COURIER_REJECTED",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
}



// Interface for representing the state of the application
export interface CourierState {
  courier: Courier | {};
  message: string | null;
}

// Interface for representing an action
export interface ACTION {
    type: string,
    payload?: any
}
