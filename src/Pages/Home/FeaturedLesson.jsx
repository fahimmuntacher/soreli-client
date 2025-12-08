import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Circle } from "lucide-react";

const FeaturedLessons = () => {
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState([]);
  const [shareOpen, setShareOpen] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleLike = (id) => {
    setLikes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const reportLesson = (id) => {
    alert(`Lesson ID ${id} reported!`);
  };

  const featuredLessonsData = [
    {
      id: 1,
      title: "Capture Your Wisdom",
      shortDescription:
        "Learn to store and organize your personal insights and lessons effectively.",
      category: "Personal Growth",
      emotionalTone: "Motivational",
      creator: { name: "John Doe", image: "https://cutt.ly/4ti16T1E" },
      featuredImage: "https://i.ibb.co/QFFVqXsm/undraw-growth-curve-kzjb.png",
    },
    {
      id: 2,
      title: "Grow Through Shared Experiences",
      shortDescription:
        "Explore thousands of public lessons from people around the world.",
      category: "Mindset",
      emotionalTone: "Gratitude",
      creator: { name: "Jane Smith", image: "https://cutt.ly/4ti16T1E" },
      featuredImage: "https://i.ibb.co/QFFVqXsm/undraw-growth-curve-kzjb.png",
    },
    {
      id: 3,
      title: "Reflect. Grow. Repeat.",
      shortDescription:
        "Track your progress, revisit insights, and become wiser every day.",
      category: "Reflection",
      emotionalTone: "Realization",
      creator: { name: "Alice Johnson", image: "https://cutt.ly/4ti16T1E" },
      featuredImage: "https://i.ibb.co/QFFVqXsm/undraw-growth-curve-kzjb.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Life Lessons
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-300 text-lg">
            Hand-picked lessons curated for deep personal growth
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredLessonsData.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="flex flex-col justify-between relative group rounded-3xl overflow-hidden bg-linear-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.25)]"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.03 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 800,
              }}
            >
              {/* Featured Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute top-2 left-1 z-20 px-4 py-1 rounded-full text-xs font-semibold text-white 
        bg-green-800 backdrop-blur-xl 
        border border-white/20 shadow-lg tracking-wide"
              >
                ⭐ Featured
              </motion.div>

              {/* Shine Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

              {/* Image */}
              <motion.div
                className="overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={lesson.featuredImage}
                  alt={lesson.title}
                  className="w-full h-60 object-cover"
                />
              </motion.div>

              {/* Content */}
              <div className="p-8 space-y-5">
                <motion.h3
                  className="text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {lesson.title}
                </motion.h3>

                <motion.p
                  className="text-gray-200 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {lesson.shortDescription}
                </motion.p>

                {/* Meta Tags */}
                <div className="flex gap-3 mt-3">
                  <span className="px-3 py-1 text-white text-sm rounded-full bg-white/20 backdrop-blur">
                    {lesson.category}
                  </span>
                  <span className="px-3 py-1 text-white text-sm rounded-full bg-white/20 backdrop-blur">
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Interaction Buttons */}
                <div className="flex items-center justify-between pt-4 px-8 border-t border-white/10">
                  {/* Save to Favorites */}
                  <button
                    onClick={() => toggleFavorite(lesson.id)}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition"
                  >
                    <span className="text-xl">
                      {favorites.includes(lesson.id) ? "🔖" : "📑"}
                    </span>
                    <span className="text-sm">
                      {favorites.includes(lesson.id) ? "Saved" : "Save"}
                    </span>
                  </button>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(lesson.id)}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition"
                  >
                    <span className="text-xl">
                      {likes.includes(lesson.id) ? "❤️" : "🤍"}
                    </span>
                    <span className="text-sm">Like</span>
                  </button>

                  {/* Report Button */}
                  <button
                    onClick={() => reportLesson(lesson.id)}
                    className="flex items-center gap-2 text-white/80 hover:text-white transition"
                  >
                    <span className="text-xl">🚩</span>
                    <span className="text-sm">Report</span>
                  </button>

                  {/* Share Button */}
                </div>

                {/* Creator */}
                <motion.div
                  className="flex items-center gap-4 pt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <img
                    src={lesson.creator.image}
                    alt={lesson.creator.name}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-semibold">
                      {lesson.creator.name}
                    </span>
                    <span className="text-gray-300 text-sm">Creator</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedLessons;
