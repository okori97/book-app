import { Book } from '../models/index.js';
import {
  isContentTypeJson,
  modelError,
  requestError,
} from '../utils/functions/validation.js';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../utils/functions/queries.js';

export const createBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await createItem(Book, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    isContentTypeJson(req) ? await findItem(Book, req, res) : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

export const findBook = async (req, res) => {
  try {
    await findItem(Book, req, res);
  } catch (error) {
    modelError(error, res);
  }
};

export const updateBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await updateItem(Book, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

export const deleteBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem(Book, req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};
