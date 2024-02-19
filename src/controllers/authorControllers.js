import { Author } from '../models/index.js';
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
      ? await createItem(Author, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem(Author, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};

export const findAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem(Author, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};

export const updateAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem(Author, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
export const deleteAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem(Author, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error);
  }

  next();
};
