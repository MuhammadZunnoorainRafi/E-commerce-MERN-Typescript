import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';

export const createStoreController = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, name } = req.body;
    if (!userId || !name) {
      res.status(401).json({ error: 'fill all fields of store' });
    }

    const isAdminUserId = await prismaDB.user.findUnique({
      where: {
        id: userId,
        isAdmin: true,
      },
    });
    if (isAdminUserId) {
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
    } else {
      res.status(400);
      throw new Error('You are not Admin');
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
