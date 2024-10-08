import winston from 'winston';
import winstonDailyRotateFile from 'winston-daily-rotate-file';
import { LOGGING_LINE_TRACE, LOGGING_MODE, NODE_ENV } from '../consts/environment-variables';
import { LOG_DIR_PATH } from '../consts/paths';
const colorizer = winston.format.colorize();

export type LOGGER_LEVEL = 'error' | 'warn' | 'info' | 'debug' | 'verbose' | 'useraction' | 'silly';

const enum LEVELS {
    error = 'error',
    warn = 'warning',
    info = 'info',
    debug = 'debug',
    verbose = 'verbose',
    useraction = 'useraction',
    silly = 'silly',
}

interface PRINTF {
    request_id: string;
    timestamp: string;
    message: string;
    level: LEVELS;
    [key: string]: any;
}

const LOGGING_MODE_LEVEL = LOGGING_MODE ?? LEVELS.warn;

function stringifyMetaData(metadata: string | object = '') {
    if (!metadata || typeof metadata === 'string') return metadata;

    return Object.keys(metadata).length
        ? `\n\t${Object.keys(metadata)
              .map((key) => {
                  const value = (<any>metadata)[key];

                  let valueStr;
                  if (NODE_ENV === 'production') {
                      valueStr = value && typeof value === 'object' ? JSON.stringify(value) : value;
                  } else {
                      valueStr = value && typeof value === 'object' ? JSON.stringify(value, null, 4) : value;
                  }

                  return `${key}: ${valueStr}`;
              })
              .filter((v) => v)
              .join(',\n\t')}`
        : '';
}

const localMessageFormatter = ({
    timestamp,
    level,
    request_id,
    message,
    ...metadata
}: winston.Logform.TransformableInfo | PRINTF): string => {
    return colorizer.colorize(
        level,
        `${timestamp} [${level}] [${request_id}] ${message} ${stringifyMetaData(metadata)}\n`
    );
};

export class Logger {
    private logger;

    constructor(private readonly serviceName: string = 'UNDEFINED') {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: LOGGING_MODE_LEVEL,
                    format: winston.format.combine(
                        winston.format.splat(),
                        winston.format.timestamp(),
                        winston.format.printf(localMessageFormatter)
                    ),
                }),
            ],
        });

        if (NODE_ENV === 'local') {
            const transportDailyRotateFile = new winstonDailyRotateFile({
                dirname: LOG_DIR_PATH,
                extension: '.log',
                filename: 'jlt-%DATE%',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: LOGGING_MODE_LEVEL,
            });

            // transportDailyRotateFile.on(
            //     'rotate',
            //     function (oldFilename, newFilename) {}
            // );

            this.logger.add(transportDailyRotateFile);
        }

        this.logger.on('error', (error: any) => {
            console.error('Logger Error Caught: ', error);
        });
    }

    private static getLineTrace(error: Error) {
        const lineTraces = error?.stack?.split('\n').filter((line) => !/\\logger\.[jt]s:\d+:\d+\),?$/.test(line)) || [];

        let lineTrace = lineTraces[1];
        for (const line of lineTraces.slice(1)) {
            const isLoggerFile = /[lL]ogger\.[tj]s:\d+:\d+\)$/.test(line.trim());
            if (!isLoggerFile) {
                lineTrace = line;
                break;
            }
        }

        return lineTrace.trimStart();
    }

    writeLog(level: LEVELS, request_id: string, message: string, options: any = {}) {
        options = JSON.parse(JSON.stringify(options));

        if (options?.hasOwnProperty('message')) {
            options.$message = options.message;
            delete options.message;
        }

        let lineTrace;
        if (LOGGING_LINE_TRACE.includes(level) || level === LEVELS.error) {
            const error = new Error(message);
            lineTrace = Logger.getLineTrace(error);
        }

        if (lineTrace) {
            options.lineTrace = lineTrace;
        }

        options.service_name = this.serviceName;
        this.logger.log(level, message, { request_id, ...options });
    }

    error(request_id: string | null, message: any, metadata: any = {}) {
        this.writeLog(LEVELS.error, request_id || 'NULL', message, metadata);
    }

    warn(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.warn, request_id || 'NULL', message, metadata);
    }

    info(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.info, request_id || 'NULL', message, metadata);
    }

    debug(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.debug, request_id || 'NULL', message, metadata);
    }

    verbose(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.verbose, request_id || 'NULL', message, metadata);
    }

    userAction(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.useraction, request_id || 'NULL', message, metadata);
    }

    silly(request_id: string | null, message: any, metadata = {}) {
        this.writeLog(LEVELS.silly, request_id || 'NULL', message, metadata);
    }
}

const logger = new Logger('TITAN');
export default logger;

// Print the first log, with the current logging mode
(<any>logger)[LOGGING_MODE_LEVEL]?.('LOGGER', 'logger instance created', { LOGGING_MODE });
