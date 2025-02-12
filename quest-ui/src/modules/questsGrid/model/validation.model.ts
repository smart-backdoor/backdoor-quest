import { z } from 'zod';

export const validationSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(255, { message: 'Title must be less than 255 characters' }),
  description: z
    .string()
    .max(1000, { message: 'Description must be less than 1000 characters' })
    .optional()
    .or(z.literal('')),
  timeLimit: z
    .number()
    .min(1, { message: 'Time limit must be at least 1 min' }),
  file: z.union([z.instanceof(File), z.string()]).optional(),
  tasks: z
    .array(
      z.object({
        title: z
          .string()
          .min(2, { message: 'Task title must be at least 2 characters' })
          .max(255, { message: 'Task title must be less than 255 characters' }),
        isCorrect: z.boolean(),
        answers: z
          .array(
            z.object({
              title: z.string().min(1, { message: 'Answer must not be empty' }),
              isCorrect: z.boolean(),
            })
          )
          .min(1, { message: 'At least one answer is required' }),
      })
    )
    .min(1, { message: 'At least one task is required' }),
});

export type ValidationSchema = z.infer<typeof validationSchema>;
