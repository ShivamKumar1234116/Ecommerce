import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shirt,
  Sparkles,
  Footprints,
  Crown,
  Gem,
  ShoppingBag,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Jeans",
    subtitle: "Retro Wide Leg & Mom Fits",
    icon: <Sparkles size={30} />,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "T-Shirt",
    subtitle: "Oversized & Crop Casuals",
    icon: <Shirt size={30} />,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Trouser",
    subtitle: "Pleated Fronts & Linen Drapes",
    icon: <Gem size={30} />,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Gym Outfit",
    subtitle: "Activewear & Squat-Proof Sets",
    icon: <Footprints size={30} />,
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Dresses",
    subtitle: "Premium Silk Slip Designs",
    icon: <Crown size={30} />,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Accessories",
    subtitle: "Gold Chains & Retro Sunnies",
    icon: <ShoppingBag size={30} />,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
  },
];

const ShopByCategory = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (title) => {
    navigate(`/collections/${title.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-black transition-all duration-300">
      
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Shop By Category
        </h2>

        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Discover premium girls' clothing collections crafted for every style, trend, and active moment.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {categories.map((item, index) => (
          
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            onClick={() => handleCategoryClick(item.title)}
            className="group relative overflow-hidden rounded-3xl cursor-pointer"
          >

            {/* Background Image */}
            <div className="h-[400px] sm:h-[450px] overflow-hidden bg-zinc-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90"></div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
              
              {/* Icon */}
              <div className="mb-4 w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-2 text-sm sm:text-base text-gray-200">
                {item.subtitle}
              </p>

              {/* Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(item.title);
                }}
                className="mt-5 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-pink-500 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Explore Collection
              </button>
            </div>

            {/* Hover Glow Border */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-pink-400 transition-all duration-500 rounded-3xl"></div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;