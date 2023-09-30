import express from 'express';
import {
  createColorController,
  deleteColorController,
  getColorController,
} from '../controller/colorController';
const colorRoutes = express.Router({ mergeParams: true });

colorRoutes.post('/:id/color', createColorController);
colorRoutes.get('/:id/color', getColorController);
colorRoutes.delete('/:id/color', deleteColorController);

export default colorRoutes;
