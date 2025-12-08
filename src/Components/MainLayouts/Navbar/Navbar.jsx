import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

const Navbar = ({ user, handleLogout }) => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Public Lessons", path: "/lessons" },
  ];

  const privateItems = [
    { name: "Add Lesson", path: "/dashboard/add-lesson" },
    { name: "My Lessons", path: "/dashboard/my-lessons" },
    { name: "Pricing / Upgrade", path: "/pricing" },
  ];

  return (
    <nav className="
        fixed top-0 left-0 w-full z-50 
        backdrop-blur-lg 
        bg-white/40 dark:bg-gray-900/40 
        border-b border-white/20 dark:border-gray-700/40
      ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-3xl font-extrabold tracking-tight 
            bg-gradient-to-r from-indigo-500 to-blue-500 
            text-transparent bg-clip-text 
            cursor-pointer
          "
        >
          SORELI
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          {navItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link
                to={item.path}
                className="
                  relative font-medium text-gray-700 dark:text-gray-200 
                  hover:text-indigo-500 transition
                "
              >
                {item.name}
                <span className="
                    absolute left-0 -bottom-1 w-0 h-[2px] 
                    bg-indigo-500 transition-all duration-300 
                    group-hover:w-full
                "></span>
              </Link>
            </motion.div>
          ))}

          {/* Private Links */}
          {user &&
            privateItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="
                  relative font-medium text-gray-700 dark:text-gray-200 
                  hover:text-indigo-500 transition
                "
              >
                {item.name}
              </Link>
            ))
          }

          {/* Login / Signup */}
          {!user && (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="
                  px-4 py-2 rounded-xl 
                  bg-indigo-500 text-white 
                  shadow-md hover:bg-indigo-600 
                  transition
                "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="
                  px-4 py-2 rounded-xl 
                  border border-indigo-400 
                  text-indigo-500 
                  hover:bg-indigo-50 
                  dark:hover:bg-gray-800 
                  transition
                "
              >
                Signup
              </Link>
            </div>
          )}

          {/* Avatar Dropdown */}
          {user && (
            <div className="relative">
              <img
                src={user.photoURL || ""}
                alt="User"
                onClick={() => setDropdown(!dropdown)}
                className="
                  w-11 h-11 rounded-full 
                  object-cover cursor-pointer 
                  border-2 border-indigo-400
                "
              />

              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="
                    absolute right-0 mt-3 w-52 
                    bg-white dark:bg-gray-800 
                    shadow-xl rounded-xl 
                    p-4 border border-gray-200 dark:border-gray-700
                  "
                >
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {user.displayName}
                  </p>

                  <hr className="my-3 border-gray-300 dark:border-gray-700" />

                  <Link
                    to="/profile"
                    className="block py-2 hover:text-indigo-500"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    className="block py-2 hover:text-indigo-500"
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left py-2 text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-800 dark:text-gray-200">
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            md:hidden 
            bg-white/60 dark:bg-gray-900/60 
            backdrop-blur-xl 
            p-6 space-y-5
          "
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-lg font-medium"
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {user &&
            privateItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block text-lg"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))
          }

          {!user && (
            <>
              <Link to="/login" className="block text-lg" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="block text-lg" onClick={() => setOpen(false)}>
                Signup
              </Link>
            </>
          )}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="block text-lg text-red-500"
            >
              Logout
            </button>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
