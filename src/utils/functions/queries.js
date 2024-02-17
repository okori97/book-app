const createItem = async (model, req, res) => {
  switch (model.name) {
    case 'Book': {
      let { title, author, genre, ISBN } = req.body || null;
      const newBook = await model.create({
        title: title,
        author: author,
        genre: genre,
        ISBN: ISBN,
      });

      res.status(201).json(newBook);

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
    case 'Genre': {
      let { title, author, genre, ISBN } = req.body || null;
      let Genre;
      title == null || author == null
        ? ''
        : (Genre = await model.create({
            genre: genre,
          }));

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
          ? res.status(404).json({ error: 'No books found' })
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
          ? res.status(404).json({ error: 'No users found' })
          : res.json(readers);
      } else {
        const reader = await model.findByPk(req.params.id, {
          attributes: ['name', 'email', 'id'],
        });

        reader != null
          ? res.json(reader)
          : res.status(404).json({ error: 'User not found' });
      }
      break;
    }

    default:
      break;
  }
};

const updateItem = async (model, req, res) => {
  switch (model.name) {
    case 'Book': {
      const { id } = req.params;
      const { title } = req.body;

      const updatedBook = await model.update(
        { title: title },
        { where: { id: id } }
      );

      updatedBook == false
        ? res.status(404).json({ error: 'Book not found' })
        : res.json({ success: 'User updated' });
      break;
    }
    case 'Reader': {
      const { id } = req.params;
      const { name } = req.body;

      const updatedReader = await model.update(
        { name: name },
        { where: { id: id } }
      );

      updatedReader == false
        ? res.status(404).json({ error: 'User not found' })
        : res.json({ success: 'User updated' });
      break;
    }
    default:
      break;
  }
};

const deleteItem = async (model, req, res) => {
  switch (model.name) {
    case 'Book': {
      const deleteBook = await model.destroy({
        where: { id: `${req.params.id}` },
      });

      deleteBook != false
        ? res.json({ success: 'Book deleted' })
        : res.status(404).json({ error: 'Book not found' });
      break;
    }
    case 'Reader': {
      const deleteReader = await model.destroy({
        where: { id: `${req.params.id}` },
      });

      deleteReader != false
        ? res.json({ success: 'User deleted' })
        : res.status(404).json({ error: 'User not found' });

      break;
    }
    default:
      break;
  }
};

export { createItem, findItem, updateItem, deleteItem };
