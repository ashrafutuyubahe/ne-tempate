import {Redis} from "ioredis";
import {REDIS_URL} from "./env";
import {logger} from "./logger";

class RedisClient {
    private static instance: Redis | null = null;

    public static getInstance(){
        if(!RedisClient.instance){
            RedisClient.instance = new Redis(REDIS_URL!);
            RedisClient.instance.on("connect", () => logger.info("Redis connected successfully."))
            RedisClient.instance.on("disconnect", () => logger.info("Redis disconnected successfully."))
            RedisClient.instance.on("error", () => logger.error("There was an error occurred in redis connection instance."));
        }
        return RedisClient.instance;
    }
}

export const redisClient = RedisClient.getInstance();