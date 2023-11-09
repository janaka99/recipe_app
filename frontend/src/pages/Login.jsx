import React, { useEffect, useState } from "react";
import { login } from "../featuress/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const { isLoading, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [fUser, setfUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(fUser));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className=" flex items-center justify-center h-[calc(100vh-70px)] ">
      <div className="p-8 rounded shadow-md w-96 border border-gray-200 dark:border-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-black dark:text-white">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border-2 text-sm rounded-md focus:outline-none focus:border-blue-500"
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border-2 text-sm rounded-md focus:outline-none focus:border-blue-500 "
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
            Login
          </button>
          <p className="flex italic text-sm items-center gap-5 mt-2">
            Not Registered?{" "}
            <a className="text-blue-500 underline" href="/register">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
