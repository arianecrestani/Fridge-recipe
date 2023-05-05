import express from "express";
import { getRecipe } from "../controllers/recipeControllers.js";



const recipeRouter = express.Router()

// recipeRouter.get("/all", getRecipes)
// recipeRouter.get("/all", getRecipes)
recipeRouter.get("/id/:id", getRecipe)

// recipeRouter.post("/new", createRecipe)
//   // request calling from frontend 
//   // response to the backend
// userRouter.get("/all", getUsers);
// userRouter.get("/id/:id", getUser);

export default recipeRouter