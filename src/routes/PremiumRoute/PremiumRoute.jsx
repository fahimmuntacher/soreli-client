import React from "react";
import useAuth from "../../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router";
import useRole from "../../Hooks/useRole";

const PremiumRote = ({ children }) => {
 const {isPremium} = useRole();
  const location = useLocation();

  

  if (isPremium) {
    return <Navigate to="/dashboard/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default PremiumRote;
