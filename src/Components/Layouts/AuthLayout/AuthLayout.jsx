import React from "react";

import { Link, Outlet } from "react-router";
import Logo from "../../Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Logo */}
       <Link to="/" className="mb-8">
        <Logo />
      </Link>

      {/* Auth content */}
      <div className="w-full rounded-3xl">
        <Outlet />
      </div>
    </div> 
  );
};

export default AuthLayout;
