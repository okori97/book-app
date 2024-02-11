import express from 'express';
import { createReader } from '../controllers/readerControllers.js';

const readerRoutes = express.Router();

readerRoutes.post('/', createReader);

export default readerRoutes;
