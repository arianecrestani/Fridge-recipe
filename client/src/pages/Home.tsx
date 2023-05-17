import React, { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import 'tailwindcss/tailwind.css';

export const Home = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [foodGroup, setFoodGroup] = useState("");

  const getApiData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const testUrl = `http://localhost:9000/api/recipes/recipe`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("ingredients", input);
    urlencoded.append("foodGroup", foodGroup);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    const response = await fetch(testUrl, requestOptions);
    const result = await response.json();
    console.log(result);
    setMarkdown(result.choices[0].text);
  };

  return (
    <div>
      <form onSubmit={getApiData} className="flex flex-col items-center space-y-4">
        <label className="text-lg">Enter the ingredients:</label>
        <textarea
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-lg p-2 w-96"
        ></textarea>
        <textarea
          placeholder="Enter the food group"
          onChange={(e) => setFoodGroup(e.target.value)}
          className="border rounded-lg p-2 w-96"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
      <ReactMarkdown className="mt-4">{markdown}</ReactMarkdown>
    </div>
  );
};
