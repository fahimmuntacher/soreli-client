import React from "react";
import { motion } from "framer-motion";

const NewsletterCTA = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-5 flex flex-col">
      <motion.div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-400/5 to-yellow-400/3 border border-yellow-400/10 text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h3 className="text-2xl font-bold text-white mb-2">Get weekly lessons in your inbox</h3>
        <p className="text-gray-300 mb-4">Subscribe to receive hand-picked lessons and featured stories.</p>

        <form className="flex items-center justify-center gap-3 max-w-lg mx-auto">
          <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/10 text-white" />
          <button className="px-5 py-3 rounded-lg bg-yellow-400 text-black font-semibold">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
};

export default NewsletterCTA;
