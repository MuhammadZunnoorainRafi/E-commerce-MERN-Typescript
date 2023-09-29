import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';

export const createSizeController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      res.status(400).json({
        error: 'name or id not found',
      });
    }

    const size = await prismaDB.size.create({
      data: {
        name,
        storeId: id,
      },
    });

    if (size) {
      res.status(201).json(size);
    } else {
      res.status(401).json({
        error: 'Something went wrong in creating size',
      });
    }
  }
);
