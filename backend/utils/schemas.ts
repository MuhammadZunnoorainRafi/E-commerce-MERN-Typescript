import { z } from 'zod';

export const productPatchSchema = z.object({
  image: z
    .any()
    .refine((val) => val?.length > 0, 'Select Images')
    .optional(),
  name: z.string().nonempty('Enter Name').optional(),
  description: z.string().nonempty('Enter description').optional(),
  price: z
    .number({
      invalid_type_error: 'Enter Price ',
    })
    .nonnegative('Enter positive number')
    .optional(),
  // stock: z.number({
  //   invalid_type_error: 'Enter stock',
  // }),

  categoryId: z.string().nonempty('Select Category').optional(),
  // sizeId: z.string().nonempty('Select Size'),
  colorId: z.string().nonempty('Select Color').optional(),
  sizes: z
    .any()
    .refine((val) => val.length > 0, 'Select Sizes')
    .optional(),
});
