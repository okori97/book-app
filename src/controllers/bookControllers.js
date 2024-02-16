import { Book } from '../models/index.js';
import handleError from '../utils/functions/handleError.js';
import {
  createItem,
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
      const deleteBook = await Book.destroy({
        where: { id: `${req.params.id}` },
      });

      deleteBook != false
        ? res.json({ success: 'Book deleted' })
        : res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};
