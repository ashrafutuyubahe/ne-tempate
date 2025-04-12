import { NextFunction, Request, Response } from "express";
import { todoService } from "./todo.service";
import { ResponseUtil } from "../../core/utils/response.util";


class TodoController {
    private static instance: TodoController | null = null;

    private constructor () {}

    public static getInstance() {
        if(!TodoController.instance)
            TodoController.instance = new TodoController()
        return TodoController.instance
    }

    async createTodo(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id
            const result = await todoService.createTodo(userId, req.body)
            return ResponseUtil.success(res, result, 201)
        } catch(error){
            next(error)
        }
    }

    async getAllTodos(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id
            const result = await todoService.getAllTodos(userId)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async getTodoById(req: Request, res: Response, next: NextFunction){
        try {const userId = req.user.id
        // todo: Validation along the todoId.
        const todoId = req.params.id
        const result = await todoService.getTodoById(userId, todoId)
        return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async updateTodo(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id
            const todoId = req.params.id
            const result = await todoService.updateTodo(userId, todoId, req.body)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }

    async deleteTodo(req: Request, res: Response, next: NextFunction){
        try {
            const userId = req.user.id
            const todoId = req.params.id
            const result = await todoService.deleteTodo(userId, todoId)
            return ResponseUtil.success(res, result)
        } catch(error){
            next(error)
        }
    }
}


export const todoController = TodoController.getInstance()