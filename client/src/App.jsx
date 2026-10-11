
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

import CustomCursor from "./components/layout/CustomCursor";
import { QuickViewModal } from "./components/products/QuickViewModal";
import { SizeGuideModal } from "./components/products/SizeGuideModal";
import { CartDrawer } from "./components/cart/CartDrawer";
import { SearchModal } from "./components/layout/SearchModal";
import { ToastContainer } from "./components/ui/ToastContainer";

// Store pages
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Clothing } from "./pages/Clothing";
import { Footwear } from "./pages/Footwear";
import { Sneakers } from "./pages/Sneakers";
import { Sportswear } from "./pages/Sportswear";
import { NewArrivals } from "./pages/NewArrivals";
import { Sale } from "./pages/Sale";
import { ProductDetails } from "./pages/ProductDetails";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Wishlist } from "./pages/Wishlist";
import { Orders } from "./pages/Orders";
import { Profile } from "./pages/Profile";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";

// Admin pages
import { AddProducts } from "./pages/admin/AddProducts.jsx";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { AdminProducts } from "./pages/admin/Products";
import { AdminOrders } from "./pages/admin/Orders";

// Authentication
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ForgotPasswordForm from "./components/auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/auth/ResetPasswordForm";
import GoogleLoginButton from "./components/auth/GoogleLoginButton";

// Admin route protection
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <ShopProvider>
      <Router>
        <div className="relative min-h-screen bg-[#070709] text-gray-100 selection:bg-luxury-gold selection:text-black">
          <CustomCursor />
          <Navbar />

          <main className="relative z-10">
            <Routes>
              {/* Store routes */}
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
              <Route
                path="/orders"
                element={
                  <ProtectedRoute adminOnly={false}>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute adminOnly={false}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />

              {/* Protected admin routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/add-product"
                element={
                  <ProtectedRoute>
                    <AddProducts />
                  </ProtectedRoute>
                }
              />

              {/* Authentication routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordForm />}
              />
              <Route
                path="/reset-password"
                element={<ResetPasswordForm />}
              />
              <Route path="/google-login" element={<GoogleLoginButton />} />

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Floating UI overlays */}
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
