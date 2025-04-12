import {prismaClient} from "../../core/config/prisma.instance";
import {ConflictException, NotFoundException} from "../../core/exceptions/http.exception";
import bcrypt from "bcrypt";
import { z } from "zod";
import {registerSchema} from "../auth/auth-dtos.validation";

class UserService {
    private static instance: UserService | null = null;

    async createUser(userData: z.infer<typeof registerSchema>){
        const {firstName, lastName, email, password} = userData;
        const user = await prismaClient.user.findUnique({
            where: { email },
        })

        if(user)
            throw new ConflictException("User with the email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prismaClient.user.create({
            data: {
                firstName, lastName, email, password: hashedPassword,
            }
        })

        return {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email
        }
    }

    async getUserProfile(userId: string) {
        const user = await prismaClient.user.findUnique({
            where: {id: userId},
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        return user;
    }

    async updateUserProfile(userId: string, data: {firstName?: string, lastName?: string}) {
        const user = await prismaClient.user.findUnique({
            where: {id: userId},
        })

        if (!user) {
            throw new NotFoundException("User not found.");
        }
        return prismaClient.user.update({
            where: {id: userId},
            data,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    }

    async changePassword(userId: string, currentPassword: string, newPassword: string) {
        const user = await prismaClient.user.findUnique({
            where: {id: userId},
        })

        if (!user) {
            throw new NotFoundException("User not found.");
        }

        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if(!isValidPassword) {
            throw new ConflictException("Current password is incorrect.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prismaClient.user.update({
            where: {id: userId},
            data: { password: hashedPassword }
        })

        return {success: true};
    }

    async getUserStats(userId: string) {
        console.log("Getting user stats")
    }


    public static getInstance(){
        if(!UserService.instance){
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}

export const userService = UserService.getInstance()