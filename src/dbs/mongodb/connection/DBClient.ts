import { set, get } from 'lodash';
import logger from '../../../utils/logger';
import { getDB, getConnectionDB } from './db';

set(process, 'env.NODE_ENV', get(process, 'env.NODE_ENV', 'local'));

export const connectMongoDB = async () => {
    const connectionString = getConnectionDB();

    return getDB(connectionString)
        .then(() => {
            logger.info(null, 'connected to mongodb');
            return true;
        })
        .catch((error) => {
            logger.error(null, 'Failed to connect mongodb', { error: error?.message ?? error });
            return false;
        });
};
