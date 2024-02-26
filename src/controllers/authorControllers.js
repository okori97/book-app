import {
  requestError,
  isContentTypeJson,
} from '../utils/functions/validation.js';

import {
  createItem,
  deleteItem,
  findItem,
  findItemByID,
  updateItem,
} from '../utils/functions/queries.js';

export const createAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await createItem('author', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('author', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};

export const findAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItemByID('author', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};

export const updateAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('author', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};
export const deleteAuthor = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('author', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};
