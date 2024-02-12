import { Sequelize } from 'sequelize';
import ReaderModel from './Reader.js';

let { PGDATABASE, PGUSER, PGHOST, PGPORT, PGPASSWORD } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    port: PGPORT,
    host: PGHOST,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);

  connection.sync({ alter: true });

  return { Reader, connection };
};
export const { Reader, connection } = setupDatabase();
