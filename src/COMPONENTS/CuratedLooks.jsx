import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const looks = [
  { img: "/images/banner.jpg", title: "Casual Chic" },
  { img: "/images/banner2.webp", title: "Summer Vibes" },
  { img: "/images/benner3.webp", title: "Street Style" },
  { img: "/images/benner4.jpg", title: "Ethnic Glam" },
  { img: "/images/benner6.jpg", title: "Boss Lady" },
];

const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: i % 2 === 0 ? 80 : -80,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

function CuratedLooks() {
  const [active, setActive] = useState(2);

  return (
    <section className="bg-black text-white py-20 px-4 md:px-10 overflow-hidden">

      {/* 🔥 Heading */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-5xl font-extrabold"
        >
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 text-transparent bg-clip-text">
            Discover Your Perfect Look ✨
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-3 text-sm md:text-base"
        >
          Handpicked styles for confident & stylish girls 💃
        </motion.p>
      </div>

      {/* 🔥 Carousel */}
      <div className="flex justify-center items-center gap-6 md:gap-10">

        {looks.map((item, i) => {
          const isActive = i === active;

          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setActive(i)}
              animate={{
                scale: isActive ? 1.15 : 0.9,
                opacity: isActive ? 1 : 0.6,
                y: isActive ? -20 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className={`
                relative cursor-pointer rounded-3xl overflow-hidden
                transition-all duration-300
                ${
                  isActive
                    ? "w-[300px] md:w-[380px] h-[460px] z-20 shadow-2xl shadow-pink-500/20"
                    : "w-[180px] md:w-[230px] h-[320px]"
                }
              `}
            >

              {/* 🖼 Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              {/* 🔥 Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* 🔥 Active Content */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-5 left-5 right-5 flex justify-between items-center"
                >
                  <h3 className="text-lg md:text-xl font-semibold">
                    {item.title}
                  </h3>

                  <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs md:text-sm hover:bg-pink-500 hover:text-white transition shadow-lg">
                    <ShoppingBag size={16} />
                    Shop Now
                  </button>
                </motion.div>
              )}

              {/* 🔥 Active Glow Border */}
              {isActive && (
                <div className="absolute inset-0 border-2 border-pink-500/40 rounded-3xl pointer-events-none"></div>
              )}

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}

export default CuratedLooks;