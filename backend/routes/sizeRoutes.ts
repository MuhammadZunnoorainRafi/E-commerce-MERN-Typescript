import express from 'express';
import {
  createSizeController,
  deleteSizeController,
  getSizeController,
} from '../controller/sizeController';
const sizeRoutes = express.Router({ mergeParams: true });

sizeRoutes.post('/:id/size', createSizeController);
sizeRoutes.get('/:id/size', getSizeController);
sizeRoutes.delete('/:id/size', deleteSizeController);

export default sizeRoutes;
