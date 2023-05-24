//The routes contain all routes that are created by Express.
import express from "express";
import { multerUpload } from "../middlewares/multer.js";
import {
  testingRoute,
  createUser,
  login,
  getActiveUser,
  addFavorite,
  removeFavorite

} from "../controllers/userControllers.js";
import { getRecipesForLoggedUser } from "../controllers/recipeControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/test", testingRoute);

userRouter.get("/active", jwtAuth, getActiveUser);
userRouter.post("/favorites", jwtAuth, addFavorite);
userRouter.get("/favorites", jwtAuth, getRecipesForLoggedUser);
userRouter.put("/updates/:recipeId", jwtAuth, removeFavorite);
// userRouter.delete("/favorites/:id", jwtAuth, deleteUser)

userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/login", login);

export default userRouter;
