import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },

    score: {
        type: Number,
        default: 0
    },





}, { timestamps: true });


export const User = mongoose.model("User", userSchema);