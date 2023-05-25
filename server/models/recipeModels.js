import mongoose from "mongoose";

const markdownSchema = new mongoose.Schema (
  {
    markdown:{ type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "Recipe",  required: true },
    foodCategorie: { type: String, required: true },
  }, { timestamps: true }
)
const MarkdownModel = mongoose.model("Recipe", markdownSchema);

export default MarkdownModel