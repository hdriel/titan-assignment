import mongoose from 'mongoose';
import logger from '../../../utils/logger';
import { MONGO_SETTINGS, MONGO_URL } from '../../../consts/environment-variables';

mongoose.set('strictQuery', false);

interface IMONGO_SETTINGS {
    database: string;
    user: string | undefined;
    password: string | undefined;
    port: number;
    host: string;
}

export function getConnectionDB(mongoUri: string | IMONGO_SETTINGS = MONGO_URL || MONGO_SETTINGS): string {
    if (typeof mongoUri === 'object') {
        const { database, host, password, port, user } = mongoUri;
        if (user && password) {
            mongoUri = `mongodb://${user}:${password}@${host}:${port}/${database}`;
        } else {
            mongoUri = `mongodb://${host}:${port}/${database}`;
        }
    }

    return mongoUri.replace('mongodb://:@', 'mongodb://');
}

let cachedClient: any = null;
export async function getDB(mongoUri: string | IMONGO_SETTINGS) {
    if (cachedClient) return cachedClient;

    const uri = getConnectionDB(mongoUri);
    logger.info(null, 'Connecting to mongoose ');
    logger.verbose(null, 'Connecting to mongoose ', { connectionString: uri });

    const client = await mongoose.connect(uri);

    cachedClient = client;
    return client;
}
