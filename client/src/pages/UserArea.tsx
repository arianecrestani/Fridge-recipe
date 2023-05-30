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

  const showFavorites = () => {
    return (
      favorites && (
        <>
          {favorites.map(({ _id, markdown, foodCategorie }) => (
            <div
              key={_id}
              className="max-w-md mx-auto bg-gray-200 p-4 mt-4 rounded flex"
            >
              <div
                className="cursor-pointer flex items-center"
                onClick={() => toggleShowDetails(_id)}
              >
                <span className="text-gray-600 p-2">
                  {showDetails === _id ? "-" : "+"}
                </span>

                <DeleteButton recipeId={_id} deleteRecipe={deleteRecipe} />
                <p className="p-4 text-xl font-bold text-orange-500">
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
        </>
      )
    );
  };

  return (
    <div className="m-10 flex justify-center">
      <div className="flex">
        {user ? (
          <div className="flex items-center m-10">
            <div>
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-60 h-60 rounded-full mb-4"
              />
              <div className="ml-4">
                <p className="text-xl font-bold">{user.username}</p>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="ml-24">
              <h2 className="text-2xl font-bold mb-4">Favorites</h2>
              {showFavorites()}
            </div>
          </div>
        ) : (
          <p className="text-orange-500">You should login first.</p>
        )}
      </div>
    </div>
  );
};
