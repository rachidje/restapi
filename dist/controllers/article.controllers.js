"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.getArticleById = exports.getAllArticles = exports.createNewArticle = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const article_model_1 = require("../database/models/article.model");
const createNewArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.params;
        console.log(user);
        const body = req.body;
        if (!user) {
            return res.status(400).json({ error: "Nom de collection manquant" });
        }
        const collectionExist = yield mongoose_1.default.connection.db.listCollections({ name: user }).hasNext();
        if (!collectionExist) {
            yield mongoose_1.default.connection.db.createCollection(user);
        }
        const newArticle = yield article_model_1.ArticleModel.create(Object.assign({}, body));
        yield mongoose_1.default.connection.db.collection(user).insertOne(newArticle);
        return res.status(201).json({ success: true, data: newArticle, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.createNewArticle = createNewArticle;
const getAllArticles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.params;
        if (!user) {
            return res.status(400).json({ error: "Nom de collection manquant" });
        }
        const collectionExist = yield mongoose_1.default.connection.db.listCollections({ name: user }).hasNext();
        if (!collectionExist) {
            return res.status(404).json({ error: "Collection introuvable" });
        }
        let articles;
        const sortBy = req.query.sort;
        if (sortBy) {
            articles = yield mongoose_1.default.connection.db
                .collection(user)
                .find({})
                .sort({ "createdAt": sortBy })
                .toArray()
                .then((articles) => articles.map((article) => new article_model_1.ArticleModel(article)));
        }
        else {
            articles = yield mongoose_1.default.connection.db
                .collection(user)
                .find({})
                .toArray()
                .then((articles) => articles.map((article) => new article_model_1.ArticleModel(article)));
        }
        return res.status(200).json({ success: true, data: articles, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllArticles = getAllArticles;
const getArticleById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, id } = req.params;
        if (!user) {
            return res.status(400).json({ error: "Nom de collection manquant" });
        }
        const collectionExist = yield mongoose_1.default.connection.db.listCollections({ name: user }).hasNext();
        if (!collectionExist) {
            return res.status(404).json({ error: "Collection introuvable" });
        }
        const article = yield mongoose_1.default.connection.db.collection(user).findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        if (!article) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        return res.status(200).json({ success: true, data: new article_model_1.ArticleModel(article), error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.getArticleById = getArticleById;
const updateArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, id } = req.params;
        const body = req.body;
        if (!user) {
            return res.status(400).json({ error: "Nom de collection manquant" });
        }
        const collectionExist = yield mongoose_1.default.connection.db.listCollections({ name: user }).hasNext();
        if (!collectionExist) {
            return res.status(404).json({ error: "Collection introuvable" });
        }
        const article = yield mongoose_1.default.connection.db.collection(user).findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        if (!article) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        yield mongoose_1.default.connection.db.collection(user).updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $set: Object.assign({}, body) });
        const updatedArticle = new article_model_1.ArticleModel(yield mongoose_1.default.connection.db.collection(user).findOne({ _id: new mongoose_1.default.Types.ObjectId(id) }));
        return res.status(200).json({ success: true, data: updatedArticle, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.updateArticle = updateArticle;
const deleteArticle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, id } = req.params;
        if (!user) {
            return res.status(400).json({ error: "Nom de collection manquant" });
        }
        const collectionExist = yield mongoose_1.default.connection.db.listCollections({ name: user }).hasNext();
        if (!collectionExist) {
            return res.status(404).json({ error: "Collection introuvable" });
        }
        const article = yield mongoose_1.default.connection.db.collection(user).findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        if (!article) {
            return res.status(404).json({ error: "Article introuvable" });
        }
        yield mongoose_1.default.connection.db.collection(user).deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
        return res.status(200).json({ success: true, data: null, error: null });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteArticle = deleteArticle;
//# sourceMappingURL=article.controllers.js.map