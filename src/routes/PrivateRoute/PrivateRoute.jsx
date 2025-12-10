import React from "react";
import useAuth from "../../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import Loading from "../../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if(loading){
    return <Loading></Loading>
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
