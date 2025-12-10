import React from "react";
import useAuth from "./UseAuth";
import { useQuery } from '@tanstack/react-query';
import useAxios from "./useAxios";

const useRole = () => {
  const { user} = useAuth();
  const axiosInstance = useAxios()
  const { isLoading: reloading, data: role } = useQuery({
    queryKey: ["role", user?.email],
    queryFn : async () => {
        const response = await axiosInstance.get(`/users/${user?.email}/role`);
        return response.data.role;
    }
  });
  return {reloading, role};
};

export default useRole;
