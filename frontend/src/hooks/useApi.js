import { useState, useEffect } from "react";
import axios from "axios";

const useApiUrl = () => {
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

  return API_URL;
};

export default useApiUrl;
