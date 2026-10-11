import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    cartTotal,
    discountAmount,
    appliedPromo,
    applyPromoCode
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-5 h-5 text-luxury-gold" />
              <h2 className="text-lg font-extrabold text-white tracking-wider">Your Shopping Bag</h2>
              <span className="bg-luxury-gold/20 text-luxury-gold text-xs font-bold px-2 py-0.5 rounded-full border border-luxury-gold/30">
                {cart.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full glass-panel hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-white/5 px-6 py-3 border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-gray-300 font-medium">
                {isFreeShipping ? (
                  <span className="text-emerald-400 font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                    You unlocked FREE Express Shipping!
                  </span>
                ) : (
                  <span>Add <strong className="text-white">₹{remainingForFree.toFixed(0)}</strong> more for Free Shipping</span>
                )}
              </span>
              <span className="font-bold text-luxury-gold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-luxury-goldDark to-luxury-gold rounded-full transition-all duration-500"
                style={{ width: `₹{progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-4">
                <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-sm font-semibold">Your shopping bag is empty.</p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-luxury-gold text-black font-extrabold text-xs px-6 py-3 rounded-xl shadow-glow-gold hover:opacity-90 transition-all"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="glass-panel p-3 rounded-2xl flex items-center space-x-4 border border-white/5 hover:border-white/20 transition-all"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-black/50"
                  />
                  <div className="flex-1 space-y-1">
                    <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-gray-400">
                      Color: <span className="text-gray-200">{item.selectedColor}</span> &bull; Size: <span className="text-gray-200">{item.selectedSize}</span>
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center space-x-2 border border-white/10 rounded-lg px-2 py-0.5 bg-black/40">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-gray-400 hover:text-white font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-gray-400 hover:text-white font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-black text-white">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-gray-500 hover:text-rose-500 p-1.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 space-y-4 bg-[#08080B]">
              {/* Promo Code */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 glass-panel rounded-xl px-3 py-1.5 flex items-center space-x-2 border border-white/10">
                  <Tag className="w-4 h-4 text-luxury-gold" />
                  <input
                    type="text"
                    placeholder="Promo (Try AURA10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="bg-transparent text-xs text-white uppercase placeholder-gray-500 focus:outline-none w-full"
                  />
                </div>
                <button
                  onClick={() => applyPromoCode(promoInput)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Summary */}
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-semibold">₹{cartSubtotal}</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-luxury-gold">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Express Shipping</span>
                  <span className="text-white font-semibold">
                    {isFreeShipping ? 'FREE' : '₹25'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-white font-black pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-luxury-gold">₹{cartTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-black text-sm py-4 rounded-2xl flex items-center justify-center space-x-2 shadow-glow-gold hover:opacity-95 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
