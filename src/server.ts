import app from './app';
import { connectMongoDB } from './dbs/mongodb';
import logger from './utils/logger';

const port = process.env.NODE_PORT || 9020;

logger.debug(null, 'Connecting to migrate db');
connectMongoDB()
    .then(async () => {
        app.listen(port, () => {
            // tslint:disable-next-line:no-console
            logger.info(null, 'server is up', { port });
        });
    })
    .catch((error: any) => {
        logger.error(null, 'Failed to setup server', { error: error?.message ?? error });
        throw error;
    });
