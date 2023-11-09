import React, { useState } from "react";
import DarkToggle from "./DarkToggle";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../featuress/auth/authSlice";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  //handle logout
  const handleLogOut = () => {
    dispatch(logout());
    window.location.reload();
  };

  const [isMobileActive, setIsMobileActive] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileActive((prev) => !prev);
  };

  return (
    <div className="w-screen  relative text-black dark:text-white h-[70px]  flex justify-center items-center border-b shadow-sm border-b-gray-200 dark:border-b-white">
      <div className="h-full max-w-7xl w-11/12 flex justify-between items-center">
        <div className="flex h-full gap-5 items-center">
          <a
            href="/"
            className="uppercase text-lg font-bold tracking-widest mr-10 h-full flex items-center"
          >
            Recipe Kingdom
          </a>
          <div className="h-full justify-between gap-5 items-center text-sm hidden md:flex">
            <a href="/">Recipes</a>
          </div>
        </div>
        <div className=" hidden md:flex gap-5">
          <DarkToggle />
          <div className="gap-5">
            {user ? (
              <button
                className="cursor-pointer text-sm  px-4 py-2 border border-black dark:border-white dark:text-white w-fit"
                onClick={handleLogOut}
              >
                Log out
              </button>
            ) : (
              <a
                className="cursor-pointer text-sm  px-4 py-2 border border-black dark:border-white dark:text-white w-fit"
                href="/login"
              >
                Log In
              </a>
            )}
          </div>
        </div>
        <div className=" md:hidden flex gap-5 items-center ">
          <DarkToggle />
          <GiHamburgerMenu onClick={toggleMobileMenu} size={20} />
        </div>
        <div
          className={`mobile absolute md:hidden w-[300px] bg-[#202124] dark:bg-white text-white dark:text-black top-full right-0 flex flex-col h-[calc(100vh-70px)] justify-around items-center  transition-all duration-300 ${
            isMobileActive ? "translate-x-[0]" : "translate-x-[300px]"
          }`}
        >
          <a href="#">Recipes</a>
          <a href="#">Add Recipe</a>
          {user ? (
            <button
              className="cursor-pointer text-sm  px-4 py-2 border  dark:text-black  dark:border-black  w-fit"
              onClick={handleLogOut}
            >
              Log out
            </button>
          ) : (
            <a
              className="cursor-pointer text-sm  px-4 py-2 border  dark:text-black  dark:border-black  w-fit"
              href="/login"
            >
              Log In
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
