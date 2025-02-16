import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  avatar: z.instanceof(File).optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
