import {z} from 'zod'
import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../core/utils/response.util";

export const registerSchema = z.object({
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const verifyAccountSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

export const resetPasswordSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
    newPassword: z.string().min(8).max(100),
})


export function validateRequest(schema: z.Schema){
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next()
        } catch (error) {
            if (error instanceof z.ZodError)
                return ResponseUtil.error(res, 'Validation Failed', 400, 'VALIDATION_ERROR', error.errors);
            next(error);
        }
    }
}