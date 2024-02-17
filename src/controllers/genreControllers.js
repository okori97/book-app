import { Genre } from '../models/index.js';
import {
  requestError,
  isContentTypeJson,
  modelError,
} from '../utils/functions/validation.js';

import {
  createItem,
  deleteItem,
  updateItem,
  findItem,
} from '../utils/functions/queries.js';

export const createGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await createItem(Genre, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
