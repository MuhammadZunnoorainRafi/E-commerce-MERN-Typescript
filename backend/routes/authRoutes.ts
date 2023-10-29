import express from 'express';
import {
  delUserController,
  logController,
  regController,
  updateController,
} from '../controller/authControllers';
import { protect } from '../middlewares/authMiddleware';
const authRouter = express.Router();

authRouter.post('/reg', regController);
authRouter.post('/log', logController);
authRouter.post('/upd', protect, updateController);
authRouter.delete('/del', protect, delUserController);

export default authRouter;
