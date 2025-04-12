import {z} from "zod";

export const updateProfileSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
}).refine( data => Object.keys(data).length > 0, {
    message: "At least one field must be provided.",
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8).max(100),
}).refine(data => data.currentPassword !== data.newPassword, {
    message: "New Password must be different from the current password.",
    path: ["newPassword"],
});