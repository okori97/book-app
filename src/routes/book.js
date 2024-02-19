import express from 'express';
import {
  findAll,
  createBook,
  findBook,
  updateBook,
  deleteBook,
} from '../controllers/bookControllers.js';

const bookRouter = express.Router();

bookRouter.route('/').get(findAll).post(createBook);
bookRouter.route('/:id').get(findBook).patch(updateBook).delete(deleteBook);

export default bookRouter;
