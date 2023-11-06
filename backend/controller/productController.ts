import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import prismaDB from '../config/prismaDB';
import { productPatchSchema } from '../utils/schemas';
import { fromZodError } from 'zod-validation-error';
import { IRequest } from '../middlewares/authMiddleware';
import { genSlug } from '../utils/genSlug';

export const createProductController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }

    const {
      name,
      image,
      categoryId,
      sizes,
      price,
      colorId,
      description,
      stock,
    } = req.body;

    if (
      !name ||
      !sizes ||
      !description ||
      !price ||
      !image ||
      !categoryId ||
      !colorId ||
      !stock
    ) {
      res.status(400).json({ error: 'fill all fields' });
    }

    const newProduct = await prismaDB.product.create({
      data: {
        name,
        storeId: req.params.id,
        slug: genSlug(name),
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
        stock,
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
      return;
    }

    const updatedProduct = await prismaDB.product.update({
      data: {
        ...req.body,
      },
      where: {
        id: req.body.id,
      },
    });

    if (updatedProduct) {
      res.status(200).send('Product is updated');
    } else {
      res.status(400);
      throw new Error('Product is not updated');
    }
  }
);

export const getProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const allProducts = await prismaDB.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
      },
    });
    if (allProducts) {
      res.status(200).json(allProducts);
    } else {
      res.status(400).json('Getting products error');
    }
  }
);

export const getSingleProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const singleProduct = await prismaDB.product.findUnique({
      where: {
        slug: req.params.slug,
      },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
      },
    });

    if (!singleProduct) {
      res.status(400);
      throw new Error('Product not found');
    } else {
      res.status(200).json(singleProduct);
    }
  }
);

export const deleteProductController = asyncHandler(
  async (req: IRequest, res: Response) => {
    if (!req.admin) {
      res.status(401);
      throw new Error('Only Admin is Authorized for this route');
    }
    const { id } = req.body;
    if (!id) {
      res.status(401);
      throw new Error('Product ID not found');
    }

    const deleteProduct = await prismaDB.product.delete({
      where: {
        id: id,
      },
    });
    if (deleteProduct) {
      res.status(200).json({ message: 'Deleted successfully' });
    } else {
      res.status(400);
      throw new Error('Product is not deleted');
    }
  }
);
