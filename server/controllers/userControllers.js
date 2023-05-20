// The controllers contain all the logic and functionality of the application.
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { imageUpload } from "../utils/imageUpload.js";

import UserModel from "../models/userModels.js";
import MarkdownModel from "../models/recipeModels.js";

const testingRoute = (request, response) => {
  console.log("request.body", request.body);
  console.log("request.body", request);
  response.status(200).json("testing users route..");
};

// const getActiveUser = async (request, response) => {
//   response.send('testing', getActiveUser)
// }
const getActiveUser = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar,
    recipes: req.user.recipes,
  });
};

const getUser = async (request, response) => {
  // const params = request.params;
  // console.log(params); // should show { id: blahblah }
  const id = request.params.id;
  console.log(id); // will show just "blahblah"
  try {
    const user = await UserModel.findById(id).populate("recipes");
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "something went wrong.." });
  }
};

const createUser = async (request, response) => {
  // console.log(request.body);
  const encryptedPassword = await encryptPassword(request.body.password);

  const uploadedImage = await imageUpload(request.file, "user_avatars");

  console.log("user_avatars", uploadedImage);
  const newUser = new UserModel({
    ...request.body,
    password: encryptedPassword,
    avatar: uploadedImage,
  });

  console.log(request.body, "something wrong with the body");
  try {
    const registeredUser = await newUser.save();
    response.status(200).json({
      message: "Successfully registered!",
      username: registeredUser.username,
      avatar: registeredUser.avatar,
      email: registeredUser.email,
    });
    console.log(registeredUser);
  } catch (error) {
    console.log(error);
    response.status(500).json("something went wrong");
  }
};
const addOrRemoveFavorite = async (req, res) => {
  const userId = req.user._id;
  const { recipe } = req.query;
  console.log("Recipe params:", recipe);
  console.log("Params: ", req.query);

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const markdownRecipe = new MarkdownModel({
      markdown: recipe,
      author: user,
      foodCategorie: "test",
    });
    console.log("Recipe: ", markdownRecipe)
    const savedRecipe = await markdownRecipe.save();
    // Add the recipe to favorites
    user.recipes.push(savedRecipe._id);
    await user.save();
    res.status(200).json({ msg: "Recipe added to favorites", user });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Something went wrong while updating favorites." });
  }
};

const updateUser = async (req, res) => {
  const me = req.user;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(me._id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (!existingUser) {
      res.status(404).json({ error: "no user found" });
      return;
    }
    if (existingUser) {
      const verified = await verifyPassword(
        req.body.password,
        existingUser.password
      ); //comparing the password the user entered to the password connected to the user that found in the prev stage

      if (!verified) {
        res.status(406).json({ error: "password doesn't match" });
      }

      if (verified) {
        const token = generateToken(existingUser);
        res.status(200).json({
          verified: true,
          token: token,
          user: {
            _id: existingUser._id,
            username: existingUser.username,
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong.." });
  }
};

export {
  testingRoute,
  getUser,
  createUser,
  updateUser,
  login,
  getActiveUser,
  addOrRemoveFavorite,
};
