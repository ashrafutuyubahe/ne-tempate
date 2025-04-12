import winston from "winston";
import {NODE_ENV} from "./env";

const formats = winston.format

const  logger = winston.createLogger({
    level: NODE_ENV === "production" ? "info" : "debug",
    format: formats.combine(
        formats.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        formats.errors({stack: true}),
        formats.splat(),
        formats.json()
    ),
    defaultMeta: { service: "todo-api-service"},
    transports: [
        new winston.transports.Console({
            format: formats.combine(
                formats.colorize(),
                formats.printf(({timestamp, level, message, ...meta}) => {
                    return `${timestamp} [${level}]: ${message} ${
                        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
                    }`
                })
            )
        })
    ]
})

if (NODE_ENV === "production") {
    logger.add(
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    );
    logger.add(new winston.transports.File({ filename: "logs/combined.log" }));
}

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.indexOf('\n')));
    }
}

export {logger, stream};
