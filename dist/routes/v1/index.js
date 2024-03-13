"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1Router = void 0;
const express_1 = __importDefault(require("express"));
const article_controllers_1 = require("../../controllers/article.controllers");
const router = express_1.default.Router();
exports.v1Router = router;
router.post('/:user', article_controllers_1.createNewArticle);
router.get('/:user', article_controllers_1.getAllArticles);
router.get('/:user/:id', article_controllers_1.getArticleById);
router.patch('/:user/:id', article_controllers_1.updateArticle);
router.delete('/:user/:id', article_controllers_1.deleteArticle);
//# sourceMappingURL=index.js.map