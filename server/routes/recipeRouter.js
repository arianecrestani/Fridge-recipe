import express from "express";
import { sendPrompt, getRecipes } from "../controllers/recipeControllers.js";

const recipeRouter = express.Router()

recipeRouter.post('/recipe', sendPrompt)
recipeRouter.get('/homerecipes', getRecipes)

export default recipeRouter