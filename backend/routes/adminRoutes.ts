import express from 'express';
import storeRoutes from './storeRoutes';
import colorRoutes from './colorRoutes';
import sizeRoutes from './sizeRoutes';
import categoryRoutes from './categoryRoutes';
import productRoute from './productRoutes';

const adminRoutes = express.Router();
adminRoutes.use('/', storeRoutes);
adminRoutes.use('/', colorRoutes);
adminRoutes.use('/', sizeRoutes);
adminRoutes.use('/', categoryRoutes);
adminRoutes.use('/', productRoute);

export default adminRoutes;
