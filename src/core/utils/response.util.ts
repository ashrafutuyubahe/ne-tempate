import {ApiResponse} from "../types/api-response.type";
import {Response} from "express"

export class ResponseUtil {
    static success<T>(res: Response, data: T, statusCode = 200) {
        const response: ApiResponse<T> = {
            success: true,
            data
        }

        res.status(statusCode).json(response);
    }

    static error<T>(res: Response, message: string, statusCode = 500, code?: string, details?: any){
        const response: ApiResponse<T> = {
            success: false,
            error: {
                message,
                code,
                details
            }
        }

        res.status(statusCode).json(response)
    }
}