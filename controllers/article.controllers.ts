import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CreateArticleInputs } from "../dto";
import { Article } from "../database/models/article.model";


export const createNewArticle = async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req.params;
    const body = <CreateArticleInputs>req.body;

    if(!user) {
        return res.status(400).json({error: "Nom de collection manquant"})
    }

    const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()
    if(!collectionExist) {
        await mongoose.connection.db.createCollection(user);

        const newArticle = new Article({...body});
        await newArticle.save();
        return res.status(201).json({success: true, data: newArticle, error: null})
    }
}