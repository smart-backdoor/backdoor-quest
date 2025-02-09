import { z } from 'zod';

const emailSchema = z.string().email('Invalid email');
const passwordSchema = z.string().min(5, 'The password is weak');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required field'),
  email: emailSchema,
  password: passwordSchema,
});
