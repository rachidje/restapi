import mongoose from "mongoose";
import { MONGO_URI } from "../config/db";

mongoose.connect(MONGO_URI).then(() => {
    console.log("✅ Connected to database");
}).catch((err) => {
    console.log(err);
})