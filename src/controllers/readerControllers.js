import {
  modelError,
  isContentTypeJson,
  requestError,
} from '../utils/functions/validation.js';
import {
  createItem,
  deleteItem,
  findItem,
  updateItem,
} from '../utils/functions/queries.js';

export const createReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await createItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    await findItem('reader', req, res);
  } catch (error) {
    modelError(error, res);
  }
};

export const findReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await findItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

//Patch

export const updateReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};

export const deleteReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    modelError(error, res);
  }
};
