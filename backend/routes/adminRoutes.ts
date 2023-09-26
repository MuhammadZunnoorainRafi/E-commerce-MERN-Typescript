import express from 'express';
import storeRoutes from './storeRoutes';

const adminRoutes = express.Router();
adminRoutes.use('/', storeRoutes);

export default adminRoutes;
