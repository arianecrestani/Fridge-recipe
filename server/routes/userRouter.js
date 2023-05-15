//The routes contain all routes that are created by Express.
import express from "express";
import { multerUpload } from "../middlewares/multer.js";
import { testingRoute, getUsers, getUser, createUser, login, getActiveUser, updateUser } from "../controllers/userControllers.js";
import jwtAuth from "../middlewares/jwtAuth.js";
//router to link the users
//router to link the data

// import { testingRoute, getUsers } from "../controllers/userControllers.js";

const userRouter = express.Router()

userRouter.get("/test",testingRoute)
userRouter.get("/all", getUsers)
userRouter.get("/id/:id", getUser)

userRouter.get("/active",jwtAuth, getActiveUser)


// userRouter.post("/update/:id", updateUser)
//   // request calling from frontend 
//   // response to the backend
userRouter.post("/new",multerUpload.single('avatar'), createUser)
userRouter.post("/login", login);
userRouter.post("/update", jwtAuth, updateUser)
// userRouter.get("/id/:id", getUser);

export default userRouter