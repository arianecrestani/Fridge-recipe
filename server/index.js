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

  // const allowedOrigins = [
  //   "http://localhost:3000",
  //   "https://fridge-recipe-client.vercel.app",
  // ];
  // const corsOptions = {
  //   origin: function (origin, callback) {
  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  // };
  // app.use(cors());
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
