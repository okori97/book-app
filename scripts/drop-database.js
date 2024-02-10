import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const loadEnv = () => {
  const { NODE_ENV } = process.env;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const envFile = '../.env.test';

  if (NODE_ENV != 'production') {
    config({
      path: path.join(__dirname, envFile),
    });
  }

  const databaseName = process.env.PGDATABASE;

  delete process.env.PGDATABASE;

  return databaseName;
};

const dropDatabase = async (databaseName) => {
  const client = new pg.Client();

  try {
    await client.connect();
    console.log(`Destroying ${databaseName}...`);

    await client.query(
      `DROP DATABASE IF EXISTS "${databaseName}" WITH (FORCE)`
    );

    console.log(`${databaseName} has been succesfuly destroyed!`);
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
  }
};

const databasename = loadEnv();
dropDatabase(databasename);
