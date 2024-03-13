import mongoose from "mongoose";

export const collectionIsCreated = async (user: string) : Promise<boolean> => {
    const collectionExist = await mongoose.connection.db.listCollections({name: user}).hasNext()
    return collectionExist
}

export const fetchArticle = async (user: string, id: string) => {
    const article = await mongoose.connection.db.collection(user).findOne({_id: new mongoose.Types.ObjectId(id)});

    return article
}

export const fetchArticles = async (user: string, sortBy: any = 'asc') => {
    const articles = await mongoose.connection.db
                            .collection(user)
                            .find()
                            .sort({"createdAt": sortBy})
                            .toArray();

    return articles
}