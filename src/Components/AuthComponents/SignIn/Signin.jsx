import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router"; // For navigation
import Logo from "../../Logo/Logo"; // Your logo component
import GoogleLogin from "../SocialLogin/GoogleLogin";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // handle login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md p-8 rounded-2xl border border-white/20 shadow-2xl bg-white/10 backdrop-blur-xl"
      >
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold text-white text-center mb-2"
        >
          Welcome Back
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-center mb-6 text-sm"
        >
          Sign in to continue your journey
        </motion.p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: "Email is required" })}
              className={`
                w-full p-3 rounded-lg bg-white/10 text-white 
                border ${errors.email ? "border-red-500" : "border-white/20"} 
                placeholder-gray-400 focus:outline-none focus:border-white/40
              `}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required"})}
              className={`
                w-full p-3 rounded-lg bg-white/10 text-white 
                border ${
                  errors.password ? "border-red-500" : "border-white/20"
                } 
                placeholder-gray-400 focus:outline-none focus:border-white/40 pr-10
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 rounded-lg bg-linear-to-r from-[#4F46E5] to-[#22D3EE] text-white font-semibold text-lg shadow-lg hover:opacity-90 transition"
          >
            Sign In
          </motion.button>
        </form>

        {/* Forgot Password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-right mt-3"
        >
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Forgot password?
          </a>
        </motion.div>
        
        {/* google login */}
        <motion.div  initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-right mt-3">
            <GoogleLogin></GoogleLogin>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-6 text-sm text-gray-400"
        >
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:underline">
            Sign Up
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
