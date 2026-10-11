import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Checkout = () => {
  const { cart, cartSubtotal, cartTotal, discountAmount, clearCart, setOrders, addToast } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: 'DHANUREESH',
    lastName: 'B',
    email: 'DHANU.vance@luxury.com',
    address: '740 Park Avenue, Apt 14B',
    city: 'TRICHY',
    country: 'India',
    zip: '10021',
    paymentMethod: 'GooglePay', // 'applePay', 'card', 'crypto'
    cardNumber: '•••• •••• •••• 9812',
    cardExp: '12/28',
    cardCvc: '•••'
  });

  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newOrd = {
      id: `ORD-₹{Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      total: cartTotal,
      status: 'Processing',
      trackingNumber: `TRK-₹{Math.floor(100000 + Math.random() * 900000)}-GLOBAL`,
      items: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
        image: item.images[0]
      }))
    };

    setOrders((prev) => [newOrd, ...prev]);
    setPlacedOrder(newOrd);
    setIsOrderComplete(true);
    clearCart();
    addToast('Order Placed Successfully! Receipt generated.', 'success');
  };

  if (isOrderComplete && placedOrder) {
    return (
      <div className="min-h-screen bg-[#070709] pt-36 pb-24 text-white px-4 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold shadow-glow-gold">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Luxury Order Confirmed</span>
        <h1 className="text-4xl font-extrabold text-white">THANK YOU, {formData.firstName.toUpperCase()}</h1>
        <p className="text-gray-400 text-sm max-w-md">
          Your order <strong className="text-luxury-gold">{placedOrder.id}</strong> has been logged into our Milan atelier dispatch queue.
        </p>

        {/* Receipt Box */}
        <div className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/10 text-left space-y-3">
          <div className="flex justify-between text-xs text-gray-400 pb-3 border-b border-white/10">
            <span>Tracking Reference:</span>
            <span className="text-white font-mono">{placedOrder.trackingNumber}</span>
          </div>
          <div className="space-y-2">
            {placedOrder.items.map((it, i) => (
              <div key={i} className="flex justify-between text-xs text-gray-300">
                <span>{it.name} (x{it.qty})</span>
                <span className="font-bold text-white">₹{it.price * it.qty}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-black text-white pt-3 border-t border-white/10">
            <span>Total Paid</span>
            <span className="text-luxury-gold">₹{placedOrder.total.toFixed(0)}</span>
          </div>
        </div>

        <div className="flex space-x-4">
          <Link
            to="/orders"
            className="bg-luxury-gold text-black font-extrabold text-xs px-8 py-3 rounded-xl shadow-glow-gold"
          >
            Track Order Live
          </Link>
          <Link
            to="/shop"
            className="glass-panel text-white font-extrabold text-xs px-8 py-3 rounded-xl hover:bg-white/10"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Secure Checkout</span>
          <h1 className="text-3xl font-black uppercase text-white">CHOOSE PAYMENT & DISPATCH</h1>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Lock className="w-4 h-4 text-luxury-gold" />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Step Form Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between glass-panel rounded-2xl p-4 border border-white/10 text-xs font-bold">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center space-x-2 ₹{step >= 1 ? 'text-luxury-gold' : 'text-gray-500'}`}
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">1</span>
              <span>Shipping Address</span>
            </button>
            <span className="text-gray-600">&bull;&bull;&bull;</span>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center space-x-2 ₹{step >= 2 ? 'text-luxury-gold' : 'text-gray-500'}`}
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">2</span>
              <span>Payment Options</span>
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {step === 1 && (
              <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-luxury-gold">
                  1. Shipping Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">ZIP Code</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-luxury-gold text-black font-extrabold text-xs py-3.5 rounded-xl shadow-glow-gold flex items-center justify-center space-x-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-luxury-gold">
                  2. Select Luxury Payment Method
                </h3>

                <div className="space-y-3">
                  {[
                    { id: 'applePay', name: 'Apple Pay (Instant One-Touch)', badge: 'Recommended' },
                    { id: 'card', name: 'Credit / Debit Card (Visa, Mastercard, AMEX)' },
                    { id: 'crypto', name: 'Luxury Vault (Bitcoin / Ethereum Pay)' }
                  ].map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ₹{
                        formData.paymentMethod === m.id
                          ? 'bg-luxury-gold/10 border-luxury-gold text-white shadow-glow-gold'
                          : 'glass-panel border-white/10 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={m.id}
                          checked={formData.paymentMethod === m.id}
                          onChange={handleInputChange}
                          className="accent-luxury-gold"
                        />
                        <span className="text-xs font-bold">{m.name}</span>
                      </div>
                      {m.badge && (
                        <span className="text-[10px] bg-luxury-gold text-black font-extrabold px-2 py-0.5 rounded-full">
                          {m.badge}
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Expiry</label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">CVC</label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-xl glass-panel text-xs text-gray-300 font-bold hover:bg-white/10"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-black text-sm py-3.5 rounded-xl shadow-glow-gold hover:opacity-95"
                  >
                    Authorize & Pay ₹{cartTotal.toFixed(0)}
                  </button>
                </div>
              </div>
            )}
          </form>

        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-gold rounded-3xl p-6 border border-luxury-gold/40 space-y-4 sticky top-28">
            <h3 className="text-base font-extrabold text-white uppercase tracking-wider">Order Items</h3>
            <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
              {cart.map((item) => (
                <div key={item.cartItemId} className="flex items-center space-x-3 text-xs">
                  <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg bg-black/50" />
                  <div className="flex-1">
                    <h4 className="font-bold text-white line-clamp-1">{item.name}</h4>
                    <span className="text-gray-400">Qty: {item.quantity} &bull; {item.selectedSize}</span>
                  </div>
                  <span className="font-bold text-white">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">₹{cartSubtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-luxury-gold font-bold">
                  <span>VIP Discount</span>
                  <span>-₹{discountAmount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                <span>Total Due</span>
                <span className="text-luxury-gold">₹{cartTotal.toFixed(0)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
