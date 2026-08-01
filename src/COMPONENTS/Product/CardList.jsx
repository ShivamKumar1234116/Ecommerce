import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const defaultProduct = {
  id: "default-card-prod",
  name: "Stylish Girls Top",
  price: 999,
  desc: "Trendy and comfortable top for daily wear.",
  img: "/images/img2.jpeg",
  badge: "🔥 Sale",
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

function CardList({ products }) {
  // If no products provided, render default placeholders
  const list = products && products.length > 0 
    ? products 
    : Array(8).fill(defaultProduct).map((p, idx) => ({ ...p, id: `default-card-${idx}` }));

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-wrap gap-8 md:gap-12 justify-center bg-black p-4 sm:p-8"
    >
      {list.map((prod) => (
        <motion.div key={prod.id} variants={itemVariants}>
          <Card product={prod} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default CardList;