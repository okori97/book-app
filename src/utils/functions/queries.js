const createItem = async (model, req, res) => {
  switch (model.name) {
    case 'Book': {
      let { title, author, genre, ISBN } = req.body || null;
      const newReader = await model.create({
        title: title,
        author: author,
        genre: genre,
        ISBN: ISBN,
      });
      res.status(201).json(newReader);

      break;
    }
    case 'Reader': {
      const { name, email, password } = req.body || null;

      const reader = await model.create({
        name: name,
        email: email,
        password: password,
      });
      res.status(201).json(reader);
      break;
    }
    default:
      break;
  }
};

const findItem = async (model, req, res) => {
  switch (model.name) {
    case 'Book': {
      if (req.params.id == undefined) {
        const books = await model.findAll({
          raw: true,
          attributes: ['title', 'author', 'genre', 'ISBN', 'id'],
        });
        books.length == 0
          ? res.status(404).json({ error: 'No books found!' })
          : res.json(books);
      } else {
        const book = await model.findByPk(req.params.id);
        book != null
          ? res.json(book)
          : res.status(404).json({ error: 'Book not found' });
      }
      break;
    }

    case 'Reader': {
      if (req.params.id == undefined) {
        const readers = await model.findAll({
          raw: true,
          attributes: ['name', 'email', 'id'],
        });
        readers.length == 0
          ? res.status(404).json({ error: 'No records available' })
          : res.json(readers);
      } else {
        const reader = await model.findByPk(req.params.id, {
          attributes: ['name', 'email', 'id'],
        });

        reader != null
          ? res.json(reader)
          : res.status(404).json({ error: 'User does not exist' });
      }
      break;
    }

    default:
      break;
  }
};

export { createItem, findItem };
