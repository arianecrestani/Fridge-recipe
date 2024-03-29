// The controllers contain all the logic and functionality of the application.
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { imageUpload } from "../utils/imageUpload.js";
import UserModel from "../models/userModels.js";
import RecipeModel from "../models/recipeModels.js";

const removeFavorite = async (req, res) => {
  const userId = req.user._id;

  const { recipeId } = req.params;
  console.log(req.params, "removeFav");

  try {
    const findUserAndUpdateFavorite = await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { recipes: recipeId } },
      { new: true }
    );

    await RecipeModel.findByIdAndDelete(recipeId);

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

const addFavorite = async (req, res) => {
  const userId = req.user._id;
  const { recipe, foodCategorie } = req.body;

  console.log("Recipe params:", recipe);
  console.log("Params: ", req);

  try {
    if (!req.user) {
      return res.status(404).json({ error: "User not found" });
    }
    const markdownRecipe = new RecipeModel({
      markdown: recipe,
      author: userId,
      foodCategorie: foodCategorie,
    });

    console.log("Recipe: ", markdownRecipe);

    const savedRecipe = await markdownRecipe.save();

    await UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { recipes: savedRecipe._id },
      },
      { new: true }
    );
    res.status(200).json({
      msg: "recipe add",
      newRecipe: savedRecipe,
    });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Something went wrong while updating favorites.", e });
  }
};
const updatePassword = async (password) => {
  const encryptedPassword = await encryptPassword(password);
  return encryptedPassword;
};

const updateAvatar = async (file) => {
  const avatar = await imageUpload(file, "avatars");
  return avatar;
};
const updateUser = async (req, res) => {
  try {
    let updatedData = { ...req.body };
    const userIdUpdate = req.params.id;
    console.log(userIdUpdate, "hello useidupdate");

    if (req.user._id.toString() !== userIdUpdate.toString()) {
      return res.status(403).json({
        error: "that's not your user",
      });
    }
    const currentUser = await UserModel.findById(userIdUpdate);

    console.log("test for current usre", currentUser);

    if (req.body.password && req.body.password !== currentUser.password) {
      updatedData.password = await updatePassword(req.body.password);
    }
    // else {
    //   return res.status(200).json({ message: "you didn't inc password or didn't changed mpassword" });
    // }
    // updatedData.password = await updatePassword(req.body.password);

    // updatedData.avatar = await updateAvatar(req.file);

    if (req.file && req.file !== currentUser.avatar) {
      updatedData.avatar = await updateAvatar(req.file);
    }
    // if (req.body.username && req.body.email) {

    // Check for udates
    let isChanged = false;
    for (let key in updatedData) {
      if (currentUser[key] !== updatedData[key]) {
        isChanged = true;
        break;
      }
    }

    if (!isChanged) {
      return res
        .status(200)
        .json({ message: "You didn't change any of the values...." });
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userIdUpdate,
      updatedData,
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json(
        { message: "User has been updated", updateUser: updateUser }
      );
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message : "Something went wrong with updating the user",
    });
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
            email: existingUser.email,
            recipes: existingUser.recipes,
            avatar: existingUser.avatar,
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
  updateUser,
  createUser,
  login,
  getActiveUser,
  addFavorite,
  removeFavorite,
};
