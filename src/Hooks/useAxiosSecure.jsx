import axios from "axios";
import React, { useEffect } from "react";

import { useNavigate } from "react-router";
import useAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://soreli-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // intercept request
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          // ONLY logout if user exists
          if (user) {
            signOutUser().then(() => {
              navigate("/signin");
            });
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
