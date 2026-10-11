import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/products/ProductCard';

export const Sale = () => {
  const { products } = useShop();
  const saleProducts = products.filter((p) => p.isFlashSale || p.discountPercent > 0);

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="glass-panel-gold rounded-3xl p-8 border border-luxury-gold/40 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">Exclusive Offers</span>
        <h1 className="text-4xl font-black uppercase text-white">PRIVATE SALE & FLASH OFFERS</h1>
        <p className="text-gray-300 text-sm max-w-lg">
          Up to 40% off on signature men's outerwear, cashmere hoodies, and Italian leather derby shoes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {saleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
