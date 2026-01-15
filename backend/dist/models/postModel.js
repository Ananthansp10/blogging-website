import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
export const postModel = mongoose.model("posts", postSchema);
