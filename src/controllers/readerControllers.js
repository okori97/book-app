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
  const { id } = req.params;
  const reader = await Reader.findOne({
    where: { id: id },
    raw: true,
    attributes: ['name', 'email', 'id'],
  });
  req.body = reader;
  res.status(200).json(req.body);
};
