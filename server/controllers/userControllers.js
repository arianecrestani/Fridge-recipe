// The controllers contain all the logic and functionality of the application.
import UserModel from "../models/userModels.js";

const testingRoute = (request, response) =>{
  response.send('testing users route..')
}

const getUsers = async (request, response) => {
  try {
    const users = await UserModel.find();
    console.log(users);
    response.status(200).json(users);
  } catch (e) {
    response.status(500).json({error: "something went wrong..."})
    console.log(e);
  }
}
const getUser = async(request, response) => {
  // const params = request.params;
  // console.log(params); // should show { id: blahblah }
  const id = request.params.id;
  console.log(id); // will show just "blahblah"
  try {
    const user = await UserModel.findById(id);
    response.status(200).json(user);
  } catch (error) {
    console.log(error);
    response.status(500).json({error: "something went wrong.."})
  }
}
export { testingRoute, getUsers, getUser }