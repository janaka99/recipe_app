import React, { useEffect, useState } from "react";
import useApiUrl from "../hooks/useApi";
import RecipeCard from "../components/RecipeCard";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  const API_URL = useApiUrl();
  const { user, isLoading } = useSelector((state) => state.auth);

  const loadRecipes = async () => {
    const res = await API_URL.get("recipe/get-all");

    if (res.data) {
      console.log(res.data.recipes);
      setRecipes(res.data.recipes);
    }
  };

  const refreshRecipes = async () => {
    const res = await API_URL.get("recipe/get-all");

    if (res.data) {
      setRecipes(res.data.recipes);
    }
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full overflow-hidden  text-black dark:text-white flex flex-col gap-12">
      <section className="h-96 sm:h-[580px] max-w-7xl   w-11/12 mx-auto flex flex-col justify-center items-center text-center md:items-start md:text-left gap-5 ">
        <div className="text-3xl md:text-5xl text-black dark:text-white md:w-8/12 font-bold">
          Discover Delicios Recipes to Satisfy Your Cravings
        </div>
        <p className="text-black dark:text-white text-base  ">
          Explore a Wide Range of Mouthwatering Recipes for Every Occasion
        </p>
        {user ? (
          <a
            href="/add-new-recipe"
            className="cursor-pointer text-sm  px-4 py-2 border border-black dark:border-white dark:text-white w-fit"
          >
            Add Recipe
          </a>
        ) : (
          <a
            href="/login"
            className="cursor-pointer text-sm  px-4 py-2 border border-black dark:border-white dark:text-white w-fit"
          >
            Add Recipe
          </a>
        )}
      </section>
      <div className="w-full flex justify-center items-center">
        <button
          onClick={refreshRecipes}
          className="cursor-pointer text-sm  px-4 py-2 border border-black dark:border-white dark:text-white w-fit"
        >
          Refresh Recipes
        </button>
      </div>
      <section className="h-fit max-w-7xl  w-11/12 mx-auto columns-1 md:columns-2 lg:col-span-3 gap-10">
        {recipes?.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe._id}
            loadRecipes={loadRecipes}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};
