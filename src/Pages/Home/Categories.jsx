import React from "react";
import { motion } from "framer-motion";

const categories = ["Personal Growth", "Career", "Relationships", "Mindset", "Mistakes Learned"];

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-5">
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-white">Top Categories</h2>
        <p className="text-gray-300 mt-2">Explore lessons by the categories people search most.</p>
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((c, i) => (
          <motion.button key={c} className="px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-yellow-400/10 transition" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            {c}
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
