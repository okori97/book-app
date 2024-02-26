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

export const createReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await createItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

export const findAll = async (req, res) => {
  try {
    await findItem('reader', req, res);
  } catch (error) {
    console.error;
  }
};

export const findReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await findItemByID('reader', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

//Patch

export const updateReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await updateItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};

export const deleteReader = async (req, res) => {
  try {
    isContentTypeJson(req)
      ? await deleteItem('reader', req, res)
      : requestError(res);
  } catch (error) {
    console.error;
  }
};
