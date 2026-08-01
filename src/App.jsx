import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Navbar from "./COMPONENTS/Layout/Navbar";
import Footer from "./COMPONENTS/Layout/Footer";
import CategoryPage from "./PAGES/Category/CategoryPage";
import ProductDetailPage from "./PAGES/Product/ProductDetailPage";
import AuthPage from "./PAGES/Auth/AuthPage";
import WishlistPage from "./PAGES/Wishlist/WishlistPage";
import CartPage from "./PAGES/Cart/CartPage";
import ChatWidget from "./COMPONENTS/Chat/ChatWidget";
import { ShopProvider } from "./context/ShopContext";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:category" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* Fallback route */}
          <Route path="*" element={<CategoryPage />} />
        </Routes>
        <ChatWidget />
        <Footer />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;