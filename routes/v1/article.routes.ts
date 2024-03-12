import express from 'express';
import { createNewArticle } from '../../controllers/article.controllers';

const router = express.Router();

router.post('/', createNewArticle);

export {router as articleRouter}