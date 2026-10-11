import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Register = () => {
  const navigate = useNavigate();
  const { addToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    addToast('Account created! Welcome to VIP Club.', 'success');
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-[#070709] pt-36 pb-24 text-white px-4 flex items-center justify-center">
      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Membership Request</span>
          <h1 className="text-3xl font-black uppercase text-white">CREATE VIP ACCOUNT</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Full Name</label>
            <div className="flex items-center glass-panel rounded-xl px-3 py-2 border border-white/10">
              <User className="w-4 h-4 text-luxury-gold mr-2" />
              <input
                type="text"
                placeholder="e.g. Julian Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent text-xs text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Email</label>
            <div className="flex items-center glass-panel rounded-xl px-3 py-2 border border-white/10">
              <Mail className="w-4 h-4 text-luxury-gold mr-2" />
              <input
                type="email"
                placeholder="julian@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent text-xs text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Password</label>
            <div className="flex items-center glass-panel rounded-xl px-3 py-2 border border-white/10">
              <Lock className="w-4 h-4 text-luxury-gold mr-2" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent text-xs text-white focus:outline-none w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-xs py-3.5 rounded-xl shadow-glow-gold flex items-center justify-center space-x-2"
          >
            <span>Register Membership</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already a VIP Member?{' '}
          <Link to="/login" className="text-luxury-gold font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
