import express from 'express';
import { createProductController } from '../controller/productController';
import { protect } from '../middlewares/authMiddleware';
const productRoute = express.Router({ mergeParams: true });

productRoute.post('/:id/product', protect, createProductController);

export default productRoute;
