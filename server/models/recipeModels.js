import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: String,
    serving: { type: Number, required: true },
    preparationTime: { type: Number, required: true },
    instruction:[{type: String, required:true}],
    ingredients: {
      ingredient: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
    nutritional: {
      calories: { type: String, required: true },
      protein: { type: String, required: true },
      carbs: { type: String, required: true },
      sugar: { type: String, required: true },
    },
    author: { type: mongoose.Types.ObjectId, ref: "user" },

    foodGroup: { type: String, required: true },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model("recipes", recipeSchema);

export default RecipeModel;
