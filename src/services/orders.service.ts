import { getOrdersByUserId, createOrder } from '../dbs/mongodb';
import { IORDER } from '../interfaces';

export const getOrderByUserIdServiceHandler = async (userId: string) => {
    return await getOrdersByUserId(userId);
};

export const createOrderServiceHandler = async (order: Omit<Partial<IORDER>, '_id' | 'createdAt' | 'updatedAt'>) => {
    return await createOrder(order);
};
