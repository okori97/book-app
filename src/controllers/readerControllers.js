import setupDatabase from '../models/index.js';
const db = await setupDatabase();
const Reader = db.Reader;

export const createReader = async (req, res) => {
  const reader = await Reader.create({
    name: `${req.body.name}`,
    email: `${req.body.email}`,
  });
  req.body.id = reader.id;
  res.json(req.body);

  res.sendStatus(200);
};
