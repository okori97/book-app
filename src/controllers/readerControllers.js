import { Reader } from '../models/index.js';

export const createReader = async (req, res) => {
  const reader = await Reader.create({
    name: `${req.body.name}`,
    email: `${req.body.email}`,
  });
  req.body.id = reader.id;
  res.json(req.body);

  res.sendStatus(200);
};

export const findAll = async (req, res) => {
  const readers = await Reader.findAll({
    raw: true,
    attributes: ['name', 'email'],
  });
  req.body = readers;
  res.json(req.body);
};
