import mongoose from 'mongoose';
import { orderSchema } from '../schema';
import { TABLES } from '../consts/tables';
import { IORDER } from '../../../interfaces';

export const OrderModelMongoose = mongoose.model(TABLES.ORDERS, orderSchema);

export const createOrder = async (order: Omit<Partial<IORDER>, '_id' | 'createdAt' | 'updatedAt'>) => {
    return OrderModelMongoose.create(order);
};

export const getOrdersByUserId = async (userId: string) => {
    return OrderModelMongoose.find({ active: true, user: userId });
};
