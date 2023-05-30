import RecipeModel from "../models/recipeModels.js";
import openAiConfig from "../config/openAiConfig.js";
import HomeRecipeModel from "../models/homeRecipesModels.js";

const sendPrompt = async (request, response) => {
  // const { recipe, foodCategorie } = req.body;
  console.log(request.body);
  try {
    const newResult = await openAiConfig(
      `ingredients:${request.body.ingredients},foodGroup: ${request.body.foodGroup}`
    );

    const markdownRecipe = new HomeRecipeModel({
      markdown: newResult.choices[0].text,
      foodCategorie: request.body.foodGroup,
    });

    await markdownRecipe.save();

    response.status(200).json(newResult);
  } catch (error) {
    console.log(error);
  }
};

const getRecipes = async (request, response) => {
  try {
    const recipes = await HomeRecipeModel.find();

    response.status(200).json(recipes);
  } catch (e) {
    response.status(500).json({ error: "something went wrong.." });
    console.log(e);
  }
};

const getRecipesForLoggedUser = async (request, response) => {
  const userId = request.user._id;

  try {
    const recipes = await RecipeModel.where({ author: userId });

    if (!recipes) {
      return response.status(404).json({ error: "Recipe not found" });
    }

    response.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "something went wrong..", error });
  }
};

export { getRecipesForLoggedUser, sendPrompt, getRecipes };
