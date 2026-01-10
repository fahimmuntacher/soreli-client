import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();

  const { data, isLoading: reloading,
  } = useQuery({
    queryKey: ["user-role-premium", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user?.email}/role`);
      return res.data; 
    },
  });

  const role = data?.role;
  const isPremium = data?.isPremium || false; 
  return { reloading, loading, role, isPremium };
}

export default useRole;
