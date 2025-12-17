import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";


const LessonCard = ({ lesson, index }) => {
  return (
    <motion.div
      key={lesson._id}
      className="relative rounded-3xl overflow-hidden
          bg-linear-to-br from-white/10 to-white/5
          backdrop-blur-xl border border-white/20
          shadow-[0_0_40px_rgba(0,0,0,0.25)]"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index * 0.12,
      }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={lesson.image?.url || "https://i.ibb.co/4YQ6q8m/placeholder.jpg"}
          alt={lesson.title}
          className="w-full h-56 object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{lesson.title}</h3>

        <div className="flex gap-2 flex-wrap">
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
            {lesson.category}
          </span>
          <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
            {lesson.tone}
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs text-gray-400">
            {new Date(lesson.createdAt).toDateString()}
          </span>

          <Link
            to={`/lessons/${lesson._id}`}
            className="text-sm text-yellow-300 hover:underline"
          >
            See Details →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LessonCard;
