import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Capture",
    desc: "Quickly capture a lesson with title, category and your reflection.",
  },
  {
    title: "Reflect",
    desc: "Organize your insights and add context so others can learn from them.",
  },
  {
    title: "Share",
    desc: "Publish publicly or privately — help others learn from your experience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          How Soreli Works
        </h2>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto">
          A simple workflow to capture lessons, reflect deeply and share with
          the world — designed for meaningful learning.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, idx) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12 }}
            className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
            <p className="text-gray-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
