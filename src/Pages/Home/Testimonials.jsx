import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha",
    text: "Soreli helped me capture lessons from years of experience — now I can share them with my team.",
  },
  {
    name: "Rahim",
    text: "Writing lessons made me reflect and make better decisions. The community feedback is priceless.",
  },
  {
    name: "Sam",
    text: "Beautifully designed and simple to use. I love how my lessons are searchable and organized.",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-7xl mx-auto px-5 flex flex-col">
      <motion.div className="text-center mb-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white">What People Say</h2>
        <p className="text-gray-300 mt-2">Real stories from people using Soreli to grow.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.blockquote key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
            <p className="text-gray-200 mb-4">“{t.text}”</p>
            <footer className="text-sm text-gray-400 font-semibold">— {t.name}</footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
