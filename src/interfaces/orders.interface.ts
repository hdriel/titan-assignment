import { Types } from 'mongoose';
import { BASE_TABLE } from './base.interface';

export interface IORDER extends BASE_TABLE {
    _id: string;
    email: string;
    fullName: string;
    fullAddress: string;
    images: string[];
    frameColor: string;
    user: Types.ObjectId;
}
