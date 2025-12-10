import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      {/* Outer rotating ring */}
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-t-pink-500 border-r-yellow-400 border-b-green-400 border-l-blue-500"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
      {/* Inner bouncing dots */}
      <div className="absolute flex space-x-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
