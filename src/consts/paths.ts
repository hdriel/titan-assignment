import path from 'path';

const env = [undefined, 'local', 'localhost'].includes(process.env.NODE_ENV) ? 'local' : process.env.NODE_ENV;

export const ENV_FILE_PATH = path.join(__dirname, '..', '..', `.env.${env}`);
export const LOG_DIR_PATH = path.join(__dirname, '..', '..', 'logs');
export const MIGRATIONS_DIR_PATH = path.join(__dirname, '..', '..', 'migrations-mongo');
export const PUBLIC_DIR_PATH = path.join(__dirname, '..', '..', 'public');
