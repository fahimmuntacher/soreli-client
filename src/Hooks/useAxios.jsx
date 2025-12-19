import axios from "axios";
import React from "react";

const useAxios = () => {
  const instance = axios.create({
    // baseURL: "http://localhost:3000",
    baseURL: "https://soreli-server.vercel.app"
  });
  return instance;
};

export default useAxios;