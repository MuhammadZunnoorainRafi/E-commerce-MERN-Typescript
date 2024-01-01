import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';
import { IRequest } from '../middlewares/authMiddleware';

export const createCategoryController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      res.status(400).json({
        error: 'name or id not found',
      });
    }

    const category = await prismaDB.category.create({
      data: {
        name,
        storeId: id,
      },
    });

    if (category) {
      res.status(201).json(category);
    } else {
      res.status(401).json({
        error: 'Something went wrong in creating category',
      });
    }
  }
);
export const updateCategoryController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const { name, categoryId } = req.body;
    const { id } = req.params;

    if (!name || !id || !categoryId) {
      res.status(400).json({
        error: 'name or id or categoryId not found',
      });
    }

    const category = await prismaDB.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    if (category) {
      res.status(201).json(category);
    } else {
      res.status(401).json({
        error: 'Something went wrong in creating category',
      });
    }
  }
);

export const getCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    const getCategory = await prismaDB.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (getCategory) {
      res.status(200).json(getCategory);
    } else {
      res.status(400).json({
        error: 'Error found in categories',
      });
    }
  }
);

export const deleteCategoryController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const { id } = req.body;
    if (!id) {
      res.status(400).json({
        error: 'Id not found',
      });
    }
    const deleteCategory = await prismaDB.category.delete({
      where: {
        id: id,
      },
    });
    if (deleteCategory) {
      res.status(200).json({ message: 'category deleted' });
    } else {
      res.status(400).json({
        error: 'Something went wrong in category',
      });
    }
  }
);
