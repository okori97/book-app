import express from 'express';
import {
  createReader,
  findAll,
  findReader,
  updateReader,
  deleteReader,
} from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.post('/', createReader);
readerRoutes.get('/', findAll);
readerRoutes.get('/:id', findReader);
readerRoutes.patch('/:id', updateReader);
readerRoutes.delete('/:id', deleteReader);

export default readerRoutes;
