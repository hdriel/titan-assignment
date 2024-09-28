const path = require('path');
const dotenv = require('dotenv');
const { expand } = require('dotenv-expand');

const env = [undefined, 'local', 'localhost'].includes(process.env.NODE_ENV) ? 'local' : process.env.NODE_ENV;

const ENV_FILE_PATH = path.resolve(__dirname, `.env.${env}`);
const MIGRATIONS_DIR_PATH = path.resolve(__dirname, 'migrations-mongo');

const myEnv = dotenv.config({ path: ENV_FILE_PATH });
expand(myEnv);

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = encodeURIComponent(process.env.MONGO_PASSWORD);
const MONGO_DB = process.env.MONGO_DB;
const MONGO_PORT = +process.env.POSTGRES_PORT || 5432;
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_URL = process.env.MONGO_URL.replace('//:@', '//');
const MONGO_SETTINGS = MONGO_URL || {
    database: MONGO_DB,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    port: MONGO_PORT,
    host: MONGO_HOST,
};

console.log('MIGRATIONS_DIR_PATH', MIGRATIONS_DIR_PATH);
console.log('MONGO_URL', MONGO_URL);

module.exports = {
    mongodb: {
        url: MONGO_SETTINGS,
        databaseName: MONGO_DB,
        options: {
            //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
            //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
        },
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: MIGRATIONS_DIR_PATH,

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog',

    // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
    // if the file should be run.  Requires that scripts are coded to be run multiple times.
    useFileHash: false,

    // Don't change this, unless you know what you're doing
    moduleSystem: 'commonjs',
};
