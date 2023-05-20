import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface SaveFavoriteButtonProps {
  markdown: string;
}

export const SaveFavorites: FunctionComponent<SaveFavoriteButtonProps> = ({
  markdown,
}) => {
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

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(favoriteUrl, requestOptions);

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FontAwesomeIcon onClick={saveFavorite} icon={faHeart} className="mr-2" />
  );
};
