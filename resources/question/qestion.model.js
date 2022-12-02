import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    descrption: {
        type: String,
    },
    choices: {
        type: Array,
        required: true,
        title: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
        }
    },
    answer: {
        type: Boolean,
        required: true,
        descrption: {
            type: String,
        },
    }
}, { timestamps: true });
export const question = mongoose.model("Question", questionSchema);