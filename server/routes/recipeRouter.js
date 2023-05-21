import express from "express";
import { sendPrompt } from "../controllers/recipeControllers.js";

const recipeRouter = express.Router()

recipeRouter.post('/recipe', sendPrompt)

export default recipeRouter