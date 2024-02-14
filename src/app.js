import express from 'express';
import 'dotenv/config';
import readerRoutes from './routes/reader.js';
import bookRoutes from './routes/book.js';
import bodyParser from 'body-parser';
export const app = express();

app.use(bodyParser.json());
app.use('/readers', readerRoutes);
app.use('/books', bookRoutes);
