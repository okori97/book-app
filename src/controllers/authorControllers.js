import {
  requestError,
  isContentTypeJson,
  modelError,
} from '../utils/functions/validation.js';

import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../utils/functions/queries.js';

export const createAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await createItem('author', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('author', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};

export const findAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('author', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};

export const updateAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('author', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};
export const deleteAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('author', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }

  next();
};
