import { Reader } from '../models/index.js';

export const createReader = async (req, res) => {
  try {
    const reader = await Reader.create({
      name: `${req.body.name}`,
      email: `${req.body.email}`,
    });
    res.status(201).json(reader);
  } catch (error) {
    handleError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    const readers = await Reader.findAll({
      raw: true,
      attributes: ['name', 'email', 'id'],
    });
    readers.length == 0
      ? res.status(404).json('No records available')
      : res.json(readers);
  } catch (error) {
    handleError(error, res);
  }
};

export const findReader = async (req, res) => {
  try {
    const { id } = req.params;
    const reader = await Reader.findOne({
      where: { id: id },
      raw: true,
      attributes: ['name', 'email', 'id'],
    });

    if (reader == null) {
      res.status(404).json('Reader not found');
    } else {
      req.body = reader;
      res.status(200).json(reader);
    }
  } catch (error) {
    handleError(error, res);
  }
};

//Patch

export const updateReader = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRecord = await Reader.update(
      { name: `${name}` },
      { where: { id: id } }
    );
    if (updatedRecord == false) {
      res.status(404).json('User does not exist');
    } else {
      res.json(updatedRecord);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteReader = async (req, res) => {
  try {
    console.log('working');
    res.json({});
  } catch (error) {
    handleError(error, res);
  }
};

function handleError(error, res) {
  console.error(error);
  return res.status(500).json({ errorMessage: error });
}
