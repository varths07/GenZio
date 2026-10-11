import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // e.g. { code: 'AURA10', discount: 0.1 }
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      date: '2026-07-28',
      total: 720,
      status: 'Shipped',
      trackingNumber: 'TRK-981240-EU',
      items: [
        { name: 'OVERSIZED LUXURY CASHMERE HOODIE', qty: 1, price: 380, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=300&q=80' },
        { name: 'AURA VORTEX 900 MATRIX SNEAKER', qty: 1, price: 340, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=300&q=80' }
      ]
    }
  ]);
  const [toasts, setToasts] = useState([]);

  // Toast Notification helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, selectedColor, selectedSize, quantity = 1) => {
    const colorName = selectedColor ? selectedColor.name : product.colors[0]?.name;
    const sizeVal = selectedSize || product.sizes[0];
    const cartItemId = `₹{product.id}-₹{colorName}-₹{sizeVal}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          cartItemId,
          selectedColor: colorName,
          selectedSize: sizeVal,
          quantity
        }
      ];
    });

    addToast(`Added ₹{product.name} to your Cart`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed ₹{product.name} from Wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Saved ₹{product.name} to Wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? cartSubtotal * appliedPromo.discount : 0;
  const freeShippingThreshold = 150;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = cartSubtotal === 0 || isFreeShipping ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const applyPromoCode = (code) => {
    if (code.toUpperCase() === 'AURA10' || code.toUpperCase() === 'LUXURY10') {
      setAppliedPromo({ code: code.toUpperCase(), discount: 0.1 });
      addToast('10% VIP Promo Applied!', 'success');
      return true;
    }
    addToast('Invalid promo code. Try AURA10', 'error');
    return false;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,
        isFreeShipping,
        freeShippingThreshold,
        appliedPromo,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        user,
        orders,
        setOrders,
        toasts,
        addToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
