// The controllers contain all the logic and functionality of the application.
import { verifyPassword, encryptPassword } from "../utils/bcrypt.js";

import UserModel from "../models/userModels.js";

const testingRoute = (request, response) => {
  const { ingredients } = request;

  console.log("request.body", request.body);
  console.log("request.body", request);
  response.status(200).json("testing users route..");
};

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

  // response.send(request.body);
  const newUser = new UserModel({
    ...request.body,
    password: encryptedPassword,
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
const updateUser = async (request, response) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.status(200).json(updatedUser);
  } catch (e) {
    console.log(e);
    response.status(500).send(e.message);
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
        // const token = generateToken(existingUser)
        res.status(200).json({
          verified: true,
          // token:token,
          user: {
            _id: existingUser._id,
            username: existingUser.username,
            // succulents: existingUser.succulents,
            // avatar: existingUser.avatar
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "something went wrong.." });
  }
};
// const login = async (request, response) => {
//   try {
//     const existingUser = await UserModel.findOne({ email: request.body.email });
//     if (!existingUser) {
//       response.status(404).json({ error: "no user found" });
//       return;
//     }
//     if (existingUser) {
//       const verified = await verifyPassword(
//         request.body.password,
//         existingUser.password
//       );
//       if (!verified) {
//         response.status(406).json({ error: "password doesn't match" });
//       }
//       if (verified) {
//         response.status(200).json({
//           verified: true,
//           user: {
//             _id: existingUser._id,
//             username: existingUser.username,
//             // pets: existingUser.pets,
//             // avatar: existingUser.avatar,
//           },
//         });
//       }
//     }
//   } catch (e) {
//     console.log(e);
//     response.status(500).json({ error: "something went wrong login" });
//   }
// };
export { testingRoute, getUsers, getUser, createUser, updateUser, login };
