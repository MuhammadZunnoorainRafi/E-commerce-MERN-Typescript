import express from 'express';
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
} from '../controller/productController';
import { protect } from '../middlewares/authMiddleware';
const productRoute = express.Router({ mergeParams: true });

productRoute.post('/:id/product', protect, createProductController);
productRoute.put('/:id/product', protect, updateProductController);
productRoute.delete('/:id/product', protect, deleteProductController);
productRoute.get('/:id/product', getProductController);
productRoute.get('/:id/product/:productId', getSingleProductController);

export default productRoute;
