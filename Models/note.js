import mongoose from "mongoose";
import { Schema } from "mongoose";

const noteSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
        default: new Date().toISOString().split('T')[0]
    },
    title: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        require: true,
        default: 0,
    },
    challenge: {
        type: Schema.Types.ObjectId,
        ref: "Challenge",
        required: true,
    },
    day: {
        type: Number,
        required: true,
    }
})

export default mongoose.model("Note", noteSchema)