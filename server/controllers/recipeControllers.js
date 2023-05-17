import MarkdownModel from "../models/recipeModels.js";
import openAiConfig from "../config/openAiConfig.js";
import { imageUpload } from "../utils/imageUpload.js";

const sendPrompt = async (request, response) => {
  console.log(request.body)
  try {
    const newResult = await openAiConfig(`ingredients:  ${request.body.ingredients},foodGroup: ${request.body.foodGroup}`);
    response.status(200).json(newResult);
  } catch (error) {
    console.log(error);
  }
};

const getRecipe = async (request, response) => {
  const id = request.params.id;
  console.log(id);
  try {
    const recipe = await (await MarkdownModel.findById(id)).populate("author");
    response.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "something went wrong.." });
  }
};

const getRecipes = async (request, response) => {
  try {
    const recipes = await MarkdownModel.find();
    console.log(recipes);
    response.status(200).json(recipes);
  } catch (e) {
    response.status(500).json({ error: "something went wrong..." });
    console.log(e);
  }
};

const createRecipe = async (request, response) => {
  console.log(request.body);
  response.send(request.body);
  const uploadedImage = await imageUpload(request.file, "user_avatars");

  console.log("user_avatars", uploadedImage)
  const newRecipe = new RecipeModel({
    ...request.body,
    avatar: uploadedImage
    // email: request.body.email,
    // username: request.body.username,
    // password: request.body.password
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
export { getRecipe, getRecipes, createRecipe, sendPrompt };
