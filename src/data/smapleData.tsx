import { CourierStatus, NavigationMode, OrderStatus } from "../model/CourierModel";
import { Order } from "../model/OrderModel";

export let sampleData : Order = {
    id: 1,
    customer: {
        id: 1,
        user: {
            id: 9,
            username: "hajri2",
            firstname: "hajri2",
            surename: "mohammed",
            roles: [
                "USER"
            ],
            longitude: 25.47411,
            latitude: 65.05695,
            imageurl: null
        }
    },
    restaurant: {
        id: 1,
        name: "pure maku",
        address: "Pakkahuoneenkatu 5 B22",
        imageurl: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant1.jpeg",
        owner: 1,
        city: "oulu",
        zipcode: "90100",
        latitude: 65.0124023,
        longitude: 25.4723617,
        rating: 3.0,
        cookingTime: 20,
        createdDate: "2023-08-01 14:48",
        updatedDate: "2023-08-01 14:48",
    },
    courier: {
        id: 1,
        user: {
            id: 8,
            username: "hajri",
            firstname: "hajri",
            surename: "mohammed",
            roles: [
                "USER"
            ],
            longitude: 25.4687952,
            latitude: 65.0612607,
            imageurl: null
        },
        status: CourierStatus.ONLINE,
        available: true,
        mode: NavigationMode.BICYCLE,
    },
    status: OrderStatus.PICKED_UP,
    total: 24.0,
    deliveryFee: 7.9541577498509195,
    finalPrice: 31.95415774985092,
    quantity: 2,
    note: "the door code is 4322",
    d2Distance: 4.9541577498509195,
    totalTime: 45,
    pickedupTime: 20,
    dropOffTime: 25,
    toLongitude: 25.47411,
    toLatitude: 65.05695,
    fromLongitude: 25.4723617,
    fromLatitude: 65.0124023,
    address: "yliopistokatu 12",
    zipcode: "90570",
    city: "oulu",
    createdDate: "2023-08-01 14:48",
    updatedDate: "2023-08-01 14:48"
};
