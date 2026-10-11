import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import CustomCursor from './components/layout/CustomCursor';
import { QuickViewModal } from './components/products/QuickViewModal';
import { SizeGuideModal } from './components/products/SizeGuideModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { ToastContainer } from './components/ui/ToastContainer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Clothing } from './pages/Clothing';
import { Footwear } from './pages/Footwear';
import { Sneakers } from './pages/Sneakers';
import { Sportswear } from './pages/Sportswear';
import { NewArrivals } from './pages/NewArrivals';
import { Sale } from './pages/Sale';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { NotFound } from './pages/NotFound';
import { AddProducts } from "./pages/admin/AddProducts.jsx";

// Admin Suite Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminOrders } from './pages/admin/Orders';
// authentication
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import GoogleLoginButton from "./components/auth/GoogleLoginButton";
function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="relative min-h-screen bg-[#070709] text-gray-100 selection:bg-luxury-gold selection:text-black">
          <CustomCursor />
          <Navbar />

          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/clothing" element={<Clothing />} />
              <Route path="/footwear" element={<Footwear />} />
              <Route path="/sneakers" element={<Sneakers />} />
              <Route path="/sportswear" element={<Sportswear />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/sale" element={<Sale />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/add-product" element={<AddProducts />} />
              {/* auth */}
              <Route path="/login" element={<LoginForm />} />

<Route path="/register" element={<RegisterForm />} />

<Route path="/forgot-password" element={<ForgotPasswordForm />} />

<Route path="/reset-password" element={<ResetPasswordForm />} />

<Route path="/google-login" element={<GoogleLoginButton />} />

          

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating UI Overlays */}
          <QuickViewModal />
          <SizeGuideModal />
          <CartDrawer />
          <SearchModal />
          <ToastContainer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
