import { getUsers } from '../dbs/mongodb';
import type { IUSER } from '../interfaces';

export const getUsersSrviceHandler = async (userId?: string): Promise<IUSER[]> => {
    return getUsers({ ...(userId && { _id: userId }) });
};
