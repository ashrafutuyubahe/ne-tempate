import { Router } from "express";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validateRequest } from "../auth/auth-dtos.validation";
import { todoController } from "./todo.controller";
import {Request, Response, NextFunction} from "express"
import { createTodoSchema, updateTodoSchema } from "./todo-dtos.validation";

const router = Router()

router.use(authMiddleware)

router.get('/', async (req: Request, res: Response, next: NextFunction) => await todoController.getAllTodos(req, res, next))

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => await todoController.getTodoById(req, res, next))

router.post("/", validateRequest(createTodoSchema) , async(req: Request, res: Response, next: NextFunction) => await todoController.createTodo(req, res, next))

router.patch("/:id", validateRequest(updateTodoSchema), async(req: Request, res: Response, next: NextFunction) => await todoController.updateTodo(req, res, next))

router.delete("/:id",  async(req: Request, res: Response, next: NextFunction) => await todoController.deleteTodo(req, res, next ))

export default router