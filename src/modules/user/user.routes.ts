import {NextFunction, Request, Response, Router} from "express";
import {userController} from "./user.controller";
import {authMiddleware} from "../../core/middleware/auth.middleware";
import {validateRequest} from "../auth/auth-dtos.validation";
import {changePasswordSchema, updateProfileSchema} from "./user-dtos.validation";

const router = Router()

// Use auth middleware all of them.
router.use(authMiddleware)

router.get('/profile',
    async (req: Request, res: Response, next: NextFunction) => await userController.getUserProfile(req, res, next)
);
router.get('/user-stats',
    async (req: Request, res: Response, next: NextFunction) => await userController.getUserStats(req, res, next))
router.patch('/profile', validateRequest(updateProfileSchema),
    async (req: Request, res: Response, next: NextFunction) => await userController.updateUserProfile(req, res, next));
router.patch('/change-password', validateRequest(changePasswordSchema),
    async (req: Request, res: Response, next: NextFunction) => await userController.changePassword(req, res, next));

export default router;

