import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Wishlist = () => {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#070709] pt-36 pb-24 text-white px-4 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-rose-500">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-extrabold">YOUR WISHLIST IS EMPTY</h2>
        <p className="text-gray-400 text-sm max-w-md">
          Save your favorite luxury jackets, sneakers, and suits to your private vault.
        </p>
        <Link
          to="/shop"
          className="bg-luxury-gold text-black font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-glow-gold"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Saved Items</span>
        <h1 className="text-4xl font-black uppercase text-white">YOUR PRIVATE WISHLIST ({wishlist.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
