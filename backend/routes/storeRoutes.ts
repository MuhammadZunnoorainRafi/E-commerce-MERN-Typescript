import express from 'express';
import {
  createStoreController,
  getStoreController,
} from '../controller/storeController';
import { protect } from '../middlewares/authMiddleware';
const storeRoutes = express.Router({ mergeParams: true });

storeRoutes.get('/:id', getStoreController);
storeRoutes.post('/store', protect, createStoreController);

export default storeRoutes;
