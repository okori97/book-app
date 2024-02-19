import express from 'express';
import {
  createGenre,
  findGenre,
  findAll,
  updateGenre,
  deleteGenre,
} from '../controllers/genreControllers.js';

const genreRouter = express.Router();

genreRouter.route('/').post(createGenre).get(findAll);
genreRouter.route('/:id').get(findGenre).patch(updateGenre).delete(deleteGenre);

export default genreRouter;
