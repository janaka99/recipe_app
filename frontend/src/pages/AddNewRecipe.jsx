import React from "react";
import { useState } from "react";
import useApiUrl from "../hooks/useApi";
import toast from "react-hot-toast";

const AddNewRecipe = () => {
  const API_URL = useApiUrl();

  const [ingredientName, setingredientName] = useState([]);
  const [isRequestProcessig, setIsRequestProcessig] = useState(false);

  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
  });

  // Adding new ingredients to the list
  const handleIngredient = () => {
    //check if the ingredient is already in the list
    if (newRecipe.ingredients.includes(ingredientName)) {
      return;
    }
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredientName],
    }));
    setingredientName("");
  };

  //remove added ingredient from the list
  const removeIngredient = (ingredientName) => {
    const updatedIngredients = newRecipe.ingredients.filter(
      (ingredient) => ingredient !== ingredientName
    );
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  //submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsRequestProcessig(true);
    if (
      newRecipe.name === "" ||
      newRecipe.email === "" ||
      newRecipe.ingredients.length <= 0
    ) {
      toast.error("Please fill all the details");
      setIsRequestProcessig(false);
      return;
    }
    try {
      const res = await API_URL.post("recipe/add-new", newRecipe);

      if (res.data) {
        toast.success("New recipe added successfully");
        setNewRecipe({
          name: "",
          description: "",
          ingredients: [],
        });
      } else {
        toast.error("Error adding new recipe, Try again!");
      }
    } catch (error) {
      toast.error("Error adding new recipe, Try again!");
    }
    setIsRequestProcessig(false);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-70px)] flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="text-black rounded-md dark:text-white w-full max-w-[470px] flex flex-col gap-5 border border-gray-300  p-5 "
      >
        <h1 className="w-full text-center uppercase font-semibold dark:text-white">
          Add New Recipe
        </h1>
        <input
          type="text"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={(e) =>
            setNewRecipe((prev) => ({ ...prev, name: e.target.value }))
          }
          className="border-2 border-gray-300 p-2 rounded-md text-sm outline-none focus:outline-none focus:border-blue-500 dark:text-black"
        />
        <textarea
          value={newRecipe.description}
          onChange={(e) =>
            setNewRecipe((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Recipe Description"
          className="border-2 border-gray-300 p-2 rounded-md text-sm h-32 outline-none focus:outline-none focus:border-blue-500 dark:text-black"
        />
        <div className="flex flex-col gap-2">
          <div className="flex">
            <input
              type="text"
              className="border dark:text-black border-gray-300 px-2 rounded-l-md flex-grow text-sm outline-none border-r-none"
              placeholder="Ingredients"
              value={ingredientName}
              onChange={(e) => setingredientName(e.target.value)}
            />
            <button
              type="button"
              className="w-12  h-8 flex items-center justify-center rounded-r-sm bg-green-500 text-white border-none"
              onClick={handleIngredient}
            >
              +
            </button>
          </div>
          {newRecipe.ingredients.map((item, i) => (
            <div className="flex items-center h-8">
              <span className="flex-grow flex items-center text-sm bg-gray-200 text-gray-700 rounded-l-md px-2 h-full">
                {item}
              </span>

              <button
                onClick={() => removeIngredient(item)}
                type="button"
                className="w-12 h-8 flex items-center justify-center rounded-r-sm bg-red-500 text-white border-none"
              >
                -
              </button>
            </div>
          ))}
        </div>
        {isRequestProcessig ? (
          <button
            className="border-2 border-blue-200 p-2 mt-3 bg-blue-200 text-white rounded-md  transition-all"
            disabled={true}
          >
            Adding...
          </button>
        ) : (
          <button
            className="border-2 border-blue-500 p-2 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            type="submit"
          >
            Add
          </button>
        )}
        <a
          className="w-full justify-center flex  text-blue-500 text-sm italic underline"
          href="/"
        >
          Home
        </a>
      </form>
    </div>
  );
};

export default AddNewRecipe;
