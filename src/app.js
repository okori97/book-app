import express from 'express';
import 'dotenv/config';
import readerRoutes from './routes/reader.js';

export const app = express();
app.use('/readers', readerRoutes);
