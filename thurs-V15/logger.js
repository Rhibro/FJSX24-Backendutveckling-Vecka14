import { createLogger, format, transports } from "winston";

const {combine, timestamp, printf} = format;

// define logformat with timestamp, level, message 
const logFormat = printf(({level, message, timestamp}) => {
    return `${timestamp} [${level.toLocaleUpperCase()}]: ${message}`
})

// build a logger 
const logger = createLogger ({
    format: combine(
        timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        logFormat
    ),
    transports: [
        new transports.File({filename: "logs/combined.log"}),
        new transports.Console(),
    ]
})

// middleware
function logRequests(req, res, next) {
    logger.info(`${req.method} ${req.url}`);
    next();
} 

// export
export {logger, logRequests};