import { TimeStamp } from "./timestamp.interface";

interface ProductAttributes extends TimeStamp {
    id: number;
    name: string;
    price: number;
}

export interface ProductInput extends Pick<ProductAttributes, 'name' | 'price'> {}

export interface ProductOutput extends Required<ProductAttributes> {}