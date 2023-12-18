import { ProductInput, ProductOutput } from "../../app/models/products.interface";
import { environment } from "../../environments/environment";

export const productStub1: ProductOutput = {
    id: 1,
    name: 'test',
    price: 100.00,
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
};

export const productStub2: ProductOutput = {
    id: 2,
    name: 'tes2',
    price: 899.00,
    createdAt: new Date('2023-12-08T10:04:49.000Z'),
    updatedAt: new Date('2023-12-08T10:04:49.000Z'),
    deletedAt: new Date('2023-12-08T10:04:49.000Z')
};

export const productListStub: ProductOutput[] = [ productStub1, productStub2 ];

export const createProductPayloadStub: ProductInput = {
    name: 'test',
    price: 100.00
};

export const baseURLProductsStub = environment.apiHost + environment.baseURL + '/products';

export const getProductIDStub = 1;

export const createProductResponseStub: ProductOutput = {
    "id": 14,
    "name": "P10",
    "price": 10,
    "createdAt": new Date("2023-12-18T09:31:54.798Z"),
    "updatedAt": new Date("2023-12-18T09:31:54.798Z"),
    "deletedAt": new Date("2023-12-18T09:31:54.798Z"),
};