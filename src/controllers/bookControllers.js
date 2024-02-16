import { Book } from '../models/index.js';
import handleError from '../utils/functions/handleError.js';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../utils/functions/queries.js';

export const createBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      await createItem(Book, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      await findItem(Book, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const findBook = async (req, res) => {
  try {
    await findItem(Book, req, res);
  } catch (error) {
    handleError(error, res);
  }
};

export const updateBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      updateItem(Book, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      deleteItem(Book, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};
