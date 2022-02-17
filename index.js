import dotenv from 'dotenv';
import express from 'express';
import './db';
import productsRouter from './api/products'

dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use('/api/products', productsRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});