import MarkdownModel from "../models/recipeModels.js";
import openAiConfig from "../config/openAiConfig.js";

const sendPrompt = async (request, response) => {
  console.log(request.body);
  try {
    const newResult = await openAiConfig(
      `ingredients:  ${request.body.ingredients},foodGroup: ${request.body.foodGroup}`
    );
    response.status(200).json(newResult);
  } catch (error) {
    console.log(error);
  }
};



const getRecipesForLoggedUser = async (request, response) => {

  const userId = request.user._id;

  try {
    const recipes = await MarkdownModel.where({ author: userId });

    if (!recipes) {
      return response.status(404).json({ error: "Recipe not found" });
    }

    response.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "something went wrong..", error });
  }
};

const createRecipe = async (request, response) => {
  console.log(request.body);
  // response.send(request.body);

  const newRecipe = new RecipeModel({
    ...request.body,
    recipes: [],
  });
  try {
    const saveRecipe = await newRecipe.save();
    response.status(200).json({
      message: "Successfully recipe saved",
      newRecipe: saveRecipe,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json("something went wrong");
  }
};

export { getRecipesForLoggedUser, createRecipe, sendPrompt };
