import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';

export const createProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, image, categoryId } = req.body;

    if (!image || !name || !categoryId) {
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
      },
    });
    if (newProduct) {
      res.status(200).json(newProduct);
    } else {
      throw new Error('NO product created');
    }
  }
);
