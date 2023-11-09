import axios from "axios";
import toast from "react-hot-toast";

const API_URL = axios.create({
  baseURL: "http://localhost:5000/api/",
});

API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem("recipe_app_j_token");

  if (token && token !== "null") {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

// Register user
const register = async (userData) => {
  try {
    const response = await API_URL.post("auth/register", userData);
    localStorage.setItem(
      "recipe_app_j_token",
      JSON.stringify(response.data.token)
    );
    toast.success("Successfully registered");
    return response.data.user;
  } catch (err) {
    toast.error("Something went wrong try again later");
    return null;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await API_URL.post("auth/login", userData);
    localStorage.setItem(
      "recipe_app_j_token",
      JSON.stringify(response.data.token)
    );
    toast.success("Successfully logged in");
    window.location.href = "/";
    return response.data.user;
  } catch (err) {
    toast.error("Username or password incorrect");
    return null;
  }
};

const validateUser = async () => {
  try {
    const response = await API_URL.get("auth/validate-user");
    localStorage.setItem(
      "recipe_app_j_token",
      JSON.stringify(response.data.token)
    );

    return response.data.user;
  } catch (err) {
    return null;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("recipe_app_j_token");
};

const authService = {
  register,
  logout,
  login,
  validateUser,
};

export default authService;
