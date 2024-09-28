import '../utils/dotenv';

export const NODE_ENV = process.env.NODE_ENV || 'local';

export const PIXABAY_KEY = (process.env.PIXABAY_KEY as string) || 'localhost';

export const REDIS_HOST = (process.env.REDIS_HOST as string) || 'localhost';
export const REDIS_PORT = +(process.env.REDIS_PORT as string) || 6379;
export const REDIS_PASS = REDIS_HOST !== 'localhost' && (process.env.REDIS_PASS as string);
export const IGNORE_CACHING = Boolean(+(process.env.IGNORE_CACHING as string)) || undefined;

export const REDIS_SETTINGS = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    ...(REDIS_PASS && { password: REDIS_PASS }),
};

export const MONGO_HOST = (process.env.MONGO_HOST as string) || 'localhost';
export const MONGO_DB = process.env.MONGO_DB as string;
export const MONGO_USER = process.env.MONGO_USER as string;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string;
export const MONGO_PORT = +(process.env.MONGO_PORT as string) || 27017;
export const MONGO_URL = ((process.env.MONGO_URL as string) || undefined)
    ?.replace('mongodb://:@', 'mongodb://')
    .replace('mongodb://@:', 'mongodb://');

export const MONGO_SETTINGS = MONGO_URL || {
    database: MONGO_DB,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    port: MONGO_PORT,
    host: MONGO_HOST,
};

export const LOGGING_MODE = process.env.LOGGING_MODE as string;
export const LOGGING_LINE_TRACE = (process.env.LOGGING_LINE_TRACE as string)?.split(',') ?? ['error'];
