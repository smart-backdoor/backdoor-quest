import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required field'),
  email: z.string().email('Invalid email'),
});
