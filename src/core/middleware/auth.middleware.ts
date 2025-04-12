import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../utils/response.util";
import jwt from "jsonwebtoken";
import {ACCESS_TOKEN_SECRET} from "../config/env";

export interface JwtPayload {
    userId: string
}

// Augment Express Request.
declare global {
    namespace Express {
        interface Request {
            user: {
                id: string,
            }
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.cookies.accessToken)
        const accessToken = req.cookies.accessToken;

        if(!accessToken)
            return ResponseUtil.error(res, "Unauthorized", 401, "UNAUTHORIZED");

        try {
            const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET!) as JwtPayload;
            req.user = {id: decoded.userId}
            next()
        } catch(error){
            return ResponseUtil.error(res, "Invalid token", 401, "UNAUTHORIZED");
        }
    } catch(error){
        next(error);
    }
}