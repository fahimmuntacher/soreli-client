import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";
import Logo from "../../../Logo/Logo";
import useAuth from "../../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useRole from "../../../../Hooks/useRole";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, signOutUser } = useAuth();
  const { role } = useRole();

  const handleSignOut = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "You can log back in anytime.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#facc15",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        Swal.fire("Signed Out", "You are now logged out.", "success");
      }
    });
  };

  // ----------------------
  // REUSABLE NAV ITEMS
  // ----------------------

  

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Public Lessons", path: "/lessons" },
  ];

  const privateItems = [
    { name: "Add Lesson", path: "/dashboard/add-lesson" },
    { name: "My Lessons", path: "/dashboard/my-lessons" },
    { name: "Pricing / Upgrade", path: "/pricing" },
  ];

  // USER MENU
  const userMenu = (
    <>
      <NavLink to="/dashboard/user" >
        <Home size={18} /> Dashboard Home
      </NavLink>

      <NavLink to="/dashboard/add-lesson" >
        <BookOpen size={18} /> Add Lesson
      </NavLink>

      <NavLink to="/dashboard/my-lessons" >
        <BookOpen size={18} /> My Lessons
      </NavLink>

      <NavLink to="/dashboard/my-favorites" >
        <Heart size={18} /> My Favorites
      </NavLink>

      <NavLink to="/dashboard/profile" >
        <User size={18} /> Profile
      </NavLink>
    </>
  );

  // ADMIN MENU
  const adminMenu = (
    <>
      <NavLink to="/dashboard/admin" >
        <ShieldCheck size={18} /> Admin Home
      </NavLink>

      <NavLink to="/dashboard/admin/manage-users" className={navClasses}>
        <Users size={18} /> Manage Users
      </NavLink>

      <NavLink to="/dashboard/admin/manage-lessons" >
        <BookOpen size={18} /> Manage Lessons
      </NavLink>

      <NavLink to="/dashboard/admin/reported-lessons" >
        <AlertTriangle size={18} /> Reported Lessons
      </NavLink>

      <NavLink to="/dashboard/admin/profile" >
        <User size={18} /> Admin Profile
      </NavLink>
    </>
  );

  // ----------------------
  // ACTIVE CLASS HANDLER
  // ----------------------
  const linkClasses = ({ isActive }) =>
    `font-medium transition ${
      isActive ? "text-yellow-400" : "text-white hover:text-yellow-400"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Logo size="md" showText={true} />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* Public Items */}
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClasses}>
              {item.name}
            </NavLink>
          ))}

          {/* Private Items */}
          {user &&
            privateItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={linkClasses}>
                {item.name}
              </NavLink>
            ))}

          {/* If Not Logged In */}
          {!user && (
            <div className="flex gap-4">
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-semibold transition ${
                    isActive
                      ? "bg-yellow-500 text-black"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg border border-yellow-400 transition ${
                    isActive
                      ? "text-yellow-300 bg-white/20"
                      : "text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                Signup
              </NavLink>
            </div>
          )}

          {/* User Avatar & Dropdown */}
          {user && (
            <div className="relative">
              <img
                src={user.photoURL}
                onClick={() => setDropdown(!dropdown)}
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-yellow-400 hover:scale-105 transition"
                alt="user"
              />

              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-3 w-52 text-white bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl shadow-lg border border-white/20 p-4 rounded-lg flex flex-col"
                  >
                    <p className="text-sm font-semibold mb-2">
                      {user.displayName}
                    </p>
                    <hr className="border-white/30 mb-2" />

                    <NavLink to="/dashboard/my-profile" className={linkClasses}>
                      Profile
                    </NavLink>

                    <NavLink to="/dashboard" className={linkClasses}>
                      Dashboard
                    </NavLink>

                    <button
                      onClick={handleSignOut}
                      className="w-full py-2 mt-2 text-lg text-red-500 font-bold border border-red-500/30 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="md:hidden px-6 py-6 bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl 
      border-t border-white/20 space-y-4"
          >
            {/* Public Items */}
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Private Items */}
            {user && (
              <div className="flex flex-col gap-3 mt-4">
                {privateItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={linkClasses}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Mobile User Profile */}
            {user && (
              <div className="mt-6 p-4 bg-white/10 dark:bg-gray-800/30 rounded-xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={user.photoURL}
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                    alt="user"
                  />
                  <p className="text-white font-semibold">{user.displayName}</p>
                </div>

                <NavLink
                  to="/dashboard"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Dashboard
                </NavLink>

                <button
                  onClick={() => {
                    handleSignOut();
                    setOpen(false);
                  }}
                  className="w-full mt-4 py-2 text-red-400 border border-red-500/40 
            rounded-lg font-semibold hover:bg-red-500/10 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Login + Signup (When Logged Out) */}
            {!user && (
              <div className="flex flex-col gap-3 mt-4">
                <NavLink
                  to="/signin"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className={linkClasses}
                >
                  Signup
                </NavLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
