import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { DeleteButton } from "../components/DeleteButton";

interface Props {}

interface Favorite {
  _id: string;
  markdown: string;
  author: string;
  foodCategorie: string;
  __v: number;
}

export const UserArea = ({}: Props) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const toggleShowDetails = (favoriteId: string) => {
    setShowDetails((prevId) => (prevId === favoriteId ? null : favoriteId));
  };

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

  const extractFirstHeader = (markdown: string) => {
    const match = markdown.match(/^#\s*(.+)$/m);
    if (match) {
      return match[1];
    }
    return null;
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="m-10">
      {user ? (
        favorites && (
          <>
            {favorites.map((favorite) => (
              <div
                key={favorite._id}
                className="max-w-md mx-auto bg-gray-200 p-4 mt-4 rounded"
              >
                <div
                  className="cursor-pointer flex items-center justify-between mb-2"
                  onClick={() => toggleShowDetails(favorite._id)}
                >
                  <p className="text-xl font-bold text-orange-500">
                    {extractFirstHeader(favorite.markdown)}
                  </p>
                  <span className="text-gray-600">
                    {showDetails === favorite._id ? "-" : "+"}
                  </span>
                  <DeleteButton
                    recipeId={favorite._id}
                    deleteRecipe={deleteRecipe}
                  />
                </div>
                {showDetails === favorite._id && (
                  <>
                    <ReactMarkdown className="markdown">
                      {favorite.markdown}
                    </ReactMarkdown>
                    <p>Food Category: {favorite.foodCategorie}</p>
                  </>
                )}
              </div>
            ))}
          </>
        )
      ) : (
        <p className="text-red-500">You should login first.</p>
      )}
    </div>
  );
};
