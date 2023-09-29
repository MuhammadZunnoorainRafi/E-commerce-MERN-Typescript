import express from 'express';
import {
  delUserController,
  logController,
  regController,
  updateController,
} from '../controller/authControllers';
const authRouter = express.Router();

authRouter.post('/reg', regController);
authRouter.post('/log', logController);
authRouter.post('/upd', updateController);
authRouter.delete('/del', delUserController);

export default authRouter;
