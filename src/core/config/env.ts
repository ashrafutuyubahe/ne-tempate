import {config } from "dotenv"

const envFile = ".env"

config({ path: envFile})

export const {
    PORT,
    NODE_ENV,
    DATABASE_URL,
    REDIS_URL,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY,
    ARCJET_KEY,
    ARCJET_ENV,
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS
} = process.env