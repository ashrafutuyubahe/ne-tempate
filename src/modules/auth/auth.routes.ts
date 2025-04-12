import { Router } from "express";
import arcjetMiddleware from "../../core/middleware/rate-limit.middleware";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema, validateRequest, verifyAccountSchema } from "./auth-dtos.validation";
import { authController } from "./auth.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";

const router = Router()

// Protect the apis from ddos attack -- rate-limit protection.
router.use(arcjetMiddleware)

router.post('/register',   
    validateRequest(registerSchema),  
    async (req, res, next) => await authController.register(req, res, next))

router.post('/login', 
    validateRequest(loginSchema),
    async (req, res, next) => await authController.login(req, res, next)
)    

router.patch('/verify-account', 
    validateRequest(verifyAccountSchema),
    async (req, res, next) => await authController.verifyAccount(req, res, next)
)

router.patch('/initiate-forgot-password', 
    validateRequest(forgotPasswordSchema),
    async (req, res, next) => await authController.sendForgotOtpLink(req, res, next)
)

router.patch('/reset-password',  
    validateRequest(resetPasswordSchema),
    async (req, res, next) => await authController.resetPassword(req, res, next)
)

router.get('/regenerate-access-token', 
    async (req, res, next) => await authController.reassureAccessToken(req, res, next)
)

router.get('/logout', authMiddleware,
    async (req, res, next) => await authController.logout(req, res, next)
)

export default router

