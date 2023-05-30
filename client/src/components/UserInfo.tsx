import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { DeleteButton } from "./DeleteButton";

interface Favorite {
  _id: string;
  markdown: string;
  author: string;
  foodCategorie: string;
  __v: number;
}

export const ShowFavorites = () => {
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const getApiData = async () => {
    const testUrl = `http://localhost:9000/api/users/favorites`;

    const myHeaders = new Headers();

    const tokenValue = localStorage.getItem("token");
    console.log("token: ", tokenValue);

    myHeaders.append("Authorization", `Bearer ${tokenValue}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    console.log("fetching recipes");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(testUrl, requestOptions);
    const result = await response.json();
    console.log(result);
    setFavorites(result);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const deleteRecipe = async (recipeId: string) => {
    const testUrl = `http://localhost:9000/api/users/updates/${recipeId}`;

    const myHeaders = new Headers();

    const tokenValue = localStorage.getItem("token");
    console.log("token: ", tokenValue);

    myHeaders.append("Authorization", `Bearer ${tokenValue}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
    };
    const response = await fetch(testUrl, requestOptions);
    const result = await response.json();
    console.log(result);
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite._id !== recipeId)
    );
  };

  const toggleShowDetails = (favoriteId: string) => {
    setShowDetails((prevId) => (prevId === favoriteId ? null : favoriteId));
  };

  const extractFirstHeader = (markdown: string) => {
    const match = markdown.match(/^#\s*(.+)$/m);
    if (match) {
      return match[1];
    }
    return null;
  };

  return (
    favorites && (
      <div className="p-10 flex-col space-y-5">
        {favorites.map(({ _id, markdown, foodCategorie }) => (
          <div key={_id} className="bg-gray-200 rounded p-4 max-w-md ">
            <div
              className=" cursor-pointer flex items-center max-w-md"
              onClick={() => toggleShowDetails(_id)}
            >
              <span className="text-gray-600 mr-6">
                {showDetails === _id ? "-" : "+"}
              </span>

              <DeleteButton recipeId={_id} deleteRecipe={deleteRecipe} />
              <p className=" p-4 text-xl font-bold text-orange-500">
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
    )
  );
};
