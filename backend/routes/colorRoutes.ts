import express from 'express';
import { createColorController } from '../controller/colorController';
const colorRoutes = express.Router({ mergeParams: true });

colorRoutes.post('/:id/color', createColorController);

export default colorRoutes;
