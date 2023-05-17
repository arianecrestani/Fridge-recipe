import mongoose from "mongoose";

const markdownSchema = new mongoose.Schema (
  {
    markdown:{ type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "user" },
    foodCategorie: { type: String, required: true },

  }
)
const MarkdownModel = mongoose.model("recipes", markdownSchema);

export default MarkdownModel