import { z } from 'zod';

export const productSchema = z.object({
  image: z.any().refine((val) => val?.length > 0, 'Select Images'),
  name: z.string().nonempty('Enter Name'),
  description: z.string().nonempty('Enter description'),
  stock: z
    .number({
      invalid_type_error: 'Enter stock',
    })
    .nonnegative('Enter positive number'),
  price: z
    .number({
      invalid_type_error: 'Enter Price ',
    })
    .nonnegative('Enter positive number'),

  categoryId: z.string().nonempty('Select Category'),
  colorId: z.string().nonempty('Select Color'),
  sizes: z.any().refine((val) => val.length > 0, 'Enter Sizes'),
});

export const productEditSchema = z.object({
  image: z
    .any()
    .refine((val) => val?.length > 0, 'Select Images')
    .optional(),
  name: z.string().nonempty('Enter Name'),
  description: z.string().nonempty('Enter description'),
  stock: z
    .number({
      invalid_type_error: 'Enter stock',
    })
    .nonnegative('Enter positive number'),
  price: z
    .number({
      invalid_type_error: 'Enter Price ',
    })
    .nonnegative('Enter positive number'),

  categoryId: z.string().nonempty('Select Category'),
  colorId: z.string().nonempty('Select Color'),
  sizes: z.any().refine((val) => val.length > 0, 'Enter Sizes'),
});
