import React from "react";
import { motion } from "framer-motion";

const benefits = [
  {
    id: 1,
    icon: "🧠",
    title: "Build Real Wisdom",
    description:
      "Life experiences teach practical understanding that no textbook can provide, real lessons that shape who you become.",
  },
  {
    id: 2,
    icon: "🔥",
    title: "Strengthen Resilience",
    description:
      "Challenges help develop confidence, emotional toughness, and the ability to bounce back stronger than before.",
  },
  {
    id: 3,
    icon: "🌱",
    title: "Grow Personally",
    description:
      "Moments of growth, reflection, and self-discovery help you understand yourself and improve your mindset.",
  },
  {
    id: 4,
    icon: "🚀",
    title: "Make Better Decisions",
    description:
      "The more you learn from real experiences, the wiser your choices become, in life, work, and relationships.",
  },
];

const BenefitCards = () => {
  return (
    <section className="max-w-7xl mx-auto px-5">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Why Learning From Life Matters
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Life teaches through real moments, shaping how we grow, think, and
          make decisions. These benefits highlight why learning from experience
          truly matters.
        </p>
      </div>

      {/* Benefit Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {benefits.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            whileHover={{ scale: 1.03 }}
            className="p-8 rounded-3xl bg-linear-to-br from-white/10 to-white/5
              backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.25)]
              transition-all duration-300"
          >
            {/* Icon */}
            <div className="text-5xl mb-5">{item.icon}</div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-3">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BenefitCards;
