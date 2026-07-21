import { z } from "zod";

const userNameError = "Alphabets and numbers only";
const passwordError = "Minimum length must be 8";
const emailError = "Enter a valid email";

const createUserSchema = z.object({
  username: z.coerce
    .string()
    .trim()
    .toLowerCase()
    .min(4, "Username must be at least 4 characters")
    .max(15, "Username cannot exceed 15 characters")
    .regex(/^[a-z0-9]+$/, "Only letters and numbers are allowed"),

  email: z.coerce.string().trim().toLowerCase().email(emailError),

  password: z.coerce.string().trim().min(8, passwordError),
});

const loginUserSchema = z.object({
  field:
    z.coerce
      .string()
      .trim()
      .toLowerCase()
      .min(4, "Username must be at least 4 characters")
      .max(15, "Username cannot exceed 15 characters")
      .regex(/^[a-z0-9]+$/, "Only letters and numbers are allowed") ||
    z.coerce.string().trim().toLowerCase().email(emailError),

  password: z.coerce.string().min(8, passwordError),
});

export { createUserSchema, loginUserSchema };
