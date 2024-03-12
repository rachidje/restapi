import express from 'express';
import { apiRouter } from './routes/api';
require('./database')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.listen(8000, () => {
  console.log('✅ Server started at http://localhost:8000')
})
