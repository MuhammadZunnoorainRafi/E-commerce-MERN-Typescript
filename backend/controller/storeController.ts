import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';
import { IRequest } from '../middlewares/authMiddleware';

export const createStoreController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const { userId, name } = req.body;
    if (!userId || !name) {
      res.status(401).json({ error: 'fill all fields of store' });
    }

    const response = await prismaDB.store.create({
      data: {
        name,
        userId,
      },
    });

    if (!response) {
      res.status(401);
      throw new Error('Store not created');
    } else {
      res.status(201).json({
        message: 'Store created',
      });
    }
  }
);

export const getStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await prismaDB.store.findUnique({
      where: {
        id,
      },
    });
    if (!response) {
      res.status(401);
      throw new Error('Store not found');
    } else {
      res.status(200);
      res.json(response);
    }
  }
);
