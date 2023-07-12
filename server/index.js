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
};

(async function controller() {
  setMiddlewares();
  await connectMongoose();
  connectRoutes();
})();
