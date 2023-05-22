import React, { FormEvent, useEffect, useState } from "react";

interface Props {}
// Your user page component
interface Favorite {
  _id: string;
  markdown: string;
  author: string;
  foodCategorie: string;
  __v: number;
}
export const UserArea = ({}: Props) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  console.log("loading component");
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

  return (
    <div>
    {favorites && (
      <>
        {favorites.map((favorite) => (
          <div key={favorite._id}>
            <p>Markdown: {favorite.markdown}</p>
            <p>Author: {favorite.author}</p>
            <p>Food Category: {favorite.foodCategorie}</p>
          </div>
        ))}
      </>
    )}
  </div>
  );
};
