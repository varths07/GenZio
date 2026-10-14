import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingBag, Users, TrendingUp, AlertTriangle, Plus, Package } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const AdminDashboard = () => {
  const { products, orders } = useShop();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 142800);
  const totalOrdersCount = orders.length + 482;

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Admin Title */}
      <div className="glass-panel-gold rounded-3xl p-8 border border-luxury-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Administrative Suite</span>
          <h1 className="text-3xl font-black uppercase text-white">ATELIER DASHBOARD & ANALYTICS</h1>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/products"
            className="bg-luxury-gold text-black font-extrabold text-xs px-5 py-3 rounded-xl shadow-glow-gold flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="glass-panel text-white font-extrabold text-xs px-5 py-3 rounded-xl hover:bg-white/10"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", val: `₹${totalRevenue.toLocaleString()}`, change: "+18.4% vs last month", icon: DollarSign },
          { title: "Total Orders", val: totalOrdersCount, change: "+12.1% growth", icon: ShoppingBag },
          { title: "Average Order Value", val: "₹296.50", change: "+5.2% high basket size", icon: TrendingUp },
          { title: "Active VIP Clients", val: "1,248", change: "98% satisfaction", icon: Users }
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{kpi.title}</span>
              <div className="w-9 h-9 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            <span className="text-3xl font-black text-white block tracking-tight">{kpi.val}</span>
            <span className="text-[11px] font-semibold text-emerald-400 block">{kpi.change}</span>
          </div>
        ))}
      </div>

      {/* Analytics Chart & Low Stock Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Revenue Performance Chart */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Trend (2026 Q1 - Q3)</h3>
            <span className="text-xs text-luxury-gold font-bold">Updated Live</span>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-white/10 pb-2">
            {[
              { month: 'Jan', val: 65 },
              { month: 'Feb', val: 82 },
              { month: 'Mar', val: 74 },
              { month: 'Apr', val: 95 },
              { month: 'May', val: 110 },
              { month: 'Jun', val: 125 },
              { month: 'Jul', val: 142 }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-gradient-to-t from-luxury-goldDark to-luxury-gold rounded-xl group-hover:brightness-125 transition-all shadow-glow-gold"
                  style={{ height: `${(bar.val / 150) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400 font-bold">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Stock Warning */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Low Stock Alerts</span>
          </div>

          <div className="space-y-3">
            {products.filter((p) => p.stockCount <= 10).map((p) => (
              <div key={p.id} className="glass-panel p-3 rounded-2xl border border-rose-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg" />
                  <div>
                    <h4 className="font-bold text-white line-clamp-1">{p.name}</h4>
                    <span className="text-[10px] text-rose-400 font-bold">{p.stockCount} items remaining</span>
                  </div>
                </div>
                <span className="text-luxury-gold font-bold">₹{p.price}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
