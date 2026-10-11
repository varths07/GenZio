import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Cart = () => {
  const {
    cart,
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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#070709] pt-36 pb-24 text-white px-4 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-luxury-gold">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold">YOUR SHOPPING BAG IS EMPTY</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Explore our Italian cashmere hoodies, tailored blazers, and kinetic luxury sneakers.
        </p>
        <Link
          to="/shop"
          className="bg-luxury-gold text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-glow-gold hover:bg-white transition-all"
        >
          Discover Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Your Order</span>
          <h1 className="text-4xl font-black uppercase text-white">SHOPPING BAG ({cart.reduce((s, i) => s + i.quantity, 0)})</h1>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-glow-gold flex items-center space-x-2"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.cartItemId}
              className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl bg-black/60 border border-white/10"
                />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{item.name}</h3>
                  <p className="text-xs text-gray-400">
                    Color: <strong className="text-white">{item.selectedColor}</strong> &bull; Size: <strong className="text-white">{item.selectedSize}</strong>
                  </p>
                  <span className="text-sm font-black text-luxury-gold block sm:hidden">₹{item.price}</span>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto">
                <div className="flex items-center space-x-3 border border-white/10 rounded-xl px-3 py-1.5 glass-panel">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="text-gray-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-white px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="text-gray-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                <span className="text-base font-black text-white hidden sm:block">
                  ₹{item.price * item.quantity}
                </span>

                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-gray-500 hover:text-rose-500 transition-colors p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel-gold rounded-3xl p-6 border border-luxury-gold/40 space-y-6 sticky top-28">
            <h3 className="text-lg font-extrabold text-white uppercase tracking-wider">Order Summary</h3>

            {/* Promo Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Promo Code (Try AURA10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white uppercase placeholder-gray-500 focus:outline-none flex-1"
              />
              <button
                onClick={() => applyPromoCode(promoInput)}
                className="bg-luxury-gold text-black font-extrabold text-xs px-4 py-2 rounded-xl shadow-glow-gold"
              >
                Apply
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-300 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="text-white font-semibold">₹{cartSubtotal}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-luxury-gold font-bold">
                  <span>VIP Promo ({appliedPromo.code})</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Worldwide Shipping</span>
                <span className="text-white font-semibold">{isFreeShipping ? 'FREE' : '₹25'}</span>
              </div>
              <div className="flex justify-between text-base text-white font-black pt-3 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-luxury-gold">₹{cartTotal.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-sm py-4 rounded-xl shadow-glow-gold flex items-center justify-center space-x-2"
            >
              <span>Checkout Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
