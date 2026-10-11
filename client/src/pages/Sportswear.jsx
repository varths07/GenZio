import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';

export const Sportswear = () => {
  const { products } = useShop();
  const activeProducts = products.filter((p) => p.category === 'Sportswear');

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Active Performance</span>
        <h1 className="text-4xl font-black uppercase text-white">MEN'S SPORTSWEAR</h1>
        <p className="text-gray-400 text-sm max-w-lg">
          Aerodynamic activewear sets, thermal regulation track jackets & moisture-wicking joggers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
