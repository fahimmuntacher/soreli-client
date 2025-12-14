import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const CancelCheckOut = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 px-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/10"
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />

          <h1 className="text-4xl font-bold text-white mt-4">
            Payment Canceled
          </h1>

          <p className="text-gray-400 mt-2 text-lg">
            Your checkout was canceled. No payment was processed.
          </p>
        </div>

        {/* Message Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 p-6 rounded-2xl border border-white/10 text-center"
        >
          <p className="text-gray-300 text-lg">
            If this was a mistake, you can try again anytime.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mt-8"
        >
          <a
            href="/pricing"
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition text-white text-lg font-medium shadow-lg shadow-purple-600/30"
          >
            Retry Checkout
          </a>

          <a
            href="/"
            className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 transition text-white text-lg font-medium shadow-lg"
          >
            Back Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CancelCheckOut;
