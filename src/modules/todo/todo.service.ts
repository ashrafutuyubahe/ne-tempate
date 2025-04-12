import { create } from "domain";
import { prismaClient } from "../../core/config/prisma.instance";
import { BadRequestException } from "../../core/exceptions/http.exception";
import {z} from "zod"
import { createTodoSchema, updateTodoSchema } from "./todo-dtos.validation";

class TodoService {
    private static instance: TodoService | null = null;

    private constructor () {}

    public static getInstance() {
        if(!TodoService.instance)
            TodoService.instance = new TodoService()
        return TodoService.instance
    }

    async createTodo(userId: string, data: z.infer<typeof createTodoSchema>){
        const todo = await prismaClient.todo.create({
            data: {
                ...data,
                userId
            }
        })

        return todo;
    }

    async getAllTodos(userId: string){
        const todos  = await prismaClient.todo.findMany({
            where: {userId},
            orderBy: {createdAt: 'desc'}
        })
        return todos
    }

    async getTodoById(userId: string, todoId: string){
        const todo = await prismaClient.todo.findFirst({
            where: {id: todoId, userId}
        })

        if(!todo)
            throw new BadRequestException("Todo not found.")
        return todo
    }

    async updateTodo(userId: string, todoId: string, data: z.infer<typeof updateTodoSchema>){
        await this.getTodoById(userId,todoId)

        const updatedTodo = await prismaClient.todo.update({
            where: {id: todoId, userId},
            data
        })

        return updatedTodo;
    }
    
    async deleteTodo(userId: string, todoId: string){
        await this.getTodoById(userId, todoId)

        await prismaClient.todo.delete({
            where: {id: todoId, userId}
        })

        return {success: true}
    }
}

export const todoService = TodoService.getInstance()

