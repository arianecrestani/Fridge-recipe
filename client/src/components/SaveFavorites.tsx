import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";



interface SaveFavoriteButtonProps {
  markdown: string;
  foodCategorie: string
}

export const SaveFavorites: FunctionComponent<SaveFavoriteButtonProps> = ({
  markdown, foodCategorie
}) => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate()


  const saveFavorite = async () => {
   
  if (!user) {
    navigate("/login");
  }else {

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

    try { 
      const response = await fetch(favoriteUrl, requestOptions);
      const result = await response.json();
      console.log(result); 
     
    } catch (error) { 
      console.log(error); 
  
    }
  }
}
return (
    <FontAwesomeIcon onClick={saveFavorite} icon={faHeart} className="mr-8 p-8" />
  );
};
//If you are currently receiving an array of recipe IDs instead of the complete recipe data, 
//you will need to make an additional API request to fetch the complete recipe information for each ID.