import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';

export const createColorController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      res.status(400).json({
        error: 'name or id not found',
      });
    }

    const color = await prismaDB.color.create({
      data: {
        name,
        storeId: id,
      },
    });

    if (color) {
      res.status(201).json(color);
    } else {
      res.status(401).json({
        error: 'Something went wrong in creating color',
      });
    }
  }
);
