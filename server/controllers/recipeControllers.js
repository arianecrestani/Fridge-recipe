
import RecipeModel from "../models/recipeModels.js";

// const getRecipes = async (request, response) => {
//   response.send('testing recipe route..')
// }

const getRecipe = async(request, response) => {

  const id = request.params.id;
  console.log(id); 
  try {
    const recipe = await (await RecipeModel.findById(id)).populate("author")
    response.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    response.status(500).json({error: "something went wrong.."})
  }
}

const getRecipes = async (request, response) => {
  try {
    const recipes = await RecipeModel.find()
    console.log(recipes);
    response.status(200).json(recipes);
  } catch (e) {
    response.status(500).json({error: "something went wrong..."})
    console.log(e);
  }
}

const createRecipe = async (request, response) => {
  console.log(request.body)
  response.send(request.body)
  const newRecipe = new RecipeModel ({
    ...request.body
    // email: request.body.email,
    // username: request.body.username,
    // password: request.body.password
  });
  try {
    const saveRecipe = await newRecipe.save();
    response.status(200).json({
      message: "Successfully recipe saved",
      newRecipe: saveRecipe
    })

  }catch (error){
    console.log(error)
    response.status(500).json('something went wrong')
  }
}
export {  getRecipe, getRecipes, createRecipe }