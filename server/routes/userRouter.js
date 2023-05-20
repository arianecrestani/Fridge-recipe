//The routes contain all routes that are created by Express.
import express from "express";
import { multerUpload } from "../middlewares/multer.js";
import {
  testingRoute,
  getUser,
  createUser,
  login,
  getActiveUser,
  updateUser,
  addOrRemoveFavorite,
} from "../controllers/userControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";
//router to link the users
//router to link the data

// import { testingRoute, getUsers } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/test", testingRoute);

userRouter.get("/id/:id", getUser);

userRouter.get("/active", jwtAuth, getActiveUser);
userRouter.post("/favorites", jwtAuth, addOrRemoveFavorite);

userRouter.post("/new", multerUpload.single("avatar"), createUser);
userRouter.post("/login", login);
userRouter.post("/update", jwtAuth, updateUser);

export default userRouter;
