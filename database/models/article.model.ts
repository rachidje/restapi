import mongoose, { Document, Schema } from "mongoose";


interface Article {
    author: string;
    image: string;
    title: string;
    category: string;
    content: string;
}

const ArticleSchema = new Schema<Article & Document>({
    author: {type: String, required: true},
    image: {type: String, required: true},
    title: {type: String, required: true},
    category: {type: String, required: true},
    content: {type: String, required: true}
}, {
    timestamps: true,
    autoCreate: false,
    autoIndex: false,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.updatedAt;
            delete ret.__v;
        }
    
    }
});

export const ArticleModel = mongoose.model<Article & Document>("article", ArticleSchema);