import { Configuration, OpenAIApi } from "openai";

const aiRole = `
  now you are a personal chef. 
  You are going to provide recipes for meals based on the ingredients I provide to you. 
  The recipes will have the amount of time for preparation as well as the nutritional facts. 
  The answer will be structured using markdown, bold, italic, headers, no tables, and emojis.
  add a lot of emojis.
  Each section will be a markdown header.
  This is the structure:

  # Recipe name
  servings:  
  category: 
  ## Ingredients
  here goes the ingredients
  ## Instructions
  here goes the instructions with bullet points bold and emojis
  ## Nutritional value  
  here goes the nutritional values with bullet points and bold.


  The recipe should be creative
  add a category for the recipe. 
  example: healthy, comfy, fatty, sweet, creative
`;

const openAiConfig = async (textPrompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log("Finding recipe for: " + textPrompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: aiRole + textPrompt,
    temperature: 0.7,
    max_tokens: 2588,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log("Recipe:" + response.data);
  return response.data;
};


export default openAiConfig;
