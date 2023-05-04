import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: String,
  nutricional:{ 
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },

  },
  author: { type: mongoose.Types.ObjectId, ref:"users"},
  
  type: { type: String, required: true }
}, { timestamps: true });

const RecipeModel = mongoose.model("recipe", recipeSchema);

export default RecipeModel