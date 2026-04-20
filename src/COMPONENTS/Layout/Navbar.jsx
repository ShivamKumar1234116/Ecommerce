import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Heart, Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">

        {/* 🔥 LOGO */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logoEcommerce.png"
            alt="logo"
            className="h-16 w-auto object-contain scale-125 origin-left
            brightness-125 contrast-125 saturate-150
            drop-shadow-[0_0_15px_rgba(255,0,150,0.8)]
            group-hover:scale-[1.4]
            transition duration-300"
          />
        </div>

        {/* 🔍 SEARCH */}
        <div className="hidden md:flex w-1/3">
          <div className="flex items-center w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-pink-400">
            <Search size={18} className="text-gray-300" />
            <input
              type="text"
              placeholder="Search products..."
              className="ml-2 w-full bg-transparent outline-none text-sm text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* 📱 MOBILE MENU */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* 🔗 NAV LINKS */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black/90 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none transition-all duration-300 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 py-6 md:py-0 text-white font-medium">

            {/* HOME */}
            <li 
              className="relative group cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            {/* SHOP */}
            <li className="relative group cursor-pointer">
              Shop
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            {/* 🔥 COLLECTIONS DROPDOWN */}
            <li
              className="relative group cursor-pointer"
              onClick={() => setShowCollection(!showCollection)}
            >
              Collections

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>

              {/* 🔥 DROPDOWN */}
              {showCollection && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] md:w-[400px] p-6 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 animate-fadeIn">

                  <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                    Shop Categories ✨
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {[
                      "Tops",
                      "Jeans",
                      "Dresses",
                      "Kurti",
                      "Co-ord Sets",
                      "Jackets",
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(`/collections/${item.toLowerCase().replace(" ", "-")}`)}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white transition cursor-pointer text-center"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* CONTACT */}
            <li className="relative group cursor-pointer">
              Contact
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

          </ul>
        </nav>

        {/* ❤️ ICONS */}
        <div className="hidden md:flex items-center gap-5 text-white">
          <div className="relative cursor-pointer">
            <Heart className="hover:text-pink-400 transition" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1.5 rounded-full">
              2
            </span>
          </div>

          <div className="relative cursor-pointer">
            <ShoppingCart className="hover:text-pink-400 transition" />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-xs px-1.5 rounded-full">
              3
            </span>
          </div>

          <button className="px-4 py-1 rounded-full border border-white/30 hover:bg-white hover:text-black transition text-sm">
            Login
          </button>

          <button className="px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm shadow-lg hover:scale-105 transition">
            Sign Up
          </button>
        </div>
      </div>

      {/* 📱 MOBILE EXTRA */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4 text-white bg-black/90 backdrop-blur-lg">

          <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full bg-transparent outline-none text-sm"
            />
          </div>

          <div className="flex justify-center gap-6 pt-3">
            <Heart />
            <ShoppingCart />
          </div>

          <div className="flex gap-4 justify-center pt-3">
            <button className="px-4 py-1 border border-white rounded-full text-sm">
              Login
            </button>
            <button className="px-4 py-1 bg-pink-500 rounded-full text-sm">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;