import express from 'express';
import {
  createProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
} from '../controller/productController';
import { protect } from '../middlewares/authMiddleware';
const productRoute = express.Router({ mergeParams: true });

productRoute.post('/:id/product', protect, createProductController);
productRoute.patch('/:id/product', protect, updateProductController);
productRoute.get('/:id/product', getProductController);
productRoute.get('/:id/product/:slug', getSingleProductController);

export default productRoute;
