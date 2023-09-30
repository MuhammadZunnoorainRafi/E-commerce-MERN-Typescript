import express from 'express';
import storeRoutes from './storeRoutes';
import colorRoutes from './colorRoutes';
import sizeRoutes from './sizeRoutes';

const adminRoutes = express.Router();
adminRoutes.use('/', storeRoutes);
adminRoutes.use('/', colorRoutes);
adminRoutes.use('/', sizeRoutes);

export default adminRoutes;
