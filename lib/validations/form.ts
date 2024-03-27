import { z } from "zod"

export const loginFormSchema = z.object({
    email: z
        .string({
            required_error: "E-mail is required",
            invalid_type_error: "E-mail must be a string",
        })
        .trim()
        .email()
        .min(4)
        .max(256),
    password: z.string().trim().min(6).max(512),
})
