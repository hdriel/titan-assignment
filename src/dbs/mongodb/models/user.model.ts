import mongoose from 'mongoose';
import { userSchema } from '../schema';
import { TABLES } from '../consts/tables';

export const UserModelMongoose = mongoose.model(TABLES.USERS, userSchema);

export const getUserById = async (userId: string) => {
    return UserModelMongoose.findById(userId);
};

export const getUsers = async (filters: any = {}) => {
    return UserModelMongoose.find({ active: true, ...filters });
};
