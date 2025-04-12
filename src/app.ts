import express from 'express';
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import userRoutes from "./modules/user/user.routes";
import {errorMiddleware} from "./core/middleware/error.middleware";
import {stream} from "./core/config/logger";
import authRoutes from './modules/auth/auth.routes';
import todoRoutes from './modules/todo/todo.routes';
import cookieParser from 'cookie-parser';


// Initialization of application
const app = express();

// Middlewares
app.use(morgan("combined", {stream}))
app.use(helmet())
app.use(cors())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/todos", todoRoutes)


// Health Check Route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK" });
})


// Error Handling middleware.
app.use(errorMiddleware)

export default app;






