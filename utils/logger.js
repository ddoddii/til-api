import winston from 'winston';
import fs from 'fs';
import path from 'path';
const { combine, timestamp, printf, colorize } = winston.format;

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logLevels = {
    error : 0,
    warn : 1,
    info : 2,
    http : 3,
    debug : 4,
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const loggerFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    colorize({ all: true }),
    printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const loggerTransports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: path.join(logDir, 'error.log'),
        level: 'error',
    }),
    new winston.transports.File({
        filename: path.join(logDir, 'all.log')
    }),
];


const logger = winston.createLogger({
    levels: logLevels,
    format: loggerFormat,
    transports: loggerTransports,
})

export default logger;