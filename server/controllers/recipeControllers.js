
// import UserModel from "../models/userModels.js";

// const testingRoute = (request, response) =>{
//   response.send('testing recipe route..')
// }

// // const getUsers = async (request, response) => {
// //   try {
// //     const users = await UserModel.find();
// //     console.log(users);
// //     response.status(200).json(users);
// //   } catch (e) {
// //     response.status(500).json({error: "something went wrong..."})
// //     console.log(e);
// //   }
// // }
// const getRecipe = async(request, response) => {
//   // const params = request.params;
//   // console.log(params); // should show { id: blahblah }
//   const id = request.params.id;
//   console.log(id); // will show just "blahblah"
//   try {
//     const user = await UserModel.findById(id);
//     response.status(200).json(user);
//   } catch (error) {
//     console.log(error);
//     response.status(500).json({error: "something went wrong.."})
//   }
// }

// const createRecipe = async (request, response) => {
//   console.log(request.body)
//   response.send(request.body)
//   const newRecipe = new UserModel ({
//     ...request.body
//     // email: request.body.email,
//     // username: request.body.username,
//     // password: request.body.password
//   });
//   try {
//     const registeredUser = await newUser.save();
//     res.status(200).json({
//       message: "Successfully registered!",
//       newUser: registeredUser
//     })

//   }catch (error){
//     console.log(error)
//     response.status(500).json('something went wrong')
//   }
// }
// export { testingRoute, getRecipe, createRecipe }