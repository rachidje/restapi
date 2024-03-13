import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CreateArticleInputs } from "../dto";
import { ArticleModel } from "../database/models/article.model";


export const createNewArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user} = req.params;
        console.log(user)
        const body = <CreateArticleInputs>req.body;

        if(!user) {
            return res.status(400).json({error: "Nom de collection manquant"})
        }

        const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()

        if(!collectionExist) {
            await mongoose.connection.db.createCollection(user);
        }

        const newArticle = await ArticleModel.create({...body});
        await mongoose.connection.db.collection(user).insertOne(newArticle);
        return res.status(201).json({success: true, data: newArticle, error: null})
    } catch (error) {
        next(error)
    }
}

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user} = req.params;

        if(!user) {
            return res.status(400).json({error: "Nom de collection manquant"})
        }

        const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()

        if(!collectionExist) {
            return res.status(404).json({error: "Collection introuvable"})
        }

        let articles;

        const sortBy: any = req.query.sort;
        if (sortBy) {
            articles = await mongoose.connection.db
                                .collection(user)
                                .find({})
                                .sort({"createdAt": sortBy})
                                .toArray()
                                .then((articles: any) => articles.map((article: any) => new ArticleModel(article)));
        } else {
            articles = await mongoose.connection.db
                                .collection(user)
                                .find({})
                                .toArray()
                                .then((articles: any) => articles.map((article: any) => new ArticleModel(article)))
                                ;
        }

        return res.status(200).json(articles)
    } catch (error) {
        next(error)
    }
}

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user, id} = req.params;

        if(!user) {
            return res.status(400).json({error: "Nom de collection manquant"})
        }

        const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()

        if(!collectionExist) {
            return res.status(404).json({error: "Collection introuvable"})
        }

        const article = await mongoose.connection.db.collection(user).findOne({_id: new mongoose.Types.ObjectId(id)});
        if(!article) {
            return res.status(404).json({error: "Article introuvable"})
        }
        return res.status(200).json({success: true, data: new ArticleModel(article), error: null})
    } catch (error) {
        next(error)
    }
}

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user, id} = req.params;
        const body = <CreateArticleInputs>req.body;

        if(!user) {
            return res.status(400).json({error: "Nom de collection manquant"})
        }

        const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()

        if(!collectionExist) {
            return res.status(404).json({error: "Collection introuvable"})
        }

        const article = await mongoose.connection.db.collection(user).findOne({_id: new mongoose.Types.ObjectId(id)});
        if(!article) {
            return res.status(404).json({error: "Article introuvable"})
        }

        await mongoose.connection.db.collection(user).updateOne({_id: new mongoose.Types.ObjectId(id)}, {$set: {...body}});

        const updatedArticle = new ArticleModel(await mongoose.connection.db.collection(user).findOne({_id: new mongoose.Types.ObjectId(id)}));

        return res.status(200).json({success: true, data: updatedArticle, error: null})
    } catch (error) {
        next(error)
    }
}

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {user, id} = req.params;

        if(!user) {
            return res.status(400).json({error: "Nom de collection manquant"})
        }

        const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()

        if(!collectionExist) {
            return res.status(404).json({error: "Collection introuvable"})
        }

        const article = await mongoose.connection.db.collection(user).findOne({_id: new mongoose.Types.ObjectId(id)});
        if(!article) {
            return res.status(404).json({error: "Article introuvable"})
        }

        await mongoose.connection.db.collection(user).deleteOne({_id: new mongoose.Types.ObjectId(id)});

        return res.status(200).json({success: true, data: null, error: null})
    } catch (error) {
        next(error)
    }
}