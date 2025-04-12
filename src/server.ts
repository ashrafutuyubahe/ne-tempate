import {prismaClient} from "./core/config/prisma.instance";
import {logger} from "./core/config/logger";
import app from "./app";

async function bootstrap(){
    try {
        await prismaClient.$connect();
        logger.info("Connected to database successfully!");

        // Start the server/
        app.listen(process.env.PORT, () => {
            logger.info("Server started on port ", process.env.PORT);
        })
    } catch (error) {
        logger.error(`Failed to start the server`, error);
        process.exit(1);
    }
}

bootstrap();