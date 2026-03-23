import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative bg-black text-white border-t border-white/10 mt-10 overflow-hidden">

      {/* 🔥 Glow Effects */}
      <div className="absolute top-0 left-10 w-60 h-60 bg-pink-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-60 h-60 bg-purple-500/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* 🔥 BRAND (WITH LOGO) */}
          <div>
            <div className="flex items-center gap-3 group cursor-pointer">

              {/* Logo */}
              <img
                src="/images/logoEcommerce.png"
                alt="logo"
                className="w-17 h-17 object-contain 
                           drop-shadow-[0_0_10px_rgba(255,0,150,0.5)]
                           group-hover:scale-110 transition duration-300"
              />

              {/* Name */}
              <h2 className="text-xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
                Neha Garments
              </h2>
            </div>

            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Trendy fashion for girls jeans tops & more.  
              Stay bold stay stylish 
            </p>
          </div>

          {/* 🛍️ SHOP */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              {["Jeans", "Tops", "New Arrivals", "Trending"].map((item, i) => (
                <li
                  key={i}
                  className="cursor-pointer hover:text-pink-400 transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 📄 INFO */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Info</h3>
            <ul className="space-y-2 text-gray-400">
              {["About Us", "Contact", "Privacy Policy", "Terms"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="cursor-pointer hover:text-purple-400 transition"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 📱 SOCIAL */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Follow Us</h3>

            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="p-3 rounded-full bg-white/10 border border-white/20 cursor-pointer hover:bg-gradient-to-r from-pink-500 to-purple-500 transition"
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔻 DIVIDER */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">

          <p>© 2026 Neha Garments. All rights reserved.</p>

          <motion.p
            whileHover={{ scale: 1.05 }}
            className="mt-2 md:mt-0"
          >
            Made with for fashion lovers
          </motion.p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;