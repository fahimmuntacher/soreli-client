import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  BookOpen,
  Sparkles,
} from "lucide-react";
import Logo from "../../../Logo/Logo";


const floatingIcons = [
  { icon: BookOpen, size: 60, x: "10%", y: "20%" },
  { icon: Sparkles, size: 50, x: "80%", y: "40%" },
  { icon: BookOpen, size: 45, x: "70%", y: "75%" },
  { icon: Sparkles, size: 55, x: "20%", y: "70%" },
];

const Footer = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      setIsAtBottom(scrollPosition >= pageHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    <footer className="relative bg-linear-to-b from-[#0A0F1F] to-[#1B2340] text-white pt-20 pb-10 mt-20 overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={i}
            className="absolute text-white/10 pointer-events-none"
            style={{
              top: item.y,
              left: item.x,
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, -18, 0] }}
            transition={{
              duration: 6 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon size={item.size} />
          </motion.div>
        );
      })}

      {/* Glass Top Divider */}
      <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-white/10 to-transparent blur-xl"></div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="lg" showText={true} />
          <p className="mt-3 text-gray-300 leading-relaxed text-sm">
            A platform to learn, reflect, and grow through meaningful life
            wisdom shared by people worldwide.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white transition">Home</li>
            <li className="hover:text-white transition">Explore Lessons</li>
            <li className="hover:text-white transition">Create Lesson</li>
            <li className="hover:text-white transition">About Us</li>
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="hover:text-white transition">Help Center</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Contact</li>
          </ul>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <div className="flex items-center gap-4">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
                className="p-3 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/20 cursor-pointer"
              >
                <Icon size={20} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-gray-400 text-sm mt-16"
      >
        © {new Date().getFullYear()} Soreli — All Rights Reserved.
      </motion.div>

      {/* Floating Scroll Toggle Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          onClick={isAtBottom ? scrollToTop : scrollToBottom}
          className="
            p-3 rounded-full 
            bg-white/10 border border-white/20 
            backdrop-blur-xl shadow-lg 
            hover:bg-white/20 transition text-xl
          "
        >
          {isAtBottom ? "↑" : "↓"}
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
