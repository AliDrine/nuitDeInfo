import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export const Example = mongoose.model("Example", exampleSchema);
