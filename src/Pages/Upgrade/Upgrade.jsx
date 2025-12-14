import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const Upgrade = () => {
  const features = [
    { label: "Create Unlimited Lessons", free: false, premium: true },
    { label: "Create Premium Lessons", free: false, premium: true },
    { label: "Ad-Free Experience", free: false, premium: true },
    { label: "Access Premium Lessons", free: false, premium: true },
    { label: "Image Upload on Lessons", free: true, premium: true },
    { label: "Private Lessons", free: true, premium: true },
    { label: "Advanced Insights & Analytics", free: false, premium: true },
  ];
  const { isPremium } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  //   handle payment
  const handlePayment = async () => {
    const paymentInfo = {
      price: 1500,
      email: user?.email,
    };
    try {
      const res = await axiosSecure
        .post("/create-checkout-session", paymentInfo)
        .then((res) => {
          if (res.data?.url) {
            window.location.href = res.data.url;
          }
        });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto mt-16 mb-16 p-4 sm:p-6 lg:p-8 
                 bg-white/10 dark:bg-gray-900/30 backdrop-blur-xl 
                 border border-white/10 rounded-3xl shadow-xl"
    >
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">
          Upgrade Your Experience
        </h1>
        <p className="text-gray-200 mt-3 text-base sm:text-lg">
          Unlock premium features and take your lessons to the next level.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/20">
        <table className="w-full min-w-[500px] text-white bg-white/5">
          <thead className="bg-white/10 text-yellow-400 text-lg">
            <tr>
              <th className="py-3 px-4 text-left">Features</th>
              <th className="py-3 px-4 text-center">Free</th>
              <th className="py-3 px-4 text-center">Premium</th>
            </tr>
          </thead>

          <tbody>
            {features.map((item, idx) => (
              <tr
                key={idx}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-3 px-4">{item.label}</td>

                <td className="py-3 px-4 text-center">
                  {item.free ? (
                    <Check className="text-yellow-400 inline" size={20} />
                  ) : (
                    <X className="text-red-400 inline" size={20} />
                  )}
                </td>

                <td className="py-3 px-4 text-center">
                  {item.premium ? (
                    <Check className="text-yellow-400 inline" size={20} />
                  ) : (
                    <X className="text-red-400 inline" size={20} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {/* Free Card */}
        <div className="p-5 sm:p-6 bg-white/10 dark:bg-gray-900/40 rounded-2xl border border-white/20 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
            Free Plan
          </h2>

          <p className="text-white text-2xl sm:text-3xl font-bold mb-3">
            <span className="font-bold text-4xl sm:text-5xl">৳</span>0
          </p>

          <p className="text-gray-300 mb-5 text-sm sm:text-base">
            Basic features for new users.
          </p>

          <button
            disabled
            className="w-full py-2 sm:py-2.5 rounded-lg bg-white/20 text-gray-300 
                       cursor-not-allowed border border-white/20 text-sm sm:text-base"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Card */}
        <div className="p-5 sm:p-6 bg-yellow-400/90 text-black rounded-2xl shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold">Premium Plan</h2>

          <p className="text-2xl sm:text-3xl font-bold mt-2">
            <span className="font-bold text-4xl sm:text-5xl">৳</span>1500
            <span className="text-base sm:text-lg font-medium">
              {" "}
              / Lifetime
            </span>
          </p>

          <p className="text-gray-800 mb-5 text-sm sm:text-base">
            Unlock everything.
          </p>

          <button
            onClick={handlePayment}
            className="w-full py-2 sm:py-2.5 rounded-lg bg-black/80 text-yellow-300 font-bold hover:bg-black transition text-sm sm:text-base flex flex-col justify-between"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Upgrade;
