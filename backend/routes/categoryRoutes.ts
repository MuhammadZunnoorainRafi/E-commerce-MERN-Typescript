import express from 'express';
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
} from '../controller/categoryController';
const categoryRoutes = express.Router({ mergeParams: true });

categoryRoutes.post('/:id/category', createCategoryController);
categoryRoutes.get('/:id/category', getCategoryController);
categoryRoutes.delete('/:id/category', deleteCategoryController);

export default categoryRoutes;
