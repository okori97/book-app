import express from 'express';
import { findAll, createBook } from '../controllers/bookControllers.js';
const bookRouter = express.Router();

bookRouter.get('/', findAll);
bookRouter.post('/', createBook);

export default bookRouter;
