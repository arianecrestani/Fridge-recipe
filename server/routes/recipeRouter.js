import express from "express";
import { getRecipe, getRecipes, createRecipe, sendPrompt } from "../controllers/recipeControllers.js";



const recipeRouter = express.Router()

recipeRouter.get("/all", getRecipes)
// recipeRouter.get("/all", getRecipes)
recipeRouter.get("/id/:id", getRecipe)

recipeRouter.post("/new", createRecipe)
recipeRouter.get('/recipe', sendPrompt)
//   // request calling from frontend 
//   // response to the backend
// userRouter.get("/all", getUsers);
// userRouter.get("/id/:id", getUser);

export default recipeRouter