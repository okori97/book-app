import express from 'express';
import {
  createReader,
  findAll,
  findReader,
  updateReader,
} from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.post('/', createReader);
readerRoutes.get('/', findAll);
readerRoutes.get('/:id', findReader);
readerRoutes.patch('/:id', updateReader);

export default readerRoutes;
