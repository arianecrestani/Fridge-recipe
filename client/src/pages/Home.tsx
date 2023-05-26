import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { SaveFavorites } from "../components/SaveFavorites";

type Props = {};

type Recipe = {
  _id: string;
  markdown: string;
  foodCategorie: string;
};

type State = {
  recipes: Recipe[];
  input: string;
  markdown: string;
  foodGroup: string;
};

export const Home: React.FC<Props> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [input, setInput] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");
  const [foodGroup, setFoodGroup] = useState<string>("");
  const [showDetails, setShowDetails] = useState<string>("");

  const toggleShowDetails = (id: string) => {
    if (showDetails === id) {
      setShowDetails("");
    } else {
      setShowDetails(id);
    }
  };

  const fetchAllRecipes = async () => {
    const testUrl = "http://localhost:9000/api/recipes/homerecipes";
    const response = await fetch(testUrl);
    const data = await response.json();
    console.log(data);
    setRecipes(data);
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const getApiData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const testUrl = `http://localhost:9000/api/recipes/recipe`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("ingredients", input);
    urlencoded.append("foodGroup", foodGroup);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(testUrl, requestOptions);
    const result = await response.json();
    console.log(result);
    setMarkdown(result.choices[0].text);
    setInput("");
  };

  function extractFirstHeader(markdown: string): React.ReactNode {
    // Use a regular expression to match the first header line
    const regex = /^#(.*)/m;
    const match = regex.exec(markdown);
    // If there is a match, return the header text
    if (match) {
      return match[1].trim();
    }
    // Otherwise, return an empty string
    else {
      return "";
    }
  }

  return (
    <div className="m-10">
      <form
        onSubmit={getApiData}
        className="flex flex-col items-center space-y-4 p-4"
      >
        <label className="text-lg">Enter the ingredients:</label>
        <textarea
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          className="border rounded-lg p-2 w-96"
        ></textarea>
        <select
          value={foodGroup}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFoodGroup(e.target.value)
          }
          className="border rounded-lg p-2 w-96"
        >
          <option value="">Select a category</option>
          <option value="healthy">Healthy</option>
          <option value="comfy">Comfy</option>
          <option value="fatty">Fatty</option>
          <option value="sweet">Sweet</option>
          <option value="creative">Creative</option>
          <option value="salty">Salty</option>
        </select>
        <button
          type="submit"
          className="w-36 p-2 border border-gray-300 rounded focus:outline-none mb-4"
        >
          Submit
        </button>
      </form>
      <div className="p-12">
        {recipes ? (
          recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-md mx-auto bg-gray-200 p-4 mt-4 rounded"
            >
              <div
                className="cursor-pointer flex items-center justify-between mb-2"
                onClick={() => toggleShowDetails(recipe._id)}
              >
                <p className="text-xl font-bold text-orange-500">
                  {extractFirstHeader(recipe.markdown)}
                </p>
                <span className="text-gray-600">
                  {showDetails === recipe._id ? "-" : "+"}
                </span>
                <SaveFavorites
                  markdown={recipe.markdown}
                  foodCategorie={recipe.foodCategorie}
                />
              </div>
              {showDetails === recipe._id && (
                <>
                  <ReactMarkdown className="markdown">
                    {recipe.markdown}
                  </ReactMarkdown>
                  <p>Food Category: {recipe.foodCategorie}</p>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-red-500">No recipes found.</p>
        )}
      </div>
    </div>
  );
};
