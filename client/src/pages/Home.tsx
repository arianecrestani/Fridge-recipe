import React, { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "tailwindcss/tailwind.css";
import { SaveFavorites } from "../components/SaveFavorites";

export const Home = () => {
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
    setInput('')

  };

  return (
    <div className="p-12">
      <form
        onSubmit={getApiData}
        className="flex flex-col items-center space-y-4 p-4"
      >
        <label className="text-lg">Enter the ingredients:</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded-lg p-2 w-96"
        ></textarea>
        <select
          value={foodGroup}
          onChange={(e) => setFoodGroup(e.target.value)}
          className="border rounded-lg p-2 w-96"
        >
          <option value="">Select a category</option>
          <option value="healthy">Healthy</option>
          <option value="comfy">Comfy</option>
          <option value="fatty">Fatty</option>
          <option value="sweet">Sweet</option>
          <option value="creative">Creative</option>
          <option value="salty">salty</option>
        </select>

        <button
          type="submit"
          className="w-36 p-2 border border-gray-300 rounded focus:outline-none mb-4"
        >
          Submit
        </button>
      </form>
      <div className="p-12">
        <div className="flex items-center justify-center h-screen">
          {markdown && (
            <>
              <div className="p-10 m-12 bg-gray-100 p-4 shadow-lg rounded-lg border border-gray-300 transform rotate-5 inline-block max-w-[80%]">
                <SaveFavorites markdown={markdown } foodCategorie={foodGroup} />
                <ReactMarkdown className="markdown">{markdown}</ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
