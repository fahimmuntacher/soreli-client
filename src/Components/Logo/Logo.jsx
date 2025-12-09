import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

const Logo = ({ size = "lg", showText = true }) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
  };

  return (
    <motion.div
      className="flex items-center gap-3 cursor-pointer select-none"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon container */}
      <motion.div
        className="
          relative p-2 rounded-xl 
          bg-white/20 backdrop-blur-xl 
          border border-white/40 
          shadow-[0_0_35px_rgba(180,220,255,0.35)]
        "
        whileHover={{ scale: 1.08 }}
        transition={{ type: 'spring', stiffness: 160 }}
      >
        <BookOpen className="w-7 h-7 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />

        {/* Spark Effect */}
        <motion.div
          className="absolute -top-1 -right-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Sparkles className="text-[#4DF3FF] w-4 h-4 drop-shadow-[0_0_10px_#4DF3FF]" />
        </motion.div>
      </motion.div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <motion.span
            className={`
              font-extrabold bg-linear-to-r 
              from-[#5B5CFF] to-[#4DF3FF] 
              bg-clip-text text-transparent 
              drop-shadow-[0_1px_8px_rgba(77,243,255,0.4)]
              ${sizes[size]}
            `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            SORELI
          </motion.span>

          <span className="text-xs text-white/70 tracking-wide">
            Capture • Reflect • Grow
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
