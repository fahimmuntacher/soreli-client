import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import Logo from "../../../Logo/Logo";


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
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo size="md" showText={true} />
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="font-medium text-white hover:text-yellow-400 transition"
            >
              {item.name}
            </Link>
          ))}

          {user &&
            privateItems.map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="font-medium text-white hover:text-yellow-400 transition"
              >
                {item.name}
              </Link>
            ))}

          {!user && (
            <div className="flex gap-4">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg border border-yellow-400 text-yellow-400 hover:bg-yellow-50 dark:hover:bg-gray-800"
              >
                Signup
              </Link>
            </div>
          )}

          {user && (
            <div className="relative">
              <img
                src={user.photoURL || ""}
                alt="User"
                onClick={() => setDropdown(!dropdown)}
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-yellow-400"
              />

              {dropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 w-48 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg rounded-lg p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {user.displayName}
                  </p>
                  <hr className="my-2 border-white/20" />
                  <Link
                    to="/profile"
                    className="block py-2 hover:text-yellow-400"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block py-2 hover:text-yellow-400"
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

        {/* Mobile Menu */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white/10 dark:bg-gray-900/20 backdrop-blur-xl p-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-lg font-medium text-white"
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
                className="block text-lg text-white"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          {!user && (
            <>
              <Link
                to="/login"
                className="block text-lg font-medium text-white"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-lg font-medium text-white"
                onClick={() => setOpen(false)}
              >
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
