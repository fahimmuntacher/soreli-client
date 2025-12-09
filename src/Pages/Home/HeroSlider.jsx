import React, { useRef, useEffect, useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "Capture Your Wisdom. Inspire the World.",
    subtitle:
      "A digital space to store your life lessons and personal insights — beautifully organized and always accessible.",
    image: "https://i.ibb.co.com/CsnHffP0/undraw-growth-analytics-bhy7.jpg",
    gradient: "from-[#4A90E2]/50 to-[#8E44AD]/50",
  },
  {
    id: 2,
    title: "Grow Through Shared Experiences",
    subtitle:
      "Explore thousands of public lessons from people around the world. Learn faster by learning from others.",
    image: "https://i.ibb.co/QFFVqXsm/undraw-growth-curve-kzjb.png",
    gradient: "from-[#8E44AD]/50 to-[#FFD166]/50",
  },
  {
    id: 3,
    title: "Reflect. Grow. Repeat.",
    subtitle:
      "Track your progress, revisit insights, and build a wiser version of yourself — one lesson at a time.",
    image: "https://i.ibb.co/QFFVqXsm/undraw-growth-curve-kzjb.png",
    gradient: "from-[#2ECC71]/50 to-[#4A90E2]/50",
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
    <div className="relative w-full h-[80vh] overflow-hidden flex justify-center items-cente">
      {/* Embla viewport */}
      <div className="h-[80vh] w-full max-w-7xl mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="shrink-0 w-full h-full flex items-center justify-center px-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`flex flex-col md:flex-row items-center justify-between w-full bg-gradient-to-br ${slide.gradient} p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10`}
              >
                {/* Left text */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-100 font-light mb-6">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 rounded-lg bg-[#FFD166] text-black font-semibold hover:scale-105 transition">
                      Start Learning
                    </button>
                    <button className="px-6 py-3 rounded-lg bg-[#2ECC71] text-white font-semibold hover:scale-105 transition">
                      Create Lesson
                    </button>
                  </div>
                </div>

                {/* Right image */}
                <div className="md:w-1/2 flex justify-center items-center">
                  <motion.img
                    src={slide.image}
                    alt="Illustration"
                    className="w-full h-full object-cover rounded-2xl"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
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
