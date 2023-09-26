import express from 'express';
import {
  logController,
  regController,
  updateController,
} from '../controller/authControllers';
const authRouter = express.Router();

authRouter.post('/reg', regController);
authRouter.post('/log', logController);
authRouter.post('/upd', updateController);

export default authRouter;
