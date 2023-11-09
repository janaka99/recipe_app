import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-[calc(100vh-70px)] w-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-6">
          The page you're looking for does not exist.
        </p>
        <div>
          <Link
            to="/"
            className="mr-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
