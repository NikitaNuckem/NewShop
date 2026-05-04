import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}