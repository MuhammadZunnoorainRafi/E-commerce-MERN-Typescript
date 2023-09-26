import express from 'express';
import {
  createStoreController,
  getStoreController,
} from '../controller/storeController';
const storeRoutes = express.Router({ mergeParams: true });

storeRoutes.get('/:id', getStoreController);
storeRoutes.post('/store', createStoreController);

export default storeRoutes;
