import app from './app';
import { connectMongoDB, migrateDB } from './dbs/mongodb';
import logger from './utils/logger';

const port = process.env.NODE_PORT || 9020;

logger.debug(null, 'Running migrate db');
migrateDB()
    .then(async (migrated) => {
        logger.debug(null, `Migrated ${migrated.length} files`, { migrated });
        return connectMongoDB();
    })
    .then(async () => {
        app.listen(port, () => {
            logger.info(null, 'server is up', { port });
        });
    })
    .catch((error: any) => {
        logger.error(null, 'Failed to setup server', { error: error?.message ?? error });
        throw error;
    });
