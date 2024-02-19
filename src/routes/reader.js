import express from 'express';
import {
  createReader,
  findAll,
  findReader,
  updateReader,
  deleteReader,
} from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.route('/').get(findAll).post(createReader);
readerRoutes
  .route('/:id')
  .get(findReader)
  .patch(updateReader)
  .delete(deleteReader);

export default readerRoutes;
