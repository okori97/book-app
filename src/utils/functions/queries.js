import { Book, Author, Reader, Genre } from '../../models/index.js';

const getModel = (model) => {
  const models = {
    book: Book,
    reader: Reader,
    genre: Genre,
    author: Author,
  };

  return models[model];
};

const createItem = async (model, req, res) => {
  const Model = getModel(model);
  const item = await Model.create(req.body);
  item ? res.status(201).json(item) : '';
};

const findItem = async (model, req, res) => {
  const Model = getModel(model);

  const item = await Model.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  item.length != 0
    ? res.json(item)
    : res.status(404).json({ error: `No ${model}s found` });
};

const findItemByID = async (model, req, res) => {
  const Model = getModel(model);

  const item = await Model.findByPk(req.params.id);
  item == null
    ? res.status(404).json({ error: `${model} not found` })
    : res.json(item);
};

const updateItem = async (model, req, res) => {
  const Model = getModel(model);

  const item = await Model.update(req.body, { where: { id: req.params.id } });
  item == false
    ? res.status(404).json({ error: `${model} not found` })
    : res.json({ success: `${model} updated` });
};

const deleteItem = async (model, req, res) => {
  const Model = getModel(model);

  const item = await Model.destroy({ where: { id: req.params.id } });
  item != false
    ? res.json({ success: `${model} deleted` })
    : res.status(404).json({ error: `${model} not found` });
};

export { createItem, findItem, findItemByID, updateItem, deleteItem };
