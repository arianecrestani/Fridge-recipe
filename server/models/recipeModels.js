import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema (
  {
    markdown:{ type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "Recipe",  required: true },
    foodCategorie: { type: String, required: true },
  }, { timestamps: true }
)
const RecipeModel = mongoose.model("Recipe", recipeSchema);

export default RecipeModel