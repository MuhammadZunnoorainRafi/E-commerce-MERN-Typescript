import { Request, Response } from 'express';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import prismaDB from '../config/prismaDB';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { genToken } from '../utils/genToken';
import { IRequest } from '../middlewares/authMiddleware';

const userSchema = z.object({
  id: z.string().optional(),
  image: z.string(),
  name: z.string(),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be above 5 characters'),
  isAdmin: z.boolean().default(false),
});

// @desc regRoute
// @route /api/auth/reg
// @access public

export const regController = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, image } = req.body;
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(401).json(fromZodError(validation.error));
      return;
    }

    const userExist = await prismaDB.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await prismaDB.user.create({
      data: {
        image,
        name,
        email,
        password: hashedPassword,
      },
    });
    if (createUser) {
      const resUser = {
        _id: createUser.id,
        image: createUser.image,
        name: createUser.name,
        email: createUser.email,
        token: genToken(createUser.id),
        isAdmin: createUser.isAdmin,
        createdAt: createUser.createdAt,
        updatedAt: createUser.updatedAt,
      };

      res.status(201).json(resUser);
    } else {
      res.status(401);
      throw new Error('User not found');
    }
  }
);
export const logController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('fill all fields');
    }

    const userExist = await prismaDB.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist && (await bcrypt.compare(password, userExist.password))) {
      res.status(200).json({
        _id: userExist.id,
        image: userExist.image,
        name: userExist.name,
        email: userExist.email,
        token: genToken(userExist.id),
        isAdmin: userExist.isAdmin,
        createdAt: userExist.createdAt,
        updatedAt: userExist.updatedAt,
      });
    } else {
      res.status(400);
      throw new Error('Invalid Credentials');
    }
  }
);

export const updateController = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { id, name, email, password, image } = req.body;
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(401).json(fromZodError(validation.error));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await prismaDB.user.update({
      where: { id: id },
      data: {
        image,
        name,
        email,
        password: hashedPassword,
      },
    });

    const resUser = {
      _id: createUser.id,
      image: createUser.image,
      name: createUser.name,
      email: createUser.email,
      token: genToken(createUser.id),
      isAdmin: createUser.isAdmin,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    };

    if (resUser) {
      res.status(201).json(resUser);
    } else {
      res.status(401);
      throw new Error('User not found');
    }
  }
);

export const delUserController = asyncHandler(
  async (req: IRequest, res: Response) => {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({
        error: 'ID not found',
      });
    }

    const response = await prismaDB.user.delete({
      where: {
        id: id,
      },
    });

    if (response) {
      res.status(200).json({ message: 'User Deleted' });
    } else {
      res.status(400).json({ error: 'Something went wrong' });
    }
  }
);
