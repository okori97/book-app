import { Book } from '../models/index.js';
import handleError from '../utils/functions/handleError.js';

export const createBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      const { title, author, genre, ISBN } = req.body;
      const newReader = await Book.create({
        title: `${title}`,
        author: `${author}`,
        genre: `${genre}`,
        ISBN: `${ISBN}`,
      });

      res.status(201).json(newReader);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const findAll = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      const books = await Book.findAll({
        raw: true,
        attributes: ['title', 'author', 'genre', 'ISBN', 'id'],
      });
      books.length == 0
        ? res.status(404).json({ error: 'No books found!' })
        : res.json(books);
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const findBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    book != null
      ? res.json(book)
      : res.status(404).json({ error: 'Book not found' });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      const updatedBook = await Book.update(
        { title: `${req.body.title}` },
        { where: { id: `${req.params.id}` } }
      );

      updatedBook != false
        ? res.json(updatedBook)
        : res.status(404).json({ error: 'Book not found!' });
    }
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteBook = async (req, res) => {
  try {
    if (!req.is('application/json') && req.is('application/json') !== null) {
      res.status(400).json({ error: 'Bad request' });
    } else {
      const deleteBook = await Book.destroy({
        where: { id: `${req.params.id}` },
      });

      deleteBook != false
        ? res.json({ success: 'Book deleted' })
        : res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    handleError(error, res);
  }
};
