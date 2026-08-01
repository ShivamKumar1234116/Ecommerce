import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Card from "../../COMPONENTS/Product/Card";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, ChevronDown, MessageCircle } from "lucide-react";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, toggleWishlist, isInWishlist, addToCart } = useContext(ShopContext);

  const product = products.find((p) => p.id === id);

  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [addedToCartToast, setAddedToCartToast] = useState(false);

  useEffect(() => {
    if (product) {
      setMainImg(product.img);
      setSelectedSize(product.sizes ? product.sizes[0] : "M");
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
          Product Not Found
        </h2>
        <p className="text-gray-400 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 font-semibold hover:scale-105 transition">
          Return to Home
        </Link>
      </div>
    );
  }

  // Related products from the same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
    }, 3000);
  };

  const isWishlisted = isInWishlist(product.id);

  // Generate Star Icons
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={16} className="fill-pink-400 text-pink-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star size={16} className="text-gray-600" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <Star size={16} className="fill-pink-400 text-pink-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-40 left-10 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-pink-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {addedToCartToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <ShoppingBag size={18} />
            <span className="font-semibold text-sm">Added to cart successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <div className="text-xs sm:text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/collections/${product.category}`} className="hover:text-pink-400 transition capitalize">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{product.name}</span>
        </div>

        {/* Product details wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Image Gallery Column */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
                {product.images.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImg(imgUrl)}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-xl overflow-hidden border-2 cursor-pointer flex-shrink-0 transition-all duration-300 ${
                      mainImg === imgUrl ? "border-pink-500 scale-105 shadow-lg shadow-pink-500/20" : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <img src={imgUrl} alt={`thumbnail-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Main Image Screen */}
            <div className="flex-1 relative h-[400px] sm:h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group">
              {product.badge && (
                <span className="absolute top-4 left-4 z-20 bg-gradient-to-r from-pink-500 to-purple-500 text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                  {product.badge}
                </span>
              )}
              <img
                src={mainImg}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Product Specs Column */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-pink-400">{product.rating}</span>
                <span className="text-gray-500 text-sm">({product.reviewsCount} verified reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 border-b border-white/10 pb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">₹{product.price}</span>
              <span className="text-lg text-gray-500 line-through">₹{product.price + 500}</span>
              <span className="text-green-400 text-sm font-bold bg-green-500/10 px-2.5 py-1 rounded-full">
                Save ₹500
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {product.desc}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 font-medium">Select Size</span>
                  <span className="text-pink-400 cursor-pointer hover:underline">Size Chart</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl text-sm font-bold border transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 border-transparent text-white scale-105 shadow-md shadow-pink-500/30"
                          : "border-white/10 hover:border-white/30 text-gray-300 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Quantity input */}
              <div className="flex items-center justify-between border border-white/10 bg-white/5 rounded-2xl p-1.5 sm:w-36">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  -
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition"
                >
                  +
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex-1 flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-3 shadow-lg shadow-purple-500/20 hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>

                <button
                  onClick={handleWishlistClick}
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isWishlisted
                      ? "border-pink-500 bg-pink-500/10 text-pink-500"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30"
                  }`}
                >
                  <Heart className={isWishlisted ? "fill-current" : ""} size={20} />
                </button>
              </div>
            </div>

            {/* Ask Owner Direct Button */}
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-chat", {
                  detail: { message: `Hi Neha! Can you tell me more details about product: ${product.name}?` }
                }));
              }}
              className="w-full py-3.5 rounded-2xl border border-pink-500/30 hover:border-pink-500 hover:bg-pink-500/5 text-pink-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/5"
            >
              <MessageCircle size={16} />
              Questions? Chat with Owner (Neha)
            </button>

            {/* Core Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 text-center text-xs text-gray-400">
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl">
                <Truck size={20} className="text-pink-400" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl">
                <RotateCcw size={20} className="text-pink-400" />
                <span>15 Days Return</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl">
                <ShieldCheck size={20} className="text-pink-400" />
                <span>100% Original</span>
              </div>
            </div>

            {/* Product Accordions / Tabs */}
            <div className="border border-white/10 rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md">
              <div className="flex border-b border-white/10 text-sm font-semibold">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-4 text-center border-b-2 transition ${
                    activeTab === "details" ? "border-pink-500 text-pink-400" : "border-transparent text-gray-400"
                  }`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`flex-1 py-4 text-center border-b-2 transition ${
                    activeTab === "shipping" ? "border-pink-500 text-pink-400" : "border-transparent text-gray-400"
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              <div className="p-6 text-sm text-gray-300 leading-relaxed">
                {activeTab === "details" && product.details && (
                  <ul className="list-disc pl-5 space-y-2">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}
                {activeTab === "shipping" && (
                  <p>
                    We provide free shipping on all orders above ₹50. Standard deliveries take between 3-5 business days. 
                    We offer a hassle-free 15-day return policy on all unworn items with original tags.
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-10 text-center md:text-left">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                You May Also Like
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {relatedProducts.map((p) => (
                <Card key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProductDetailPage;
