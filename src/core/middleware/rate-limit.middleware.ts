import { aj } from "../config/arcjet"
import { Request, Response, NextFunction } from "express"
import { ResponseUtil } from "../utils/response.util"

const arcjetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const desicion = await aj.protect(req, {requested: 1})

        if(desicion.isDenied()){
            if(desicion.reason.isRateLimit()) return ResponseUtil.error(res, "Too many requests, please try again", 429, "RATE_LIMIT_EXCEEDED")
            if(desicion.reason.isBot()) return ResponseUtil.error(res, "Bot Detected!", 403, "FORBIDDEN")

            res.status(403).json({error: "Access Denied."})
        }

        next()
    } catch (error){
         console.log(`Arcjet middleware error: ${error}`);
         next(error);
    }
}

export default arcjetMiddleware;