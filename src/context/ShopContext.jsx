import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

const initialProducts = [
  // JEANS
  {
    id: "jeans-1",
    name: "High-Waist Wide Leg Jeans",
    price: 1699,
    desc: "Retro-inspired wide-leg jeans in premium rigid denim. Sits high on the waist, relaxed through the thighs, and flares out perfectly. An absolute girls' closet essential.",
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
    category: "jeans",
    rating: 4.7,
    reviewsCount: 154,
    badge: "Trending",
    sizes: ["26", "28", "30", "32"],
    details: ["100% Rigid Cotton Denim", "Classic 5-pocket design", "Fitted high rise waist", "Machine wash cold inside out"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "jeans-2",
    name: "Distressed Ripped Mom Jeans",
    price: 1499,
    desc: "Vented knee rips and a light stone wash give these mom jeans an authentic vintage vibe. Relaxed through the hips with a tapered ankle.",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
    category: "jeans",
    rating: 4.5,
    reviewsCount: 92,
    badge: "Best Seller",
    sizes: ["26", "28", "30", "32"],
    details: ["99% Cotton, 1% Elastane", "Light wash denim", "Frayed rip detailing", "Button fly closure"],
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "jeans-3",
    name: "Cargo Utility Jeans",
    price: 1899,
    desc: "Y2K streetwear utility jeans featuring multiple functional side cargo pockets. Perfect combination of relaxed style and utility.",
    img: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop",
    category: "jeans",
    rating: 4.4,
    reviewsCount: 76,
    badge: "New",
    sizes: ["28", "30", "32"],
    details: ["Medium-weight structured denim", "Side cargo flap pockets", "Relaxed fit trousers", "Cold machine wash"],
    images: [
      "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop"
    ]
  },

  // T-SHIRTS
  {
    id: "tshirt-1",
    name: "Oversized Vintage T-Shirt",
    price: 899,
    desc: "Super-soft washed cotton oversized tee featuring a graphic print on front. Drops at the shoulders for an effortless streetwear silhouette.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
    category: "t-shirt",
    rating: 4.8,
    reviewsCount: 142,
    badge: "Sale",
    sizes: ["S", "M", "L", "XL"],
    details: ["100% Premium Combed Cotton", "Heavyweight breathable fabric", "Vibrant fade-resistant print", "Tumble dry low"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "tshirt-2",
    name: "Cropped Rib-Knit Tee",
    price: 699,
    desc: "A flattering rib-knit crop top tee with short sleeves and a chic square neckline. Style it easily with cargos or high-rise denim.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
    category: "t-shirt",
    rating: 4.6,
    reviewsCount: 110,
    badge: "Hot",
    sizes: ["XS", "S", "M", "L"],
    details: ["95% Ribbed Cotton, 5% Spandex", "Stretchy body-hugging fit", "Short sleeves, crop length", "Machine wash cold"],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop"
    ]
  },

  // TROUSERS
  {
    id: "trouser-1",
    name: "Tailored High-Waist Trousers",
    price: 1999,
    desc: "Elevate your workwear and casual styling. Features a flattering high rise, pleated front details, and wide-cut legs for a structured drape.",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop",
    category: "trouser",
    rating: 4.8,
    reviewsCount: 88,
    badge: "Office Wear",
    sizes: ["26", "28", "30", "32"],
    details: ["Polyester-Viscose Suiting Blend", "Side slash pockets", "Belt loops, hook & bar closure", "Dry clean recommended"],
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "trouser-2",
    name: "Linen Wide-Leg Pants",
    price: 1599,
    desc: "Breathable and airy linen trousers with a comfortable smocked elastic waist back. Keeps you cool and stylish on sunny afternoons.",
    img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop",
    category: "trouser",
    rating: 4.4,
    reviewsCount: 52,
    sizes: ["S", "M", "L", "XL"],
    details: ["70% Linen, 30% Cotton", "Drawstring closure waistband", "Lightweight weave", "Warm iron if needed"],
    images: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600&auto=format&fit=crop"
    ]
  },

  // GYM OUTFITS
  {
    id: "gym-1",
    name: "Seamless Ribbed Gym Set",
    price: 2299,
    desc: "A matching activewear set featuring a high-neck crop top and high-waist seamless leggings. Designed with squat-proof compression fabric.",
    img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
    category: "gym-outfit",
    rating: 4.9,
    reviewsCount: 165,
    badge: "Squad Proof",
    sizes: ["XS", "S", "M", "L"],
    details: ["Nylon-Spandex Moisture Wicking Blend", "Seamless knit construction", "Medium support crop top", "Leggings with compression belt"],
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "gym-2",
    name: "High-Support Sports Bra",
    price: 999,
    desc: "Engineered for high-intensity training. Features cross-back straps, removable cups, and a wide elastic band for extra stability.",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    category: "gym-outfit",
    rating: 4.7,
    reviewsCount: 84,
    sizes: ["S", "M", "L", "XL"],
    details: ["Breathable mesh ventilation panel", "Removable padded cups", "Elastic supportive band", "Machine wash cold inside mesh bag"],
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "gym-3",
    name: "Athletic Compression Shorts",
    price: 899,
    desc: "Stay dry and secure. Features soft anti-chafing flatlock seams and convenient deep pockets to hold your phone on runs.",
    img: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop",
    category: "gym-outfit",
    rating: 4.6,
    reviewsCount: 43,
    badge: "Sale",
    sizes: ["S", "M", "L"],
    details: ["Dual side slip pockets", "High rise flat elastic waist", "8\" inseam compression fit", "Quick-dry active fabrics"],
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=600&auto=format&fit=crop"
    ]
  },

  // DRESSES
  {
    id: "dress-1",
    name: "Pure Silk Slip Dress",
    price: 3499,
    desc: "Exquisite cowled neck slip dress with a side leg slit. Drape yourself in mulberry silk, ideal for elegant evening dates and parties.",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop",
    category: "dresses",
    rating: 5.0,
    reviewsCount: 65,
    badge: "Premium Silk",
    sizes: ["XS", "S", "M", "L"],
    details: ["100% Mulberry Silk", "Adjustable spaghetti straps", "Thigh-high side slit", "Dry clean only"],
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "dress-2",
    name: "Smocked Floral Midi Dress",
    price: 1999,
    desc: "Romantic dress featuring off-shoulder elastic cuffs, a fully smocked bodice, and a layered ruffle midi skirt. Beautiful floral print.",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    category: "dresses",
    rating: 4.7,
    reviewsCount: 112,
    sizes: ["S", "M", "L", "XL"],
    details: ["Polyester Chiffon with soft lining", "Elastic smocked body stretch", "Off-the-shoulder styling", "Hand wash cold"],
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop"
    ]
  },

  // ACCESSORIES
  {
    id: "acc-1",
    name: "Layered Golden Chain Necklace",
    price: 499,
    desc: "A chic triple-layered golden necklace with sleek coin and bar pendants. Elevates even a simple white tee outfit.",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    rating: 4.4,
    reviewsCount: 110,
    sizes: ["One Size"],
    details: ["18k Gold Plated Alloy", "Adjustable lobster clasp", "Anti-tarnish coating", "Keep away from water/perfumes"],
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop"
    ]
  },
  {
    id: "acc-2",
    name: "Sleek Rectangular Sunglasses",
    price: 599,
    desc: "Retro 90s slim rectangular sunglasses with lightweight gold frames. Adds a vintage touch to any outfit.",
    img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
    category: "accessories",
    rating: 4.5,
    reviewsCount: 38,
    sizes: ["One Size"],
    details: ["UV400 Protection Lenses", "Durable metal alloy frame", "Comfortable silicone nose pads", "Hard case and cleaning cloth included"],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop"
    ]
  }
];

export const ShopProvider = ({ children }) => {
  const [products] = useState(initialProducts);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { isLoggedIn: false, user: null };
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Cart Functions
  const addToCart = (product, quantity = 1, size = "M") => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingIndex > -1) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prev, { product, quantity, size }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Auth Functions
  const loginUser = (email, password, name = "Fabulous Guest") => {
    const user = { email, name: name || "Fabulous Guest" };
    setAuth({ isLoggedIn: true, user });
    return true;
  };

  const signupUser = (email, password, name) => {
    const user = { email, name: name || "Fabulous Guest" };
    setAuth({ isLoggedIn: true, user });
    return true;
  };

  const logoutUser = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        wishlist,
        cart,
        auth,
        toggleWishlist,
        isInWishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        login: loginUser,
        signup: signupUser,
        logout: logoutUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
