import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApiUrl from "../hooks/useApi";
import toast from "react-hot-toast";

const EditRecipe = () => {
  let { id } = useParams();

  const API_URL = useApiUrl();
  const navigate = useNavigate();
  const [ingredientName, setingredientName] = useState([]);
  const [isRequestProcessig, setIsRequestProcessig] = useState(false);

  const [recipeToUpdate, setRecipeToUpdate] = useState({
    name: "",
    description: "",
    _id: "",
    ingredients: [],
  });

  // Adding new ingredients to the list
  const handleIngredient = () => {
    //check if the ingredient is already in the list
    if (recipeToUpdate.ingredients.includes(ingredientName)) {
      return;
    }
    setRecipeToUpdate((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ingredientName],
    }));
    setingredientName("");
  };

  //remove added ingredient from the list
  const removeIngredient = (ingredientName) => {
    const updatedIngredients = recipeToUpdate.ingredients.filter(
      (ingredient) => ingredient !== ingredientName
    );
    setRecipeToUpdate((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };

  //submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsRequestProcessig(true);
    if (
      recipeToUpdate.name === "" ||
      recipeToUpdate._id === "" ||
      recipeToUpdate.email === "" ||
      recipeToUpdate.ingredients.length <= 0
    ) {
      toast.error("Please fill all the details");
      setIsRequestProcessig(false);
      return;
    }
    try {
      const res = await API_URL.patch(
        `recipe/update-recipe/${id}`,
        recipeToUpdate
      );

      if (res.data) {
        toast.success("Recipe successfully updated");
        getRecipeee();
      } else {
        toast.error("Error updating recipe, Try again!");
      }
    } catch (error) {
      toast.error("Error updating recipe, Try again!");
    }
    setIsRequestProcessig(false);
  };

  const getRecipeee = async () => {
    try {
      const res = await API_URL.get("recipe/get-recipe/" + id);
      console.log(res.data);
      if (res.data) {
        setRecipeToUpdate({
          name: res.data.recipe.name,
          description: res.data.recipe.description,
          __id: res.data.recipe._id,
          ingredients: res.data.recipe.ingredients,
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    getRecipeee();
  }, []);

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-70px)] flex justify-center items-center">
      <form
        onSubmit={handleFormSubmit}
        className="text-black rounded-md dark:text-white w-full max-w-[470px] flex flex-col gap-5 border border-gray-300  p-5 "
      >
        <h1 className="w-full text-center uppercase font-semibold dark:text-white flex justify-between">
          <span> Edit: </span>
          <span className="capitalize">{recipeToUpdate.name}</span>
        </h1>
        <input
          type="text"
          value={recipeToUpdate.name}
          onChange={(e) =>
            setRecipeToUpdate((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Recipe Name"
          className="border-2 border-gray-300 p-2 rounded-md text-sm outline-none focus:outline-none focus:border-blue-500 dark:text-black"
        />
        <textarea
          value={recipeToUpdate.description}
          onChange={(e) =>
            setRecipeToUpdate((prev) => ({
              ...prev,
              description: e.target.value,
            }))
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
          {recipeToUpdate.ingredients.map((item) => (
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
            Updating...
          </button>
        ) : (
          <button
            className="border-2 border-blue-500 p-2 mt-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
            type="submit"
          >
            Update
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

export default EditRecipe;
