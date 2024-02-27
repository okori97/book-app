import express from 'express';
import 'dotenv/config';
import readerRoutes from './routes/reader.js';
import bookRoutes from './routes/book.js';
import genreRoutes from './routes/genre.js';
import authorRoutes from './routes/author.js';
import bodyParser from 'body-parser';
export const app = express();

app.use(bodyParser.json());
app.use('/readers', readerRoutes);
app.use('/books', bookRoutes);
app.use('/genres', genreRoutes);
app.use('/authors', authorRoutes);
