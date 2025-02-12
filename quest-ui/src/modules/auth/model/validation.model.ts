import { z } from 'zod';

const emailSchema = z.string().email('Invalid email');
const passwordSchema = z
  .string()
  .min(8, 'Password must contain more than 8 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
