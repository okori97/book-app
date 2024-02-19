import express from 'express';
import {
  createAuthor,
  findAuthor,
  findAll,
  updateAuthor,
} from '../controllers/authorControllers.js';

const authorRouter = express.Router();

authorRouter.route('/').post(createAuthor).get(findAll);
authorRouter.route('/:id').get(findAuthor).patch(updateAuthor);

export default authorRouter;
