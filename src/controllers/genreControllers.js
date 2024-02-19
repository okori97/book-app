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
      ? await createItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};

export const findGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};
export const updateGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};
export const deleteGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};
