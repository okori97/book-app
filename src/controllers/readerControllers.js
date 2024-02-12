import { Reader } from '../models/index.js';

export const createReader = async (req, res) => {
  const reader = await Reader.create({
    name: `${req.body.name}`,
    email: `${req.body.email}`,
  });
  req.body.id = reader.id;
  res.status(201).json(req.body);
};

export const findAll = async (req, res) => {
  const readers = await Reader.findAll({
    raw: true,
    attributes: ['name', 'email', 'id'],
  });
  req.body = readers;
  res.json(req.body);
};

export const findReader = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
};
