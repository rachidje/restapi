import express from 'express';
import { createNewArticle, deleteArticle, getAllArticles, getArticleById, updateArticle } from '../../controllers/article.controllers';

const router = express.Router();

router.post('/:user', createNewArticle);
router.get('/:user', getAllArticles);
router.get('/:user/:id', getArticleById);
router.patch('/:user/:id', updateArticle);
router.delete('/:user/:id', deleteArticle);

export {router as v1Router}