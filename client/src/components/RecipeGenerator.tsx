import { FormEvent, ChangeEvent, useState } from "react";

interface RecipeGeneratorProps {
  getApiData: (input: string, foodGroup: string) => void;
}

export const RecipeGenerator = ({ getApiData }: RecipeGeneratorProps) => {
  const [input, setInput] = useState<string>("");
  const [foodGroup, setFoodGroup] = useState<string>("");
  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getApiData(input, foodGroup);
    setInput("");
    setFoodGroup("");
  };

  return (
    <div className="flex-col p-10 max-w-[50%]">
      <h1 className="leading-normal my-element opacity-0 my-element opacity-0 text-3xl text-orange-500 mb-10">
        Which ingredients do you have in your fridge?
      </h1>
      <form
        onSubmit={onSubmitForm}
        className="flex flex-col items-center space-y-10 w-full"
      >
        <label className="text-lg w-full">Enter the ingredients:</label>
        <textarea
          value={input}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          className="border rounded-lg w-full p-5"
        ></textarea>
        <select
          value={foodGroup}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setFoodGroup(e.target.value)
          }
          className="border rounded-lg p-2  w-full"
        >
          <option value="">Select a category</option>
          <option value="healthy">Healthy</option>
          <option value="comfy">Comfy</option>
          <option value="fatty">Fatty</option>
          <option value="sweet">Sweet</option>
          <option value="creative">Creative</option>
          <option value="salty">Salty</option>
        </select>
        <button
          type="submit"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none mb-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
