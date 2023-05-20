import express from "express";
import { getRecipe, sendPrompt } from "../controllers/recipeControllers.js";

const recipeRouter = express.Router()
recipeRouter.get("/id/:id", getRecipe)
recipeRouter.post('/recipe', sendPrompt)

export default recipeRouter