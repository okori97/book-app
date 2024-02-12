import express from 'express';
import { createReader, findAll } from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.post('/', createReader);
readerRoutes.get('/', findAll);

export default readerRoutes;
