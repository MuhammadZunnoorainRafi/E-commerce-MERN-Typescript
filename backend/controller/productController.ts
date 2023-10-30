import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';
import { productPatchSchema } from '../utils/schemas';
import { fromZodError } from 'zod-validation-error';
import { IRequest } from '../middlewares/authMiddleware';

export const createProductController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }

    const { name, image, categoryId, sizes, price, colorId, description } =
      req.body;

    if (
      !name ||
      !sizes ||
      !description ||
      !price ||
      !image ||
      !categoryId ||
      !colorId
    ) {
      res.status(400).json({ error: 'fill all fields' });
    }

    const newProduct = await prismaDB.product.create({
      data: {
        name,
        storeId: req.params.id,
        images: {
          createMany: {
            data: [...image.map((val: { url: string }) => val)],
          },
        },
        size: {
          createMany: {
            data: [...sizes.map((val: { label: string }) => val)],
          },
        },
        categoryId,
        price,
        description,
        colorId,
      },
    });
    if (newProduct) {
      res.status(200).json(newProduct);
    } else {
      throw new Error('NO product created');
    }
  }
);

export const updateProductController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const validation = productPatchSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400);
      res.json(fromZodError(validation.error));
    }
  }
);
