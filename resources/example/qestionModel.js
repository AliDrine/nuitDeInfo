import mongoose from "mongoose";

const qestionSchema = new mongoose.Schema(
  {
    descrption: {
      type: String,
      required: true
    },
    choices: {
      type: Array,
      required: true,
      title:{
        type: String,
        required: true
      },
      value:{
        type:Number,
        required: true
      }

    },
    answer: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const Question = mongoose.model("qyestionModel", qestionSchema);
