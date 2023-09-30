import express from 'express';
import { createSizeController } from '../controller/sizeController';
const sizeRoutes = express.Router({ mergeParams: true });

sizeRoutes.post('/:id/size', createSizeController);

export default sizeRoutes;
