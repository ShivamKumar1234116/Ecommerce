import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/banner.jpg",
  "/images/banner2.webp",
  "/images/benner3.webp",
  "/images/benner4.jpg",
];

function Banner() {
  const [index, setIndex] = useState(0);

  // 🔄 Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0a0a0a] text-white">

      {/* 🔥 HERO SECTION */}
      <div className="relative h-[65vh] md:h-[80vh] overflow-hidden rounded-3xl mx-4 md:mx-10 mt-6 shadow-[0_20px_80px_rgba(0,0,0,0.9)]">

        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/10 to-transparent blur-2xl"></div>

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt="banner"
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

        {/* 🔥 CONTENT */}
        <div className="absolute top-1/2 left-6 md:left-20 transform -translate-y-1/2 max-w-xl z-10">

          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            Elevate Your Style ✨
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-gray-300 text-sm md:text-lg"
          >
            Discover premium fashion, curated collections & exclusive deals.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-6"
          >
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg hover:scale-110 transition">
              Shop Now
            </button>

            <button className="px-6 py-2 rounded-full border border-white/30 hover:bg-white hover:text-black transition">
              Explore
            </button>
          </motion.div>
        </div>

        {/* 🔘 SLIDER DOTS */}
        <div className="absolute bottom-5 w-full flex justify-center gap-2 z-10">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full cursor-pointer transition ${
                i === index
                  ? "bg-pink-500 w-6"
                  : "bg-gray-400/50"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔥 PREMIUM GRID WITH SCROLL ANIMATION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-4 md:px-10 mt-10">

        {images.map((img, i) => (
          <motion.div
            key={i}

            // 🔥 SCROLL EFFECT
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true, amount: 0.3 }}

            // Hover
            whileHover={{ scale: 1.07 }}

            className="relative h-[160px] md:h-[200px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg"
          >
            <img
              src={img}
              alt="category"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

            {/* Glass Effect */}
            <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition"></div>

            {/* Text */}
            <div className="absolute bottom-4 left-4">
              <h2 className="text-lg md:text-xl font-bold">
                Category {i + 1}
              </h2>
              <p className="text-xs text-gray-300">Shop Now →</p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}

export default Banner;