import { Reader } from '../models/index.js';
import handleError from '../utils/functions/handleError.js';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../utils/functions/queries.js';

export const createReader = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      await createItem(Reader, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    await findItem(Reader, req, res);
  } catch (error) {
    handleError(error, res);
  }
};

export const findReader = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      await findItem(Reader, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

//Patch

export const updateReader = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      updateItem(Reader, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteReader = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      deleteItem(Reader, req, res);
    }
  } catch (error) {
    handleError(error, res);
  }
};
