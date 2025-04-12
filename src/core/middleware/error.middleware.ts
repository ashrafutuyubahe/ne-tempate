import { Request, Response, NextFunction } from "express";
import {logger} from "../config/logger";
import {HttpException} from "../exceptions/http.exception";
import {ResponseUtil} from "../utils/response.util";
import {Prisma} from "../generated-prisma-client/prisma"


export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`${error.name}: ${error.message}`, {
        stack: error.stack,
        path: req.path,
        method: req.method,
    });

    // Handle HTTP Exceptions.
    if(error instanceof HttpException){
        return ResponseUtil.error(res, error.message, error.statusCode, error.code, error.details)
    }

    // Handle Known Prisma Exceptions.
    if (error instanceof Prisma.PrismaClientKnownRequestError ){
        if (error.code === "P2002")
            return ResponseUtil.error(res, "A  record with this value already exists", 409, "CONFLICT");
        if (error.code === "P2025")
            return ResponseUtil.error(res, "Record not found", 404, "NOT_FOUND");
    }

    // Default Fallback for handling the other errors.
    return ResponseUtil.error(res, "Internal Server Error", 500, "INTERNAL_SERVER_ERROR");
}