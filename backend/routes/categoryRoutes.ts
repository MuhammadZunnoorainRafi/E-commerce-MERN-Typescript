import express from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
} from '../controller/categoryController';
import { protect } from '../middlewares/authMiddleware';
const categoryRoutes = express.Router({ mergeParams: true });

categoryRoutes.get('/:id/category', getCategoryController);
categoryRoutes.post('/:id/category', protect, createCategoryController);
categoryRoutes.delete('/:id/category', protect, deleteCategoryController);

export default categoryRoutes;
