import {PrismaClient } from "../generated-prisma-client/prisma";

class PrismaClientInstance {
    private static instance: PrismaClient | null = null;

    public static getInstance() {
        if(!PrismaClientInstance.instance) {
            PrismaClientInstance.instance = new PrismaClient();
        }
        return PrismaClientInstance.instance;
    }
}

export const prismaClient = PrismaClientInstance.getInstance()

