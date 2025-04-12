import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET } from "../config/env";
import { JwtPayload } from '../middleware/auth.middleware';


export class TokenUtil {
    static  generateAccessToken(userId: string): string {
        return jwt.sign({userId}, ACCESS_TOKEN_SECRET!, {
            expiresIn: ACCESS_TOKEN_EXPIRY
        })
    }

    static async generateRefreshToken(userId: string): Promise<string> {
        const refreshToken = jwt.sign({ userId },REFRESH_TOKEN_SECRET!, {
            expiresIn: REFRESH_TOKEN_EXPIRY,
        });
        return refreshToken;

    }

    static verifyRefreshToken(token: string){
        try {
            return jwt.verify(token, REFRESH_TOKEN_SECRET!) as JwtPayload
        } catch(error){
            throw error
        }
    }
}