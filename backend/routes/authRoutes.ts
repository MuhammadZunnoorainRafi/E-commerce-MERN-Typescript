import express from 'express';
import { logController, regController } from '../controller/authControllers';
const authRouter = express.Router();

authRouter.post('/reg', regController);
authRouter.post('/log', logController);

export default authRouter;
