import React from 'react';
import { useShop } from '../context/ShopContext';
import { Package, Truck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Orders = () => {
  const { orders } = useShop();

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Client Portal</span>
        <h1 className="text-4xl font-black uppercase text-white">LIVE ORDER TRACKING & HISTORY</h1>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center text-gray-400 space-y-4">
            <Package className="w-12 h-12 text-luxury-gold mx-auto" />
            <h3 className="text-lg font-bold text-white">No active orders placed yet</h3>
            <Link to="/shop" className="bg-luxury-gold text-black font-extrabold text-xs px-6 py-3 rounded-xl inline-block">
              Shop Now
            </Link>
          </div>
        ) : (
          orders.map((ord) => (
            <div key={ord.id} className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-black text-white">{ord.id}</span>
                    <span className="bg-luxury-gold/20 text-luxury-gold text-xs font-extrabold px-3 py-1 rounded-full border border-luxury-gold/30">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Order Date: {ord.date} &bull; Waybill: {ord.trackingNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Total Amount</span>
                  <span className="text-2xl font-black text-luxury-gold">₹{ord.total}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
                {[
                  { title: "Order Placed", done: true },
                  { title: "Atelier Assembly", done: true },
                  { title: "Courier Dispatch", done: ord.status === 'Shipped' || ord.status === 'Delivered' },
                  { title: "Delivered", done: ord.status === 'Delivered' }
                ].map((step, i) => (
                  <div key={i} className="space-y-2">
                    <div
                      className={`w-full h-2 rounded-full transition-all ₹{
                        step.done ? 'bg-gradient-to-r from-luxury-goldDark to-luxury-gold shadow-glow-gold' : 'bg-white/10'
                      }`}
                    />
                    <span className={`text-[11px] font-bold block ₹{step.done ? 'text-white' : 'text-gray-500'}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-3 pt-4">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 glass-panel p-3 rounded-2xl border border-white/5">
                    <img src={item.image} alt="" className="w-14 h-14 object-cover rounded-xl bg-black/60" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-white">{item.name}</h4>
                      <span className="text-[11px] text-gray-400">Qty: {item.qty}</span>
                    </div>
                    <span className="text-sm font-black text-white">₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};
