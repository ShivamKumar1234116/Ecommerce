import React from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";

function Card({ product }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative w-[240px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl hover:shadow-pink-500/20 transition"
    >
      {/* 🔥 Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-xs px-3 py-1 rounded-full font-semibold shadow">
          {product.badge}
        </span>
      )}

      {/* ❤️ Wishlist */}
      <div className="absolute top-3 right-3 z-20 p-2 bg-black/50 rounded-full cursor-pointer hover:bg-pink-500 transition">
        <Heart size={16} />
      </div>

      {/* 🖼 Image */}
      <div className="relative h-50 overflow-hidden">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {/* 🔥 Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">

          <button className="p-3 rounded-full bg-white text-black hover:bg-pink-500 hover:text-white transition">
            <Eye size={18} />
          </button>

          <button className="p-3 rounded-full bg-white text-black hover:bg-purple-500 hover:text-white transition">
            <ShoppingCart size={18} />
          </button>

        </div>
      </div>

      {/* 📦 Content */}
      <div className="p-4 space-y-2 text-white">

        <h3 className="font-semibold text-base line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-2">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-400 font-bold text-lg">
            {product.price}
          </span>

          <button className="text-xs px-3 py-1 rounded-full border border-pink-400 hover:bg-pink-500 hover:text-white transition">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;

