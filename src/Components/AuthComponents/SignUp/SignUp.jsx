import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import useAuth from "../../../Hooks/UseAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { RegisterUser, userProfileUpdate } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const [profileImage, setProfileImage] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setProfileImage(URL.createObjectURL(e.target.files[0]));
  //   }
  //   reset();
  // };

  const handleFirebaseError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered! Try signing in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Your password is too weak! Use at least 8 characters:";
    case "auth/operation-not-allowed":
      return "Email/password sign-in is disabled. Contact admin.";
    case "auth/network-request-failed":
      return "Network error! Please check your internet connection.";
    default:
      return "Something went wrong! Please try again!";
  }
};
  const onSubmit = (data) => {
    // console.log("Signup Data:", data);
    RegisterUser(data.email, data.password)
      .then(() => {
        // console.log(res);
        const userInfo = {
          email: data?.email,
          name: data?.fullName,
          photoURL: data?.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((data) => {
          if (data.data.insertedId) {
            // add user name and photourl
            const userProfile = {
              name: data?.fullName,
              photoURL: data?.photoURL,
            };
            userProfileUpdate(userProfile).then(() => {
              Swal.fire({
                title: "Account Created Successfully!",
                text: "We're happy to have you!",
                icon: "success",
                confirmButtonColor: "#008000",
              });
              navigate(from, { replace: true });
            });
          }
        });
        // toast.success("user created successfully")
      })
      .catch((err) => {
        const message = handleFirebaseError(err.code);
        // console.log(err);
        Swal.fire({
          title: "Signup Failed",
          text: message,
          icon: "error",
          confirmButtonColor: "#facc15",
        });
      });

    reset();
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
          Create Your Account
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 text-center mb-6 text-sm"
        >
          Sign up to start your journey
        </motion.p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Image Upload */}
          {/* <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-2 border-white/40 bg-white/10 flex items-center justify-center relative">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">Upload</span>
              )}
            </div>

            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              {...register("profileImage")}
              onChange={(e) => {
                register("profileImage").onChange(e); 
                handleImageChange(e); 
              }}
              className="hidden"
            />
            <label
              htmlFor="profile-upload"
              className="cursor-pointer px-4 py-2 border bg-white/10 text-white rounded-lg text-sm font-medium hover:opacity-90 transition"
            >
              Choose Image
            </label>
          </div> */}

          {/* Full Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-300 mb-1 text-sm">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              {...register("fullName", { required: "Full name is required" })}
              className={`w-full p-3 rounded-lg bg-white/10 text-white border ${
                errors.fullName ? "border-red-500" : "border-white/20"
              } placeholder-gray-400 focus:outline-none focus:border-white/40`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="block text-gray-300 mb-1 text-sm">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full p-3 rounded-lg bg-white/10 text-white border ${
                errors.email ? "border-red-500" : "border-white/20"
              } placeholder-gray-400 focus:outline-none focus:border-white/40`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>

          {/* photourl */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="block text-gray-300 mb-1 text-sm">
              Photo URL
            </label>
            <input
              type="text"
              placeholder="Your PhotoURL"
              {...register("photoURL", {
                required: "PhotoURL is required",
              })}
              className={`w-full p-3 rounded-lg bg-white/10 text-white border ${
                errors.photoUrl ? "border-red-500" : "border-white/20"
              } placeholder-gray-400 focus:outline-none focus:border-white/40`}
            />
            {errors.photoUrl && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photoUrl.message}
              </p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative"
          >
            <label className="block text-gray-300 mb-1 text-sm">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, and number",
                },
              })}
              className={`w-full p-3 rounded-lg bg-white/10 text-white border ${
                errors.password ? "border-red-500" : "border-white/20"
              } placeholder-gray-400 focus:outline-none focus:border-white/40 pr-10`}
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
            Sign Up
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-right mt-3"
        >
          <GoogleLogin></GoogleLogin>
        </motion.div>

        {/* Already have an account */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-6 text-sm text-gray-400"
        >
          Already have an account?{" "}
          <Link to="/signin" className="text-white font-medium hover:underline">
            Sign In
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
