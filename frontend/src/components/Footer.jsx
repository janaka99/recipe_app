import React from "react";

const Footer = () => {
  return (
    <footer className="h-20 flex border-t-2 border-gray-300 ">
      <div className="w-11/12 h-full mx-auto max-w-7xl flex justify-between items-center">
        <p className="text-black dark:text-white text-sm uppercase tracking-wider font-semibold">
          DESIGNED & BUILT BY JANAKA
        </p>

        <a
          href="/"
          className="uppercase text-lg font-bold tracking-widest h-full flex items-center"
        >
          Recipe Kingdom
        </a>
      </div>
    </footer>
  );
};

export default Footer;
