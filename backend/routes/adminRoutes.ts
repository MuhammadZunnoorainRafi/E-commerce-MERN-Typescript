import express from 'express';
import storeRoutes from './storeRoutes';
import colorRoutes from './colorRoutes';

const adminRoutes = express.Router();
adminRoutes.use('/', storeRoutes);
adminRoutes.use('/', colorRoutes);

export default adminRoutes;
