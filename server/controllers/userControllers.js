// The controllers contain all the logic and functionality of the application.
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";
import { imageUpload } from "../utils/imageUpload.js";

import UserModel from "../models/userModels.js";

const testingRoute = (request, response) => {
  const { ingredients } = request;

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
    sketchs: req.user.sketchs
    })

  // res.send(req.user)
}


const getUsers = async (request, response) => {
  try {
    const users = await UserModel.find();
    if (users.length === 0) {
      response.status(200).json("sorry nobody here");
    } else {
      response.status(200).json("sorry nobody here");
    }
    console.log(users);
    response.status(200).json(users);
  } catch (e) {
    response.status(500).json({ error: "something went wrong..." });
    console.log(e);
  }
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

  console.log("user_avatars", uploadedImage)
  const newUser = new UserModel({
    ...request.body,
    password: encryptedPassword,
    avatar: uploadedImage
  });
  

  try {
    const registeredUser = await newUser.save();
    response.status(200).json({
      message: "Successfully registered!",
      newUser: registeredUser,
    });
    console.log(registeredUser);
  } catch (error) {
    console.log(error);
    response.status(500).json("something went wrong");
  }
};

const updateUser = async(req, res) => {
  const me = req.user;
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(me._id, req.body, { new: true });
      res.status(200).json(updatedUser);
    } catch(e) {
      console.log(e);
      res.status(500).send(e.message);
    }
}

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

export { testingRoute, getUsers, getUser, createUser, updateUser, login, getActiveUser };
