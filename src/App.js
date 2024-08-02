import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import WelcomePage from "./pages/WelcomePage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import LoginForm from "./components/forms/LoginForm";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
