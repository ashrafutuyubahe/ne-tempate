import {NextFunction, Request, Response} from "express";
import {ResponseUtil} from "../../core/utils/response.util";
import {userService} from "./user.service";

class UserController{

    private static instance: UserController | null = null;

    async getUserProfile(req: Request, res: Response, next: NextFunction ) {
        try {
            const result = await userService.getUserProfile(req.user.id);
            return ResponseUtil.success(res, result)
        } catch (error){
            next(error);
        }
    }

    async updateUserProfile(req: Request, res: Response, next: NextFunction ) {
        try {
            const userId = req.user.id;
            const {firstName, lastName} = req.body;
            const result = await userService.updateUserProfile(userId, {firstName, lastName});
            return ResponseUtil.success(res, result)
        } catch (error){
            next(error);
        }
    }

    async changePassword(req: Request, res: Response, next: NextFunction ) {
        try {
            const userId = req.user.id;
            const {currentPassword, newPassword} = req.body;
            const result = await userService.changePassword(userId, currentPassword, newPassword);
            return ResponseUtil.success(res, result)
        } catch (error){
            next(error);
        }
    }

    async getUserStats(req: Request, res: Response, next: NextFunction ) {
        try {
            return ResponseUtil.success(res, "Calling get user stats")
        } catch (error){
            next(error);
        }
    }

    public static getInstance(){
        if(!UserController.instance){
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
}

export const userController = UserController.getInstance();