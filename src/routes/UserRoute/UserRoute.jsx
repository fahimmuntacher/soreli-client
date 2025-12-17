import React from "react";

import { Navigate, useLocation } from "react-router";
import useAuth from "../../Hooks/UseAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading/Loading";
import Forbidden from "../../Components/Forbidden/Forbidden";

const UserRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "user") {
    return <Forbidden></Forbidden>;
  }
  
  if (!user) {
    return <Navigate to="/registration" state={{ from: location }} replace />;
  }

  return children;
};

export default UserRoutes;
