import React, { useState } from "react";
import { register } from "../featuress/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fUser, setfUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(fUser)).then(() => navigate("/"));
  };

  return (
    <div className=" flex items-center justify-center h-[calc(100vh-70px)] ">
      <div className="p-8 rounded shadow-md w-96 border border-gray-200 dark:border-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={fUser.email}
              onChange={(e) => {
                setfUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="Username"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your Username"
              value={fUser.username}
              onChange={(e) => {
                setfUser((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              value={fUser.password}
              onChange={(e) => {
                setfUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
