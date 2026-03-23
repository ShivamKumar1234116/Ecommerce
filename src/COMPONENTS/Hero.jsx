import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/banner.jpg",
  "/images/banner2.webp",
  "/images/benner3.webp",
  "/images/benner4.jpg",
  "/images/img2.jpeg",
  "/images/img4.jpeg",
  "/images/benner6.jpg",
  "/images/benner6.jpg",
];

function Hero() {
  const [index, setIndex] = useState(0);

  // 🔄 Smooth shuffle
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 🎯 Dynamic images
  const mainImage = images[index];
  const leftImage = images[(index + 1) % images.length];
  const rightImage = images[(index + 2) % images.length];
  const topImage = images[(index + 3) % images.length];
  const bottomImage = images[(index + 4) % images.length];
  const extra1 = images[(index + 5) % images.length];
  const extra2 = images[(index + 6) % images.length];

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden flex items-center">

      {/* 🔥 Background */}
      <AnimatePresence mode="wait">
        <motion.img
          key={mainImage}
          src={mainImage}
          alt="bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* 🎨 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>

      {/* 🌟 Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full"></div>

      {/* 💃 Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center w-full">

        {/* LEFT TEXT */}
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 md:p-10 rounded-2xl text-white space-y-6 shadow-xl"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl">
            Discover Your Style <br />

            {/* 🔥 Highlighted Brand */}
            <span className="relative inline-block font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400">

              {"Neha Garments".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              {/* ✨ Glow */}
              <motion.span
                className="absolute inset-0 blur-xl opacity-40 bg-gradient-to-r from-pink-500 to-purple-500"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* ✨ Shine */}
              <motion.span
                className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ left: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </span>
          </h1>

          <p className="text-gray-200 text-sm md:text-lg">
            Shop trendy jeans, tops & more. Free shipping on orders $50+. 
            <span className="text-pink-300"> Be bold. Be stylish.</span>
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Shop Now
            </button>

            <button className="px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
              Explore
            </button>
          </div>
        </motion.div>

        {/* 🔥 FLOATING IMAGES */}
        <div className="relative flex justify-center items-center">

          {/* CENTER */}
          <motion.img
            key={mainImage}
            src={mainImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-64 md:w-80 rounded-2xl shadow-2xl z-20"
          />

          {/* TOP */}
          <motion.img
            src={topImage}
            animate={{ y: [-120, -140, -120], rotate: [-8, 8, -8] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 w-32 md:w-40 rounded-xl opacity-90"
          />

          {/* LEFT */}
          <motion.img
            src={leftImage}
            animate={{ x: [-100, -120, -100], y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute left-0 w-36 md:w-48 rounded-xl opacity-90"
          />

          {/* RIGHT */}
          <motion.img
            src={rightImage}
            animate={{ x: [100, 120, 100], y: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute right-0 w-36 md:w-48 rounded-xl opacity-90"
          />

          {/* BOTTOM */}
          <motion.img
            src={bottomImage}
            animate={{ y: [120, 140, 120] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-0 w-32 md:w-40 rounded-xl opacity-80"
          />

          {/* EXTRA FLOAT */}
          <motion.img
            src={extra1}
            animate={{
              x: [-50, 50, -50],
              y: [50, -50, 50],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute w-24 opacity-70 rounded-lg"
          />

          <motion.img
            src={extra2}
            animate={{
              x: [60, -60, 60],
              y: [-60, 60, -60],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute w-20 opacity-60 rounded-lg"
          />

          {/* 🔥 Badge */}
          <motion.div
            key={"badge" + index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-5 right-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl text-xs shadow-lg"
          >
            🔥 50% OFF
          </motion.div>
        </div>
      </div>

      {/* ✨ Bottom Fade */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}

export default Hero;