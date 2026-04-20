import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./PAGES/Home";
import Top from "./COMPONENTS/top/Top";
import Navbar from "./COMPONENTS/Layout/Navbar";
import Footer from "./COMPONENTS/Layout/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/tops" element={<Top />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;