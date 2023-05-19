
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


export const UserArea = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);

}
