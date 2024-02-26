import { Sequelize } from 'sequelize';
import ReaderModel from './Reader.js';
import BookModel from './Book.js';
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

  Genre.hasMany(Book);
  Book.belongsTo(Genre);
  Author.hasMany(Book);
  Book.belongsTo(Author, {
    foreignKey: {
      allowNull: {
        args: true,
      },
    },
  });

  connection.sync({ alter: true });

  return { Reader, Book, Genre, Author, connection };
};
export const { Reader, Book, Genre, Author, connection } = setupDatabase();
