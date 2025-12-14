import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate, useLocation } from "react-router";
import useAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";

const GoogleLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        const userDetails = {
          email: res?.user?.email,
          name: res?.user?.displayName,
          photoURL: res?.user?.photoURL,
        };

        axiosInstance.post("/users", userDetails).then(() => {});

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back! We're happy to see you.",
          icon: "success",
          confirmButtonColor: "#008000",
        });
        navigate(from, { replace: true });
      })
      .catch(() => {
        Swal.fire({
          title: "Login Failed",
          text: "Something went wrong. Try again!",
          icon: "error",
          confirmButtonColor: "#facc15",
        });
      });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="
        w-full flex items-center justify-center
        border border-gray-300 rounded-lg
        py-2 px-4
        bg-white
        hover:bg-gray-100
        transition
        shadow-sm
      "
    >
      <FcGoogle size={24} className="mr-3" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleLogin;
