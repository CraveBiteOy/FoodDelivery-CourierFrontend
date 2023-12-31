import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import UserReducer from './reducers/UserReducer';
import CourierReducer from './reducers/CourierReducer';
import OrderReducer from './reducers/OrderReducer';

import thunk from 'redux-thunk';



export const HOST_URL= "http://100.65.142.79:8080";
const initialState= {};

const rootReducer = combineReducers({
    USERS: UserReducer,
    COURIERS: CourierReducer,
    ORDERS: OrderReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
   
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch