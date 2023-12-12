import { TimeStamp } from "./timestamp.interface";

interface OrderAttributes extends TimeStamp{
    id: number;
    customerID: number;
    totalAmount: number;
    paymentMethod: string;
}

interface OrderDetailAttributes extends TimeStamp {
    orderID: number;
    productID: number;
    quantity: number;
}

export interface OrderInput extends Pick<OrderAttributes, 'customerID' | 'paymentMethod' | 'totalAmount'> {
    orderDetails: Pick<OrderDetailAttributes, 'productID' | 'quantity'>[];
}

export interface OrderOutput extends Required<OrderAttributes> {
    orderDetails: Required<OrderDetailAttributes>;
}

