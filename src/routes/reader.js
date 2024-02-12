import express from 'express';
import {
  createReader,
  findAll,
  findReader,
} from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.post('/', createReader);
readerRoutes.get('/', findAll);
readerRoutes.get('/:id', findReader);

export default readerRoutes;
