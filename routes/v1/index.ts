import express from 'express';
import { createNewArticle } from '../../controllers/article.controllers';

const router = express.Router();

router.use('/:user', createNewArticle);

export {router as v1Router}