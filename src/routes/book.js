import express from 'express';
import {
  findAll,
  createBook,
  findBook,
  updateBook,
  deleteBook,
} from '../controllers/bookControllers.js';
const bookRouter = express.Router();

bookRouter.get('/', findAll);
bookRouter.get('/:id', findBook);
bookRouter.patch('/:id', updateBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.post('/', createBook);

export default bookRouter;
