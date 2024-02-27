import { Book, Author, Reader, Genre } from '../../models/index.js';
import { get404Error, get400Error } from './validation.js';

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
    book: [Genre, Author],
    genre: [Book],
    author: [Book],
  };

  return associations[model] || [];
};

const createItem = async (model, req, res) => {
  const Model = getModel(model);
  return await Model.create(req.body)
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((error) => {
      get400Error(error, res);
    });
};

const findItem = async (model, req, res) => {
  const Model = getModel(model);

  return Model.findAll({
    include: includeAssociations(model),
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  })
    .then((item) => {
      item.length != 0
        ? res.json(item)
        : res.status(404).json(get404Error(model));
    })
    .catch((error) => {
      get400Error(error, res);
    });
};

const findItemByID = async (model, req, res) => {
  const Model = getModel(model);

  return Model.findByPk(req.params.id, {
    include: includeAssociations(model),
  })
    .then((item) => {
      item == null ? res.status(404).json(get404Error(model)) : res.json(item);
    })
    .catch((error) => {
      get400Error(error, res);
    });
};

const updateItem = async (model, req, res) => {
  const Model = getModel(model);

  return Model.update(req.body, {
    where: { id: req.params.id },
  })
    .then((item) => {
      item[0] == false
        ? res.status(404).json(get404Error(model))
        : res.json({ success: `${model} updated` });
    })
    .catch((error) => {
      get400Error(error, res);
    });
};

const deleteItem = async (model, req, res) => {
  const Model = getModel(model);

  return Model.destroy({ where: { id: req.params.id } })
    .then((item) => {
      item > 0
        ? res.json({ success: `${model} deleted` })
        : res.status(404).json(get404Error(model));
    })
    .catch((error) => {
      get400Error(error, res);
    });
};

export { createItem, findItem, findItemByID, updateItem, deleteItem };
