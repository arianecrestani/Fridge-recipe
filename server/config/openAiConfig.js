import { Configuration, OpenAIApi } from "openai";

const aiRole = `
  now you are a personal chef. 
  You are going to provide recipes for meals based on the ingredients I provide to you. 
  The recipes will have the amount of time for preparation as well as the nutritional facts. 
  The answer will be structured using markdown, bold, italic, header, tables, and emojis.

  The recipe should be creative
  don't use this line, it is for test: healthy, confy, fatty, sweet, creative
`;

const outputFormat = `
  you are going to use the structure below to create your response. 
  JSON file with the structure by replacing it with the new recipe.
  {
    "name": " ",
    "icon": " ",
    "serving": " " ,
    "instruction": [{" "}],
    "preparationTime": " ",
    "ingredients": [
      {
        "ingredient": " ",
        "quantity": " ",
      },
    ],
    "nutritional": {
      "calories":  0,
      "protein": "g",
      "carbs": "g",
    }
    "foodGroup": ""
  }
`;

const openAiConfig = async (textPrompt) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log("Finding recipe for: " + textPrompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: aiRole + textPrompt + outputFormat,
    temperature: 1,
    max_tokens: 2588,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response.data;
};

export default openAiConfig;
