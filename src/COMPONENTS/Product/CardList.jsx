import Card from "./Card";
import { motion } from "framer-motion";
const productData = {
  name: "Stylish Girls Top",
  price: "₹999",
  desc: "Trendy and comfortable top for daily wear.",
  img: "/images/img2.jpeg",
  badge: "🔥 Sale",
};


const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

<motion.div
  variants={cardVariants}
  transition={{ duration: 0.5 }}
  className="your-card-class"
></motion.div>

function CardList() {
  return (
    <div className="flex flex-wrap gap-15 justify-center bg-black p-10">
      <Card product={productData} />
      <Card product={productData} />
      <Card product={productData} />
      <Card product={productData} />
     <Card product={productData} /> 
     <Card product={productData} /> 
      <Card product={productData} /> 
       <Card product={productData} /> 
    
    </div>
  );
}

export default CardList;