import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

const DarkToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {toggleTheme === "dark" ? (
        <MdOutlineDarkMode size={20} />
      ) : (
        <CiLight size={20} />
      )}
    </button>
  );
};

export default DarkToggle;
