import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";
import useApiUrl from "../hooks/useApi";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe, loadRecipes }) => {
  const { user } = useSelector((state) => state.auth);
  const API_URL = useApiUrl();

  // handle Delete
  const handleDelete = async (id) => {
    const userResponse = window.confirm("Do you want to proceed?");

    if (userResponse) {
      try {
        const res = await API_URL.delete(`recipe/delete-recipe/${id}`);

        if (res.data) {
          toast.success("recipe deleted successfully");
          loadRecipes();
        } else {
          toast.error("Error deleting recipe, Try again!");
        }
      } catch (error) {
        toast.error("Error deleting recipe, Try again!");
      }
    } else {
      return;
    }
  };
  return (
    <div className="w-full max-w-[580px] rounded-lg dark:bg-[#3C4042] p-5 text-center border-2 border-gray-300 dark:border-transparent mb-10 inline-block shadow-lg">
      <h3 className="dark:text-white text-black pb-2 text-xl font-bold sm:text-2xl capitalize">
        {recipe.name}
      </h3>
      <div className="flex-flex-col  ">
        <span className="bg-[#EA80FC] mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
        <p className="dark:text-gray-400 mb-4 text-black text-base leading-relaxed capitalize">
          {recipe.description}
        </p>
        <span className="bg-[#EA80FC] mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
        <div className="flex flex-col mb-10 w-full items-center">
          {recipe.ingredients.map((item, i) => (
            <p
              key={i}
              className="dark:text-gray-400  text-black text-base leading-relaxed capitalize"
            >
              {item}
            </p>
          ))}
        </div>
        <div className="flex items-center justify-between w-full gap-3">
          <div className="flex gap-2 items-center text-sm">
            <span>Uploaded By:</span>
            <span className="capitalize font-semibold">
              {user && user.email === recipe.user.email
                ? "You"
                : recipe.user.username}
            </span>
          </div>
          {user && user.email === recipe.user.email && (
            <div className="flex items-center gap-3">
              <a
                href={`/edit/${recipe._id}`}
                className="rounded-md bg-green-400 hover:bg-green-600 hover:text-slate-200 duration-300 p-2"
              >
                <BiEdit size={20} />
              </a>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="rounded-md bg-red-400 hover:bg-red-600 hover:text-slate-200 duration-300 p-2"
              >
                <MdOutlineDelete size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
