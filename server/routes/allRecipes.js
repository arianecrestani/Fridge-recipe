import express from "express";
import { sendPrompt } from "../controllers/recipeControllers.js";

const recipesRouter = express.Router()

recipesRouter.post('/allRecipes', sendPrompt)

export default recipesRouter