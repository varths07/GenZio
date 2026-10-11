import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const SearchModal = () => {
  const { searchOpen, setSearchOpen, products } = useShop();
  const [query, setQuery] = useState('');

  if (!searchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 border border-white/20 shadow-2xl space-y-6">
        
        {/* Search Input Bar */}
        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
          <Search className="w-6 h-6 text-luxury-gold" />
          <input
            type="text"
            placeholder="Search luxury jackets, sneakers, hoodies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 rounded-full glass-panel hover:bg-white/20 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Search Results */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3">
          {query.trim() === '' ? (
            <div className="py-6 space-y-4">
              <span className="text-xs font-bold text-luxury-gold uppercase tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {['Sneakers', 'Cashmere Hoodie', 'Derby Formal', 'Merino Jacket', 'Pima T-Shirt', 'Raw Denim'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-xl glass-panel text-xs text-gray-300 hover:text-luxury-gold hover:border-luxury-gold/50 transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              No luxury pieces match "<strong className="text-white">{query}</strong>".
            </div>
          ) : (
            filtered.map((item) => (
              <Link
                key={item.id}
                to={`/product/₹{item.id}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center space-x-4 p-3 rounded-2xl glass-panel hover:bg-white/10 transition-colors group"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded-xl bg-black/50"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-luxury-gold transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {item.category} &bull; {item.subCategory}
                  </p>
                </div>
                <span className="text-sm font-black text-white">₹{item.price}</span>
              </Link>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
