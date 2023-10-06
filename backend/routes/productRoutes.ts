import express from 'express';
import { createProductController } from '../controller/productController';
const productRoute = express.Router({ mergeParams: true });

productRoute.post('/:id/product', createProductController);

export default productRoute;
