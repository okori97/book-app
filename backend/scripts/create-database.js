import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const envname = process.argv.slice(0, 2);

const loadEnv = () => {
  const { NODE_ENV } = process.env;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (NODE_ENV != 'production') {
    const envFile = envname === 'test' ? '../.env.test' : '../.env';
    config({
      path: path.join(__dirname, envFile),
    });
  }

  const databaseName = process.env.PGDATABASE;

  delete process.env.PGDATABASE;

  return databaseName;
};

const createDatabase = async (databaseName) => {
  const client = new pg.Client();

  try {
    await client.connect();

    console.log(`Creating ${databaseName} database..`);

    await client.query(`CREATE DATABASE "${databaseName};"`);

    console.log(`${databaseName} database has been created!`);
  } catch (error) {
    const DBalreadyExists = '42P04';
    const ConnectionDoesNotExist = '08003';

    switch (error.code) {
      case DBalreadyExists:
        console.log('This database already exists');
        break;
      case ConnectionDoesNotExist:
        console.log('Connection does not exists');
        break;
      default:
        console.log('something went wrong: ', error);
        break;
    }
  } finally {
    client.end();
  }
};

const databaseName = loadEnv();
createDatabase(databaseName);
