import express from 'express';
import { createGenre } from '../controllers/genreControllers.js';

const genreRouter = express.Router();

genreRouter.post('/', createGenre);
genreRouter.patch('/:id', async (req, res, next) => {
  console.log('This is a patch');
  next();
});

export default genreRouter;
