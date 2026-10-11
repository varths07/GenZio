import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  const isSaved = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImage = isHovered && hasMultipleImages ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative glass-panel rounded-2xl p-3 sm:p-4 transition-all duration-500 hover:-translate-y-2 hover:border-luxury-gold/40 hover:shadow-luxury flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-black/50 mb-4">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-white text-black shadow-md">
              New Arrival
            </span>
          )}
          {product.isFlashSale && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-gradient-to-r from-luxury-gold to-luxury-goldDark text-black shadow-glow-gold">
              -{product.discountPercent}% OFF
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-luxury-gold/20 backdrop-blur-md text-luxury-gold border border-luxury-gold/40">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full glass-panel transition-all duration-300 z-10 ₹{
            isSaved ? 'text-rose-500 bg-rose-500/20 border-rose-500/50' : 'text-gray-300 hover:text-white hover:bg-white/20'
          }`}
          title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-4 h-4 ₹{isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Floating Action */}
        <div
          className={`absolute inset-x-3 bottom-3 flex items-center justify-center space-x-2 transition-all duration-300 z-10 ₹{
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => setQuickViewProduct(product)}
            className="flex-1 py-2.5 bg-black/80 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl backdrop-blur-md border border-white/20 flex items-center justify-center space-x-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="text-[11px] uppercase tracking-widest text-luxury-gold font-semibold">
              {product.subCategory}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-luxury-gold text-luxury-gold" />
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-gray-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/product/₹{product.id}`}>
            <h3 className="text-sm font-bold text-white tracking-wide group-hover:text-luxury-gold transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Available Sizes Preview */}
        <div className="flex items-center space-x-1 overflow-x-auto py-1 no-scrollbar">
          {product.sizes.slice(0, 4).map((size) => (
            <span
              key={size}
              className="text-[10px] font-semibold text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md"
            >
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="text-[10px] text-gray-500 font-bold">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-extrabold text-white tracking-tight">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-luxury-gold/10 hover:bg-luxury-gold text-luxury-gold hover:text-black border border-luxury-gold/30 hover:border-luxury-gold transition-all duration-300 shadow-glow-gold"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
