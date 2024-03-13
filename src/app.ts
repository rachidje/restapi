import express from 'express';
import { apiRouter } from './routes/api';
import cors from 'cors';
require('./database')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', apiRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log('✅ Server started')
})
