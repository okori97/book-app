import { Sequelize } from 'sequelize';
import ReaderModel from './Reader.js';
import BookModel from './Books.js';

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

  connection.sync({ alter: true });

  return { Reader, Book, connection };
};
export const { Reader, Book, connection } = setupDatabase();
