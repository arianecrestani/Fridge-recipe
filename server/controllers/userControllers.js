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

const removeFavorite = async (req, res) => {
  const userId = req.user._id;
  const { recipeId } = req.params;
  console.log(req.params, "removeFav");
  const trasformRecipeId = recipeId.toString()

  try {
    const findUserAndUpdateFavorite = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { recipes: trasformRecipeId} },
      { new: true }
    );

    console.log(
      "User's favorites array updated successfully:",
      findUserAndUpdateFavorite
    );

    res.status(200).json({
      msg: "Successfully updated user favorites",
      "the-user": findUserAndUpdateFavorite,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong with updating the user's favorites array",
    });
  }
};


const getActiveUser = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    username: req.user.username,
    avatar: req.user.avatar,
    recipes: req.user.recipes,
  });
};

const createUser = async (request, response) => {
  try {
    const encryptedPassword = await encryptPassword(request.body.password);
    const uploadedImage = await imageUpload(request.file, "user_avatars");

    const newUser = new UserModel({
      ...request.body,
      password: encryptedPassword,
      avatar: uploadedImage,
    });

    const registeredUser = await newUser.save();

    response.status(201).json({
      message: "User has been registered.",
      username: registeredUser.username,
      avatar: registeredUser.avatar,
      email: registeredUser.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      response.status(409).json("User already exists.");
    } else {
      console.log(error);
      response.status(500).json("Something went wrong - check console");
    }
  }

};

// const removeFavorite = async (req, res) => {
//   const userId = req.user._id;
//   const { recipe } = req.body;
//   // Get the user id and the recipe id from the request const userId = req.user._id; const recipeId = req.params.id;
// }
// A function to add or remove a recipe from the user's favorites
const addFavorite = async (req, res) => {
  // Get the user id and the recipe from the request
  const userId = req.user._id;
  const { recipe, foodCategorie } = req.body;

  // Log the recipe and the request for debugging
  console.log("Recipe params:", recipe);
  console.log("Params: ", req);

  try {
    // Find the user by id and populate their recipes
    const user = await UserModel.findById(userId).populate({
      path: "recipes",
      ref: "Recipe",
    });

    // If the user is not found, send a 404 error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new markdown model for the recipe
    const markdownRecipe = new MarkdownModel({
      markdown: recipe,
      author: user,
      foodCategorie: foodCategorie,
    });

    // Log the recipe for debugging
    console.log("Recipe: ", markdownRecipe);

    // Save the recipe to the database
    const savedRecipe = await markdownRecipe.save();

    // Check if the recipe is already in the user's favorites
    const isFavorite = user.recipes.some(
      (r) => r._id.toString() === savedRecipe._id.toString()
    );

    // If it is, remove it from the favorites
    if (isFavorite) {
      user.recipes = user.recipes.filter(
        (r) => r._id.toString() !== savedRecipe._id.toString()
      );
      await user.save();
      res
        .status(200)
        .json({ msg: "Recipe removed from favorites", savedRecipe });
    }
    // If it is not, add it to the favorites
    else {
      user.recipes.push(savedRecipe._id);
      await user.save();
      res.status(200).json({ msg: "Recipe added to favorites", savedRecipe });
    }
  } catch (e) {
    // If there is an error, log it and send a 500 error
    console.log(e);
    res
      .status(500)
      .json({ error: "Something went wrong while updating favorites.", e });
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
  createUser,
  login,
  getActiveUser,
  addFavorite,
  removeFavorite,
  // deleteUser,
};
