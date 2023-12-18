import { CustomerDetail, CustomerInput, CustomerOutput } from "../../app/models/customers.interface";
import { environment } from "../../environments/environment";

export const baseURLCustomersStub = environment.apiHost + environment.baseURL + '/customers';

export const getCustomerIDStub = 1;

export const customerStub1: CustomerDetail = {
    id: 1,
    name: 'C1',
    mobile: 1234567890,
    orders: [{
        customerID: 1,
        paymentMethod: 'UPI',
        id: 1,
        totalAmount: 100.88
    }],
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z') 
};

export const customerStub2: CustomerDetail = {
    id: 2,
    name: 'C2',
    mobile: 1234567890,
    orders: [{
        customerID: 2,
        paymentMethod: 'UPI',
        id: 2,
        totalAmount: 100.00
    }, {
        customerID: 2,
        paymentMethod: 'UPI',
        id: 5,
        totalAmount: 899.00
    }],
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
};

export const customerWithOutOrdersStub: CustomerDetail = {
    id: 3,
    name: 'C3',
    mobile: 1234567890,
    orders: [],
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
}

export const customerListStub: CustomerOutput[] = [
    { ...(( { id, name, mobile, createdAt, updatedAt, deletedAt } ) => ({ id, name, mobile, createdAt, updatedAt, deletedAt }))(customerStub1) },
    { ...(( { id, name, mobile, createdAt, updatedAt, deletedAt } ) => ({ id, name, mobile, createdAt, updatedAt, deletedAt }))(customerStub2) }
];

export const createCustomerPayloadStub: CustomerInput = {
    name: 'Test',
    mobile: 1234567890
};

export const createCustomersResponseStub: CustomerOutput = {
    id: 1,
    name: 'Test',
    mobile: 1234567890,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
};