import React from "react";
import IngredientForm from "../components/IngredientsForm";
import IngredientsForm from "../components/IngredientsForm";

type Props = {};

const Home: React.FC<Props> = (props) => {
  const handleIngredientSubmit = (ingredients: string) => {
    // Pass the user's ingredients to your backend code to fetch the recipe suggestion from OpenAI
    // You could also display a loading spinner or message while waiting for the response from the backend
  };

  return (
    <div>
      <h1>Recipe Suggestion</h1>
      <IngredientsForm handleSubmit={handleIngredientSubmit} />
    </div>
  );
};

export default Home;