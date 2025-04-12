import {Request, Response, NextFunction} from "express"
import { authService } from "./auth.service"
import { logger } from "../../core/config/logger"
import { ResponseUtil } from "../../core/utils/response.util"
import { NODE_ENV } from "../../core/config/env";
import { BadRequestException } from "../../core/exceptions/http.exception";
import { TokenUtil } from "../../core/utils/token.util";

class AuthController {

    private static instance : AuthController | null = null;

    private constructor () {}

    public static getInstance() {
        if(!AuthController.instance)
            AuthController.instance = new AuthController()
        return AuthController.instance
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = req.body
            const result = await authService.register(userData)
            logger.info(`User registered : ${result.email}`)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction){
        try {
            const loginData = req.body
            const result = await authService.login(loginData)
            logger.info(`User logged in: ${result.user.email} -- ${req.ip}`)
            const {accessToken, refreshToken } = result.tokens
            
            // Set the tokens in HTTP-only cookies
            res.cookie("accessToken", accessToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            })

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            })


            return ResponseUtil.success(res, {
                user: result.user,
                message: "Login Successfully"
            })
        } catch(error){
            next(error)
        }
    }

    async verifyAccount(req: Request, res: Response, next: NextFunction){
        try {
            const verifyAccountData = req.body
            const result = await authService.verifyAccount(verifyAccountData)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async sendForgotOtpLink(req: Request, res: Response, next: NextFunction){
        try {
            const forgotPasswordData = req.body
            const result = await authService.sendForgotPasswordOtp(forgotPasswordData)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction){
        try {
            const result = await authService.resetPassword(req.body)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async reassureAccessToken(req: Request, res: Response, next: NextFunction){
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken)
            throw new BadRequestException("Refresh token is missing.")


        try {
            const payload = TokenUtil.verifyRefreshToken(refreshToken)

            const newAccessToken = TokenUtil.generateAccessToken(payload.userId)
            
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 15 * 60 * 1000
            })

            return ResponseUtil.success(res, {
                message: "New access token generated successfully.",
            })

        } catch(error){
            next(error)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction){
        const refreshToken = req.cookies.refreshToken

        if(!refreshToken)
            throw new BadRequestException("Refresh Token is missing")

        try {
            res.clearCookie("accessToken", {
                httpOnly: true, 
                secure: NODE_ENV === "production",
                sameSite: "strict"
            })
            res.clearCookie("refreshToken", {
                httpOnly: true, 
                secure: NODE_ENV === "production",
                sameSite: "strict"
            })
            logger.info("User logged out successfully.")
            return ResponseUtil.success(res, {
                message: "User logged out successfully"
            })
        } catch(error){
            next(error)
        }
    }
}

export const authController = AuthController.getInstance()