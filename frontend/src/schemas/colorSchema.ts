import { z } from 'zod';

export const colorSchema = z.object({
  name: z
    .string()
    .nonempty('Enter Name')
    .min(3, 'Color must be above 2 characters '),
  hexCode: z.string().nonempty('Enter Hex Code'),
});
