import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Menu, X, LogOut, User } from "lucide-react";
import { ShopContext } from "../../context/ShopContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const navigate = useNavigate();

  const { wishlist, cart, auth, logout } = useContext(ShopContext);

  const wishlistCount = wishlist.length;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-8 py-2 sm:py-3">
        
        {/* 🔥 LOGO */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src="/images/logoEcommerce.png"
            alt="logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain scale-110 sm:scale-125 origin-left
            brightness-125 contrast-125 saturate-150
            drop-shadow-[0_0_15px_rgba(255,0,150,0.8)]
            group-hover:scale-[1.3] md:group-hover:scale-[1.4]
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

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white cursor-pointer"
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
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-6 py-4 md:py-0 text-white font-medium text-sm md:text-base">
            
            {/* HOME */}
            <li 
              className="relative group cursor-pointer"
              onClick={() => { setIsOpen(false); navigate("/"); }}
            >
              Home
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            {/* SHOP */}
            <li 
              className="relative group cursor-pointer"
              onClick={() => { setIsOpen(false); navigate("/collections/all"); }}
            >
              Shop
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>

            {/* 🔥 COLLECTIONS DROPDOWN */}
            <li
              className="relative group cursor-pointer"
              onClick={() => setShowCollection(!showCollection)}
            >
              <div className="flex items-center gap-1">
                Collections
              </div>

              {/* underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>

              {/* 🔥 DROPDOWN */}
              {showCollection && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] md:w-[400px] p-6 rounded-2xl bg-black/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 animate-fadeIn">
                  <h3 className="text-base font-semibold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                    Shop Categories ✨
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                    {[
                      "Jeans",
                      "T-Shirt",
                      "Trouser",
                      "Gym Outfit",
                      "Dresses",
                      "Accessories",
                    ].map((item, i) => (
                      <div
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCollection(false);
                          setIsOpen(false);
                          navigate(`/collections/${item.toLowerCase().replace(" ", "-")}`);
                        }}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-gradient-to-r from-pink-500 to-purple-500 hover:text-white transition cursor-pointer text-center font-medium"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* CONTACT */}
            <li 
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent("open-chat", { 
                  detail: { message: "Hi Neha! I would like to get some information." } 
                }));
              }}
              className="relative group cursor-pointer"
            >
              Contact
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </nav>

        {/* ❤️ ICONS & AUTH ACTIONS */}
        <div className="hidden md:flex items-center gap-5 text-white">
          
          {/* Wishlist Icon */}
          <div 
            className="relative cursor-pointer group"
            onClick={() => navigate("/wishlist")}
          >
            <Heart className="group-hover:text-pink-400 transition" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-xs px-1.5 py-0.5 rounded-full font-bold shadow-md">
                {wishlistCount}
              </span>
            )}
          </div>

          {/* Cart Icon */}
          <div 
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer group"
          >
            <ShoppingCart className="group-hover:text-purple-400 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-xs px-1.5 py-0.5 rounded-full font-bold shadow-md">
                {cartCount}
              </span>
            )}
          </div>

          {/* Authentication Conditional UI */}
          {auth.isLoggedIn ? (
            <div className="flex items-center gap-3 pl-2 border-l border-white/20">
              <div className="flex items-center gap-2 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                <User size={14} className="text-pink-400" />
                <span className="text-xs font-semibold text-gray-200 line-clamp-1 max-w-[80px]">
                  {auth.user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full border border-white/10 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition cursor-pointer"
                title="Log Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/auth")}
                className="px-4 py-1.5 rounded-full border border-white/30 hover:bg-white hover:text-black transition text-sm cursor-pointer"
              >
                Login
              </button>

              <button 
                onClick={() => navigate("/auth")}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm shadow-lg hover:scale-105 transition cursor-pointer font-medium"
              >
                Sign Up
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 📱 MOBILE SIDEBAR EXTRA */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-5 text-white bg-black/95 backdrop-blur-xl border-t border-white/10 animate-fadeIn">
          
          <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="ml-2 w-full bg-transparent outline-none text-xs sm:text-sm"
            />
          </div>

          <div className="flex justify-center gap-8 pt-3 border-t border-white/5">
            <div 
              className="relative cursor-pointer"
              onClick={() => { setIsOpen(false); navigate("/wishlist"); }}
            >
              <Heart className="w-6 h-6 hover:text-pink-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-pink-500 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div 
              onClick={() => { setIsOpen(false); navigate("/cart"); }}
              className="relative cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 hover:text-purple-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-purple-500 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center pt-2 border-t border-white/5">
            {auth.isLoggedIn ? (
              <div className="space-y-3 text-center">
                <div className="text-xs text-gray-400">Logged in as: <span className="text-white font-bold">{auth.user?.name}</span></div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full px-4 py-2 bg-red-500/10 border border-red-500/30 hover:bg-red-500 text-red-400 hover:text-white rounded-full text-sm font-semibold transition"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => { setIsOpen(false); navigate("/auth"); }}
                  className="w-full px-4 py-2 border border-white/30 rounded-full text-sm font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsOpen(false); navigate("/auth"); }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-sm font-semibold shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;