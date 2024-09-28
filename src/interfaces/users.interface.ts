import { BASE_TABLE } from './base.interface';

export interface IUSER extends BASE_TABLE {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}
