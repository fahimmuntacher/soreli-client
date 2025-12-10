import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  Menu,
  Home,
  User,
  Settings,
  Users,
  BookOpen,
  ShieldCheck,
  Heart,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import useRole from "../../../Hooks/useRole";
import useAuth from "../../../Hooks/UseAuth";
import Logo from "../../Logo/Logo";


const DashboardLayout = () => {
  const { role } = useRole();
  const { user ,signOutUser } = useAuth();
  
  const navigate = useNavigate();

  const navClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all
    ${
      isActive
        ? "bg-gradient-to-r from-yellow-400 to-green-400 text-black shadow-md"
        : "text-gray-300 hover:bg-white/10 hover:text-white"
    }`;

  // USER MENU
  const userMenu = (
    <>
      <NavLink to="/dashboard/user" className={navClasses}>
        <Home size={18} /> Dashboard Home
      </NavLink>

      <NavLink to="/dashboard/add-lesson" className={navClasses}>
        <BookOpen size={18} /> Add Lesson
      </NavLink>

      <NavLink to="/dashboard/my-lessons" className={navClasses}>
        <BookOpen size={18} /> My Lessons
      </NavLink>

      <NavLink to="/dashboard/my-favorites" className={navClasses}>
        <Heart size={18} /> My Favorites
      </NavLink>

      <NavLink to="/dashboard/profile" className={navClasses}>
        <User size={18} /> Profile
      </NavLink>
    </>
  );

  // ADMIN MENU
  const adminMenu = (
    <>
      <NavLink to="/dashboard/admin" className={navClasses}>
        <ShieldCheck size={18} /> Admin Home
      </NavLink>

      <NavLink to="/dashboard/admin/manage-users" className={navClasses}>
        <Users size={18} /> Manage Users
      </NavLink>

      <NavLink to="/dashboard/admin/manage-lessons" className={navClasses}>
        <BookOpen size={18} /> Manage Lessons
      </NavLink>

      <NavLink to="/dashboard/admin/reported-lessons" className={navClasses}>
        <AlertTriangle size={18} /> Reported Lessons
      </NavLink>

      <NavLink to="/dashboard/admin/profile" className={navClasses}>
        <User size={18} /> Admin Profile
      </NavLink>
    </>
  );

  return (
    <div className="drawer lg:drawer-open bg-gray-900">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content min-h-screen">
        {/* NAVBAR */}
        <nav
          className="flex items-center justify-between 
        bg-linear-to-r from-gray-900 to-gray-800/80 
        backdrop-blur-xl border-b border-white/10
        px-4 py-3 shadow-lg"
        >
          <label
            htmlFor="dashboard-drawer"
            className="cursor-pointer lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <Menu className="text-white" />
          </label>

          <div>
            <Link to="/">
            <Logo size="md"></Logo></Link>
          </div>
        </nav>

        {/* ROUTER VIEW */}
        <div className="p-6 text-white">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <div
          className="w-72 min-h-full p-5
        bg-linear-to-b from-gray-900 to-gray-800/90 
        backdrop-blur-xl border-r border-white/10 
        shadow-xl flex flex-col"
        >
          {/* TITLE */}
          <h2 className="text-xl font-semibold text-white mb-6">
            {role === "admin" ? "Admin Dashboard" : "User Dashboard"}
          </h2>

          {/* HOME BUTTON */}
          {/* <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-4 py-2 mb-4 rounded-xl 
            bg-linear-to-r from-yellow-400 to-yellow-500
            text-black font-semibold hover:opacity-90 transition"
          >
            <Home size={18} /> Go to Home
          </button> */}

          {/* ROLE BASED MENU */}
          <div className="space-y-2 mb-10">
            {role === "admin" ? adminMenu : userMenu}
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
