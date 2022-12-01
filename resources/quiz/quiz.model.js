import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({


    question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" }

}, { timestamps: true });
export const quiz = mongoose.model("quiz", quizSchema);