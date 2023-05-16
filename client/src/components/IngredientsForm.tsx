import React, { useState, FormEvent, ChangeEvent } from "react";

interface IngredientFormProps {
  handleSubmit: (ingredients: string) => void;
}

const IngredientsForm: React.FC<IngredientFormProps> = ({ handleSubmit }) => {
  const [ingredients, setIngredients] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredients(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(ingredients);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="ingredients">Enter your ingredients:</label>
        <input type="text" id="ingredients" value={ingredients} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default IngredientsForm;