import React from "react";
import CardList from "../Product/CardList";
import { motion } from "framer-motion";
function Top() {
  // 🔥 Tops Data
  const topsProducts = [
    {
      name: "Stylish Crop Top",
      price: "₹799",
      desc: "Trendy crop top for casual wear.",
      img: "/images/top1.jpg",
    },
    {
      name: "Oversized T-Shirt",
      price: "₹999",
      desc: "Comfortable and stylish oversized fit.",
      img: "/images/top2.jpg",
    },
    {
      name: "Party Wear Top",
      price: "₹1299",
      desc: "Perfect for night parties & events.",
      img: "/images/top3.jpg",
    },
    {
      name: "Casual Printed Top",
      price: "₹699",
      desc: "Lightweight daily wear top.",
      img: "/images/top4.jpg",
    },
  ];

  return (
    <section className="relative bg-black text-white py-16 px-4 md:px-10 overflow-hidden">

      {/* 🔥 Glow Background */}
      <div className="absolute top-10 left-10 w-60 h-60 bg-pink-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">

       <div className="mb-12 text-center md:text-left">

  {/* ✨ Title */}
  <motion.h2
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
    className="relative inline-block text-3xl md:text-5xl font-extrabold"
  >
    {/* Gradient Text */}
    <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text animate-gradient">
      Tops Collection
    </span>

    {/* 🔥 Animated Underline */}
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="absolute left-0 -bottom-2 h-[3px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
    ></motion.span>
  </motion.h2>

  {/* ✨ Subtitle */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    className="text-gray-400 mt-4 text-sm md:text-base"
  >
    Explore trendy & stylish tops for every occasion ✨
  </motion.p>

</div>

        {/* 🛍️ Card List */}
        <CardList products={topsProducts} />

      </div>
    </section>
  );
}

export default Top;