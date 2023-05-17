import React, { FormEvent, useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import 'tailwindcss/tailwind.css';



export const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [markdown, setMarkdown] = useState ("")
  const [foodGroup, setFoodGroup] = useState("");

  const getApiData = async (e: FormEvent <HTMLFormElement>) => {
    e.preventDefault()
    const testUrl = `http://localhost:9000/api/recipes/recipe`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("ingredients", input);
    urlencoded.append("foodGroup", foodGroup);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

   const response = await fetch(testUrl, requestOptions)
   const result = await response.json()
   console.log(result)
   setMarkdown(result.choices[0].text)
      
  };

  return (
    <div>
      <form onSubmit={getApiData}>
        enter the ingredients
        <textarea onChange={(e) => setInput(e.target.value)}></textarea>
        <textarea placeholder="Enter the food group" onChange={(e) => setFoodGroup(e.target.value)}></textarea>
        <button type="submit">submit</button>
      </form>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};
