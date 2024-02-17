import { Sequelize } from 'sequelize';
import ReaderModel from './Reader.js';
import BookModel from './Books.js';
import authorModel from './Author.js';
import genreModel from './Genre.js';

let { PGDATABASE, PGUSER, PGHOST, PGPORT, PGPASSWORD } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    host: PGHOST,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Genre = genreModel(connection, Sequelize);
  const Author = authorModel(connection, Sequelize);

  connection.sync({ alter: true });

  return { Reader, Book, Genre, Author, connection };
};
export const { Reader, Book, Genre, Author, connection } = setupDatabase();
