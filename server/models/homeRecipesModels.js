import mongoose from "mongoose";

const homeRecipeSchema = new mongoose.Schema (
  {
    markdown:{ type: String, required: true },
    foodCategorie: { type: String, required: true },
  }, { timestamps: true }
)
const HomeRecipeModel = mongoose.model("Homerecipe", homeRecipeSchema);

export default HomeRecipeModel