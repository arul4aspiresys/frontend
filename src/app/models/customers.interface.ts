import { TimeStamp } from "./timestamp.interface";

interface CustomerAttributes extends TimeStamp {
    id: number;
    name: string;
    mobile: number;
}

export interface CustomerInput extends Pick<CustomerAttributes, 'name' | 'mobile'> {}

export interface CustomerOutput extends Required<CustomerAttributes> {}