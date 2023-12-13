import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .nonempty('Enter Name')
    .min(3, 'Category must be above 2 characters '),
});
