import express from "express";
import userRouter from "./routes/userRouter.js";
import mongoose from "mongoose";
import { cloudinaryConfig } from "./config/cloudinary.js";
import cors from "cors";
import * as dotenv from "dotenv";
import recipeRouter from "./routes/recipeRouter.js";
import passportConfig from "./config/passport.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

const setMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cors());
  cloudinaryConfig();
  passportConfig();
};

const connectMongoose = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log(
          "Connection to MongoDB established, and server is running on port " +
            port
        );
      });
    })
    .catch((err) => console.log(err));
};
const connectRoutes = () => {
  app.use("/api/users", userRouter);
  app.use("/api/recipes", recipeRouter);
  // app.use("/api/re", recipesRouter);
};

setMiddlewares();
connectMongoose();
connectRoutes();

// app.listen(port, () => {
//   console.log("Server is running on port" + port);
// });

// const sendMenssage = (request, response) => {
//   // request calling from frontend
//   // response to the backend
//   //request mongo
//   response.send({ menssage:'hello kangoroos', example:[1, 2, 3, 4]})
// }
// app.post('/test', sendMenssage)

// Express
//There are many types of requests that we can perform on routes using HTTP methods, like the GET, POST, PUT, and DELETE methods.
// The post request handler is used to create and update the data in the server.
//post is used to create new objects

//Routes determine how each endpoint should be treated and what logic gets executed.

//Each HTTP request type is mapped to a routing method in Express with the syntax app.method(path, callback).
