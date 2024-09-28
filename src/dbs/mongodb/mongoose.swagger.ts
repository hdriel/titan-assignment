import m2s from 'mongoose-to-swagger';

import { UserModelMongoose, OrderModelMongoose } from './models';

const difinitions = {
    order: m2s(OrderModelMongoose),
    user: m2s(UserModelMongoose),
};

export default difinitions;
