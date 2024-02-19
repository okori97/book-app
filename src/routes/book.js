import express from 'express';
import genreRouter from './genres.js';
import {
  findAll,
  createBook,
  findBook,
  updateBook,
  deleteBook,
} from '../controllers/bookControllers.js';

const bookRouter = express.Router();
bookRouter.use('/', genreRouter);

bookRouter.route('/').get(findAll).post(createBook);
bookRouter.route('/:id').get(findBook).patch(updateBook).delete(deleteBook);

export default bookRouter;
