import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prismaDB from '../config/prismaDB';
import asyncHandler from 'express-async-handler';

interface IUserType {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  isAdmin: false;
  createdAt: Date;
  updatedAt: Date;
}

interface IAdminType {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  isAdmin: true;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRequest extends Request {
  user?: IUserType;
  admin?: IAdminType;
}

interface IDecodedToken {
  id: string;
}

export const protect = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        token = authorization.split(' ')[1];
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as IDecodedToken;
        req.user = (await prismaDB.user.findUnique({
          where: { id: decodedToken.id, isAdmin: false },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        })) as IUserType;

        req.admin = (await prismaDB.user.findUnique({
          where: { id: decodedToken.id, isAdmin: true },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isAdmin: true,
          },
        })) as IAdminType;

        next();
      } catch (error) {
        res.status(400);
        throw new Error('Not Authorized');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Token not found');
    }
  }
);
