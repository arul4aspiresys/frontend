import { OrderOutput, OrderInput } from "../../app/models/orders.interface";
import { environment } from "../../environments/environment";

export const orderStub1: OrderOutput = {
    id: 1,
    customerID: 1,
    totalAmount: 123.78,
    orderDetails: [
        {
            orderID: 1,
            productID: 1,
            quantity: 1,
            createdAt: new Date('2023-12-08T10:04:49.000Z'),
            updatedAt: new Date('2023-12-08T10:04:49.000Z'),
            deletedAt: new Date('2023-12-08T10:04:49.000Z')
        }
    ],
    paymentMethod: 'Cash',
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
};

export const orderStub2: OrderOutput = {
    id: 2,
    customerID: 2,
    totalAmount: 1000.00,
    orderDetails: [
        {
            orderID: 2,
            productID: 1,
            quantity: 10,
        }
    ],
    paymentMethod: 'Cash',
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
};

export const createOrderPayloadStub: OrderInput = {
    customerID: 1,
    paymentMethod: 'Cash',
    totalAmount: 100.00,
    orderDetails: [
        {
            productID: 1,
            quantity: 1,
        }
    ]
};

export const baseURLOrdersStub = environment.apiHost + environment.baseURL + '/orders'; 

export const getOrderIDStub = 2;