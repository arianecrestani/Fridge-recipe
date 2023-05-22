import React, { useEffect, useState } from "react";

interface Props {}

interface Favorite {
  _id: string;
  markdown: string;
  author: string;
  foodCategorie: string;
  __v: number;
}

export const UserArea = ({}: Props) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  console.log("loading component");

  const toggleShowDetails = (favoriteId: string) => {
    setShowDetails(showDetails === favoriteId ? null : favoriteId);
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

  useEffect(() => {
    getApiData();
  }, []);

  const extractFirstHeader = (markdown: string) => {
    const match = markdown.match(/^#\s*(.+)$/m);
    if (match) {
      return match[1];
    }
    return null;
  };

  return (
    <div className="m-10">
      {favorites && (
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
              </div>
              {showDetails === favorite._id && (
                <>
                  <p>Markdown: {favorite.markdown}</p>
                  <p>Food Category: {favorite.foodCategorie}</p>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
