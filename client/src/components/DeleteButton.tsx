// DeleteButton.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface Props {
  recipeId: string;
  deleteRecipe: (recipeId: string) => void;
}

export const DeleteButton = ({ recipeId, deleteRecipe }: Props) => {

  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="text-gray-700 hover:text-orange-500 cursor-pointer"
      onClick={() => deleteRecipe(recipeId)}
    />
  );
};
