import mongoose, { Document, Schema } from "mongoose";


interface ArticleDoc extends Document {
    title: string;
    image: string;
    content: string;
    category: string;
}

const ArticleSchaema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true}
})

const Article = mongoose.model<ArticleDoc>("article", ArticleSchaema);

export { Article, ArticleDoc }