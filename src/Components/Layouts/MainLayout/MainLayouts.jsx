// MainLayout.jsx
import React from "react";

import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-pink-400 rounded-full opacity-15 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-green-400 rounded-full opacity-15 animate-bounce-slow"></div>
      </div>

      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10 px-4 md:px-10 py-10">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
