import React, { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Card from "../../COMPONENTS/Product/Card";
import { motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";

function CategoryPage() {
  const { category } = useParams();
  const { products } = useContext(ShopContext);
  const [sortBy, setSortBy] = useState("default");

  // Format category name for display (e.g. "co-ord-sets" -> "Co-ord Sets")
  const displayName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  // Filter products by category (or show all if category is 'all')
  const filteredProducts = products.filter((p) => {
    if (!category || category.toLowerCase() === "all") return true;
    return p.category.toLowerCase() === category.toLowerCase();
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.price - b.price;
    } else if (sortBy === "price-high-low") {
      return b.price - a.price;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // default order
  });

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 md:px-10 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="text-xs sm:text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-pink-400 transition">
            Home
          </Link>{" "}
          / <span className="text-white">{displayName}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-extrabold"
            >
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
                {displayName}
              </span>
            </motion.h1>
            <p className="text-gray-400 text-sm mt-2">
              Showing {sortedProducts.length} premium designs
            </p>
          </div>

          {/* Filters controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
              <SlidersHorizontal size={16} />
              <span>Filter</span>
            </div>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300">
              <ArrowUpDown size={16} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-none cursor-pointer text-white focus:ring-0"
              >
                <option value="default" className="bg-black text-white">
                  Sort By: Featured
                </option>
                <option value="price-low-high" className="bg-black text-white">
                  Price: Low to High
                </option>
                <option value="price-high-low" className="bg-black text-white">
                  Price: High to Low
                </option>
                <option value="rating" className="bg-black text-white">
                  Customer Rating
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {sortedProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-300 mb-4">
              No products found in this category
            </h3>
            <p className="text-gray-500 mb-8 max-w-md">
              We are constantly updating our stock. Check back later or browse other collections.
            </p>
            <Link
              to="/collections/all"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-semibold hover:scale-105 transition"
            >
              Explore All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
