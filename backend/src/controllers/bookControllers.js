import {
  isContentTypeJson,
  requestError,
} from '../utils/functions/validation.js';
import {
  createItem,
  deleteItem,
  findItem,
  findItemByID,
  updateItem,
} from '../utils/functions/queries.js';

export const createBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await createItem('book', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

export const findAll = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await findItem('book', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

export const findBook = async (req, res) => {
  try {
    await findItemByID('book', req, res);
  } catch (error) {
    console.error;
  }
};

export const updateBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('book', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

export const deleteBook = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('book', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};
