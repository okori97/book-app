import {
  requestError,
  isContentTypeJson,
} from '../utils/functions/validation.js';

import {
  createItem,
  findItem,
  updateItem,
  deleteItem,
  findItemByID,
} from '../utils/functions/queries.js';

export const createGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await createItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};

export const findAll = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};

export const findGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await findItemByID('genre', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};
export const updateGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};
export const deleteGenre = async (req, res, next) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('genre', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }

  next();
};
