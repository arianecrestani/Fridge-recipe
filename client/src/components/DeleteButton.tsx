// DeleteButton.tsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  recipeId: string;
  deleteRecipe: (recipeId: string) => void;
}

export const DeleteButton = ({ recipeId, deleteRecipe }: Props) => {
  return (
    <FontAwesomeIcon
      icon={faTrash}
      className="text-red-500 hover:text-red-700 cursor-pointer"
      onClick={() => deleteRecipe(recipeId)}
    />
  );
};
