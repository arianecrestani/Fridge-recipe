
import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


type Props = {};

export const UserArea = (props: Props) => {
  
  const [isFavorite, setIsFavorite] = useState(false);
  const { user } = useContext(AuthContext);

}
