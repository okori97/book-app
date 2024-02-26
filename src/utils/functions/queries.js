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

const includeAssociations = (model) => {
  const associations = {
    book: [Genre],
    genre: [Book],
  };

  return associations[model] || [];
};

const createItem = async (model, req, res) => {
  const Model = getModel(model);
  return await Model.create(req.body).then((item) => {
    res.status(201).json(item);
  });
};

const findItem = async (model, req, res) => {
  const Model = getModel(model);

  return await Model.findAll({
    include: includeAssociations(model),
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then((item) => {
    item.length != 0
      ? res.json(item)
      : res.status(404).json({ error: `No ${model}s found` });
  });
};

const findItemByID = async (model, req, res) => {
  const Model = getModel(model);

  return await Model.findByPk(req.params.id, {
    include: includeAssociations(model),
  }).then((item) => {
    // console.log('findbyID: ', item);
    item == null
      ? res.status(404).json({ error: `${model} not found` })
      : res.json(item);
  });
};

const updateItem = async (model, req, res) => {
  const Model = getModel(model);

  return await Model.update(req.body, {
    where: { id: req.params.id },
  }).then((item) => {
    item[0] == false
      ? res.status(404).json({ error: `${model} not found` })
      : res.json({ success: `${model} updated` });
  });
};

const deleteItem = async (model, req, res) => {
  const Model = getModel(model);

  return await Model.destroy({ where: { id: req.params.id } }).then((item) => {
    item > 0
      ? res.json({ success: `${model} deleted` })
      : res.status(404).json({ error: `${model} not found` });
  });
};

export { createItem, findItem, findItemByID, updateItem, deleteItem };
