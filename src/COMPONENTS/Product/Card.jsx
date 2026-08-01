import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";

function Card({ product }) {
  const { toggleWishlist, isInWishlist, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, "M");
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={handleCardClick}
      className="group relative w-[240px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl hover:shadow-pink-500/20 transition cursor-pointer"
    >
      {/* 🔥 Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-xs px-3 py-1 rounded-full font-semibold shadow">
          {product.badge}
        </span>
      )}

      {/* ❤️ Wishlist */}
      <div
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full cursor-pointer transition ${
          isWishlisted
            ? "bg-pink-500 text-white shadow-lg shadow-pink-500/30"
            : "bg-black/50 hover:bg-pink-500 text-white"
        }`}
      >
        <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
      </div>

      {/* 🖼 Image */}
      <div className="relative h-50 overflow-hidden bg-zinc-900">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          loading="lazy"
        />

        {/* 🔥 Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
          <button 
            onClick={handleCardClick}
            className="p-3 rounded-full bg-white text-black hover:bg-pink-500 hover:text-white transition cursor-pointer"
            title="View Details"
          >
            <Eye size={18} />
          </button>

          <button 
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-white text-black hover:bg-purple-500 hover:text-white transition cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* 📦 Content */}
      <div className="p-4 space-y-2 text-white">
        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-pink-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-2">
          {product.desc}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-pink-400 font-bold text-lg">
            {typeof product.price === "number" ? `₹${product.price}` : product.price}
          </span>

          <button 
            onClick={handleCardClick}
            className="text-xs px-3 py-1 rounded-full border border-pink-400 hover:bg-pink-500 hover:text-white transition cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
