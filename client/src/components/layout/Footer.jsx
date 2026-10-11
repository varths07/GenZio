import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Footer = () => {
  const { addToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    addToast('Thank you for joining the AURA & NOIR VIP Club!', 'success');
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-luxury-goldDark to-luxury-gold flex items-center justify-center text-black font-black">
                A
              </div>
              <span className="text-xl font-extrabold tracking-[0.25em] text-white">
                AURA & NOIR
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The pinnacle of contemporary men’s fashion. Uniting Italian craftsmanship, high-street streetwear silhouettes, and Apple-minimalist aesthetics.
            </p>

            {/* Newsletter Input */}
            <form onSubmit={handleSubscribe} className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-luxury-gold block">
                Exclusive VIP Newsletter
              </span>
              <div className="flex items-center glass-panel rounded-2xl p-1.5 focus-within:border-luxury-gold/60 transition-colors">
                <input
                  type="email"
                  placeholder="Enter your private email..."
                  required
                  className="bg-transparent text-white placeholder-gray-500 text-xs px-3 py-2 focus:outline-none flex-grow"
                />
                <button
                  type="submit"
                  className="bg-luxury-gold hover:bg-luxury-goldLight text-black font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1 transition-all duration-300 shadow-glow-gold"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-5 text-luxury-gold">
              Categories
            </h4>
            <ul className="space-y-3 font-medium">
              <li><Link to="/clothing" className="hover:text-white transition-colors">Outerwear & Jackets</Link></li>
              <li><Link to="/sneakers" className="hover:text-white transition-colors">Luxury Sneakers</Link></li>
              <li><Link to="/clothing" className="hover:text-white transition-colors">Cashmere Hoodies</Link></li>
              <li><Link to="/footwear" className="hover:text-white transition-colors">Formal Derby Shoes</Link></li>
              <li><Link to="/sportswear" className="hover:text-white transition-colors">Kinetic Sportswear</Link></li>
              <li><Link to="/sale" className="text-luxury-gold hover:underline">Flash Sale (Up to 40%)</Link></li>
            </ul>
          </div>

          {/* Client Experience */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-5 text-luxury-gold">
              Client Service
            </h4>
            <ul className="space-y-3 font-medium">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About the Brand</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">VIP Membership</Link></li>
              <li><a href="#size-guide" className="hover:text-white transition-colors">Size Guide & Fit</a></li>
            </ul>
          </div>

          {/* Legal & Guarantee */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-5 text-luxury-gold">
              Trust & Legal
            </h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Luxury Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worldwide Express Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                <span>100% Certified Authentic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Socials */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AURA & NOIR Inc. All Rights Reserved. Engineered for Everyday Luxury.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all">
              <Youtube className="w-4 h-4" />
            </a>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center space-x-3 text-xs text-gray-400">
            <span className="px-2.5 py-1 glass-panel rounded-md text-[10px] uppercase font-bold text-gray-300">Apple Pay</span>
            <span className="px-2.5 py-1 glass-panel rounded-md text-[10px] uppercase font-bold text-gray-300">Visa Gold</span>
            <span className="px-2.5 py-1 glass-panel rounded-md text-[10px] uppercase font-bold text-gray-300">Mastercard</span>
            <span className="px-2.5 py-1 glass-panel rounded-md text-[10px] uppercase font-bold text-luxury-gold">Crypto</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
