import express from 'express';
import {
  createColorController,
  deleteColorController,
  getColorController,
} from '../controller/colorController';
import { protect } from '../middlewares/authMiddleware';
const colorRoutes = express.Router({ mergeParams: true });

colorRoutes.get('/:id/color', getColorController);
colorRoutes.post('/:id/color', protect, createColorController);
colorRoutes.delete('/:id/color', protect, deleteColorController);

export default colorRoutes;
