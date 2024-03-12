import express from 'express';
import { articleRouter } from './article.routes';

const router = express.Router();

router.use(articleRouter);

export {router as userRouter}