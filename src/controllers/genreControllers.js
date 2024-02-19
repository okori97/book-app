import { Genre } from '../models/index.js';
import {
  requestError,
  isContentTypeJson,
  modelError,
} from '../utils/functions/validation.js';

import {
  createItem,
  findItem,
  updateItem,
  deleteItem,
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

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem(Genre, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};

export const findGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem(Genre, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
export const updateGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem(Genre, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
export const deleteGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem(Genre, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
