import { z } from "zod";

const userNameError = {
  min: "Username must be at least 4 characters",
  max: "Username cannot exceed 15 characters",
  regex: "Only letters and numbers are allowed",
};
const passwordError = "Minimum length must be 8";
const emailError = "Enter a valid email";

const usernameSchema = z.coerce
  .string()
  .trim()
  .toLowerCase()
  .min(4, userNameError.min)
  .max(15, userNameError.max)
  .regex(/^[a-z0-9]+$/, userNameError.regex);

const emailSchema = z.coerce.string().trim().toLowerCase().email(emailError);

const passwordSchema = z.coerce.string().trim().min(8, passwordError);

const createUserSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginUserSchema = z.object({
  field: z.union([usernameSchema, emailSchema]),
  password: passwordSchema,
});

const updateUserSchema = z
  .object({
    username: usernameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Please provide at least one field to update",
  });

export { createUserSchema, loginUserSchema, updateUserSchema };
