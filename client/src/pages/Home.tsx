import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { SaveFavorites } from "../components/SaveFavorites";
import gsap from "gsap";
import { RecipeGenerator } from "../components/RecipeGenerator";

type Props = {};

type Recipe = {
  _id: string;
  markdown: string;
  foodCategorie: string;
};

export const Home: React.FC<Props> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [markdown, setMarkdown] = useState<string>("");
  const [showDetails, setShowDetails] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

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

  const getApiData = async (input: string, foodGroup: string) => {
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
    fetchAllRecipes();
  };

  function extractFirstHeader(markdown: string): React.ReactNode {
    const regex = /^#(.*)/m;
    const match = regex.exec(markdown);

    if (match) {
      return match[1].trim();
    } else {
      return "";
    }
  }

  useEffect(() => {
    gsap.to(".my-element", { opacity: 1, duration: 2, ease: "linear" });
  }, [Home]);

  return (
    <div className="container m-12 flex w-full">
      <RecipeGenerator getApiData={getApiData} />
      {/* {markdown && (
            <>
              <div className=" p-10 m-12 bg-gray-100 p-4 shadow-lg rounded-lg border border-gray-300 transform rotate-5 inline-block max-w-[80%]">
                <SaveFavorites markdown={markdown} foodCategorie={foodGroup} />
                <ReactMarkdown className="markdown">{markdown}</ReactMarkdown>
              </div>
            </>
          )} */}
      {recipes && (
        <div className="p-10 flex-col space-y-5 mr-16">
          {recipes.map(({ _id, markdown, foodCategorie }) => (
            <div key={_id} className="bg-gray-200 rounded p-5 max-w-md">
              <div
                className="cursor-pointer flex items-center"
                onClick={() => toggleShowDetails(_id)}
              >
                <span className="text-gray-600 p-2">
                  {showDetails === _id ? "-" : "+"}
                </span>
                <SaveFavorites
                  markdown={markdown}
                  foodCategorie={foodCategorie}
                />
                <p className="text-xl font-bold text-orange-500">
                  {extractFirstHeader(markdown)}
                </p>
              </div>

              {showDetails === _id && (
                <>
                  <ReactMarkdown className="markdown">{markdown}</ReactMarkdown>
                  <p>Food Category: {foodCategorie}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
