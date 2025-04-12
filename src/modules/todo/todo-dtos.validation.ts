import {z} from "zod"

export const createTodoSchema = z.object({
    title: z.string().min(10).max(100),
    description: z.string().max(500).optional()
})

export const updateTodoSchema = z.object({
    title: z.string().min(10).max(100).optional(),
    description: z.string().max(500).optional(),
    completed: z.boolean().optional()
}).refine(data => Object.keys(data).length > 0, {
    message: "At least one field should be specified."
})