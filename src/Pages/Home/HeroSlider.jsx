import React, { useRef, useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Sparkles, Star, Circle } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Capture Your Wisdom. Inspire the World.",
    subtitle:
      "A digital space to store your life lessons and personal insights — beautifully organized and always accessible.",
    image: "https://i.ibb.co.com/QFFVqXsm/undraw-growth-curve-kzjb.png",
    gradient: "from-[#4A90E2]/50 to-[#8E44AD]/50",
    illustration: "https://i.ibb.co.com/QFFVqXsm/undraw-growth-curve-kzjb.png",
  },
  {
    id: 2,
    title: "Grow Through Shared Experiences",
    subtitle:
      "Explore thousands of public lessons from people around the world. Learn faster by learning from others.",
    image: "https://i.ibb.co.com/QFFVqXsm/undraw-growth-curve-kzjb.png",
    gradient: "from-[#8E44AD]/50 to-[#FFD166]/50",
    illustration: "https://i.ibb.co.com/QFFVqXsm/undraw-growth-curve-kzjb.png",
  },
  {
    id: 3,
    title: "Reflect. Grow. Repeat.",
    subtitle:
      "Track your progress, revisit insights, and build a wiser version of yourself — one lesson at a time.",
    image: "/images/lesson3.jpg",
    gradient: "from-[#2ECC71]/50 to-[#4A90E2]/50",
    illustration: "https://i.ibb.co.com/QFFVqXsm/undraw-growth-curve-kzjb.png",
  },
];

const HeroSlider = () => {
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slider */}
      <div className="h-[80vh] max-w-7xl mx-auto flex" ref={emblaRef}>
        <div className="flex h-full w-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full flex flex-col md:flex-row items-center justify-center h-full"
            >
              {/* Left Side - Content */}
              <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-20 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12"
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-100 font-light mb-6">
                    {slide.subtitle}
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-3 rounded-lg bg-[#FFD166] text-black font-semibold hover:scale-105 transition">
                      Start Learning
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-[#2ECC71] text-white font-semibold hover:scale-105 transition">
                      Create Lesson
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Right Side - Illustration + Floating Icons */}
              <div className="w-full md:w-1/2 relative flex justify-center items-center">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${slide.gradient} rounded-tr-3xl rounded-br-3xl`}
                />

                {/* Floating icons */}
                <motion.div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-20 left-10"
                  >
                    <Sparkles size={40} color="rgba(255,255,255,0.4)" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-40 right-20"
                  >
                    <Star size={30} color="rgba(255,255,255,0.3)" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 25, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-20 left-1/3"
                  >
                    <Circle size={25} color="rgba(255,255,255,0.3)" />
                  </motion.div>
                </motion.div>

                {/* Illustration */}
                <motion.img
                  src={slide.image}
                  alt="Illustration"
                  className="w-3/4 md:w-full relative z-10"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "bg-[#FFD166] w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;
