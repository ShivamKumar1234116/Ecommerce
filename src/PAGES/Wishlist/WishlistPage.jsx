import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";

function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useContext(ShopContext);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product) => {
    // Default size to M for quick wishlist addition
    addToCart(product, 1, "M");
    setToastMessage(`"${product.name}" moved to cart!`);
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-10 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Cart Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <CheckCircle2 size={18} className="text-green-300" />
            <span className="font-semibold text-sm">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Link to="/" className="hover:text-pink-400 transition flex items-center gap-1">
                <ArrowLeft size={14} /> Home
              </Link>{" "}
              / <span className="text-white font-medium">Wishlist</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-extrabold flex items-center gap-4"
            >
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
                My Wishlist
              </span>
              <span className="text-sm font-semibold px-3 py-1 bg-white/10 rounded-full border border-white/10 text-pink-400">
                {wishlist.length} Items
              </span>
            </motion.h1>
          </div>

          <Link
            to="/collections/all"
            className="w-fit px-5 py-2.5 rounded-full border border-white/20 hover:border-pink-500 hover:text-pink-400 transition-all duration-300 text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items List */}
        <AnimatePresence mode="popLayout">
          {wishlist.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center"
            >
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ duration: 0.3 }}
                  className="group relative w-full max-w-[280px] sm:max-w-none rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-pink-500/30 shadow-xl transition-all duration-500 flex flex-col justify-between"
                >
                  
                  {/* Remove Button (Top-Right) */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-red-500 text-white rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-md border border-white/10"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={16} />
                  </button>

                  {/* Product Image Link */}
                  <Link to={`/product/${item.id}`} className="block relative aspect-[4/5] w-full overflow-hidden bg-zinc-900">
                    {item.badge && (
                      <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-xs px-2.5 py-1 rounded-full font-bold shadow-md">
                        {item.badge}
                      </span>
                    )}
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] tracking-widest text-pink-400 font-bold uppercase block">
                        {item.category}
                      </span>
                      <Link to={`/product/${item.id}`} className="block">
                        <h3 className="font-bold text-base line-clamp-1 hover:text-pink-400 transition duration-300">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-white/5">
                      {/* Price & Add button */}
                      <div className="flex items-center justify-between">
                        <span className="text-pink-400 font-extrabold text-lg">
                          ₹{item.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ₹{item.price + 300}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-pink-500/10"
                      >
                        <ShoppingBag size={14} />
                        Add to Cart
                      </button>
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-pink-500/15 border border-pink-500/20 text-pink-500 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
                <Heart size={36} className="fill-current" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Add your favorite outfits here to keep track of what you love. Sign up or start shopping to explore our curated collections.
              </p>
              <Link
                to="/collections/all"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25"
              >
                Find Something to Love
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

export default WishlistPage;
