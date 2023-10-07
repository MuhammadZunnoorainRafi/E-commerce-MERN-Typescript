import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';

export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, image, categoryId, sizes, price, colorId, description } =
      req.body;

    if (
      !image ||
      !name ||
      !categoryId ||
      !sizes ||
      !price ||
      !colorId ||
      !description
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
