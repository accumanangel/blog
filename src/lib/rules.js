import { title } from "process";

const { z } = require("zod");

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Enter a valid email!" }).trim(),
  password: z.string().min(1, { message: "Password is required!" }).trim(),
});

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Enter a valid email" }).trim(),
    password: z
      .string()
      .min(1, { message: "Not be empty" })
      .min(5, { message: "Be at least 5 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password mismatch",
        path: ["confirmPassword"],
      });
    }
  });

export const BlogPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required!" })
    .max(100, { message: "Title cannot be more than 100 characters" })
    .trim(),
  content: z.string().min(1, { message: "Content is required!" }).trim(),
});
