//The routes contain all routes that are created by Express.
import express from "express";
import { multerUpload } from "../middlewares/multer.js";
import { testingRoute, getUsers, getUser, createUser, login } from "../controllers/userControllers.js";
//router to link the users
//router to link the data

// import { testingRoute, getUsers } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.get("/test",testingRoute)
userRouter.get("/all", getUsers)
userRouter.get("/id/:id", getUser)
userRouter.post("/new",multerUpload.single('avatar'), createUser)

// userRouter.post("/update/:id", updateUser)
//   // request calling from frontend 
//   // response to the backend
userRouter.post("/login", login);
// userRouter.get("/id/:id", getUser);

export default userRouter