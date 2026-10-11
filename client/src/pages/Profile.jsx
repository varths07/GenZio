import React from 'react';
import { useShop } from '../context/ShopContext';
import { User, Shield, Award, MapPin, CreditCard, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user } = useShop();

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Profile Header */}
      <div className="glass-panel-gold rounded-3xl p-8 border border-luxury-gold/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-luxury-gold shadow-glow-gold"
          />
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-black text-white">{user.name}</h1>
              <span className="bg-luxury-gold text-black font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-glow-gold">
                {user.vipStatus}
              </span>
            </div>
            <p className="text-gray-300 text-xs font-mono">{user.email}</p>
            <p className="text-gray-400 text-xs pt-1">Member since Haute Season 2024 &bull; Concierge Level Access</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <Link to="/orders" className="bg-luxury-gold text-black font-extrabold text-xs px-6 py-3 rounded-xl shadow-glow-gold">
            My Orders
          </Link>
          <Link to="/wishlist" className="glass-panel text-white font-extrabold text-xs px-6 py-3 rounded-xl hover:bg-white/10">
            My Wishlist
          </Link>
        </div>
      </div>

      {/* Account Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Shield, title: "VIP Concierge & Support", desc: "Dedicated personal fashion advisor available 24/7." },
          { icon: MapPin, title: "Saved Addresses", desc: "740 Park Avenue, Apt 14B, New York, NY 10021" },
          { icon: CreditCard, title: "Payment Cards", desc: "Visa Gold ending in •••• 9812" }
        ].map((box, idx) => (
          <div key={idx} className="glass-panel rounded-3xl p-6 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
              <box.icon className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">{box.title}</h3>
            <p className="text-xs text-gray-400 leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
};
