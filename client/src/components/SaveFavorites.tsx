import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

interface SaveFavoriteButtonProps {
  markdown: string;
  foodCategorie: string
}

export const SaveFavorites: FunctionComponent<SaveFavoriteButtonProps> = ({
  markdown, foodCategorie
}) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]); // move this inside the component function

  const saveFavorite = async () => {
    if (!markdown) {
      return;
    }

    const favoriteUrl = `http://localhost:9000/api/users/favorites`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const tokenValue = localStorage.getItem("token");
    console.log("token: ", tokenValue);

    myHeaders.append("Authorization", `Bearer ${tokenValue}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("recipe", markdown);
    urlencoded.append("foodCategorie", foodCategorie);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try { // add try block
      const response = await fetch(favoriteUrl, requestOptions);
      const result = await response.json();
      console.log(result); // log result
      // do something with result
    } catch (error) { // add catch block
      console.log(error); // log error
      // handle error
    }
  };

  return (
    <FontAwesomeIcon onClick={saveFavorite} icon={faHeart} className="mr-2" />
  );
};
//If you are currently receiving an array of recipe IDs instead of the complete recipe data, 
//you will need to make an additional API request to fetch the complete recipe information for each ID.