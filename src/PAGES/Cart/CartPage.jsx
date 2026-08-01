import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus, Tag, CheckCircle2 } from "lucide-react";

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Calculate pricing values
  const itemsSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = itemsSubtotal > 500 || itemsSubtotal === 0 ? 0 : 80;
  
  const discountAmount = discountApplied ? Math.round(itemsSubtotal * 0.5) : 0;
  const grandTotal = itemsSubtotal - discountAmount + shippingCost;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setSuccessMsg("");

    if (promoCode.trim().toUpperCase() === "GLAM50") {
      setDiscountApplied(true);
      setSuccessMsg("Coupon 'GLAM50' (50% OFF) applied successfully!");
    } else if (promoCode.trim() === "") {
      setPromoError("Please enter a promo code.");
    } else {
      setPromoError("Invalid promo code. Try 'GLAM50'!");
    }
  };

  const handleRemovePromo = () => {
    setDiscountApplied(false);
    setPromoCode("");
    setSuccessMsg("");
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-10 relative overflow-hidden">
      {/* Background Neon Glows */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-2">
              <Link to="/" className="hover:text-pink-400 transition flex items-center gap-1">
                <ArrowLeft size={14} /> Home
              </Link>{" "}
              / <span className="text-white font-medium">Cart</span>
            </div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-extrabold flex items-center gap-4"
            >
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
                Shopping Cart
              </span>
              <span className="text-sm font-semibold px-3 py-1 bg-white/10 rounded-full border border-white/10 text-purple-400">
                {cart.length} Unique items
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

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Left Column: Cart items list */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl gap-4 sm:gap-6 hover:border-pink-500/20 transition-all duration-300"
                  >
                    
                    {/* Item Image */}
                    <div 
                      className="w-24 h-28 rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 cursor-pointer flex-shrink-0"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      <img src={item.product.img} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Item Specs info */}
                    <div className="flex-1 space-y-2 text-center sm:text-left w-full sm:w-auto">
                      <div className="space-y-0.5">
                        <span className="text-[10px] tracking-wider text-pink-400 uppercase font-semibold">
                          {item.product.category}
                        </span>
                        <h3 
                          className="font-bold text-base hover:text-pink-400 cursor-pointer transition line-clamp-1"
                          onClick={() => navigate(`/product/${item.product.id}`)}
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-3">
                        <span className="text-xs bg-white/10 px-2.5 py-1 rounded-md border border-white/10 font-bold">
                          Size: {item.size}
                        </span>
                        <span className="text-xs text-gray-400">
                          ₹{item.product.price} each
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector controls */}
                    <div className="flex items-center justify-between border border-white/10 bg-white/5 rounded-xl p-1 w-28">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-bold text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Final Item Subtotal price */}
                    <div className="text-center sm:text-right min-w-[80px]">
                      <span className="text-pink-400 font-extrabold text-base block">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>

                    {/* Trash Delete action */}
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="p-2.5 rounded-full border border-white/10 hover:border-red-500 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column: Checkout Pricing Summary */}
            <div className="space-y-6">
              
              {/* Order Summary box */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-6">
                <h3 className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent border-b border-white/10 pb-4">
                  Order Summary
                </h3>

                <div className="space-y-3.5 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-medium">₹{itemsSubtotal}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-green-400 font-medium">
                      <span>Discount (50% OFF)</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-white font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-full">FREE</span>
                      ) : (
                        `₹${shippingCost}`
                      )}
                    </span>
                  </div>

                  {shippingCost > 0 && (
                    <p className="text-[10px] text-gray-500 mt-1">
                      Add items worth <span className="text-pink-400">₹{500 - itemsSubtotal}</span> more for FREE shipping!
                    </p>
                  )}
                </div>

                {/* Grand Total row */}
                <div className="flex justify-between items-baseline border-t border-white/10 pt-5">
                  <span className="font-bold text-base">Grand Total</span>
                  <span className="text-2xl font-black text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    ₹{grandTotal}
                  </span>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => alert("Checkout Simulator: Order placed successfully! Thank you for shopping at Neha Garments! 🛍️🌸")}
                  className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer text-center"
                >
                  Proceed to Checkout
                </button>
              </div>

              {/* Promo code box */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2 font-bold text-sm text-gray-200">
                  <Tag size={16} className="text-pink-400" />
                  <span>Have a Promo Code?</span>
                </div>

                {discountApplied ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} />
                        <span>Coupon GLAM50 applied!</span>
                      </div>
                      <button 
                        onClick={handleRemovePromo}
                        className="text-pink-400 font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. GLAM50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none focus:border-pink-500 transition duration-300"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-xs font-bold text-white hover:scale-105 transition cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoError && (
                  <span className="text-[10px] text-red-400 block pl-1">{promoError}</span>
                )}
                {successMsg && (
                  <span className="text-[10px] text-green-400 block pl-1 font-semibold">{successMsg}</span>
                )}

                <div className="text-[10px] text-gray-500 leading-normal pl-1">
                  💡 Tip: Use code <span className="text-pink-400 font-bold">GLAM50</span> to get a flat 50% discount for sandbox testing!
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center max-w-md mx-auto"
          >
            <div className="w-20 h-20 bg-purple-500/15 border border-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mb-6 shadow-inner animate-pulse">
              <ShoppingBag size={36} />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3">
              Your Cart is Empty
            </h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Looks like you haven't added any premium outfits to your cart yet. Explore our curated collections to find your perfect fit!
            </p>
            <Link
              to="/collections/all"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25"
            >
              Start Shopping
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default CartPage;
